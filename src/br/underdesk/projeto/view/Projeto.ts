import {ModWindow} from "lib/underas/container";
import {ToolBar, RequestManager,IDefaultRequest} from "lib/underas/net";
import {TextInput,ListView,ItemView,TextArea} from "lib/underas/controller";
import {IProjeto} from "../model/IProjeto";
import {Tabela} from "../../tabela/view/Tabela";

@ItemView("assets/html/projeto.html")
export class Projeto extends ModWindow {
    itId: TextInput;
    itDsProjeto: TextInput;
    itVersao: TextInput;
    itDetalhes: TextArea;
    mainList: ListView;
    mainTb: ToolBar;
    _modTabela: Tabela;
    constructor() {
        super("*Projetos");
        this.setRevision("$Revision$");
        this.setSize(3);

        this.mainTb = new ToolBar({ "domain": "projeto" });
        this.append(this.mainTb);

        this.itId = new TextInput("");
        this.itId.setLabel("cod.");
        this.itId.setColumn("$id");
        this.itId.setSize(2);
        this.itId.setEnable(false);
        this.append(this.itId);

        this.itDsProjeto = new TextInput("");
        this.itDsProjeto.setLabel("projeto");
        this.itDsProjeto.setColumn("@dsProjeto");
        this.itDsProjeto.setSize(6);
        this.append(this.itDsProjeto);

        this.itVersao = new TextInput("");
        this.itVersao.setLabel("versao");
        this.itVersao.setColumn("@versao");
        this.itVersao.setSize(4);
        this.append(this.itVersao);

        this.itDetalhes = new TextArea("");
        this.itDetalhes.setLabel("detalhes");
        this.itDetalhes.setColumn("@detalhes");
        this.itDetalhes.setSize(12);
        this.append(this.itDetalhes);       

        this.mainList = new ListView("tabelas");
        this.append(this.mainList);
    }
    onStart(): void {
        this._modTabela = new Tabela();
        this.getModView().append(this._modTabela);
        this.mainTb.reloadItens();
    }
    onChangeItem(p_obj: IProjeto): IProjeto{
        this._modTabela.getByIdProjeto(p_obj.id);
        return p_obj;
    }
}
