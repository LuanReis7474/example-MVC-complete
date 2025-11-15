// models/Conta.ts
export interface Transacoes {
  tipo: 'crédito' | 'débito';
  valor: number;
  date: Date;
}

export class Conta {
  private saldo: number;
  private limiteCredito: number;
  private transacoes: Transacoes[];

  constructor(saldo: number, limiteCredito: number) {
    this.saldo = saldo;
    this.limiteCredito = limiteCredito;
    this.transacoes = [];
  }

  // retorna true se débito efetuado com sucesso
  public realizarDebito(valor: number): boolean {
    if (isNaN(valor) || valor <= 0) return false;

    const saldoComLimite = this.saldo + this.limiteCredito;
    // se faltar dinheiro, não permite
    if (saldoComLimite - valor < 0) {
      return false;
    }

    this.saldo = this.saldo - valor;
    const transacao: Transacoes = { tipo: 'débito', valor, date: new Date() };
    this.transacoes.push(transacao);
    return true;
  }

  public realizarCredito(valor: number): void {
    if (isNaN(valor) || valor <= 0) return;
    this.saldo = this.saldo + valor;
    const transacao: Transacoes = { tipo: 'crédito', valor, date: new Date() };
    this.transacoes.push(transacao);
  }

  public realizarDeposito(valor: number): boolean {
    if (isNaN(valor) || valor <= 0) return false;
    this.saldo = this.saldo + valor;
    const transacao: Transacoes = { tipo: 'débito', valor, date: new Date() };
    this.transacoes.push(transacao);
    return true;
  }

  public definirLimiteCredito(limiteCredito: number): void {
    this.limiteCredito = limiteCredito;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public getLimiteCredito(): number {
    return this.limiteCredito;
  }

  public getTransacoes(): Transacoes[] {
    return this.transacoes;
  }
}
