import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
const wtf = require('wtf_wikipedia');

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  //console.log(req.body)

  //var obj = [{articleTitle: "Oregon"}]//
  var obj = req.body;

  const data = await handleMultipleResults(obj)
  res.send(data) 

  // Rest of the API logic
  //res.json({ message: 'Hello Everyone!' })
}



async function handleMultipleResults(obj){

    let allArticles = [];
    let allHeaders = [];
  
    for (const el of obj) {
      const item = await fetchWtf(el.articleTitle)
        allArticles = allArticles.concat(item.sorted)
        allHeaders = allHeaders.concat(item.headerData)
      }
    
    const sorted = allArticles.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  
    return {sorted: sorted,
            headers: allHeaders
          };
  }
  
  async function fetchWtf(searchString){

    try {

      const data = await wtf.fetch(searchString)
      const parsed = data !== null ? await parseWtf(data.json()) : [];
    
      let sorted = parsed.sort((a, b) => {
        if (a.date && b.date){
          return new Date(a.date) - new Date(b.date);
        }
      });
    
      const headerData = {header:{
        searchedValue: searchString,
        foundArticleTitle: parsed[0] ? parsed[0].articleTitle : '',
        countRecords: sorted ? sorted.length : 0,}
      }
    
      return {sorted: sorted, 
              headerData: headerData
            }; //data.json();  

    } catch (err){
      console.log(err)
    }

  };
  
  
  async function parseWtf(wtFetchData){
  
    const sections = wtFetchData.sections;
    const rows = [];
  
    const pageID = wtFetchData.pageID;
  
    sections.map((section)=>{
      const sectionTitle = section.title;
      const paragraphs = section.paragraphs ? section.paragraphs : [];
      paragraphs.map((paragraph) => {
        const sentences = paragraph.sentences;
        sentences.map((sentence)=>{
          const sentenceText = sentence.text;
          const sentenceDate = getPageDates(sentenceText);
          if (sentenceDate.length > 1){
            console.log(sentenceDate, sentenceText)
          }
          if(sentenceDate[0]){
            const cleanupRegex = /\b(on |in |as of\b)\b/gi
            const approximationRegex = /\b(.in |.In |.as of)\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((10[1-9]\d|11[1-9]\d|12[1-9]\d|13[1-9]\d|14[1-9]\d|15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))/gi
            const humanDate = sentenceDate[0][0];
            const realDate = inferDatefromString(sentenceDate[0][0]);
            
            const row =  {
              articleTitle: wtFetchData.title,
              pageId: pageID,
              stringDate: humanDate,
              context: sentenceDate[0].input, //Should be entire paragraph? Or previous and next few sentences? Position in paragraph may matter.
              sentence: sentenceDate[0].input,
              date: new Date(realDate).toISOString().slice(0, 19).replace('T', ' '),
              dateApproximatated: humanDate.match(approximationRegex) ? true : false,
              meta: {
                sectionTitle: sectionTitle,
              }
            };
            rows.push(row)
          }
          else {
            return
          }
        })
      })
      //return rows.sort((a, b) => b.date - a.date);
  
    })
    return rows;
  };
  
  function getPageDates(data){
    const regex = /\b(on |.On |in |.In |as of)\b(\b\d{1,2}\D{0,3})?\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\D?(\d{1,2}\D?)?\D?((15[1-9]\d|16[1-9]\d|17[1-9]\d|18[1-9]\d|19[1-9]\d|20\d{2})|\d{2})|(In (15\d{2}|16\d{2}|17\d{2}|18\d{2}|19\d{2}|20\d{2}))/gi;
    const array = [...data.matchAll(regex)];
    return array;
  };

  function inferDatefromString(dateString){
    const cleanupRegex = /\b(on |in |as of\b)\b/gi

    try {
      const realDate = Date.parse(dateString.replace(cleanupRegex, ''));
      return realDate
    } 
    catch (err){
      console.log(err)
      return null
    }

  };
  