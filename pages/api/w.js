import cors from '../../lib/cors'
import {fetchWtf} from '../../controllers/wtf_wikiepdia.controller'

export default async function handler(req, res) {
  await cors(req, res)
  const data = await fetchArticles(req.body)
  res.send(data) 
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
  
  const sorted = allArticles.sort((a, b) => {
    return a.dateSortMs - b.dateSortMs;
  });

  return {sorted: sorted,
          headers: allHeaders
        };
}
