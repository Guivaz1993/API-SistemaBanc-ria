const filtro = require('../filtros')
const dados = require('../bancodedados')

const verificarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ "mensagem": "senha não informada" })
    }

    if (senha_banco !== dados.banco.senha) {
        return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!" })
    }

    next()
}

const verificarCpf = (req, res, next) => {
    const { cpf } = req.body;
    const { numeroConta } = req.params

    const contas = filtro.filtrarConta(numeroConta)


    const existe = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    if (existe) {
        return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf" })
    }

    next()
}

const verificarEmail = (req, res, next) => {
    const { email } = req.body;
    const { numeroConta } = req.params

    const contas = filtro.filtrarConta(numeroConta)

    const existe = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (existe) {
        return res.status(400).json({ "mensagem": "Já existe uma conta com o email" })
    }

    next()
}

const verificarBody = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ "mensagem": "não foi informado todos os dados" })
    }

    next()
}

const conta = (req, res, next) => {
    const { numeroConta } = req.params

    const conta = filtro.buscarConta(numeroConta)

    if (!conta) {
        return res.status(404).json({ "mensagem": "conta não encontrada" })
    }
    next()
}

const verificarSaldo = (req, res, next) => {
    const { numeroConta } = req.params

    const conta = filtro.buscarConta(numeroConta)

    if (conta.saldo !== 0) {
        return res.status(404).json({ "mensagem": "existe saldo na conta, não é possível encerrar a conta" })
    }
    next()
}

const verificarInfosSaldo = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ "mensagem": "não foi informado todas as informações necessárias" })
    }

    const conta = filtro.buscarConta(numero_conta)

    if (!conta) {
        return res.status(404).json({ "mensagem": "conta não encontrada" })
    }

    const senhaCorreta = filtro.senhaCorreta(senha, numero_conta)

    if (!senhaCorreta) {
        return res.status(403).json({ "mensagem": "senha incorreta" })
    }

    next()
}

module.exports = {
    verificarSenha,
    verificarCpf,
    verificarEmail,
    verificarBody,
    conta,
    verificarSaldo,
    verificarInfosSaldo
}