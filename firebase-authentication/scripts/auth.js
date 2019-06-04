// ADD ADMIN CLOUD FUNCTION
const adminForm = document.querySelector('.admin-actions');

adminForm.addEventListener('submit', (e) => {
  console.log('asdf')
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;

  // create a call to pass data to cloud function
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});

// // GET DATA
// db.collection('guides').get().then(snapshot => {
//   // snapshot.docs -> returns an array of objects from collection
//   setupGuides(snapshot.docs); // in index.js
// });

// AUTH CHANGES
// this runs on page load
auth.onAuthStateChanged(user => {
  if (user) {
    // if user exists
    user.getIdTokenResult().then(idTokenResult => {
      // console.log(idTokenResult.claims.admin); // true if user is admin
      // we attach the claim to the user
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    // user is logged in, so we show them the data
    // GET DATA
    db.collection('guides').onSnapshot(snapshot => {
      // snapshot.docs -> returns an array of objects from collection
      setupGuides(snapshot.docs); // in index.js
    }, error => {
      console.log(error.message);
    });
  } else {
    setupUI();
    // user is logged out, user = null
    // we don't show the data
    setupGuides([]);
  }
});

// SIGNUP
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
   // preventing refresh on submit
  e.preventDefault();

  // getting user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // creating user in firebase
  // .createUserWithEmailAndPassword method is an async tast, returns a promise
  // we'll use a then to get this credential object
  // user gets added to firebase with an unique userID
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // user was created
      // cred -> object
      // cred.user -> user object

      // add the paralell user collection to firestore
      // we use return to allow the upcoming .then method
      console.log(cred.user.uid);
      return db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value
      });
  }).then(() => {
    // users collection data was added

    // close modal
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();

    // clear the form fields
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(error => {
    signupForm.querySelector('.error').innerHTML = error.message;
  });
});

// LOGOUT
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
  e.preventDefault();

  // firebase's signOut method is an async task
  auth.signOut().then(() => {
      // user signed out
  });
});

// LOGIN
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // user is logged in
    // close modal
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();

    // clear the form fields
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(error => {
    loginForm.querySelector('.error').innerHTML = error.message;
  });;
});

// ADD GUIDES
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    // guide was added
    // clear the form and close the modal
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(error => {
    console.log(error.message);
  });
});
