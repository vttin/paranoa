import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './database.js';

// Routes
import usuarioRoutes from './routes/usuarioRoutes.js';

dotenv.config();
database();

const app = express()
app.use(cors())
app.use(express.json())

// conect rotas
app.use("/usuarios", usuarioRoutes)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});