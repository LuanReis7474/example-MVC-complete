"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaView = void 0;
const express_1 = require("express");
const Conta_1 = require("../models/Conta");
class ContaView {
    render(res, contaData) {
        res.json(contaData);
    }
}
exports.ContaView = ContaView;
//# sourceMappingURL=ContaView.js.map