const login = async (email, password) => {
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
    if (res.statusText === 'OK') {
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    // localStorage.setItem('token', res.data);
  } catch (error) {
    alert(error.message);
  }
};

let loginForm = document.querySelector('.form--login');
if (loginForm) {
  loginForm = loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/users/logout',
    });
    if (res.statusText === 'OK') location.reload();
  } catch (err) {
    alert('Something went wrong ' + err.message);
  }
};

let logOutBtn = document.querySelector('.nav__el--logout');
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
