import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const env: 'development' | 'production' = process.env.NODE_ENV as any; // Can be 'development' or 'production';

const database: Record<typeof env, string> = {
	development: 'gift-ideas_dev',
	production: 'gift-ideas',
}

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@atlascluster.rkhjcgx.mongodb.net/?retryWrites=true&w=majority`;

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
		db = client.db(database[process.env.NODE_ENV as typeof env]);
	})

export { init, db };
