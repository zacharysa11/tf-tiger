# TF Tiger A1/4 Board

Live personnel and equipment board for ATF A1/4, OP PACIFIC SWORD.

- `index.html`: the board (roster, MCE schedule, Annex B participation checks, equipment, resupply, log, CUB slides)
- `config.js`: Firebase keys, the class viewer login, and the editor list
- `firestore.rules`: paste into Firebase console > Firestore Database > Rules

Viewers sign in with the class passcode. Editors (A1/4, TOC) sign in with their own email.
To add an editor: create the login in Firebase Authentication, then add the email to both `config.js` and `firestore.rules`.
