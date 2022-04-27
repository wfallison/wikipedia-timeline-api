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
  console.log(req.query.searchTerm)
  var obj = req.body;

  const searchTerm = encodeURIComponent(req.query.searchTerm)

  //fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&&aplimit=500&apfrom=${searchTerm}`

  const url  = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&&aplimit=500&apfrom=${searchTerm}`
  //const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&&aplimit=500&apfrom=denver%20Township'

  console.log(url)
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

  // const data = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&&aplimit=500&apfrom=${searchTerm}`)
  // console.log(data)
  // res.send(data) 

  // Rest of the API logic
  //res.json({ message: 'Hello Everyone!' })
}






