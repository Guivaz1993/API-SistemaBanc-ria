const filtro = require('../filtros')

const contaBody = (req, res, next) => {
    const { numero_conta } = req.body

    if (!numero_conta) {
        return res.status(400).json({ "mensagem": "necessário informar o número da conta" })
    }

    const conta = filtro.buscarConta(numero_conta)

    if (!conta) {
        return res.status(404).json({ "mensagem": "conta não encontrada" })
    }
    next()
}

const verificarValor = (req, res, next) => {
    const { valor } = req.body;

    if (!valor || Number(valor) <= 0) {
        return res.status(400).json({ "mensagem": "o valor deve ser positivo e maior que 0" })
    }

    next()
}

const verificarSenhaUsuario = (req, res, next) => {
    const { senha } = req.body;

    if (!senha) {
        return res.status(400).json({ "mensagem": "a senha deve ser informada" })
    }

    next()
}

const contaTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino } = req.body

    if (!numero_conta_origem) {
        return res.status(400).json({ "mensagem": "necessário informar o número da conta de origem" })
    }

    const contaOrigem = filtro.buscarConta(numero_conta_origem)

    if (!contaOrigem) {
        return res.status(404).json({ "mensagem": "conta não encontrada" })
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ "mensagem": "necessário informar o número da conta de destino" })
    }

    const contaDestino = filtro.buscarConta(numero_conta_destino)

    if (!contaDestino) {
        return res.status(404).json({ "mensagem": "conta não encontrada" })
    }

    next()
}


module.exports = {
    contaBody,
    verificarValor,
    verificarSenhaUsuario,
    contaTransferencia
}