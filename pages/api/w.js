import cors from '../../lib/cors'
import {fetchWtf} from '../../controllers/wtf_wikiepdia.controller'

export default async function handler(req, res) {
  try {
    await cors(req, res)
    const data = await fetchArticles(req.body)
    res.send(data)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
   
}

async function fetchArticles(obj){

  let allArticles = [];
  let allHeaders = [];

  for (const el of obj) {
    const item = await fetchWtf(el.articleTitle)
      if (item){
        allArticles = allArticles.concat(item.sorted)
        allHeaders = allHeaders.concat(item.headerData)
      }
  }
  
  // const promises = obj.map(async (el) => {
  //   const item = await fetchWtf(el.articleTitle);
  //   if (item) {
  //     return {
  //       sorted: item.sorted,
  //       headerData: item.headerData
  //     };
  //   }
  // });

  //const results = await Promise.all(promises);

  const allArticlesSorted = allArticles.sort((a, b) => {
    return a.dateSortMs - b.dateSortMs;
  });


  return {sorted: allArticlesSorted,
    headers: allHeaders
  };
}
