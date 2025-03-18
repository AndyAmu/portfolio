const express = require('express');
const cors = require('cors');
const webhookRouter = require('./api/webhook');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta para el webhook de Botpress
app.use('/api', webhookRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
}); 