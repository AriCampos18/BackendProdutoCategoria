//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import ClienteCtrl from "../Controle/clienteCtrl.js";

const clieCtrl = new ClienteCtrl();
const rotaCliente = Router();

rotaCliente.post("/", clieCtrl.gravar);
rotaCliente.put("/:cpf", clieCtrl.editar);
rotaCliente.patch("/:cpf", clieCtrl.editar);
rotaCliente.delete("/:cpf", clieCtrl.excluir);
rotaCliente.get("/:cpf", clieCtrl.consultar);
rotaCliente.get("/",clieCtrl.consultar);

export default rotaCliente;


