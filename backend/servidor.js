const express = require('express');
const cors = require('cors');
const authController = require('./controllers/authController');

const app = express(); 
app.use(cors());
app.use(express.json());

app.post('/login', authController.login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
