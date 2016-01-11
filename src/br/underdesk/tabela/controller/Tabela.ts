import server = require('restify');
import {Get,Post,Put,Delete,Controller} from "../../../../lib/router/router";
import TabelaDAO = require("../model/tabela");
import TabelaCampoDAO = require("../model/tabelacampo");
import {ITabela} from "../model/ITabela";
import {TabelaCampo} from "./TabelaCampo";
import {ITabelaCampo} from "../model/ITabelaCampo";

@Controller()
export class Tabela{
		@Get()
		get(req:server.Request,res:server.Response):void{
			TabelaDAO.findAll().then(function(dta:ITabela[]) {
				res.json(dta);
			}).catch(function(err:any) {
				res.status(400);
				res.json(err);
			});
		}

		@Get("/getbyidprojeto/:idprojeto")
		getByIdProjeto(req: server.Request, res: server.Response): void {
			TabelaDAO.findAll({
                include: [{
					all: true
					, nested: true
					, model: TabelaCampoDAO
					, required: false
				}]
				,where: [{"id_projeto":req.params.idprojeto}]
				//, order: [[{ model: TabelaCampoDAO, as: 'TabelaCampo' }, 'ordem']]
			}).then(function(dta: ITabela[]) {
				res.json(dta);
			}).catch(function(err: any) {
				res.status(400);
				res.json(err);
			});
		}

		@Get("/:idtabela")
		getByIdTabelaService(req: server.Request, res: server.Response): void {
			this.getByIdTabela(req.params.idtabela).then(function(dta: ITabela[]) {
				res.json(dta);
			}).catch(function(err: any) {
				res.status(400);
				res.json(err);
			});
		}

		getByIdTabela(idTabela:number){
			return TabelaDAO.findAll({
				include: [{
					all: true
					, nested: false
					, model: TabelaCampoDAO
					, required: true
				}]
				, where: {
					idTabela: idTabela
				}
			});
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
				res.status(400);
				res.json(err);
			});
		}
		@Put()
		atualizar(req:server.Request,res:server.Response):void{
			var ntabela: ITabela = <ITabela>req.body;
			TabelaDAO.upsert(ntabela).then(function() {
				res.send(ntabela);
			}).catch(function(err:any) {
				res.status(400);
				res.json(err);
			});
		}
       
        @Delete("/:_id")
		deleteService2(req:server.Request,res:server.Response):void{            
            TabelaDAO.destroy({
                where: {
					id:req.params._id
				}
            }).then(function(){
                res.send(true);
            }).catch(function(err:any) {
				res.status(400);
				res.json(err);
			});
		}
        
        deleteById(idtabela:number,handlerSuccess:(rt:boolean)=>void,handlerError:(perro:any)=>void){
            return TabelaDAO.destroy({
				where: {
					id:idtabela
				}
			}).then(function() {
				var tmpTabelaCampoDBL: TabelaCampo = new TabelaCampo();
				tmpTabelaCampoDBL.deleteByIdTabela(idtabela).then(function() {					
                    handlerSuccess(true);
				}).catch(function(err: any) {
                    handlerError(err);
				});
			}).catch(function(err:any) {
				handlerError(err);
			});
        }
        
         deleteByIdProjeto(idprojeto:number,handlerSuccess:(rt:boolean)=>void,handlerError:(perro:any)=>void):void{
            var tmpTabelaCampoDBL: TabelaCampo = new TabelaCampo();           
            TabelaDAO.findAll({
                where:[{"id_projeto":idprojeto}]
			}).then(function(dta:ITabela[]) {
				var totalReg:number = dta.length;
                dta.forEach(function(ittabela:ITabela){
                    tmpTabelaCampoDBL.deleteByIdTabela(ittabela.id).then(function() {					
                        totalReg--;
                        if(totalReg==0){
                            TabelaDAO.destroy({
                                where: {
                                    'id_projeto':idprojeto
                                }
                            }).then(function() {				                
                                handlerSuccess(true);
                            }).catch(function(err:any) {
                                handlerError(err);
                            });
                        }                        
                    }).catch(function(err: any) {
                        handlerError(err);
                    });
                });               
			}).catch(function(err:any) {
				handlerError(err);
			});
        }
}
