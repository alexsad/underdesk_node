import express = require('express');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TabelaDAO = require("../model/tabela");
import {ITabela} from "../model/ITabela";
import {TabelaCampo} from "./TabelaCampo";
import {ITabelaCampo} from "../model/ITabelaCampo";

@Controller()
export class Tabela{
		@Get()
		get(req:express.Request,res:express.Response):void{
			TabelaDAO.findAll().then(function(dta:ITabela[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Post()
		add(req:express.Request,res:express.Response):void{
			var ntabela:ITabela = <ITabela>req.body;
			//console.log(ntabela);
			ntabela.dominio = ntabela.dominio.toLowerCase();
			ntabela.dsTabela = ntabela.dsTabela.toLowerCase();
			ntabela.pacote = ntabela.pacote.toLowerCase();
			TabelaDAO.create(ntabela).then(function(p_ntabela: ITabela) {
				res.json(p_ntabela.id);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Put()
		atualizar(req:express.Request,res:express.Response):void{
			var ntabela: ITabela = <ITabela>req.body;
			TabelaDAO.upsert(ntabela).then(function(p_ntabela: ITabela) {
				res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Delete("/:_id")
		delete(req:express.Request,res:express.Response):void{
			TabelaDAO.destroy({
				where: {
					id:req.params._id
				}
			}).then(function(p_ntabela: ITabela) {
				var tmpTabelaCampoDBL: TabelaCampo = new TabelaCampo();
				tmpTabelaCampoDBL.deleteByIdTabela(req.params._id).then(function(p_ntabelacampo: ITabelaCampo) {
					res.send(true);
				}).catch(function(err: any) {
					res.status(400).json(err);
				});
				//res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}

}
