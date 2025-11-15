export interface Transacoes {
    tipo: 'crédito' | 'débito';
    valor: number;
    date: Date;
}
export declare class Conta {
    saldo: number;
    private limiteCredito;
    private transacoes;
    constructor(saldo: number, limiteCredito: number);
    realizarDebito(valor: number): boolean;
    realizarCredito(valor: number): void;
    definirLimiteCredito(limiteCredito: number): void;
    getSaldo(): number;
    getLimiteCredito(): number;
    getTransacoes(): Transacoes[];
}
//# sourceMappingURL=Conta.d.ts.map