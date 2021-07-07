import axios from 'axios';

export const update = async (data) => {
  try {
    const res = await axios({
      method: 'patch',
      url: '/api/users/updateMe',
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

export const deleteUser = async (userId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });
    console.log(res);
    if (res.data.status === 'Ok') {
      window.setTimeout(() => {
        location.assign('/allusers');
      }, 1500);
    }
  } catch (error) {
    alert('An error occurred', error);
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
