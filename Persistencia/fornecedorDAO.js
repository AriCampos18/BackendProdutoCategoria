import Fornecedor from "../Modelo/fonecedor.js";
import Categoria from "../Modelo/categoria.js";

import conectar from "./Conexao.js";
export default class FornecedorDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS fornecedor(
                forn_cnpj VARCHAR(18) NOT NULL,
                forn_nomeEmpresa VARCHAR(200) NOT NULL,
                forn_nomeResponsavel VARCHAR(200) NOT NULL,
                forn_telefone VARCHAR(12) NOT NULL,
                forn_email VARCHAR(100) NOT NULL,
                forn_endereco VARCHAR(350) NOT NULL,
                forn_cidade VARCHAR(350) NOT NULL,
                forn_uf VARCHAR(50) NOT NULL,
                fk_codigo_cat INT NOT NULL,
                CONSTRAINT pk_fornecedor PRIMARY KEY(forn_cnpj),
                CONSTRAINT fk_categoria FOREIGN KEY(fk_codigo_cat) REFERENCES categoria(codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `INSERT INTO fornecedor(forn_cnpj, forn_nomeEmpresa, forn_nomeResponsavel, forn_telefone, forn_email, forn_endereco, forn_cidade, forn_uf,fk_codigo_cat)
                values(?,?,?,?,?,?,?,?,?)
            `;
            let parametros = [
                fornecedor.cnpj,
                fornecedor.nomeEmpresa,
                fornecedor.nomeResponsavel,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.categoria.codigo
            ]; //dados do produto
            const resultado = await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `UPDATE fornecedor SET forn_cnpj=?,forn_nomeEmpresa=?,forn_nomeResponsavel=?,forn_telefone=?,forn_email=?,forn_endereco=?, forn_cidade=?,forn_uf=?,fk_codigo_cat = ? WHERE forn_cnpj=?
            `;
            let parametros = [
                fornecedor.cnpj,
                fornecedor.nomeEmpresa,
                fornecedor.nomeResponsavel,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco,
                fornecedor.cidade,
                fornecedor.uf,
                fornecedor.categoria.codigo,
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
            sql = `SELECT * FROM fornecedor
            INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo
                   WHERE forn_nomeEmpresa LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM fornecedor
             INNER JOIN categoria c ON p.fk_codigo_cat = c.codigo 
                   WHERE forn_cnpj = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const linha of linhas) {  
            const categoria = new Categoria(linha['codigo'],linha["descricao"]); 
            const fornecedor = new Fornecedor(
                linha['forn_cnpj'],
                linha['forn_nomeEmpresa'],
                linha['forn_nomeResponsavel'],
                linha['forn_telefone'],
                linha['forn_email'],
                linha['forn_endereco'],
                linha['forn_cidade'],
                linha['forn_uf'],
                categoria
            );
            listaFornecedores.push(fornecedor);
        }
        await conexao.release();
        return listaFornecedores;
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedor WHERE forn_cnpj = ?`;
            let parametros = [
                fornecedor.cnpj
            ]; //dados do produto
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}