// TF Tiger A1/4 Board settings. These Firebase keys are meant to be public;
// the logins and the Firestore rules are what protect the data.
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE.firebaseapp.com",
  projectId: "PASTE",
  storageBucket: "PASTE.appspot.com",
  messagingSenderId: "PASTE",
  appId: "PASTE"
};
// The shared class login. People only type the passcode (its password).
window.VIEWER_EMAIL = "viewer@tftiger.com";
// Logins that can change the board. Must match the list in firestore.rules.
window.EDITORS = [
  "PASTE_EDITOR_EMAIL"
];
