import axios from 'axios';

export const deleteTour = async (tourId) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: 'DELETE',
      url: `/api/tours/${tourId}`,
    });
    console.log(res.data);
    if (res.data.status === 'Deleted') {
      window.setTimeout(() => {
        location.assign('/delete-tour');
      }, 1500);
    }
  } catch (error) {
    alert('An error occurred', error);
  }
};
