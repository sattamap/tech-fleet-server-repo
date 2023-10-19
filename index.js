const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app= express();
const port = process.env.PORT || 5000;


//middleware

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.idbsykh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

      const productCollection = client.db("productDB").collection("product");
      const brandCollection = client.db("productDB").collection("brand");
      const cartCollection = client.db("productDB").collection("cart");
      
      app.get('/brand', async(req,res)=>{
        const cursor = brandCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
      app.get('/products', async(req,res)=>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
      app.get('/cart', async(req,res)=>{
        const cursor = cartCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/product', async(req,res)=>{
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        
        res.send(result);
            
    })
    app.post('/cart', async(req,res)=>{
        const newCart = req.body;
        console.log(newCart);
        const result = await cartCollection.insertOne(newCart);
        
        res.send(result);
            
    })


   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged my deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req,res)=>{
    res.send('tech-fleet-server is running')
})

app.listen(port, ()=>{
    console.log(`tech-fleet-server is running on post: ${port}`);
})



