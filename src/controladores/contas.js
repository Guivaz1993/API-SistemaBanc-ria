const dados = require('../bancodedados');
const filtro = require('../filtros')
let proximaConta = 1;

const listarContas = (req, res) => {
    const lista = dados.contas;

    return res.status(200).json(lista)
}

const criarContas = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const novaConta =
    {
        numero: `${proximaConta}`,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    dados.contas.push(novaConta);

    proximaConta++;

    return res.status(201).json()
}

const atualizarContas = (req, res) => {
    const { numeroConta } = req.params
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    const conta = filtro.buscarConta(numeroConta)

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    res.status(204).json()
}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params

    dados.contas = filtro.filtrarConta(numeroConta)

    res.status(204).json()
}

const saldo = (req, res) => {
    const { numero_conta } = req.query;

    const conta = filtro.buscarConta(numero_conta);

    res.json({ "saldo": conta.saldo })
}

const extrato = (req, res) => {
    const { numero_conta } = req.query;

    const depositos = dados.depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })

    const saques = dados.saques.filter((saque) => {
        return saque.numero_conta === numero_conta
    })

    const transEnviadas = dados.transferencias.filter((transferencias) => {
        return transferencias.numero_conta_origem === numero_conta
    })

    const transRecebidas = dados.transferencias.filter((transferencias) => {
        return transferencias.numero_conta_destino === numero_conta
    })

    res.status(200).json({ "depositos": depositos, "saques": saques, "transferenciasEnviadas": transEnviadas, "transferenciasRecebidas": transRecebidas })
}



module.exports = {
    listarContas,
    criarContas,
    atualizarContas,
    deletarConta,
    saldo,
    extrato
}