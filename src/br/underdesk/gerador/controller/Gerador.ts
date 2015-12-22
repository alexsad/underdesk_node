import server = require('restify');
import velocity = require('velocity');
import fs = require('fs');
import {Get, Post, Put, Delete, Controller} from "../../../../lib/router/router";
import {ITabela} from "../../tabela/model/ITabela";
import {ITabelaCampo} from "../../tabela/model/ITabelaCampo";
import {TabelaCampo} from "../../tabela/controller/TabelaCampo";
import {Tabela} from "../../tabela/controller/Tabela";



@Controller()
export class Gerador {
	@Get("test")
	getTest(req: server.Request, res: server.Response): void {
		//velocity.en
		var Engine = velocity.Engine;
		//var t = new Engine("");

		var engine = new Engine({
			template: './app/br/underdesk/gerador/resource/template/teste1.vm'
			, output: './teste_save1.txt'
		});

		var rst:string = engine.render({ nome: "paloma" });

		res.send(rst);

	}

	@Get("/ops")
	getTest2(req: server.Request, res: server.Response):void{
		res.json({
			nome:req.query.nome.toCapitalCase()
			,sobrenome:req.query.sobrenome.toCamelCase()
		});
	}

	@Post("/gerarbytp")
	gerarByTp(req: server.Request, res: server.Response): void {
		var tmpTabelas: ITabela[] = <ITabela[]>req.body;
		var tmpTabCtrl: Tabela = new Tabela();
		var ctotal: number = 0;
		var outPutDir: string = './bin/';

		if (!fs.existsSync(outPutDir)) {
			fs.mkdirSync(outPutDir);
		}

		//console.log(req.query.tp);
		tmpTabelas.forEach(function(tmpItemTab:ITabela){
				ctotal++;
				var output_orig: string = outPutDir;
				output_orig += tmpItemTab.dsTabela;

				var nomeArquivo_orig: string = (<any>tmpItemTab.dsTabela).toCamelCase().toCapitalCase();
				


				if (!fs.existsSync(output_orig)) {
					fs.mkdirSync(output_orig);
					fs.mkdirSync(output_orig + "/model");
					fs.mkdirSync(output_orig + "/controller");
					fs.mkdirSync(output_orig + "/view");
					fs.mkdirSync(output_orig + "/view/assets");
					fs.mkdirSync(output_orig + "/view/assets/html");
				};


				tmpItemTab.exportsto.forEach(function(typeexp:string){
					var tpEscolhido: string = typeexp.substring(0, typeexp.indexOf("@"));
					var output: string = output_orig;
					var nomeArquivo:string = nomeArquivo_orig;
					if (tpEscolhido == "TYPESCRIPT_NODE_SCHEMA_SEQUELIZE") {
						output += "/model/";
						nomeArquivo += "AR.ts";
					} else if (tpEscolhido == "TYPESCRIPT_NODE_INTERFACE") {
						output += "/model/";
						nomeArquivo = "I"+nomeArquivo+".ts"
					} else if (tpEscolhido == "TYPESCRIPT_NODE_BLL") {
						output += "/controller/";
						nomeArquivo += ".ts";
					} else if (tpEscolhido == "TYPESCRIPT_VIEW") {
						output += "/view/";
						nomeArquivo += ".ts";
					} else if (tpEscolhido == "HTML_ITEMVIEW") {
						output += "/view/assets/html/";
						nomeArquivo = (<any>nomeArquivo).toCamelCase().toLowerCase();
						nomeArquivo += ".html";
					}
					//console.log(tpEscolhido);
					var engine = new velocity.Engine({
						template: './app/br/underdesk/gerador/resource/template/' + tpEscolhido + '.vm'
						, output: output + nomeArquivo
					});
					var rst: string = engine.render({
						classe: tmpItemTab
					});
				});

				if (ctotal == tmpTabelas.length) {
					res.json(tmpTabelas);
				};
		});
	}

	@Post()
	get(req: server.Request, res: server.Response): void {

		var tmpTabela: ITabela[] = <ITabela[]>req.body;

		var tmpTabCampCtrl: TabelaCampo = new TabelaCampo();

		var ctotal: number = 0;

		tmpTabela.forEach(function(tmpItemTab:ITabela){
			tmpTabCampCtrl.getByIdTabela(tmpItemTab.id).then(function(dta: ITabelaCampo[]) {
				tmpItemTab.campo = dta;
				ctotal++;
				if (ctotal == tmpTabela.length) {
					var engine = new velocity.Engine({
						template: './app/br/underdesk/gerador/resource/template/UML.vm'
						, output: './teste_uml.violet.html'
					});
					var rst: string = engine.render({
						classes: tmpTabela
					});
					res.send(tmpTabela);
				}
			}).catch(function(err: any) {
				res.status(400).json(err);
			});
		});
	}
}
