import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import condominioRoutes from './routes/condominioRoutes';
import moradorRoutes from './routes/moradoresRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import loginRoutes from './routes/loginRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(condominioRoutes);
app.use(moradorRoutes);
app.use(pedidoRoutes);
app.use(loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
