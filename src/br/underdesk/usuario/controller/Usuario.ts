import server = require('restify');
//import url = require('url');
import fs = require('fs');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import UsuarioDAO = require("../model/usuario");
import {IUsuario} from "../model/IUsuario";


@Controller()
export class Usuario{

	@Get()
	get(req:server.Request,res:server.Response):void{
		UsuarioDAO.findAll().then(function(dta: IUsuario[]) {
			res.json(dta);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Post("/upload_avatar/:iduser")
	uploadAvatar(req: server.Request, res: server.Response): void {
		//http://127.0.0.1:8299/usuario/upload_avatar/:iduser
		/*
		<form target="itarget" action="http://127.0.0.1:8299/usuario/upload_avatar/1234" method= "post" enctype= "multipart/form-data" >
			Select image to upload:
			<input type="file" name= "fileUploaded" id="fileUploaded" >
			<input type="submit" value= "Upload Image" name= "submit" >
		</form>
		<iframe name="itarget" id="itarget"></iframe>
		*/

		//console.log(req.files);
		var uploadPath = "./public/assets/avatars/";
		//__dirname + 
		//console.log(uploadPath);
		var tempFile = req.files.fileUploaded;
		fs.createReadStream(tempFile.path).pipe(fs.createWriteStream(uploadPath + 'avatar_' + req.params.iduser +'.png'));
		//res.json(req.files);
    	//var tempPath = req.files.fileUploaded.path;
		res.json({ status: "ok", name: tempFile.name });
	}

	@Post("/logar")
	logar(req:server.Request,res:server.Response):void{
		var p_usuario: IUsuario = <IUsuario>req.body;
		UsuarioDAO.find({ where: {
			"login":p_usuario.login
			,"senha":p_usuario.senha
			,"snAtivo":"S"
		} }).then(
			function(dta:IUsuario) {
				res.send(((dta)?true:false));
			}
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Get("/getbysnativo/:p_snativo")
	getBySnAtivo(req:server.Request,res:server.Response):void{
		UsuarioDAO.findAll(
			{where:{
				"snAtivo":req.params.p_snativo
				,"senha":false
			}}
		).then(
			(dta:IUsuario[]) => res.send(dta)
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Get("/getbylogin/:login")
	getByEmail(req: server.Request, res: server.Response): void {
		UsuarioDAO.find({
				where:{"login": req.params.login }
			}).then(
			function(dta:IUsuario){
				res.send(dta);
			}
		).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

	@Post()
	add(req: server.Request, res: server.Response): void {
		var nusuario: IUsuario = <IUsuario>req.body;
		UsuarioDAO.create(nusuario).then(function(p_nusuario: IUsuario) {
			res.json(p_nusuario);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nusuario: IUsuario = <IUsuario>req.body;
		UsuarioDAO.upsert(nusuario).then(function(p_nusuario: IUsuario) {
			res.json(nusuario);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:_id")
	delete(req: server.Request, res: server.Response): void {
		UsuarioDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function(p_nusuario: IUsuario) {
			res.send(true);
		}).catch(function(err:any) {
			res.status(400);
			res.json(err);
		});
	}

};
