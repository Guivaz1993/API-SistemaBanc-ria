const express = require('express');
const intermediariosContas = require('./intermediarios/contas')
const intermediariosTransacoes = require('./intermediarios/transacoes')
const contas = require('./controladores/contas')
const transacoes = require('./controladores/transacoes')


const rotas = express();

rotas.get('/contas', intermediariosContas.verificarSenha, contas.listarContas);
rotas.post('/contas', intermediariosContas.verificarBody, intermediariosContas.verificarCpf, intermediariosContas.verificarEmail, contas.criarContas);
rotas.put('/contas/:numeroConta/usuario', intermediariosContas.conta, intermediariosContas.verificarBody, intermediariosContas.verificarCpf, intermediariosContas.verificarEmail, contas.atualizarContas);
rotas.delete('/contas/:numeroConta', intermediariosContas.conta, intermediariosContas.verificarSaldo, contas.deletarConta);

rotas.post('/transacoes/depositar', intermediariosTransacoes.contaBody, intermediariosTransacoes.verificarValor, transacoes.depositar);
rotas.post('/transacoes/sacar', intermediariosTransacoes.verificarValor, intermediariosTransacoes.contaBody, intermediariosTransacoes.verificarSenhaUsuario, transacoes.sacar);
rotas.post('/transacoes/transferir', intermediariosTransacoes.verificarValor, intermediariosTransacoes.contaTransferencia, intermediariosTransacoes.verificarSenhaUsuario, transacoes.transferir);

rotas.get('/contas/saldo', intermediariosContas.verificarInfosSaldo, contas.saldo);
rotas.get('/contas/extrato', intermediariosContas.verificarInfosSaldo, contas.extrato)


module.exports = rotas