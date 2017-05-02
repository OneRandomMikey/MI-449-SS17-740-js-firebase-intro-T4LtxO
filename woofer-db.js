var config = {
  apiKey: 'AIzaSyAk6DJckdcqdmyNGzbvPszTVneVI4_Fp00',
  authDomain: 'fir-24ff9.firebaseapp.com',
  databaseURL: 'https://fir-24ff9.firebaseio.com',
  projectId: 'fir-24ff9',
  storageBucket: 'fir-24ff9.appspot.com',
  messagingSenderId: '406971392958'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()


// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofList').push(
    woof
  )
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  firebase.database().ref('woofList')
  .on('child_added', function (addedWoofSnapshot) {
    addWoofRow(addedWoofSnapshot.key, addedWoofSnapshot.val())
  })
  firebase.database().ref('woofList')
  .on('child_changed', function (changedWoofSnapshot) {
    updateWoofRow(changedWoofSnapshot.key, changedWoofSnapshot.val())
  })
  firebase.database().ref('woofList')
  .on('child_removed', function (removedWoofSnapshot) {
    deleteWoofRow(removedWoofSnapshot.key)
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofList').child(woofKey).child('text').set(
    woofText
  )
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofList').child(woofKey).remove()
}
// Load all of the data
readWoofsInDatabase()
