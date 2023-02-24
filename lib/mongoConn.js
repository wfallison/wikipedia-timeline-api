import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const mongoDB = process.env.MONGODB_DB;
const mongoCollection = process.env.MONGODB_COLLECTION;

const uri = `mongodb+srv://${user}:${pass}@cluster0.qmnz1q9.mongodb.net/?retryWrites=true&w=majority`;

export const deleteAllTimelineCollections = async () => {
  const client = new MongoClient(uri);
  const collection = client.db(mongoDB).collection(mongoCollection);
  await collection.deleteMany({})
  console.log(`Deleted. Current count: `, await getAllTimeLineCollections(1))
  client.close();
};

export const createTimelineCollection = async (articleList) => {
  const client = new MongoClient(uri);
  const collection = client.db(mongoDB).collection(mongoCollection);
  collection.insertOne(articleList, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  client.close();
};

/*
  function: getAllTimeLineCollections
  parameters: pageNumber:integer (0 indexed)
  returns: object
    `
      {
      "total": 1,
      "result": [
          {
              "_id": "63f838cd099c2a12cb0fcba3",
              "collectionName": "American West Coast States",
              "collectionItems": [
                  {
                      "articleTitle": "Oregon"
                  }
              ]
          }
    `
  
*/

export const getAllTimeLineCollections = async (pageNumber) => {
  const client = new MongoClient(uri);

  try {

    if (isNaN(pageNumber)) {

      throw `pageNumber (pageNumber: ${pageNumber}) is not a number`
    }

    let query = () => {
      return new Promise((resolve, reject) => {
        const collection = client.db(mongoDB).collection(mongoCollection);
        collection
        .find({})
        .skip(pageNumber * 10)
        .limit(10)
        .toArray(function(err, data) {
            err 
              ? reject(err) 
              : resolve(data);
          });
        });
      };

      let totals = async () => {
        const collection = client.db(mongoDB).collection(mongoCollection);
        return collection.countDocuments()
      }
      var totalRecords = await totals();
      var result = await query();
  } catch (err) {
    return {message: 'An error has occurred', errText: err.toString()}
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return {total: totalRecords, result: result};
}


export {}