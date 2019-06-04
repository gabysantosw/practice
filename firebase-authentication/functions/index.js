const functions = require('firebase-functions');
const admin = require('firebase-admin');

// initialize at server-side
admin.initializeApp();

// add admin role to specific user
exports.addAdminRole = functions.https.onCall((data, context) => {
  // check is request is made by admin
  if (context.auth.token.admin != true) {
    return { error: 'Only admins can add other admins.' };
  }

  // get user and add custom claim of admin
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      // our claim
      admin: true
    });
  }).then(() => {
    // return response on the frontend
    return {
      message: `Success! ${data.email} has been made an admin`
    }
  }).catch(error => {
    return error;
  });
});
