/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { update } from './updateUser';
import { bookTour } from './payment';
import { deleteUser } from './deleteUser';
import { deleteTour } from './deleteTour';

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const bookBtn = document.getElementById('book-tour');
const deleteBtn = document.getElementById('usdel');
const delTourBtn = document.getElementById('delete-tour');

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    signup(name, email, password, password2);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (deleteBtn)
  deleteBtn.addEventListener('click', (e) => {
    const { userId } = e.target.dataset;
    deleteUser(userId);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('avatar', document.getElementById('avatar').files[0]);
    update(form);
  });

if (delTourBtn) {
  // console.log(delTourBtn);
  delTourBtn.addEventListener('click', (e) => {
    const { tourId } = e.target.dataset;
    deleteTour(tourId);
  });
}
