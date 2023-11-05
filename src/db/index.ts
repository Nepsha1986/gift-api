import {  MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@atlascluster.rkhjcgx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

const clientPromise = client.connect();

export { clientPromise };
