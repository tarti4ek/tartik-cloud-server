const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

// Разрешаем CORS
app.use(cors());

app.get('/alerts', async (req, res) => {
  try {
    // Тут подключаемся к Pikud HaOref
    const response = await axios.get('https://www.oref.org.il/WarningMessages/alert/alerts.json');
    const data = response.data;

    const alerts = [];

    if (data.data) {
      // Обрабатываем обычные тревоги
      data.data.forEach(region => {
        alerts.push({
          type: 'regular',
          area: region,
          timestamp: new Date().toISOString(),
        });
      });
    }

    if (data.earlywarning) {
      // Обрабатываем ранние тревоги
      data.earlywarning.forEach(region => {
        alerts.push({
          type: 'early',
          area: region,
          timestamp: new Date().toISOString(),
        });
      });
    }

    res.json(alerts);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    res.status(500).send('Ошибка при получении данных о тревогах');
  }
});

app.listen(PORT, () => {
  console.log(`🌐 Tartik Cloud Server запущен на порту ${PORT}`);
});
