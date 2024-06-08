const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB URI and Client Setup
const uri = "mongodb+srv://prasna:kaamkaj@kaamkajj.efgvcho.mongodb.net/?retryWrites=true&w=majority&appName=kaamkajj";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db("mernJobPortal");
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
  }
}

const dbPromise = connectDB();

// Post a job
app.post("/post-job", async (req, res) => {
  const db = await dbPromise;
  const jobsCollection = db.collection("demoJobs");
  const body = req.body;
  body.createAt = new Date();
  try {
    const result = await jobsCollection.insertOne(body);
    if (result.insertedId) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Cannot insert! Try again later", status: false });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});



// Get all jobs
app.get("/all-jobs", async (req, res) => {
  const db = await dbPromise;
  const jobsCollection = db.collection("demoJobs");
  const jobs = await jobsCollection.find({}).toArray();
  res.send(jobs);
});
//get single job using id
app.get("/all-jobs/:id",async(req,res)=>{
  const id=req.params.id;
  const db = await dbPromise;
  const jobsCollection = db.collection("demoJobs");
  const job=await jobsCollection.findOne({
    _id:new ObjectId(id)
  })
  res.send(job)
})




//get jobs by email 
app.get("/myJobs/:email", async (req, res) => {
  const db = await dbPromise;
  const jobsCollection = db.collection("demoJobs"); // Define jobsCollection within the scope of the route handler
  // console.log(req.params.email)
  const jobs = await jobsCollection.find({ postedBy: req.params.email }).toArray();
  res.send(jobs);
});

app.delete("/job/:id",async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)}
  const db = await dbPromise;

  const jobsCollection = db.collection("demoJobs");

  const result=await jobsCollection.deleteOne(filter);
  res.send(result)
})
 //update
 app.patch("/update-job/:id",async(req,res)=>{
  const id=req.params.id;
  const db = await dbPromise;

  const jobsCollection = db.collection("demoJobs");
  const jobData=req.body;
  const filter={_id:new ObjectId(id)};
  const options={upsert:true};
  const updateDoc={
    $set:{
      ...jobData
    }
  };
  const result=await jobsCollection.updateOne(filter,updateDoc,options);
  res.send(result)
 })

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen on Port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
