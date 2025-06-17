const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем CORS
app.use(cors());

// Эндпоинт для приложения
app.get('/alerts', async (req, res) => {
  try {
    // ТВОЙ ЛОКАЛЬНЫЙ ПРОКСИ СЕРВЕР, меняем URL если нужно
    const response = await axios.get('http://localhost:3000/');
    res.json(response.data);
  } catch (error) {
    console.error('Ошибка получения данных:', error.message);
    res.status(500).send('Ошибка при получении данных');
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Tartik Cloud Server запущен на порту ${PORT}`);
});
