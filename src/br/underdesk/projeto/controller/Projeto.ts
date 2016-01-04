import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import ProjetoAR = require("../model/ProjetoAR");
import {IProjeto} from "../model/IProjeto";
import {Tabela} from "../../tabela/controller/Tabela"

@Controller()
export class Projeto {
	@Get()
	get(req: server.Request, res: server.Response): void {
		ProjetoAR.findAll().then(function(dta: IProjeto[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nprojeto: IProjeto = <IProjeto>req.body;
		//console.log(nprojeto);
		ProjetoAR.create(nprojeto).then(function(p_nprojeto: IProjeto) {
			res.json(p_nprojeto);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nprojeto: IProjeto = <IProjeto>req.body;
		ProjetoAR.upsert(nprojeto).then(function(p_nprojeto: IProjeto) {
			res.json(nprojeto);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	//@Delete("/:_id")
	delete(req: server.Request, res: server.Response): void {
		ProjetoAR.destroy({
			where: {
				id: req.params._id
			}
		}).then(function() {
            var tmpTabctrl:Tabela = new Tabela();
            
            //tmpTabctrl.deleteByIdProjeto()
            
			res.send(true);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
}
