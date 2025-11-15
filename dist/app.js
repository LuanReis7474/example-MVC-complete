"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const ContaController_1 = require("./controller/ContaController");
const Conta_1 = require("./models/Conta");
const ContaView_1 = require("./view/ContaView");
const app = (0, express_1.default)();
// Middleware para capturar o body "bruto" antes do parse (útil pra debugar JSON inválido)
app.use(express_1.default.json({
    verify: (req, _res, buf) => {
        try {
            req.rawBody = buf && buf.toString('utf8');
        }
        catch {
            req.rawBody = undefined;
        }
    }
}));
// Suporte também a form-urlencoded, se necessário
app.use(express_1.default.urlencoded({ extended: true }));
// Rotas e controllers
const conta = new Conta_1.Conta(0, 0);
const contaView = new ContaView_1.ContaView();
const contaController = new ContaController_1.ContaController(conta, contaView);
app.get('/info-conta', contaController.getConta.bind(contaController));
app.post('/realizar-transações', contaController.realizarTransacao.bind(contaController));
app.post('/realizar-deposito', contaController.realizarDeposito.bind(contaController));
// Middleware de tratamento de erro para JSON inválido
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('JSON inválido recebido. Raw body:', req.rawBody);
        return res.status(400).json({ error: 'JSON inválido no corpo da requisição' });
    }
    // outros erros
    next(err);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
