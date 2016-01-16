import {IBloco} from "../model/IBloco";
import {ModWindow} from "lib/underas/container";
import {ItemView, TextInput, NumericStepper, ListView} from "lib/underas/controller";
import {ToolBar} from "lib/underas/net";
import {Tarefa} from "./Tarefa";


@ItemView("assets/html/bloco.html")
export class Bloco extends ModWindow {
	itIdBloco: TextInput;
	itTitulo: TextInput;
	itOrdem: NumericStepper;
	mainTb: ToolBar;
	mainList: ListView;
	_modTasks: Tarefa;
	constructor() {
		super("Bloco");
		this.setRevision("$Revision: 2 $");
		this.setSize(4);

		this.mainTb = new ToolBar({ "domain": "bloco" });
		this.append(this.mainTb);

		this.itIdBloco = new TextInput("");
		this.itIdBloco.setColumn("$id");
		this.itIdBloco.setLabel("cod.");
		this.itIdBloco.setEnable(false);
		this.itIdBloco.setSize(2);
		this.append(this.itIdBloco);

		this.itTitulo = new TextInput("");
		this.itTitulo.setColumn("@titulo");
		this.itTitulo.setLabel("bloco");
		this.itTitulo.setSize(6);
		this.append(this.itTitulo);

		this.itOrdem = new NumericStepper();
		this.itOrdem.setColumn("@ordem");
		this.itOrdem.setLabel("ordem");
		this.itOrdem.setSize(4);
		this.append(this.itOrdem);

		this.mainList = new ListView("Bloco");
		//this.setMainList("mainList");
		this.append(this.mainList);
	}
	onStart(): void {
		this._modTasks = new Tarefa();
		this.getModView().append(this._modTasks);
		this.mainTb.reloadItens();
		//this._modTasks.mainTb.reloadItens();
	}
	onChangeItem(p_obj:IBloco):IBloco{
		this._modTasks.getByIdBloco(p_obj.id);
		return p_obj;
	}

}
