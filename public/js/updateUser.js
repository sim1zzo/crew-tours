import axios from 'axios';

export const update = async (data) => {
  try {
    const res = await axios({
      method: 'patch',
      url: 'http://127.0.0.1:3000/api/users/updateMe',
      data,
    });
    if (res.statusText === 'OK') {
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (error) {
    alert('An unexpected error occurred.' + error.message);
  }
};

// const userDataForm = document.querySelector('.form-user-data');

// if (userDataForm)
//   userDataForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     update(name, email);
//   });
