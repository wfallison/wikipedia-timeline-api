import cors from '../../lib/cors'

export default async function handler(req, res) {

    await cors(req, res)

    const today = new Date()
    const thisYear = today.getFullYear();
    const thisMonth = ('0' + (today.getMonth()+1)).slice(-2)
    const thisDay = ('0' + today.getDate()).slice(-2)

    const url  = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${thisYear}/${thisMonth}/${thisDay}`

    let headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : "WTF-WIKIPEDIA"
    });

    fetch(url, {
        method  : 'GET', 
        headers : headers 
    }).then( async (response) =>{
        const data = await response.json()
        res.send(data) 
    })
}
