import UsuarioDAO from "../Persistencia/usuarioDAO.js";
import Privilegio from "./privilegio.js";
export default class Usuario{
    //atributos privados
    #id;
    #nome;
    #email;
    #senha;
    #idade;
    #endereco;
    #privilegio;

    get id(){
        return this.#id;
    }

    set id(novoid){
        this.#id=novoid;
    } 

    get nome(){
        return this.#nome;
    }

    set nome(novanome){
        this.#nome = novanome;
    }

    get email(){
        return this.#email;
    }

    set email(novoemail){
        this.#email = novoemail;
    }

    get senha(){
        return this.#senha;
    }

    set senha(novasenha){
        this.#senha = novasenha;
    }

    get idade(){
        return this.#idade;
    }

    set idade(novaidade){
        this.#idade = novaidade;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoendereco){
        this.#endereco=novoendereco;
    }

    get privilegio(){
        return this.#privilegio
    }

    set privilegio(novoPrivilegio){
        if (novoPrivilegio instanceof Privilegio){
            this.#privilegio = novoPrivilegio;
        }
    }

    constructor(id=0, nome="",email="",senha="",idade=0,
                endereco="", privilegio={}){
        this.#id=id;
        this.#nome=nome;
        this.#email=email;
        this.#senha=senha;
        this.#idade=idade;
        this.#endereco=endereco;
        this.#privilegio=privilegio;
    }
    toJSON(){
        return {
            "id":this.#id,
            "nome":this.#nome,
            "email":this.#email,
            "senha":this.#senha,
            "idade":this.#idade,
            "endereco":this.#endereco,
            "privilegio":this.#privilegio
        }
    }

    async incluir(){
        const userDAO = new UsuarioDAO();
        await userDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const userDAO = new UsuarioDAO();
        return await userDAO.consultar(termo);
    }

    async excluir(){
        const userDAO = new UsuarioDAO();
        await userDAO.excluir(this);
    }

    async alterar(){
        const userDAO = new UsuarioDAO();
        await userDAO.alterar(this);
    }
}

