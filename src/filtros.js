const dados = require('./bancodedados')

const filtrarConta = (numeroConta) => {

    if (numeroConta) {
        const contas = dados.contas.filter((conta) => {
            return Number(conta.numero) !== Number(numeroConta)
        })
        return contas
    } else {
        const contas = dados.contas
        return contas
    }
}

const buscarConta = (numeroConta) => {
    const conta = dados.contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    })
    return conta
}

const senhaCorreta = (senha, numeroConta) => {
    const conta = buscarConta(numeroConta)

    if (conta.usuario.senha !== senha) {
        return false
    } else {
        return true
    }
}

module.exports = {
    buscarConta,
    filtrarConta,
    senhaCorreta
}