//É a classe responsável por traduzir requisições HTTP e produzir respostas HTTP
import Fornecedor from "../Modelo/fornecedor.js";
import Categoria from "../Modelo/categoria.js";

export default class FornecedorCtrl {

    gravar(requisicao, resposta) {
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const cnpj = requisicao.params.cnpj;
            const nomeEmpresa = requisicao.body.nomeEmpresa;
            const nomeResponsavel = requisicao.body.nomeResponsavel;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;
            const endereco = requisicao.body.endereco;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const categoria = requisicao.body.categoria;
            const categ = new Categoria(categoria.codigo);
            categ.consultar(categoria.codigo).then((listaCategorias) => {
                if (listaCategorias.length > 0) {
                    //pseudo validação
                    if (cnpj && nomeEmpresa && nomeResponsavel && telefone && email && endereco && cidade && uf && categoria.codigo > 0) {
                        //gravar o produto

                        const fornecedor = new Fornecedor(cnpj, nomeEmpresa, nomeResponsavel, telefone, email, endereco, cidade, uf, categ);

                        fornecedor.incluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Fornecedor adicionado com sucesso!",
                                    "cnpj": fornecedor.cnpj
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir o fornecedor: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
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
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            //o código será extraída da URL (padrão REST)
            const nomeEmpresa = requisicao.body.nomeEmpresa;
            const nomeResponsavel = requisicao.body.nomeResponsavel;
            const telefone = requisicao.body.telefone;
            const email = requisicao.body.email;
            const endereco = requisicao.body.endereco;
            const cidade = requisicao.body.cidade;
            const uf = requisicao.body.uf;
            const categoria = requisicao.body.categoria;
            const categ = new Categoria(categoria.codigo);
            categ.consultar(categoria.codigo).then((lista) => {
                if (lista.length > 0) {
                    //pseudo validação
                    if (cnpj && nomeEmpresa && nomeResponsavel && telefone && email && endereco && cidade && uf && categoria.codigo > 0) {
                        //alterar o produto
                        const fornecedor = new Fornecedor(cnpj, nomeEmpresa, nomeResponsavel, telefone, email, endereco, cidade, uf, categ);
                        fornecedor.alterar()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Fornecedor alterado com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível alterar o fornecedor: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados de um fornecedor conforme documentação da API."
                            }
                        );
                    }

                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "A categoria informada não existe!"
                    });
                }

            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar a categoria: " + erro.message
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
        //preparar o destinatário que a resposta estará no formato JSON
        resposta.type("application/json");
        //Verificando se o método da requisição é POST e conteúdo é JSON
        if (requisicao.method == 'DELETE') {
            //o código será extraída da URL (padrão REST)
            const cnpj = requisicao.params.cnpj;
            //pseudo validação
            if (cnpj!="") {
                //alterar o produto
                const fornecedor = new Fornecedor(cnpj);
                fornecedor.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Fornecedor excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir o fornecedor: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido de um fornecedor conforme documentação da API."
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
            let cnpj = requisicao.params.cnpj;
            //evitar que código tenha valor undefined
            /*if (isNaN(codigo)) {
                codigo = "";
            }*/

            const fornecedor = new Fornecedor();
            //método consultar retorna uma lista de produtos
            fornecedor.consultar(cnpj)
                .then((listaFornecedores) => {
                    resposta.status(200).json(listaFornecedores
                    );
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar fornecedores: " + erro.message
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