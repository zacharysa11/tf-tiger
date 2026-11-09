// TF Tiger A1/4 Board settings. These Firebase keys are meant to be public;
// the logins and the Firestore rules are what protect the data.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDlWqTc0pY6o3saXgxbn8ICIenj7u8iDmI",
  authDomain: "tf-tiger.firebaseapp.com",
  projectId: "tf-tiger",
  storageBucket: "tf-tiger.firebasestorage.app",
  messagingSenderId: "674864852832",
  appId: "1:674864852832:web:2100ab56bb0a7c08f2b805"
};
// The shared class login. People only type the passcode (its password).
window.VIEWER_EMAIL = "viewer@tftiger.com";
// Logins that can change the board. Must match the list in firestore.rules.
window.EDITORS = [
  "PASTE_EDITOR_EMAIL"
];
