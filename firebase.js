import * as firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBFg68EzHqdwTv7HWeezJJFoHxvFPHoELw",
  authDomain: "golang-52cd7.firebaseapp.com",
  projectId: "golang-52cd7",
  storageBucket: "golang-52cd7.appspot.com",
  messagingSenderId: "327590248970",
  appId: "1:327590248970:web:ef453ab645262919df95f3",
  // measurementId: "G-2E5WMX3YZ3"
}

let app
if ((firebase.apps.length === 0)) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.firestore()

export {auth, db}
