import server = require('restify');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import TabelaCampoDAO = require("../model/tabelacampo");
import {ITabelaCampo} from "../model/ITabelaCampo";

@Controller()
export class TabelaCampo {
	@Get()
	get(req: server.Request, res: server.Response): void {
		TabelaCampoDAO.findAll().then(function(dta: ITabelaCampo[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}

	@Get("/getbyidtabela/:_id")
	getByIdTabelaService(req: server.Request, res: server.Response): void {
		this.getByIdTabela(req.params._id).then(function(dta: ITabelaCampo[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}

	getByIdTabela(p_idTabela: number) {
		return TabelaCampoDAO.findAll({
			where: {
				idTabela: p_idTabela
			}
		});
	}

	@Post()
	add(req: server.Request, res: server.Response): void {
		var ntabelacampo: ITabelaCampo = <ITabelaCampo>req.body;
		//console.log(ntabelacampo);
		TabelaCampoDAO.create(ntabelacampo).then(function(p_ntabelacampo: ITabelaCampo) {
			res.json(p_ntabelacampo);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Put()
	atualizar(req: server.Request, res: server.Response): void {
		var ntabelacampo: ITabelaCampo = <ITabelaCampo>req.body;
		TabelaCampoDAO.upsert(ntabelacampo).then(function() {
			res.json(ntabelacampo);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	@Delete("/:_id")
	delete(req: server.Request, res: server.Response): void {
		TabelaCampoDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function(p_ntabelacampo: ITabelaCampo) {
			res.json(p_ntabelacampo);
		}).catch(function(err: any) {
			res.status(400);
			res.json(err);
		});
	}
	deleteByIdTabela(p_idTabela:number) {
		return TabelaCampoDAO.destroy({
			where: {
				idTabela: p_idTabela
			}
		});
	}
}
