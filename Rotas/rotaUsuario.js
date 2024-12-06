import { Router } from "express"; //micro-aplicação HTTP
import UsuarioCtrl from "../Controle/usuarioCtrl";

const userCtrl = new UsuarioCtrl();
const rotaUsuario = Router();

rotaUsuario.post("/", userCtrl.gravar);
rotaUsuario.put("/:id", userCtrl.editar);
rotaUsuario.patch("/:id", userCtrl.editar);
rotaUsuario.delete("/:id", userCtrl.excluir);
rotaUsuario.get("/:id", userCtrl.consultar);
rotaUsuario.get("/",userCtrl.consultar);

export default rotaUsuario;