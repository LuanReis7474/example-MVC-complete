"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
//regras de negócio
class Conta {
    saldo;
    limiteCredito;
    transacoes;

    constructor(saldo, limiteCredito) {
        this.saldo = saldo;
        this.limiteCredito = limiteCredito;
        this.transacoes = [];
    }

    realizarDebito(valor) {
        const saldoComLimite = this.saldo + this.limiteCredito;
        if (saldoComLimite - valor > 0) {
            return false;
        }
        this.saldo = this.saldo - valor;
        const transacao = { tipo: 'débito', valor: valor, date: new Date() };
        this.transacoes.push(transacao);
        return true;
    }

    realizarCredito(valor) {
        this.saldo = this.saldo + valor;
        const transacao = { tipo: 'crédito', valor: valor, date: new Date() };
        this.transacoes.push(transacao);
    }

    definirLimiteCredito(limiteCredito) {
        this.limiteCredito = limiteCredito;
    }

    getSaldo() {
        return this.saldo;
    }

    getLimiteCredito() {
        return this.limiteCredito;
    }

    getTransacoes() {
        return this.transacoes;
    }
}
exports.Conta = Conta;
//# sourceMappingURL=Conta.js.map