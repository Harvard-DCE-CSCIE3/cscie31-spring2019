//app-promise.js
const mongoose = require("mongoose");

// Use ES6 native Promises as promise library
mongoose.Promise = global.Promise;

// Connect to mongoDB on MongoDB Atlas
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0-shard-00-00-njksd.mongodb.net:27017,cluster0-shard-00-01-njksd.mongodb.net:27017,cluster0-shard-00-02-njksd.mongodb.net:27017/cscie31?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);
var db = mongoose.connection;
db.on('error', (err)=>{console.error(`connection error:${err}`);});
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

/* Save the new character to the database
 * save() returns a Promise, which has a .then() method that's called
 *  when the operation completes (is either fulfilled or rejected)
 */
c1.save()
.then((c)=>{
  console.log(`saved character! ${c}`);
})

// save.then() returns a prommise as well, and its .then() method is called
//  when it's either resolved or rejected
.then(()=> {
  Character.find({})
  .then( (characters)=>{
  console.log(`found characters! ${characters}`);

  // catch() at the end of the Promise chain deals with any Promises which
  //  were rejected anywhere along the chain
  }).catch((err)=>{console.log(err)});
});
