import server = require('restify');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TabelaDAO = require("../model/tabela");
import {ITabela} from "../model/ITabela";
import {TabelaCampo} from "./TabelaCampo";
import {ITabelaCampo} from "../model/ITabelaCampo";

@Controller()
export class Tabela{
	  _id:number;

		constructor(){
			this._id = 1;
		}

		@Get()
		get(req:server.Request,res:server.Response):void{
			TabelaDAO.findAll().then(function(dta:ITabela[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Get("/teste")
		getTest(req:server.Request,res:server.Response):void{
			this._id++;
			res.json({id:11,_id:this._id,sum:this.getMyIdSum(this._id*3)});
		}

		getMyIdSum(p_time:number):number{
			return this._id*p_time;
		}

		@Post()
		add(req:server.Request,res:server.Response):void{
			var ntabela:ITabela = <ITabela>req.body;
			//console.log(ntabela);
			ntabela.dominio = ntabela.dominio.toLowerCase();
			ntabela.dsTabela = ntabela.dsTabela.toLowerCase();
			ntabela.pacote = ntabela.pacote.toLowerCase();
			TabelaDAO.create(ntabela).then(function(p_ntabela: ITabela) {
				res.json(p_ntabela);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Put()
		atualizar(req:server.Request,res:server.Response):void{
			var ntabela: ITabela = <ITabela>req.body;
			TabelaDAO.upsert(ntabela).then(function(p_ntabela: ITabela) {
				res.send(p_ntabela);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}
		@Delete("/:_id")
		delete(req:server.Request,res:server.Response):void{
			TabelaDAO.destroy({
				where: {
					id:req.params._id
				}
			}).then(function(p_ntabela: ITabela) {
				var tmpTabelaCampoDBL: TabelaCampo = new TabelaCampo();
				tmpTabelaCampoDBL.deleteByIdTabela(req.params._id).then(function(p_ntabelacampo: ITabelaCampo) {
					res.send(p_ntabelacampo);
				}).catch(function(err: any) {
					res.status(400).json(err);
				});
				//res.send(true);
			}).catch(function(err:any) {
				res.status(400).json(err);
			});
		}

}
