import cors from '../../lib/cors'
import {createTimelineCollection, getAllTimeLineCollections} from '../../lib/mongoConn'

export default async function handler(req, res) {
  await cors(req, res)
  const collections = await getAllTimeLineCollections(req.query.page)
  res.send(collections)
}
