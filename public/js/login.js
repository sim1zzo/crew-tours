// import axios from 'axios';

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      withCredentials: true,
      method: 'post',
      url: 'http://127.0.0.1:3000/api/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res);
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