const express = require('express');
const app = express();
const port = 5000;

const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');
app.get('/', (req, res) => {
  res.send('Hello World!1');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
db.collection('users').doc('LA').set(data);