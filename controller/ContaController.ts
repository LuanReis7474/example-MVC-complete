// controller/ContaController.ts
import { Request, Response } from "express";
import { Conta } from "../models/Conta";
import { ContaView } from "../view/ContaView";

export class ContaController {
  private conta: Conta;
  private contaView: ContaView;

  constructor(conta: Conta, contaView: ContaView) {
    this.conta = conta;
    this.contaView = contaView;
  }

  public getConta(req: Request, res: Response): void {
    const saldo = this.conta.getSaldo();
    const limiteCredito = this.conta.getLimiteCredito();
    const transacoes = this.conta.getTransacoes();
    this.contaView.render(res, { text: "Dados da conta:", saldo, limiteCredito, transacoes });
  }

  public realizarTransacao(req: Request, res: Response): void {
    const { tipo, valor } = req.body;

    if (tipo === "débito") {
      const sucesso = this.conta.realizarDebito(Number(valor));
      if (!sucesso) {
        res.status(400).json({ error: "Saldo insuficiente" });
      }
      res.status(200).json({ message: "Débito realizado" });
    } else if (tipo === "crédito") {
      this.conta.realizarCredito(Number(valor));
       res.status(200).json({ message: "Crédito realizado" });
    } else {
      res.status(400).json({ error: "Tipo inválido" });
    }
  }

  public realizarDeposito(req: Request, res: Response): void {
    
    const { valor } = req.body;
    const numValor = Number(valor);

    const sucesso = this.conta.realizarDeposito(numValor);

    if (sucesso) {
      res.status(200).json({ message: "Depósito realizado" });
    } else {
      res.status(400).json({ error: "Valor inválido para depósito" });
    }
  }
}
