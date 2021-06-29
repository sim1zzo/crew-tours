import axios from 'axios';

export const signup = async (name, email, password, password2) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'POST',
      url: '/api/users/signup',
      data: {
        name,
        email,
        password,
        password2,
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
