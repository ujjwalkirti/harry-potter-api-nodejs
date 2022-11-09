import { MongoClient } from "mongodb";
const connectionString = process.env.DEV_ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db= {
  connectToServer: function () {
    client.connect(function (err, db) {
      if (err || !db) {
        return console.log(err.errmsg);
      }

      dbConnection = db.db("cluster0");

      return console.log("Successfully connected to MongoDB.");
    });
  },

  getDb: function () {
    return dbConnection;
  },
};

export default db;
