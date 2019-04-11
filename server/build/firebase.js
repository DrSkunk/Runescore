"use strict";

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _serviceAccountKey = _interopRequireDefault(require("./serviceAccountKey.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(_serviceAccountKey.default),
  databaseURL: 'https://runescore.firebaseio.com'
});