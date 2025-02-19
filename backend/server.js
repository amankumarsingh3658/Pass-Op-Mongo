/* eslint-disable no-undef */
const express = require('express')
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')

const url = process.env.MONGO_URI
const client = new MongoClient(url)
const dbname = 'passop'


const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect()

//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbname)
    const collection = db.collection('documents')
    const findResult = await collection.find({}).toArray()
    res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbname)
    const collection = db.collection('documents')
    const findResult = await collection.insertOne(password)
    res.send({success: true, message: 'Password saved successfully' , result: findResult})
})

//Delete a password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbname)
    const collection = db.collection('documents')
    const findResult = await collection.findOneAndDelete(password)
    res.send({success: true, message: 'Password Deleted successfully' , result: findResult})
})

app.listen(port, () => {
    console.log("App Listening on port ", port)
})