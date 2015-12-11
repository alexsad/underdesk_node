import server = require('restify');
import velocity = require('velocity');
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

	@Post("/gerarbytp/")
	gerarByTp(req: server.Request, res: server.Response): void {
		var tmpTabelas: ITabela[] = <ITabela[]>req.body;
		var tmpTabCtrl: Tabela = new Tabela();
		var ctotal: number = 0;

		//console.log(req.query.tp);
		tmpTabelas.forEach(function(tmpItemTab:ITabela){
				ctotal++;
				var output:string = './bin/I';



				var engine = new velocity.Engine({
					template: './app/br/underdesk/gerador/resource/template/' + req.query.tp + '.vm'
					, output: './bin/I' + (<any>tmpItemTab.dsTabela).toCamelCase().toCapitalCase()+ '.ts'
				});
				var rst: string = engine.render({
					classe: tmpItemTab
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
