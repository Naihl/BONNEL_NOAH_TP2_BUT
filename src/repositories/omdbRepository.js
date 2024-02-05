const axios = require('axios');
const omdbApiKey = '147d80ac'; 

async function searchItemByTitle(title) {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error calling omdbapi:', error.message);
    throw error;
  }
}

module.exports = {
  searchItemByTitle,
};
