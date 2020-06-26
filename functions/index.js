const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const firebaseConfig = require('config');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get('/screams', (req, res) => {
    admin
        .firestore()
        .collection('screams')
        .orderBy('createAt','desc')
        .get()
        .then((data) => {
            let screams = [];
            data.forEach(doc => {
                // screams.push(doc.data());
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                })
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
});

app.post('/scream', (req, res) => {
    /*
   const newScream = {
       body: req.body.body,
       userHandle: req.body.userHandle,
       createdAt: admin.firestore.Timestamp.fromDate(new Date())
   }; Firebase Timestamp
   */ 
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

   admin.firestore()
       .collection('screams')
       .add(newScream)
       .then(doc => {
           res.json({ message: `document ${doc.id} created successfully.`})
       })
       .catch(err => {
           res.status(500).json({ error: 'something went wrong'});
           console.error(err);
       });
});
/*
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello world!");
 });
*/
/*
exports.getScreams = functions.https.onRequest((req, res) => {
    admin.firestore().collection('screams').get()
        .then((data) => {
            let screams = [];
            data.forEach(doc => {
                screams.push(doc.data());
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
 })
 */
/*
exports.createScream = functions.https.onRequest((req, res) => {
     if(req.method !== 'POST') {
         return res.status(400).json({ error: 'Method not allowed' });
     }
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully.`})
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        });
 });
*/
 //// https://baseurl.com/api/
 // Signup route
 app.post('/signup', (req, res) => {
     const newUser = {
         email: req.body.email,
         password: req.body.password,
         confirmPassword: req.body.confirmPassword,
         email: req.body.handle
     };

     // TODO: validate data

     firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => {


            
        })
 })

 exports.api = functions.region('us-central').https.onRequest(app);