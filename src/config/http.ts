import Axios from 'axios';
import config from '.';

export const axios = Axios.create({
  baseURL: `${config.BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
