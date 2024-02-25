const { MongoClient } = require('mongodb');

// MongoDB connection URL and database name
const mongoURI = '';
const dbName = 'dark';

async function AddConnectionFromMongoDB(connectionId) {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const connectionsCollection = db.collection('connections');
    await connectionsCollection.insertOne({ connectionId, createdAt: new Date() });
  } finally {
    client.close();
  }
}

async function removeConnectionFromMongoDB(connectionId) {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const connectionsCollection = db.collection('connections');
    await connectionsCollection.deleteOne({ connectionId });
  } finally {
    client.close();
  }
}



async function GetAllConnectionsFromMongoDB() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const connectionsCollection = db.collection('connections');
    
    // Retrieve all connection documents
    const connections = await connectionsCollection.find({}).toArray();

    // Extract connectionIds from the documents and return them as an array
    const connectionIds = connections.map(connection => connection.connectionId);

    return connectionIds;
  } catch (err) {
    console.error('Error retrieving connections from MongoDB:', err);
    return []; }
  finally {
    client.close();
  }
}
async function removeAllConnectionsFromMongoDB() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const connectionsCollection = db.collection('connections');

    // Remove all documents from the connections collection
    await connectionsCollection.deleteMany({});

    console.log('All connections removed from MongoDB.');
  } catch (err) {
    console.error('Error removing connections from MongoDB:', err);
  } finally {
    client.close();
  }
}




module.exports = {
    AddConnectionFromMongoDB,
    removeConnectionFromMongoDB,
    GetAllConnectionsFromMongoDB,
    removeAllConnectionsFromMongoDB,
}