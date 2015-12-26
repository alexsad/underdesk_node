import {Underas} from "lib/underas/core";
import {ModView} from "lib/underas/container";
import {RequestManager} from "lib/underas/net";
import {Login} from "../../usuario/view/Login";
//import {Usuario} from "../../usuario/view/Usuario";
//import {Perfil} from "../../perfil/view/Perfil";


var tmpLocation:string = Underas.getLocation();
tmpLocation = tmpLocation.substring(0,tmpLocation.indexOf("8330"))+"8399/";
RequestManager.setRootUrl(tmpLocation);

var modlogin: Login = new Login();
var mdw:ModView = new ModView("cadastro de teste!!!");
mdw.setIcon("globe");
mdw.show(true);
mdw.append(modlogin);




/*

var mod1: Usuario = new Usuario();
var mdw2: ModView = new ModView("usuario");
mdw2.setIcon("user");
mdw2.show(true);
mdw2.append(mod1);


var mod2: Perfil = new Perfil();
var mdw3: ModView = new ModView("perfil");
mdw3.setIcon("play");
mdw3.show(true);
mdw3.append(mod2);

*/
