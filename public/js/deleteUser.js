import axios from 'axios';

export const deleteUser = async (userId) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'DELETE',
      url: `/api/users/${userId}`,
    });
    console.log(res.data);
    if (res.data.status === 'Deleted') {
      window.setTimeout(() => {
        location.assign('/allusers');
      }, 1500);
    }
  } catch (error) {
    alert('An error occurred', error);
  }
};
