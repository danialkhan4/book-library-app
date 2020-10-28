const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

//firebase imports
const admin = require('firebase-admin');
const serviceAccount = require('./firestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const FieldValue = admin.firestore.FieldValue;
let currentUser = null;
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
  currentUser = req.body.uid;
  // db_createUser(req.body.uid); --> arrayUnion creates array if its empty
  res.json(req.body);
});

// add to library
app.post('/user/add', (req, res) => {
  console.log(req.body.bookData);
  db_addBook(req.body.bookData);
  res.json(req.body);
});

// remove from library
app.post('/user/remove', (req, res) => {
  console.log(req.body.bookData);
  db_removeBook(req.body.bookData);
  res.json(req.body);
});



// load library contents
app.get('/library', (req, res) => {
  const libraryData = db_data()
  .then(result => {
    console.log(result);
    res.json(result);
  });

});

async function db_createUser(data) {
  const userRef = db.collection('users').doc(data);
  const doc = await userRef.get();
  if (!doc.exists) {
    const res = await db.collection('users').doc(data).set({
      library:[]
    });
  }
}

async function db_addBook(data) {
  // >> bug, currentUser somtimes logged in even if null 
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const update = await userRef.update({ 
      library: FieldValue.arrayUnion(data)
    });
  } else {
    console.log('not logged in');
    // to do handling
  }
}

async function db_removeBook(data) {
  // >> bug, currentUser somtimes logged in even if null 
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const update = await userRef.update({ 
      library: FieldValue.arrayRemove({"authors": data.authors, "subtitle": data.subtitle, "thumbnail": data.thumbnail, "title": data.title})
    });
  } else {
    console.log('not logged in');
    // to do handling
  }
}

async function db_data() {
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const data = await userRef.get().then(doc => doc.get('library'));
    if (data) return data;
  } else {
    console.log('user not logged in');
  }

}