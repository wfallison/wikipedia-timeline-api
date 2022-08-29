import { MongoClient, ServerApiVersion } from 'mongodb';
import * as dotenv from 'dotenv'
dotenv.config()

const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASS;
const mongoDB = process.env.MONGODB_DB;
const mongoCollection = process.env.MONGODB_COLLECTION;

const uri = `mongodb+srv://${user}:${pass}@cluster0.qmnz1q9.mongodb.net/?retryWrites=true&w=majority`;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const connection = async () => 
  client.connect(err => {
    if (err){
      throw err;
    }
});


export const createTimelineCollection = (articleList) => {
  connection();
  const collection = client.db(mongoDB).collection(mongoCollection);
  collection.insertOne(articleList, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
};

export const getAllTimeLineCollections = async () => {
  const client = new MongoClient(uri);
  try {
  let query = () => {
    return new Promise((resolve, reject) => {
      const collection = client.db(mongoDB).collection(mongoCollection);
      collection
      .find({})
      .toArray(function(err, data) {
          err 
            ? reject(err) 
            : resolve(data);
        });
      });
    };
    var result = await query();
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return result;
}

const exampleCollection = {
  collectionName: "World Wars",
  collectionItems:["World War I", "World War II"]
}
