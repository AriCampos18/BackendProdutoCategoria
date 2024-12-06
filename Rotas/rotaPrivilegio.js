import { Router } from "express"; 
import PrivilegioCtrl from "../Controle/PrivilegioCtrl.js"

const privCtrl = new PrivilegioCtrl();
const rotaPrivilegio = Router();

rotaPrivilegio.post("/", privCtrl.gravar);
rotaPrivilegio.put("/:codigo", privCtrl.editar);
rotaPrivilegio.patch("/:codigo", privCtrl.editar);
rotaPrivilegio.delete("/:codigo", privCtrl.excluir);
rotaPrivilegio.get("/:codigo", privCtrl.consultar);
rotaPrivilegio.get("/",privCtrl.consultar);

export default rotaPrivilegio;


