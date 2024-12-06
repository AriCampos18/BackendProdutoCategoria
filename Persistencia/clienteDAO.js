//DAO - Data Access Object
import Cliente from "../Modelo/cliente.js";
import conectar from "./Conexao.js";

export default class ClienteDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS cliente(
                clie_cpf VARCHAR(14) NOT NULL,
                clie_nome VARCHAR(200) NOT NULL,
                clie_telefone VARCHAR(14) NOT NULL,
                clie_endereco VARCHAR(200),
                clie_cidade VARCHAR(200),
                clie_uf VARCHAR(200),
                CONSTRAINT pk_cliente PRIMARY KEY(clie_cpf), 
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `INSERT INTO cliente(clie_cpf,clie_nome,clie_telefone,clie_endereco,clie_cidade, clie_uf)
                values(?,?,?,?,?,?)
            `;
            let parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.telefone,
                cliente.endereco,
                cliente.cidade,
                cliente.uf
            ]; //dados do produto
            const resultado = await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `UPDATE produtocliente SET clie_nome=?,clie_telefone=?,clie_endereco=?,clie_cidade=?, clie_estado = ?
                WHERE clie_cpf = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.telefone,
                cliente.endereco,
                cliente.cidade,
                cliente.uf,
                cliente.cpf
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async consultar(termo) {
        //resuperar as linhas da tabela produto e transformá-las de volta em produtos
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (termo=="") {
            sql = `SELECT * FROM cliente c
                   WHERE clie_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM cliente c
                   WHERE clie_cpf = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const linha of linhas) { 
            const cliente = new Cliente(
                linha['clie_cpf'],
                linha['clie_nome'],
                linha['clie_telefone'],
                linha['clie_endereco'],
                linha['clie_cidade'],
                linha['clie_uf']
            );
            listaClientes.push(cliente);
        }
        await conexao.release();
        return listaClientes;
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE clie_cpf = ?`;
            let parametros = [
                cliente.cpf
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}