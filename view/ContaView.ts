import { Response } from "express";
import { Transacoes } from "../models/Conta";

export interface ContaData{
    text?: string;
    saldo: number;
    limiteCredito: number;
    transacoes: Transacoes[];
}
 
export class ContaView {

    public render(res: Response,  contaData: ContaData)
    {
        res.json(contaData);
    }
}