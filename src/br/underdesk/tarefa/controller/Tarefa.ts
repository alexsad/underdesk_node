import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import TarefaAR = require("../model/TarefaAR");
import {ITarefa} from "../model/ITarefa";

@Controller()
export class Tarefa {
	@Get()
	get(req: server.Request, res: server.Response): void {
		TarefaAR.findAll().then(function(dta: ITarefa[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Get("/getbyidbloco/:id")
	getByIdBloco(req: server.Request, res: server.Response): void {
		TarefaAR.findAll({
			where:[
			{'id_bloco':req.params.id}
			]
		}).then(function(dta: ITarefa[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var ntarefa: ITarefa = <ITarefa>req.body;
		TarefaAR.create(ntarefa).then(function(p_ntarefa: ITarefa) {
			res.json(p_ntarefa);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var ntarefa: ITarefa = <ITarefa>req.body;
		TarefaAR.upsert(ntarefa).then(function() {
			res.json(ntarefa);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		TarefaAR.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_ntarefa: ITarefa) {
			res.send(true);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}

}
