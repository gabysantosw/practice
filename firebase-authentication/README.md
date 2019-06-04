# Firebase Authentication Tutorial - The Net Ninja

## Introduction - Part 1
Firebase is a complete backend as a service (BaaS), provides backend infrastructure
What we'll build -> GameGuidez, we'll have a login where users can add guides. It'll have a login and sign up. Users can create guides, check their account and logout. Admins can add emails and make their email an admin. Only admins can create guides. Normal users: can read. Admins: can read and write

## How Firebase Auth works - Part 2
We connect the website (client/browser level) to the Firebase server using the Firebase SDK
We capture user's credentials -> on the server, firebase verifies these credentials and returns an authentication token when is validated
In firebase console > add a project > set a name > create project
In the left sidebar > authetication > setup a signin method > email and password > select, enable
In the user tab there wont be any users
In the left sidebar > firestore > start in test mode (for now, we'll change this later)

## HTML template setup - Part 3
- Google's Materialize will be used
- we set an special attribute of data-target, combined with the modal trigger class a modal will be opened, we'll reference the data-target with the id of the modal. data-target -> modal div id
- each form in the modals have an id we'll use to handle data
- for modals to work we need to initialize them with javascript
- the guide list section is hard-coded only for styling puposes
- we create a 'scripts' folder with an index.js and auth.js
- in index.js we'll initialize the modals and dropdowns
- now we can focus on firebase itself

## Setting up Firebase Locally- Part 4
In firebase's console > project overview > register app > copy and paste before any script tags on out index.html
Now we add the auth and firestore sdks, we can also comment out the storageBucket and messagingSenderId because we won't need them
We also add references to auth and the firestore `const auth = firebase.auth(); const db = firebase.firestore();`
The `db.settings({timestampsInSnapshots: true})` is not needed with firebase v6
We can now communicate with our firebase

## Creating new users - Part 5
Getting data from sign up modal
In auth.js we reference the signup from and we add an event listener for it in case of 'submit'. We prevent default refresh and get the users data
- now we use firebase method `.createUserWithEmailAndPassword(email, password)`

## Signing users out - Part 6
- we reference the logout link and add an event listener
- use the `signOut()` firebase method

## Loggin users in - Part 7
- we reference the login form and add an event listener to it of 'submit'
- we get user info from the input fields
- we use firebase's `.signInWithEmailAndPassword(email, password)` method, again, this is an async task

## Tracking auth status - Part 8
We'll use a method that checks for changes and fires the function  `.onAuthStateChanged(callbackFunction)`, this will run on page load

## Getting firestore data - Part 9
- lets delete our hard coded guides and store data ourselves in firebase console. guides collection > title: string, value and a content: string, value
- we use `.get()`, another async tast, snapshot represents how the database looks like in the current time
- we want to use the data that manipulates the dom on the index.js so we keep the auth separated
- so far anyone can see this guides

## UI & Firestore security rules - Part 10
- we'll update the ui depending if the user is logged in
- in our auth changes we'll use our `setupGuides`, instead of getting data on load. if user is not logged in, we'll call it with an empty array, if the user is logged in we use the GET DATA  code section
- so the user doesn't see eveything empty, we add a confition, if user is not logged in show text 'login to read guides' in our setupGuides function
- this is not secure enough, we are only handling data on our ui
- SECURITY RULES will be used for this
- firebase console > database > rules > modify them to

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // match docs in the guides collection
    match /guides/{guideId} {
      // condition to check for authentication
      // uid is the unique userID that auth creates
      allow read, write: if request.auth.uid != null;
    }
  }
}
```
this way only authenticated users can read and write

SECURITY RULES RESOURCE: https://firebase.google.com/docs/firestore/security/rules-structure

## Conditional menu links - Part 11
- We'll manipulate the ui links depending on the user states
- This will be created in the index.js
- We'll create a setupUI function, this one will be called in the auth.js
- add onAuthStateChanged
- we'll add style='display: none;' so they are hidden by default to avoid a flicker on reload

## Adding guides - Part 12
- get the reference to #create-form and add an event listener of submit
- use `.add()` firestore method
- we won't have it shown in the UI yet, its just added to the db
- we test the security of our site: manipulating dev tools we can show the create guide link and try to add a guide, since we changed the security rules in our firebase it wont be added
- lets add a `.catch()` in the //ADD GUIDES section to log the actual error message 'Missing permissions' will show

## Firestore Realtime Listener - Part 13
- atumatically update ui when guide is added
- we'll change our .get().then() on our auth.onAuthStateChanged for a `onSnapshot()` method, since we can do both

## Showing user info - Part 14
- we'll handle the account modal to show our user's info
- `user.email` will be used in the setupUI function to handle this
- since it'll show an error when we log out lets add a .catch in the .onSnapshot in auth.js

## Firestore users collection - Part 15
- We can store more data for users, it already has user id and email, but a photo url, display name can also be added
- now, we want more data to be saved of our users so we'll have a paralell user collection so we can store: biography and age for example
- why keep it separated? we don't want that extra information each time we authorize user, avoids bloat
- when we receive a successful sign up -> add this same user id to new user collection in firestore
- first we'll add a bio input field on the signup modal
- in the signup section of auth.js -> in the .then we'll return this promise: db.collection('users'); -> doesn't exists but firebase will create it automatically
- to be able to add this data we'll have to change our security rules adding:
```
match /{document=**} {
  allow read, write;
}
```
- fix: take out the .catch in .onAuthStateChanged and use second parameter error instead
- lets show bio in the account info, chaning the setupUI

## More on Firestore rules - Part 16
- we want to set it so any user that's logged can add that bio in firestore
- 'anyone authenticated can add a new document' and 'only their own'
- write implies creationg and edition, create only creates
```
// march logged in user doc in users collection
match /users/{userId} {
  allow create: if request.auth.uid != null;
  allow read: if request.auth.uid == userId;
}
```
- This way we have secured our user data but we are allowing to write that bio in our firestore

## Intro to custom claims - Part 17
- Adding admins: only admins can create new guides. we'll have normal users and admins.
- Custom claims are just extra bits of information in the auth, example: 'admin: true', 'premium: true'
- process is: user logs in -> server answers if user has admin claim? (yes -> allow data access, no -> block data access) -> depending on server result we'll show the normal ui or the admin ui
- Firebase Cloud Functions: we'll need them to use custom claims security, as they shounldnt be in the frontend. Cloud functions run on the server, they are good for code you don't want to expose on the client-side, they perform tasks not available to client users but they are callable from the front-end
- We'll need to install `npm install firebase-tools -g`
- `firebase init functions` > proceed > link to desired project > javascript > eslint: no > intall dependencies: yes
- this adds .firebaserc and firebase.json, also a functions folder
- inside theres a index.js, that's where we'll work with our functions

## Cloud functions / adding claims - Part 18
- inside functions/index.js we add our code
- then we deploy to direbase with `firebase deploy --only functions`

## Adding admins - Part 19
- in our index.html lets add admin actions form, we want that when button is pressed to run our cloud function
- we have to add the functions sdk script and add a reference of `firebase.functions()`
- in auth.js -> ADD ADMIN CLOUD FUNCTION section at the top

## Updating the admin UI- Part 20
- so far admins can't really do anything
- in index.html -> change class of 'create guide' to 'admin' instead of 'logged-in', we'll also add this 'admin' class to the 'admin-actions' we add display:none by default too
- in auth.js -> we add a user check for admins
- we udtate setupUI function
- next we have to change our security rules, with our current setting any user logged in can create a guide

## Firestore rules with claims - Part 21
- Firestore rules:
```js
service cloud.firestore {
  match /databases/{database}/documents {
  	/// match logged in user doc in users collection
    match /users/{userId} {
      allow create: if request.auth.uid != null;
      allow read: if request.auth.uid == userId;
    }

    // match any doc in guides section
    match /guides/{guideId} {
      // logged users can read
    	aallow read: if request.auth.uid != null;
      // only admins can write
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

## Securing the cloud function - Part 22
- Our add admin form is still not secured, we need to check if the user adding an admin is actually an admin. In functions index.js
- after the modification, we deploy our firebase function `firebase deploy --only functions`
-
## Catching auth errors - Part 23
- we'll need to add a section in html where errors would appear

## What's next? - Part 24
There's more types of sign-in, check documentation
