import cors from '../../lib/cors'
import {fetchWtf} from '../../controllers/wtf_wikiepdia.controller'

export default async function handler(req, res) {
  await cors(req, res)
  
  res.setHeader("Access-Control-Max-Age", 86400)
  res.setHeader("Cache-Control", "public, max-age=86400")

  if (req.query.articleTitle){
    const bodyObjParody = req.query.articleTitle.map((el) => {
      return {
        articleTitle: el
      }
    })

    const data = await fetchArticles(bodyObjParody)
    res.send(data) 
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
  
  const sorted = allArticles.sort((a, b) => {
    return a.dateSortMs - b.dateSortMs;
  });

  return {sorted: sorted,
          headers: allHeaders
        };
}
