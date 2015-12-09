import {ModWindow} from "../../../../lib/underas/container";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {TextInput, Select, CheckBox, NumericStepper, ListView, ItemView, Button} from "../../../../lib/underas/controller";
import {ITabelaCampo} from "../model/ITabelaCampo";


@ItemView("assets/html/tabelacampo.html")
export class TabelaCampo extends ModWindow{
    itIdTabelaCampo:TextInput;
    itIdTabela:TextInput;
    itCampo:TextInput;
    itDsCampo:TextInput;
    itTipo:Select;
    itLimite:NumericStepper;
    itSnNull:CheckBox;
    mainList:ListView;
    mainTb:ToolBar;
    constructor(){
        super("campos da tabela");
        this.setRevision("$Revision$");
        this.setSize(5);

        this.mainTb = new ToolBar({"domain":"tabelacampo"});
        this.append(this.mainTb);

        this.itIdTabelaCampo = new TextInput("");
        this.itIdTabelaCampo.setColumn("$id");
        this.itIdTabelaCampo.setLabel("cod.");
        this.itIdTabelaCampo.setSize(6);
        this.itIdTabelaCampo.setEnable(false);
        this.append(this.itIdTabelaCampo);

        this.itIdTabela = new TextInput("");
        this.itIdTabela.setColumn("!idTabela");
        this.itIdTabela.setLabel("cod tab.");
        this.itIdTabela.setSize(6);
        this.itIdTabela.setEnable(false);
        this.append(this.itIdTabela);

        this.itCampo = new TextInput("");
        this.itCampo.setColumn("@campo");
        this.itCampo.setLabel("campo");
        this.itCampo.setSize(12);
        this.append(this.itCampo);

        this.itDsCampo = new TextInput("");
        this.itDsCampo.setColumn("@dsCampo");
        this.itDsCampo.setLabel("descricao do campo");
        this.itDsCampo.setSize(12);
        this.append(this.itDsCampo);

        this.itTipo = new Select("tipo_campo");
        this.itTipo.setColumn("@tipo");
        this.itTipo.setLabel("tipo do campo");
        this.itTipo.setSize(12);
        this.itTipo.setValueField("idTpCampo");
        this.itTipo.setLabelField("dsTpCampo");
        this.append(this.itTipo);

        this.itLimite = new NumericStepper(1);
        this.itLimite.setColumn("@limite");
        this.itLimite.setLabel("tamanho");
        this.itLimite.setSize(6);
        this.append(this.itLimite);

        this.itSnNull = new CheckBox("campo nulo?", "sim");
        this.itSnNull.setColumn("@snNull");
        this.itSnNull.setLabel("campo nulo?");
        this.itSnNull.setSize(6);
        this.itSnNull.setUnCheckedValue("N");
        this.itSnNull.setCheckedValue("S");
        this.append(this.itSnNull);

        this.mainList = new ListView("campos");
        this.append(this.mainList);
    }
    onStart():void{
        this.itTipo.setDataProvider([
         {"idTpCampo":"int","dsTpCampo":"inteiro"}
         ,{"idTpCampo":"varchar","dsTpCampo":"texto"}
         ,{"idTpCampo":"date","dsTpCampo":"data"}
         ,{"idTpCampo":"real","dsTpCampo":"flutuante"}
         ,{"idTpCampo":"decimal","dsTpCampo":"decimal"}
        ]);

    }
    getByIdTabela(p_idTabela: number): void {
        this.itIdTabela.setValue(p_idTabela+"");
        RequestManager.addRequest({
            "url": "tabelacampo/getbyidtabela/"+p_idTabela
            ,"onLoad": function(dta: ITabelaCampo[]) {
                this.getMainList().setDataProvider(dta);
            }.bind(this)
        });
    }
}
