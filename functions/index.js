const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

exports.newDeal = functions.firestore
  .document('deals/{dealID}')
  .onCreate(doc => {

    const id = doc.id;
    const deal = doc.data();
    const notification = {
      content: 'New Deal!',
      id: id,
      title: `${deal.title}`,
      business: `${deal.ownerID}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);

});

exports.newPlace = functions.firestore
  .document('places/{placeID}')
  .onCreate(doc => {

    const id = doc.id;
    const place = doc.data();
    const notification = {
      content: 'New Place',
      id: id,
      name: `${place.name}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
});


exports.removeExpiredDeals = functions.pubsub.schedule("every 1 hours").onRun(async (context) => {
  const db = admin.firestore();
  const now = firestore.Timestamp.now()

  const deals = await db.collection("deals").where("expiresAt", <, now).get();
  let promises = []
  deals.forEach((deal) => {
    promises.push(deal.ref.delete());
  });

  return Promise.all(promise)
})
