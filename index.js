const express = require("express");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 5000




///midlaware 
app.use(express.json())
app.use(cors())







const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://hasans:otjg1Xh6vWKhRmaq@softopark.ockrkce.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

       const db = client.db("hasanS");
       const projectCollection = db.collection("projects");
     
  app.get("/projects", async (req, res) => {
    const query = {}
   const project = await projectCollection.find(query).toArray();
   res.send(project);
  })





  app.get("/projects/top", async (req, res) => {
  const query = {category:"top"}
  const projects = await projectCollection.find(query).toArray(); 
  res.send(projects)
  })





 app.get("/project/:id", async (req, res) => {
  const projectId=req.params.id
  const query={_id: new ObjectId(projectId)}
  const project = await projectCollection.findOne(query)
  res.send(project)
 })
  


 
  

 

 
   
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Mahmudul portfolio's run ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
