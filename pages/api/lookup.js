import cors from '../../lib/cors'

export default async function handler(req, res) {

  await cors(req, res)
  const searchTerm = encodeURIComponent(req.query.searchTerm)
  const url  = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&&aplimit=50&apfrom=${searchTerm}`

  let headers = new Headers({
    "Accept"       : "application/json",
    "Content-Type" : "application/json",
    "User-Agent"   : "WTF-WIKIPEDIA"
  });

  fetch(url, {
    method  : 'GET', 
    headers : headers 
  }).then(  async (response) =>{
    const data = await response.json()
    res.send(data) 
  })

}
