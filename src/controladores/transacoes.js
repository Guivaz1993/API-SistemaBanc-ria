const { depositos, saques, transferencias } = require('../bancodedados')
const filtros = require('../filtros')
const { format } = require('date-fns')

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body

    const conta = filtros.buscarConta(numero_conta);

    conta.saldo = Number(conta.saldo) + Number(valor);

    const registro = criarRegistro(numero_conta, valor);

    depositos.push(registro);

    res.status(204).json()
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const senhaCorreta = filtros.senhaCorreta(senha, numero_conta)

    if (!senhaCorreta) {
        return res.status(401).json({ 'mensagem': 'senha incorreta' })
    }

    const conta = filtros.buscarConta(numero_conta);

    const saldoSuficiente = saldoExistente(conta.saldo, valor)

    if (!saldoSuficiente) {
        return res.status(404).json({ 'mensagem': 'saldo insuficiente' })
    }

    conta.saldo = Number(conta.saldo) - Number(valor);

    const registro = criarRegistro(numero_conta, valor);

    saques.push(registro);

    res.status(204).json()
}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const senhaCorreta = filtros.senhaCorreta(senha, numero_conta_origem)

    if (!senhaCorreta) {
        return res.status(401).json({ 'mensagem': 'senha incorreta' })
    }

    const contaOrigem = filtros.buscarConta(numero_conta_origem);

    const saldoSuficiente = saldoExistente(contaOrigem.saldo, valor)

    if (!saldoSuficiente) {
        return res.status(404).json({ 'mensagem': 'saldo insuficiente' })
    }

    contaOrigem.saldo = Number(contaOrigem.saldo) - Number(valor);

    const contaDestino = filtros.buscarConta(numero_conta_destino)

    contaDestino.saldo = contaDestino.saldo + Number(valor)


    const registro = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem: String(numero_conta_origem),
        numero_conta_destino: String(numero_conta_destino),
        valor: Number(valor)
    };

    transferencias.push(registro);

    res.status(204).json()
}

const criarRegistro = (numero_conta, valor) => {
    const registro = {
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: String(numero_conta),
        valor: Number(valor)
    }
    return registro
}

const saldoExistente = (saldo, valor) => {
    if (Number(saldo) < Number(valor)) {
        return false
    }
    return true
}



module.exports = {
    depositar,
    sacar,
    transferir
}