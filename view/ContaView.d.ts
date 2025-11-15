import { Response } from "express";
import { Transacoes } from "../models/Conta";
export interface ContaData {
    saldo: number;
    limiteCredito: number;
    transacoes: Transacoes[];
}
export declare class ContaView {
    render(res: Response, contaData: ContaData): void;
}
//# sourceMappingURL=ContaView.d.ts.map