// SETUP MATERIALIZE COMPONENTS
document.addEventListener('DOMContentLoaded', function () {
  let modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  let items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

// SETUP GUIDES
const guideList = document.querySelector('.guides');

const setupGuides = (data) => {
  // if our data has length, the user is logged in
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
      <li>
      <div class="collapsible-header grey lighten-4"> ${ guide.title } </div>
      <div class="collapsible-body white"> ${ guide.content } </div>
      </li>
      `;
      html += li; // appending each li
    });
    guideList.innerHTML = html;
  } else {
    // user has to login to see data
    guideList.innerHTML = '<h5 class="center-align"> Login to view guides.</h5>'
  }
};

// CONDITIONAL UI STATES
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    // is the user an admin?
    if(user.admin) {
      // then we show the iem items
      adminItems.forEach(item => item.style.display = 'block');
    }
    // show account info
    // const html = `<div>Logged in as ${user.email}</div>`;
    // accountDetails.innerHTML = html;
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : '' }</div>`;
      accountDetails.innerHTML = html;
    });

    // user is logged
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // hide account info
    accountDetails.innerHTML = '';

    // hide admin items when admins logout
    adminItems.forEach(item => item.style.display = 'none');

    // no user logged
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}
