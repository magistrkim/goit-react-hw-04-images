import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com',
  params: {
    per_page: 12,
    key: '34895141-e919cbae75dc4f78133336abf',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export const searchGallery = async (q, page = 1) => {
  const { data } = await instance.get('/api/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
