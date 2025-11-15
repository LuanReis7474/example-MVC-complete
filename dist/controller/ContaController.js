"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaController = void 0;
class ContaController {
    constructor(conta, contaView) {
        this.conta = conta;
        this.contaView = contaView;
    }
    getConta(req, res) {
        const saldo = this.conta.getSaldo();
        const limiteCredito = this.conta.getLimiteCredito();
        const transacoes = this.conta.getTransacoes();
        this.contaView.render(res, { text: "Dados da conta:", saldo, limiteCredito, transacoes });
    }
    realizarTransacao(req, res) {
        const { tipo, valor } = req.body;
        if (tipo === "débito") {
            const sucesso = this.conta.realizarDebito(Number(valor));
            if (!sucesso) {
                res.status(400).json({ error: "Saldo insuficiente" });
            }
            res.status(200).json({ message: "Débito realizado" });
        }
        else if (tipo === "crédito") {
            this.conta.realizarCredito(Number(valor));
            res.status(200).json({ message: "Crédito realizado" });
        }
        else {
            res.status(400).json({ error: "Tipo inválido" });
        }
    }
    realizarDeposito(req, res) {
        const { valor } = req.body;
        const numValor = Number(valor);
        const sucesso = this.conta.realizarDeposito(numValor);
        if (sucesso) {
            res.status(200).json({ message: "Depósito realizado" });
        }
        else {
            res.status(400).json({ error: "Valor inválido para depósito" });
        }
    }
}
exports.ContaController = ContaController;
