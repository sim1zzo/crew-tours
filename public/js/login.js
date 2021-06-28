import axios from 'axios';

export const login = async (email, password) => {
  try {
    const res = await axios({
      // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000'),
      // headers.append('Access-Control-Allow-Credentials', 'true'),
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
    alert('Something went wrong with ' + error.message);
  }
};

export const logout = async () => {
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
