//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Cliente from "../Modelo/cliente.js";

export default class ClienteCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const cpf = requisicao.params.cpf;
            const nome = requisicao.body.nome;
            const dataNasc = requisicao.body.dataNasc;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
           
            if (cpf && nome && dataNasc && telefone && endereco && cidade && uf) {

                const cliente = new Cliente(cpf, nome, dataNasc, telefone, endereco, cidade, uf);

                    cliente.incluir()
                        .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente adicionado com sucesso!",
                            "cpf": cliente.cpf
                         });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível incluir o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um clliente conforme documentação da API."
                    }
                );
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const cpf = requisicao.params.cpf;
            const nome = requisicao.body.nome;
            const dataNasc = requisicao.body.dataNasc;
            const telefone = requisicao.body.telefone;
            const endereco = requisicao.body.endereco;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
   
            if (cpf && nome && dataNasc && telefone && endereco && cidade && uf) {
             
                const cliente = new Cliente(cpf, nome, dataNasc, telefone, endereco, cidade, uf);
                cliente.alterar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente alterado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível alterar o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe corretamente todos os dados de um produto conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            //o código será extraída da URL (padrão REST)
            const cpf = requisicao.params.cpf;
            //pseudo validação
            if (cpf!="") {
                //alterar o produto
                const cliente = new Cliente(cpf);
                cliente.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Cliente excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o cliente: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um cpf válido de um cliente conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            /*let cpf = requisicao.params.cpf;*/
            //evitar que código tenha valor undefined
            /*if (isNaN(cpf)) {
                codigo = "";
            }*/

            const cliente = new Cliente();
            //método consultar retorna uma lista de produtos
            cliente.consultar(cpf)
                .then((listaClientes) => {
                    resposta.status(200).json(listaClientes
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar clientes: " + erro.message
                        }
                    );
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}