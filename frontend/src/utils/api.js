import axios from 'axios';

export const fetchDictionary = async () => {
  const response = await axios.get('/api/dictionary');
  return response.data;
};
