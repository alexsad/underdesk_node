import express = require('express');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import TabelaCampoDAO = require("../model/tabelacampo");
import {ITabelaCampo} from "../model/ITabelaCampo";

@Controller()
export class TabelaCampo {
	@Get()
	get(req: express.Request, res: express.Response): void {
		TabelaCampoDAO.findAll().then(function(dta: ITabelaCampo[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400).json(err);
		});
	}

	@Get("/getbyidtabela/:_id")
	getByIdTabelaService(req: express.Request, res: express.Response): void {
		TabelaCampoDAO.findAll({
			where:{
				idTabela: req.params._id
			}
		}).then(function(dta: ITabelaCampo[]) {
			res.json(dta);
		}).catch(function(err: any) {
			res.status(400).json(err);
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
	add(req: express.Request, res: express.Response): void {
		var ntabelacampo: ITabelaCampo = <ITabelaCampo>req.body;
		//console.log(ntabelacampo);
		TabelaCampoDAO.create(ntabelacampo).then(function(p_ntabelacampo: ITabelaCampo) {
			res.json(p_ntabelacampo.id);
		}).catch(function(err: any) {
			res.status(400).json(err);
		});
	}
	@Put()
	atualizar(req: express.Request, res: express.Response): void {
		var ntabelacampo: ITabelaCampo = <ITabelaCampo>req.body;
		TabelaCampoDAO.upsert(ntabelacampo).then(function(p_ntabelacampo: ITabelaCampo) {
			res.send(true);
		}).catch(function(err: any) {
			res.status(400).json(err);
		});
	}
	@Delete("/:_id")
	delete(req: express.Request, res: express.Response): void {
		TabelaCampoDAO.destroy({
			where: {
				id: req.params._id
			}
		}).then(function(p_ntabelacampo: ITabelaCampo) {
			res.send(true);
		}).catch(function(err: any) {
			res.status(400).json(err);
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
