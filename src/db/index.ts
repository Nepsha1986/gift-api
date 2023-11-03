import { Db, MongoClient, ServerApiVersion } from 'mongodb';

type Collection = 'products';

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@atlascluster.rkhjcgx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

let db: Db;

const init = () =>
	client.connect().then(() => {
		db = client.db('gift-ideas');
	})

const getItems = async (name: Collection) => {
	const collection = db.collection(name)
	return await collection.find({}).toArray();
}

export { init, getItems };
