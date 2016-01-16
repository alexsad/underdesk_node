import {ITarefa} from "../model/ITarefa";
import {ModWindow} from "lib/underas/container";
import {ItemView,TextArea, TextInput, Select, NumericStepper, ListView} from "lib/underas/controller";
import {ToolBar, RequestManager} from "lib/underas/net";

@ItemView("assets/html/tarefa.html")
export class Tarefa extends ModWindow {
	itIdTarefa: TextInput;
	itIdBloco: Select;
	itTitulo: TextInput;
	itDescricao: TextArea;
	itIdResponsavel: Select;
	itOrdem: NumericStepper;
	mainTb: ToolBar;
	mainList: ListView;
	constructor() {
		super("Tarefa");
		this.setRevision("$Revision: 2 $");
		this.setSize(8);

		this.mainTb = new ToolBar({ "domain": "tarefa" });
		this.append(this.mainTb);

		this.itIdTarefa = new TextInput("");
		this.itIdTarefa.setColumn("$id");
		this.itIdTarefa.setLabel("cod.");
		this.itIdTarefa.setEnable(false);
		this.itIdTarefa.setSize(2);
		this.append(this.itIdTarefa);

		this.itTitulo = new TextInput("");
		this.itTitulo.setColumn("@titulo");
		this.itTitulo.setLabel("titulo");
		this.itTitulo.setSize(7);
		this.append(this.itTitulo);

		this.itOrdem = new NumericStepper();
		this.itOrdem.setColumn("@ordem");
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setSize(3);
		this.append(this.itOrdem);

		this.itDescricao = new TextArea("");
		this.itDescricao.setColumn("@descricao");
		this.itDescricao.setLabel("descricao");
		this.itDescricao.setSize(12);
		this.append(this.itDescricao);


		this.itIdBloco = new Select("bloco");
		this.itIdBloco.setLabel("bloco");
		this.itIdBloco.setColumn("@idBloco");
		this.itIdBloco.setSize(6);
		this.itIdBloco.setValueField("id");
		this.itIdBloco.setLabelField("titulo");
		this.append(this.itIdBloco);

		this.itIdResponsavel = new Select("responsavel");
		this.itIdResponsavel.setLabel("responsavel");
		this.itIdResponsavel.setColumn("@idResponsavel");
		this.itIdResponsavel.setSize(6);
		this.itIdResponsavel.setValueField("id");
		this.itIdResponsavel.setLabelField("login");
		this.append(this.itIdResponsavel);

		this.mainList = new ListView("Tarefa");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart():void{
		this.itIdBloco.fromService({
			url:"bloco"
		});
		this.itIdResponsavel.fromService({
			url:"usuario"
		});
		//this.mainTb.reloadItens();
	}
	getByIdBloco(p_idBloco:number):void{
		this.itIdBloco.setValue("" + p_idBloco);
		RequestManager.addRequest({
			url: "tarefa/getbyidbloco/" + p_idBloco
			,onLoad:function(dta:ITarefa[]):void{
				this.mainList.setDataProvider(dta);
			}.bind(this)
		});
	}
}
