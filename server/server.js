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

// add to library
app.post('/api/user/add', (req, res) => {
  const data = req.body.bookData; 
  const user = req.body.uid; 
  if (!data) res.status(400).send({msg: 'Error occurred'});
  if (!user) res.status(400).send({msg: 'Account error occurred'});

  db_addBook(req.body.uid, data).then(result => {
    if (result == 1) {
      return res.status(227).send({msg: 'book already in library'});
    } else {
      return res.json({msg: 'book added'});
    }
  }).catch(err => {
  });

});

// remove from library
app.post('/api/user/remove', (req, res) => {
  const data = req.body.bookData; 
  const user = req.body.uid; 

  if (!data) res.status(400).send({msg: 'Error occurred'});
  if (!user) res.status(400).send({msg: 'Account error occurred'});

  db_removeBook(user, data)
  .catch(err => {
    res.status(400).send({msg: 'error occurred'});
  });
  res.json({msg: 'book removed'});

});

// load library contents
app.get('/api/library', (req, res) => {
  const user = req.query.uid; 
  if (!user) res.status(400).send({msg: 'Account error occurred'});
  
  const libraryData = db_data(user)
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

async function db_addBook(user, data) {
  // >> bug, currentUser somtimes logged in even if null 

  const userRef = db.collection('users').doc(user);

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
}

async function db_removeBook(user, data) {
  // >> bug, currentUser somtimes logged in even if null 
  const userRef = db.collection('users').doc(user);
  const update = await userRef.update({ 
    library: FieldValue.arrayRemove({"authors": data.authors, "subtitle": data.subtitle, "thumbnail": data.thumbnail, "title": data.title})
  });
  return 0;

}

async function db_data(body) {
  const userRef = db.collection('users').doc(body);
  const data = await userRef.get().then(doc => doc.get('library'));
  if (data) return data;

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