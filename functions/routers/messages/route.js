const express = require('express');
const admin = require('firebase-admin');
admin.initializeApp();

const router = express.Router();
const endPoint ='/messages';

const db = admin.firestore();

// messages
router
  .route(endPoint)
  .get(async(req, res) => {
    const messages = [];
    try {
      const querySnapshot = await db.collection('blogs').get();
      querySnapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      })
    } catch (error) {
      console.error(error, 'Nooooooooooo')
    }
    res.json({ message: 'Called by the GET method.',
               messages
              });
  })
  .post((req, res) => {
    res.json({ message: 'Called by the POST method.' });
  });

// /messages/1
router
  .route(`${endPoint}/:id`)
  .put((req, res) => {
    res.json({ message: `Called by the PUT method. ID: ${req.params.id}` });
  })
  .delete((req, res) => {
    res.json({ message: `Called by the DELETE method. ID: ${req.params.id}` });
  });

module.exports = router;