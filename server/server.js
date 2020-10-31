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


app.post('/api/user', (req, res) => {
  console.log("GOT:" + req.body.uid);
  currentUser = req.body.uid;
  if (currentUser) {
    db_createUser(req.body.uid); //--> arrayUnion creates array if its empty
    res.json({msg: 'user login received and updated'});
  } else {
    res.status(400).send({msg: 'user error (not found)'});
  }
});

// add to library
app.post('/api/user/add', async (req, res) => {
  const data = req.body.bookData; 
  if (data) { 
      db_addBook(data).then(result => {
        if (result == 1) {
          return res.status(227).send({msg: 'book already in library'});
        } else if (result == -1) {
          return res.status(400).send({msg: 'error (account error)'});
        } else {
          return res.json({msg: 'book added'});
        }
      }).catch(err => {
        res.status(400).send({msg: 'Error occurred'});
      });

  } else {
    res.status(400).send({msg: 'error (book not valid)'});
  }
});

// remove from library
app.post('/api/user/remove', (req, res) => {
  const data = req.body.bookData; 
  if (data) {
    db_removeBook(data).catch(err => {
      res.status(400).send({msg: 'error occurred'});
    });
    res.json({msg: 'book removed'});
  } else {
    res.status(400).send({msg: 'error (book not valid)'});
  }
});
// load library contents
app.get('/api/library', (req, res) => {
  const libraryData = db_data()
  .then(result => { res.json(result) })
  .catch(err => {
    res.status(400).send({msg: 'error occurred'});
  });
});


/* 
 * FIREBASE FUNCTIONS
 */
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

    const library = await userRef.get().then(doc => doc.get('library'));
    for (let i = 0; i < library.length; i++) {
      if ( (library[i].title === data.title) )  {
        console.log("already found")
        return 1;
      }
    }
    const update = await userRef.update({ 
      library: FieldValue.arrayUnion(data)
    });
    return 0;
  } else {
    // not logged in 
    return -1;
  }
}

async function db_removeBook(data) {
  // >> bug, currentUser somtimes logged in even if null 
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const update = await userRef.update({ 
      library: FieldValue.arrayRemove({"authors": data.authors, "subtitle": data.subtitle, "thumbnail": data.thumbnail, "title": data.title})
    });
    return 0;
  } else {
    return -1;
  }
}

async function db_data() {
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const data = await userRef.get().then(doc => doc.get('library'));
    if (data) return data;
  } else {
    return -1; 
  }

}

async function db_checkExists(data) {
  if (currentUser) {
    const userRef = db.collection('users').doc(currentUser);
    const library = await userRef.get().then(doc => doc.get('library'));
    for (let i = 0; i < library.length; i++) {
      if ( (library[i].title === data.title) )  {
        return true; 
      }
    }
    return false;
  } else {
    console.log('user not logged in');
  }
}