import ClienteDAO from "../Persistencia/clienteDAO.js";

export default class Cliente{
    //atributos privados
    #cpf
    #nome
    #dataNasc
    #telefone
    #endereco
    #cidade
    #estado

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf=novoCpf;
    } 

    get nome(){
        return this.#nome;
    }

    set nome(novaNome){
        this.#nome = novaNome;
    }

    get dataNasc(){
        return this.#dataNasc;
    }

    set dataNasc(novaData){
        this.#dataNasc = novaData;
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade=novaCidade;
    }

    get estado(){
        return this.#estado;
    }

    set estado(novoEstado){
        this.#estado = novoEstado;
    }

    //construtor (criador de um produto)
    constructor(cpf="", nome="", dataNasc="",telefone="",endereco="",
                cidade="", estado=""){
        this.#cpf=cpf;
        this.#nome=nome;
        this.#dataNasc=dataNasc;
        this.#telefone = telefone;
        this.#endereco=endereco;
        this.#cidade=cidade;
        this.#estado=estado;            
    }

    //override do método toJSON
    //o método toJSON é chamado automaticamente quando um produto
    //precisar ser convertido no formato JSON
    toJSON(){
        return {
            "cpf":this.#cpf,
            "nome":this.#nome,
            "dataNasc":this.#dataNasc,
            "telefone":this.#telefone,
            "endereco":this.#endereco,
            "cidade":this.#cidade,
            "estado":this.#estado     
        }
    }

    async incluir(){
        //instanciar a camada de persistencia do produto
        const clieDAO = new ClienteDAO();
        await clieDAO.incluir(this); //this referência a si mesmo
    }

    async consultar(termo){
        const clieDAO = new ClienteDAO();
        return await clieDAO.consultar(termo);
    }

    async excluir(){
        const clieDAO = new ClienteDAO();
        await clieDAO.excluir(this);
    }

    async alterar(){
        const clieDAO = new ClienteDAO();
        await clieDAO.alterar(this);
    }
}

