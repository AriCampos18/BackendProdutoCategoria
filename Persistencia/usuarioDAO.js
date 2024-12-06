import Usuario from "../Modelo/usuario.js";
import Privilegio from "../Modelo/privilegio.js";
import conectar from "./Conexao.js";
export default class UsuarioDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS usuario(
                user_id INT NOT NULL AUTO_INCREMENT,
                user_nome VARCHAR(200) NOT NULL,
                user_email VARCHAR(200) NOT NULL,
                user_senha VARCHAR(200) NOT NULL,
                user_idade INT NOT NULL DEFAULT 0,
                user_endereco VARCHAR(200),
                fk_codigo_pri INT NOT NULL,
                CONSTRAINT pk_usuario PRIMARY KEY(user_id),
                CONSTRAINT fk_privilegio FOREIGN KEY(fk_codigo_pri) REFERENCES privilegio(codigo)
            );
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `INSERT INTO usuario(user_nome,user_email,user_senha,user_idade,user_senha, fk_codigo_pri)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.idade,
                usuario.endereco,
                usuario.privilegio.codigo
            ]; 
            const resultado = await conexao.execute(sql, parametros);
            usuario.id = resultado[0].insertId;
            await conexao.release(); //libera a conexão
        }
    }
    async alterar(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `UPDATE usuario SET user_nome=?,user_email=?,user_senha=?,user_idade=?,user_endereco=?,fk_codigo_pri = ?
                WHERE user_id = ?
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.idade,
                usuario.endereco,
                usuario.privilegio.codigo,
                usuario.id
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM usuario u
                   INNER JOIN privilegio p ON u.fk_codigo_pri = p.codigo
                   WHERE user_nome LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM usuario u
                   INNER JOIN privilegio p ON u.fk_codigo_pri = p.codigo
                   WHERE user_id = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaUsuarios = [];
        for (const linha of linhas) {
            const privilegio = new Privilegio(linha['codigo'],linha["descricao"]); 
            const usuario = new Usuario(
                linha['user_id'],
                linha['user_nome'],
                linha['user_email'],
                linha['user_senha'],
                linha['user_idade'],
                linha['user_endereco'],
                privilegio
            );
            listaUsuarios.push(usuario);
        }
        await conexao.release();
        return listaUsuarios;
    }
    async excluir(usuario) {
        if (usuario instanceof Usuario) {
            const conexao = await conectar();
            const sql = `DELETE FROM usuario WHERE user_id = ?`;
            let parametros = [
                usuario.id
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); //libera a conexão
        }
    }
}