//app.js
const mongoose = require("mongoose");

// Connect to mongoDB on MongoDB Atlas
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
var db = mongoose.connection;
db.on('error', (err)=>{ console.error(`connection error:${err}`); });
console.log("connected!");

// Create a Schema that describes the 'shape' of a document in our collection
var characterSchema = mongoose.Schema({
  name: {type: String, required:true},
  role: {type: String, required:false},
  story: {type: String, required:false}
});

// Initialize a Model - the basis for a 'document' or record based on the schema
var Character = mongoose.model('Character', characterSchema);

// Use the model to create a new Character 'document' containing one record of data
var c1 = new Character({ name: 'Adam Ewing', role: "Lawyer", story: "The Pacific Journal of Adam Ewing" });

// Save the new character to the database
c1.save((err, c)=>{
  if (err){ console.log(err) }  // in a real app we'd probably return an error here
  console.log(`saved character! ${c}` );

  // now that we've saved, let's do a find() to see our record(s)
  Character.find({}, (err, characters)=>{
    if (err){console.log(err)}
    console.log(`found characters! ${characters}`);
  });
});
console.log(o);
