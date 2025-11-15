// app.ts
import express, { Request, Response, NextFunction } from 'express';
import { ContaController } from './controller/ContaController';
import { Conta } from './models/Conta';
import { ContaView } from './view/ContaView';

const app = express();

// Middleware para capturar o body "bruto" antes do parse (útil pra debugar JSON inválido)
app.use(express.json({
  verify: (req: Request & { rawBody?: string }, _res, buf) => {
    try {
      (req as any).rawBody = buf && buf.toString('utf8');
    } catch {
      (req as any).rawBody = undefined;
    }
  }
}));

// Suporte também a form-urlencoded, se necessário
app.use(express.urlencoded({ extended: true }));

// Rotas e controllers
const conta = new Conta(0, 0);
const contaView = new ContaView();
const contaController = new ContaController(conta, contaView);

app.get('/info-conta', contaController.getConta.bind(contaController));
app.post('/realizar-transações', contaController.realizarTransacao.bind(contaController));
app.post('/realizar-deposito', contaController.realizarDeposito.bind(contaController));

// Middleware de tratamento de erro para JSON inválido
app.use((err: any, req: Request & { rawBody?: string }, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
    console.error('JSON inválido recebido. Raw body:', (req as any).rawBody);
    return res.status(400).json({ error: 'JSON inválido no corpo da requisição' });
  }
  // outros erros
  next(err);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
