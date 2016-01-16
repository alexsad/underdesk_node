import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import BlocoAR = require("../model/BlocoAR");
import {IBloco} from "../model/IBloco";

@Controller()
export class Bloco {
	@Get()
	get(req: server.Request, res: server.Response): void {
		BlocoAR.findAll().then(function(dta: IBloco[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Post()
	add(req: server.Request, res: server.Response): void {
		var nbloco: IBloco = <IBloco>req.body;
		BlocoAR.create(nbloco).then(function(p_nbloco: IBloco) {
			res.json(p_nbloco);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var nbloco: IBloco = <IBloco>req.body;
		BlocoAR.upsert(nbloco).then(function() {
			res.json(nbloco);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:id")
	delete(req: server.Request, res: server.Response): void {
		BlocoAR.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(p_nbloco: IBloco) {
			res.send(true);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}

}
