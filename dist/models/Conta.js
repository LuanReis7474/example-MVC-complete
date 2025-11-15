"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
class Conta {
    constructor(saldo, limiteCredito) {
        this.saldo = saldo;
        this.limiteCredito = limiteCredito;
        this.transacoes = [];
    }
    // retorna true se débito efetuado com sucesso
    realizarDebito(valor) {
        if (isNaN(valor) || valor <= 0)
            return false;
        const saldoComLimite = this.saldo + this.limiteCredito;
        // se faltar dinheiro, não permite
        if (saldoComLimite - valor < 0) {
            return false;
        }
        this.saldo = this.saldo - valor;
        const transacao = { tipo: 'débito', valor, date: new Date() };
        this.transacoes.push(transacao);
        return true;
    }
    realizarCredito(valor) {
        if (isNaN(valor) || valor <= 0)
            return;
        this.saldo = this.saldo + valor;
        const transacao = { tipo: 'crédito', valor, date: new Date() };
        this.transacoes.push(transacao);
    }
    realizarDeposito(valor) {
        if (isNaN(valor) || valor <= 0)
            return false;
        this.saldo = this.saldo + valor;
        const transacao = { tipo: 'débito', valor, date: new Date() };
        this.transacoes.push(transacao);
        return true;
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
