const fetch = require('node-fetch'); // Import fetch vào

const API_KEY = 'YOUR_API_KEY'; // Thay bằng key thật từ Perenual
const API_URL = `https://perenual.com/api/species-list?key=${API_KEY}&page=1`;

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log('Danh sách cây:');
    data.data.forEach(plant => {
      console.log(`${plant.common_name} (${plant.scientific_name})`);
    });
  })
  .catch(error => console.error('Lỗi khi gọi API:', error));
