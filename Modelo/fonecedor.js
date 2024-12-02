import FornecedorDAO from "../Persistencia/fornecedorDAO.js";

export default class Produto{
    //atributos privados
    #cnpj;
    #nomeEmpresa;
    #nomeResponsavel;
    #telefone;
    #email;
    #endereco;
    #cidade;
    #estado

    get cnpj(){
        return this.#cnpj;
    }

    set cnpj(novoCnpj){
        this.#cnpj=novoCnpj;
    } 

    get nomeEmpresa(){
        return this.#nomeEmpresa;
    }

    set nomeEmpresa(novoNomeEmpresa){
        this.#nomeEmpresa = novoNomeEmpresa;
    }

    get nomeResponsavel(){
        return this.#nomeResponsavel;
    }

    set nomeResponsavel(novoNomeResponsavel){
        this.#nomeResponsavel = novoNomeResponsavel;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco=novoEndereco;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get estado(){
        return this.#estado
    }

    set estado(novoEstado){
        this.#estado = novoEstado;
    }

    //construtor (criador de um produto)
    constructor(cnpj="", nomeEmpresa="",nomeResponsavel="",telefone="",email="",
                endereco="", cidade="", estado=""){
        this.#cnpj=cnpj;
        this.#nomeEmpresa=nomeEmpresa;
        this.#nomeResponsavel=nomeResponsavel;
        this.#telefone=telefone;
        this.#email=email;
        this.#endereco=endereco;
        this.#cidade=cidade;            
        this.#estado = estado;
    }

    //override do método toJSON
    //o método toJSON é chamado automaticamente quando um produto
    //precisar ser convertido no formato JSON
    toJSON(){
        return {
            "cnpj":this.#cnpj,
            "nomeEmpresa":this.#nomeEmpresa,
            "nomeResponsavel":this.#nomeResponsavel,
            "telefone":this.#telefone,
            "email":this.#email,
            "endereco":this.#endereco,
            "cidade":this.#cidade,
            "estado":this.#estado
        }
    }

    async incluir(){
        //instanciar a camada de persistencia do produto
        const fornDAO = new FonecedorDAO();
        await fornDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const fornDAO = new FornecedorDAO();
        return await fornDAO.consultar(termo);
    }

    async excluir(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.excluir(this);
    }

    async alterar(){
        const fornDAO = new FornecedorDAO();
        await fornDAO.alterar(this);
    }
}
