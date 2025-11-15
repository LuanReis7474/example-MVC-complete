import { Request, Response } from "express";
import { Conta } from "../models/Conta";
import { ContaView } from "../view/ContaView";
export declare class ContaController {
    private conta;
    private contaView;
    constructor(conta: Conta, contaView: ContaView);
    getConta(req: Request, res: Response): void;
    realizarTransacao(req: Request, res: Response): void;
}
//# sourceMappingURL=ContaController.d.ts.map