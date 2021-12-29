import { MongoClient } from "mongodb";
//POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    // console.log(process.env.MONGODB_CONNECTION_STRING);
    // console.log(process.env.NEXT_PUBLIC_CONNECTION_STRING);

    const client = await MongoClient.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    const db = client.db();

    //table
    const meetupsCollection = db.collection("meetups");

    // document is like rows: object
    const result = await meetupsCollection.insertOne(data);

    // result will be automatically generated ID
    console.log(result);

    // can use try and catch here, but keeping it simple
    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;
