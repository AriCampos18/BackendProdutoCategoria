import Usuario from "../Modelo/usuario.js";
import Privilegio from "../Modelo/privilegio.js"

export default class UsuarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const id = requisicao.body.id;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const idade = requisicao.body.idade;
            const endereco = requisicao.body.endereco;
            const privilegio = requisicao.body.privilegio;
            const priv = new Privilegio(privilegio.codigo);
            priv.consultar(privilegio.codigo).then((listaPrivilegios) => {
                if(listaPrivilegios.length > 0){
                    if (nome && email &&
                    senha && idade > 0 &&
                    endereco && id > 0 && privilegio.codigo > 0) {

                    const usuario = new Usuario(0,
                        nome, email, senha,
                        idade, endereco, priv);

                    usuario.incluir()
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Usuario adicionado com sucesso!",
                                "codigo": usuario.codigo
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível incluir o usuario: " + erro.message
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
                        "mensagem": "O privilegio informado não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar o privilegio: " + erro.message
                });
            });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });
        }

    }


    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const id = requisicao.body.id;
            const nome = requisicao.body.nome;
            const email = requisicao.body.email;
            const senha = requisicao.body.senha;
            const idade = requisicao.body.idade;
            const endereco = requisicao.body.endereco;
            const privilegio = requisicao.body.privilegio;
            const priv =  requisicao.body.priv;

           priv.consultar = new Privilegio(privilegio.codigo).then((lista) => {
                if(lista.length > 0){
                    if (id > 0 && nome && email && senha &&
                    idade > 0 && endereco) {
                        const usuario = new Usuario(id,
                        nome, email, senha, idade, endereco);
                        usuario.alterar()
                        .then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Usuario alterado com sucesso!",
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Não foi possível alterar o usuario: " + erro.message
                            });
                        });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados de um usuario conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "O privilegio informado não existe!"
                    });
                }

            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar o privilegio: " + erro.message
                });
            });

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
                
           
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const id = requisicao.params.codigo;
            if (id > 0) {
                const usuario = new Usuario(id);
                usuario.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Usuario excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o usuario: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um usuario conforme documentação da API."
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
            let id = requisicao.params.id;
            if (isNaN(id)) {
                id = "";
            }

            const usuario = new Usuario();
            usuario.consultar(id)
                .then((listaUsuarios) => {
                    resposta.status(200).json(listaUsuarios
                        /*{
                            "status": true,
                            "listaProdutos": listaProdutos
                        }*/
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar usuarios: " + erro.message
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