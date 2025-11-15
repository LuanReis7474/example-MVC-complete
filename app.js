"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const ContaController_1 = require("./controller/ContaController");
const Conta_1 = require("./models/Conta");
const ContaView_1 = require("./view/ContaView");
const app = require('express');
app.use(express_1.default.json());
const conta = new Conta_1.Conta(0, 0);
const contaView = new ContaView_1.ContaView();
const contaController = new ContaController_1.ContaController(conta, contaView);
app.get('/info-conta', contaController.getConta.bind(contaController));
// Porta
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=app.js.map