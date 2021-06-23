// import axios from 'axios';

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      withCredentials: true,
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'ok' || res.data.status === 'OK') {
      windows.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    // localStorage.setItem('token', res.data);
  } catch (error) {
    console.log(error);
  }
};

let loginForm = document.querySelector('.form');
if (loginForm) {
  loginForm = loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
