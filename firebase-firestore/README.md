# Firebase Firestore Tutorial - The Net Ninja

## Introduction - Part 1
Firestore is a real-time noSQL database, the data is separated into collections and each collection has documents (records), there receive an unique id, they contain properties just like a js object.

## Setting up Firestore - Part 2
- Go to Firebase's website and get into the console
- Add project > set name, region, accept and create project
- Database > firestore > start in test mode (because we are developing) > enable
- Add collection > name it 'cafes'
- firestore will automate de id by default (random letters and numbers)
- fields would be the properties we want > continue
- project overview > add firebase to web app > add app nickname
- copy script and paste into our html file
- the code contains a config script and the firebase-app code script
- we then need to add the features we'll use of firebase, in this case: the firestore database
`<script src="/__/firebase/6.1.0/firebase-firestore.js"></script>`
- recomended to put the firebase-app and firebase-firestore script on the head tag
- at the end of the given script config, lets add a `const bd = firebase.firestore();`
- we then set some settings `db.settings({ timestampsInSnapshots: true })` that allows us to work with snapshot and not get errors and warnings in the console.

## Getting documents - Part 3
IN APP.js
- reference to the collection: `db.collection('cafes');`
- lets get all docs inside it: `db.collection('cafes').get();` -> this is an async operation so it will return a promise for us
- lets apply a .then method to wait until its done: `db.collection('cafes').get().then((snapshot) => { snapshot.docs });` in this case it will be an array.
- lets get the data from each document using `snapshot.docs.forEach(doc => doc.data())` -> this will filter the properties and methods firebase adds and gives us only the data we added
- lets reference our #cafe-list ul `const cafeList = document.querySelector...`
- lets create a function to render the data: `function renderCafe(doc) { // code }` and we call it from the snapshot forEach
- the function will create an li and span tag fro the name and another for the city
- we now set the database id in an attribute for the li `li.setAttribute('data-id', doc.id);`
- we set the `textContent` of each `doc.data().name` returns the name field of the doc
- then we append name and city to li, then the li to the #cafe-list
- NOTE: the timestampsInSnapshots setting defaults to true now and its recommended by firestore to not set it, is not necessary

## Saving Data - Part 4
- we add the html for our input fields
- on our js we get a variable for our form
- we add event listener of submit, we use `event.preventDefault()` to avoid the form button to refresh de page
- we use `.add()` in the `db.collection('cafes')`
- inside the add we set the data just like a javascript object
- empty values of form after the add
- for now we don't have the live reload of the app activated so to see whats added we need to refresh page

## Deleting Data - Part 5
- first we need to display a delete button on each item
- we add that element in the renderCafe function
- now we set an event listener for each cross created, still inside the renderCafe
- we use `event.stopPropagation()` to avoid it bubbling up as its not necessary
- in the handler we get the id of element using `event.target.parentElement.getAttribute('data-id')`
- now in the `db.collection('cafes')` we reference the item with `.doc(id)` and use `.delete()` to finally delete it

## Making Queries - Part 6
- so far we have been getting ALL the documents in our database, we now want to filter it
- `.where()` helps checking part of the `db.collection('cafes')`
- we'll set the where parameters to `'city', '==', 'london'` (note that it is case sensitive) so now we get the desired elements


## Ordering data - Part 7
- by default there's no sensitive order in the data we are getting
- `orderBy()` can be used on `db.collection()` when getting data
- example: `.orderBy('name')`
- in some moment an error may occur where it prompts to index the db, since by default its not ordered
- we can do that clicking the link or in our firebase console

## Real-time data - Part 8
- we want to update the data on the frontend automatically when user presses the add cafe, aka: when any change in the database happens
- `onSnapshot()` returns a 'snapshot', with this we can check for changes on database
- `.docChanges()` detects change in document, returns an array of objects, they have a type propperty that can be 'added', 'removed'
- we cycle through each object and take action depending on the type of change

## Updating data - Part 9
- we'll need a reference to the individual item / doc `db.collection('cafes').doc(doc.id)`
- `.update()` contains a javascript object like, we can change there the property we want
- theres another method called `set()` this one completely overides document data (deletes properties not declared inside), update doesn't affect the properties not changed

## What's next? - Part 10
Check out cloud firestore documentation
Other things we can do with firebase: authentication, cloud functions, storage, hosting, mlkit, analytics
