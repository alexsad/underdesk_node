import {ModWindow} from "lib/underas/container";
import {ToolBar, RequestManager,IDefaultRequest} from "lib/underas/net";
import {TextInput,ListView,ItemView,TextArea,Button} from "lib/underas/controller";
import {IProjeto} from "../model/IProjeto";
import {Tabela} from "../../tabela/view/Tabela";
import {UploadProject} from "./UploadProject";

@ItemView("assets/html/projeto.html")
export class Projeto extends ModWindow {
    itId: TextInput;
    itDsProjeto: TextInput;
    itVersao: TextInput;
    itDetalhes: TextArea;
    btImportar:Button;
    btExportar:Button;
    mainList: ListView;
    mainTb: ToolBar;
    _modTabela: Tabela;
    _uploadProject:UploadProject;
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
        
        this.btImportar = new Button("importar projeto");
        this.btImportar.setIcon("cloud-upload");            
        this.btImportar.addEvent("click",this.showImport.bind(this));
        this.append(this.btImportar);
        
        this.btExportar = new Button("baixar projeto");
        this.btExportar.setIcon("cloud-download");            
        this.btExportar.addEvent("click",this.exportProject.bind(this));
        this.append(this.btExportar);

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
    showImport(evt:Event):void{
        evt.preventDefault();
        if(!this._uploadProject){
            this._uploadProject = new UploadProject();
            $("body").append(this._uploadProject.getEle());
        };
        this._uploadProject.show(true);
    }
    exportProject():void{
        console.log(this._modTabela.mainList.getDataProvider());
    }
}
