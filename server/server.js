const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const axios = require('axios');

//firebase imports
const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');
const { default: Axios } = require('axios');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


/* setup and logger */
app.listen(port, () => {
  console.log(`Book library app listening at http://localhost:${port}`);
})

const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}
app.use(logger);

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/* react pages */
app.use(express.static(path.join(__dirname, '../client/build')));


//app.use('/library', require('./api/Library'));


app.post('/user', (req, res) => {
  console.log("GOT:" + req.body.uid);
  userFirestore(req.body.uid);
  //res.json(req.body);
})

async function userFirestore(data) {
  const userRef = db.collection('users').doc(data);
  const doc = await userRef.get();
  if (!doc.exists) {
    const res = await db.collection('users').doc(data).set({
      library:[]
    });
  }
}