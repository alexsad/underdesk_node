import {ModWindow} from "../../../../lib/underas/container";
import {ToolBar, RequestManager, IDefaultRequest} from "../../../../lib/underas/net";
import {InputText, Select, CheckBox, NumericStepper, ListView, ItemView, Button} from "../../../../lib/underas/controller";
import {ITabela} from "../model/ITabela";
import {ITabelaCampo} from "../model/ITabelaCampo";
import {TabelaCampo} from "./TabelaCampo";
///import {ArquivoView} from "../../arquivo/view/ArquivoView";


@ItemView("assets/html/tabela.html")
export class Tabela extends ModWindow{
    itidTabela:InputText;
    itdsTabela:InputText;
    itdominio:InputText;
    itPacote:InputText;
    itTipo:CheckBox;
    itTpGeracao:Select;
    itChavePrimaria:InputText;
    itSnModelJava:CheckBox;
    itSnDaoJava:CheckBox;
    itSnBLLJava:CheckBox;
    itSnViewTypeScript:CheckBox;
    itSnItemViewHtml:CheckBox;
    itSnTypeScriptNodeSchema:CheckBox;
    itSnTypeScriptNodeBLL:CheckBox;
    itSnTypeScriptNodeInterface:CheckBox;
    itSnGerarApenasSelecionada:CheckBox;
    itSnUML:CheckBox;
    //itSnNodeRouteJs:CheckBox;
    //itrs:null;
    btGerarCodigo:Button;
    btImportarCodigo:Button;
    mainList:ListView;
    mainTb:ToolBar;
    _modTabelaCampo:TabelaCampo;
    //_modArquivoView:ArquivoView;
    constructor(){
        super("*Geracao de Codigo");
        this.setRevision("$Revision$");
        this.setSize(7);

        this.mainTb = new ToolBar({"domain":"tabela"});
        this.append(this.mainTb);

        this.itidTabela = new InputText("");
        this.itidTabela.setLabel("cod.");
        this.itidTabela.setColumn("$id");
        this.itidTabela.setSize(2);
        this.itidTabela.setEnable(false);
        this.append(this.itidTabela);

        this.itdsTabela = new InputText("");
        this.itdsTabela.setLabel("tabela");
        this.itdsTabela.setColumn("@dsTabela");
        this.itdsTabela.setSize(4);
        this.append(this.itdsTabela);

        this.itdominio = new InputText("");
        this.itdominio.setLabel("dominio");
        this.itdominio.setColumn("@dominio");
        this.itdominio.setSize(6);
        this.append(this.itdominio);

        this.itPacote = new InputText("");
        this.itPacote.setLabel("pacote");
        this.itPacote.setColumn("@pacote");
        this.itPacote.setSize(7);
        this.append(this.itPacote);

        this.itChavePrimaria = new InputText("");
        this.itChavePrimaria.setLabel("chave primaria");
        this.itChavePrimaria.setColumn("@chavePrimaria");
        this.itChavePrimaria.setSize(5);
        this.append(this.itChavePrimaria);

        this.itTipo = new CheckBox("view?", "sim");
        this.itTipo.setLabel("view?");
        this.itTipo.setColumn("@tipo");
        this.itTipo.setUnCheckedValue("table");
        this.itTipo.setCheckedValue("view");
        this.itTipo.setSize(6);
        this.append(this.itTipo);

        this.itTpGeracao = new Select("tipo_geracao");
        this.itTpGeracao.setLabel("tipo de geracao");
        this.itTpGeracao.setColumn("@tpGeracao");
        this.itTpGeracao.setSize(6);
        this.itTpGeracao.setValueField("idTpGeracao");
        this.itTpGeracao.setLabelField("dsTpGeracao");
        this.append(this.itTpGeracao);

        this.itSnGerarApenasSelecionada = new CheckBox("Gerar Apenas da Tabelas Selecionada?", "Sim");
        this.itSnGerarApenasSelecionada.setEnable(true);
        this.itSnGerarApenasSelecionada.setSize(12);
        this.itSnGerarApenasSelecionada.setCheckedValue("S");
        this.itSnGerarApenasSelecionada.setUnCheckedValue("N");
        this.append(this.itSnGerarApenasSelecionada);


        this.itSnUML = new CheckBox("Gerar Diagrama de Classe?", "Sim");
        this.itSnUML.setEnable(true);
        this.itSnUML.setSize(12);
        this.itSnUML.setCheckedValue("UML@html");
        this.itSnUML.setUnCheckedValue("");
        this.append(this.itSnUML);


        this.itSnModelJava = new CheckBox("Model java:", "Sim");
        this.itSnModelJava.setEnable(false);
        this.itSnModelJava.setSize(4);
        this.itSnModelJava.setCheckedValue("JAVA@java");
        this.itSnModelJava.setUnCheckedValue("");
        this.append(this.itSnModelJava);

        this.itSnDaoJava = new CheckBox("DAO java:", "Sim");
        this.itSnDaoJava.setEnable(false);
        this.itSnDaoJava.setSize(4);
        this.itSnDaoJava.setCheckedValue("DAO@java");
        this.itSnDaoJava.setUnCheckedValue("");
        this.append(this.itSnDaoJava);

        this.itSnBLLJava = new CheckBox("BLL java:", "Sim");
        this.itSnBLLJava.setEnable(false);
        this.itSnBLLJava.setSize(4);
        this.itSnBLLJava.setCheckedValue("BLL@java");
        this.itSnBLLJava.setUnCheckedValue("");
        this.append(this.itSnBLLJava);

        this.itSnViewTypeScript = new CheckBox("Visual com TScript:", "Sim");
        this.itSnViewTypeScript.setEnable(false);
        this.itSnViewTypeScript.setSize(7);
        this.itSnViewTypeScript.setCheckedValue("TYPESCRIPT_VIEW@ts");
        this.itSnViewTypeScript.setUnCheckedValue("");
        this.append(this.itSnViewTypeScript);

        this.itSnItemViewHtml = new CheckBox("Item View HTML:", "Sim");
        this.itSnItemViewHtml.setEnable(false);
        this.itSnItemViewHtml.setSize(5);
        this.itSnItemViewHtml.setCheckedValue("HTML_ITEMVIEW@html");
        this.itSnItemViewHtml.setUnCheckedValue("");
        this.append(this.itSnItemViewHtml);


        this.itSnTypeScriptNodeInterface = new CheckBox("TScript Interface:", "Sim");
        this.itSnTypeScriptNodeInterface.setEnable(false);
        this.itSnTypeScriptNodeInterface.setSize(4);
        this.itSnTypeScriptNodeInterface.setCheckedValue("TYPESCRIPT_NODE_INTERFACE@ts");
        this.itSnTypeScriptNodeInterface.setUnCheckedValue("");
        this.append(this.itSnTypeScriptNodeInterface);


        this.itSnTypeScriptNodeSchema = new CheckBox("TScript Schema:", "Sim");
        this.itSnTypeScriptNodeSchema.setEnable(false);
        this.itSnTypeScriptNodeSchema.setSize(4);
        this.itSnTypeScriptNodeSchema.setCheckedValue("TYPESCRIPT_NODE_SCHEMA@ts");
        this.itSnTypeScriptNodeSchema.setUnCheckedValue("");
        this.append(this.itSnTypeScriptNodeSchema);

        this.itSnTypeScriptNodeBLL = new CheckBox("TScript BLL:", "Sim");
        this.itSnTypeScriptNodeBLL.setEnable(false);
        this.itSnTypeScriptNodeBLL.setSize(4);
        this.itSnTypeScriptNodeBLL.setCheckedValue("TYPESCRIPT_NODE_BLL@ts");
        this.itSnTypeScriptNodeBLL.setUnCheckedValue("");
        this.append(this.itSnTypeScriptNodeBLL);



        /*
        this.itrs = new TextArea("");
        this.itrs.setLabel("resultado:");
        this.itrs.setSize(12);
        this.itrs.getEle("textarea").setStyles({"background-color":"#272822","color":"#AAA55F","height":"220px"});
         */
        this.mainList = new ListView("tabelas");
        this.append(this.mainList);


        this.btGerarCodigo = new Button("Gerar");
        this.btGerarCodigo.setIcon("check");
        this.btGerarCodigo.addEvent('click',this.gerarCodigo.bind(this));
        this.mainTb.addButton(this.btGerarCodigo);

        this.btImportarCodigo = new Button("Importar");
        this.btImportarCodigo.setIcon("cloud-download");
        this.btImportarCodigo.addEvent('click',this.importar.bind(this));
        this.mainTb.addButton(this.btImportarCodigo);




        //this.addAssociation({"mod":"br.net.underdesk.codigogerador.view.TabelaCampo","act":"getCampos","puid":this.getVarModule()});

        //this._modArquivoView = p_arquivoview;
    }
    onStart():void{
        this.itTpGeracao.setDataProvider([
          {"idTpGeracao":"increment","dsTpGeracao":"incrementavel"}
          ,{"idTpGeracao":"unsigned","dsTpGeracao":"fornecida"}
          ]);
        this._modTabelaCampo = new TabelaCampo();
        this.getModView().append(this._modTabelaCampo);
        this.mainTb.reloadItens();

    }
    onChangeItem(p_obj:ITabela):ITabela{
        this._modTabelaCampo.getByIdTabela(p_obj.id);
        return p_obj;
    }
    gerarCodigoSingle():void{

        //this.importar();

        /*

        RequestManager.addRequest({
                "method":"post"
                ,"url":"ws/codigogerador/tabela/gerarcodigo"
                ,"data":{
                    "idTabela":this.itidTabela.getValue()
                    //,"tpTemplate":this.ittipoTemplate.getValue()
                }
                ,"onLoad":function(dta:string[]){
                    //this.itrs.setValue(dta);

                    this._modArquivoView.addArquivo({
                        tmArquivo:100
                        ,dsArquivo:dta[0]
                        ,snPasta:'S'
                        ,icone:'folder-close'
                    });
                    this._modArquivoView.addArquivo({
                        tmArquivo:100
                        ,dsArquivo:dta[0]+".zip"
                        ,snPasta:'N'
                        ,icone:'compressed'
                    });

                    this._modArquivoView.reload();
                }.bind(this)
        });
        */
    }
    importar(evt?:Event):void{
        if(evt){
            evt.preventDefault();
        };
        RequestManager.addRequest({
            rootUrl:""
            , url: "http://hm9.no-ip.biz:8330/tabela"
            ,onLoad:function(dta1:ITabela[]){


                dta1.forEach(function(itTabela:ITabela){
                    var tmpIdTabela: number = itTabela.id;

                    delete itTabela.id;

                    RequestManager.addRequest({
                        url: "tabela"
                        , method: "post"
                        , data: itTabela
                        ,onLoad: function(id_teste:number) {

                            console.log("adicionado tabela com id"+id_teste);

                            RequestManager.addRequest({
                                rootUrl: ""
                                , url: "http://hm9.no-ip.biz:8330/tabelacampo/getbyidtabela/" + tmpIdTabela
                                , onLoad: function(dta2: ITabelaCampo[]) {
                                    dta2.forEach(function(itTabelaCampo:ITabelaCampo){
                                        itTabelaCampo.idTabela = id_teste;
                                        delete itTabelaCampo.id;
                                        RequestManager.addRequest({
                                            url: "tabelacampo"
                                            , method: "post"
                                            , data: itTabelaCampo
                                            , onLoad: function(id_teste2: number) {
                                                console.log("adicionado tabela_campo com id" + id_teste2);
                                            }.bind(this)
                                        });
                                    });
                                }.bind(this)
                            });


                        }.bind(this)
                    });

                }.bind(this));



            }.bind(this)
        });
    }
    gerarCodigo(evt?:Event):void{
        if(evt){
            evt.preventDefault();
        };


        var selecteds:string[] = [];

        if(this.itSnModelJava.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnModelJava.getValue();
        };
        if(this.itSnDaoJava.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnDaoJava.getValue();
        };
        if(this.itSnBLLJava.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnBLLJava.getValue();
        };
        if(this.itSnViewTypeScript.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnViewTypeScript.getValue();
        };
        if(this.itSnTypeScriptNodeSchema.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnTypeScriptNodeSchema.getValue();
        };
        if(this.itSnTypeScriptNodeBLL.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnTypeScriptNodeBLL.getValue();
        };
        if(this.itSnItemViewHtml.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnItemViewHtml.getValue();
        };
        if(this.itSnTypeScriptNodeInterface.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnTypeScriptNodeInterface.getValue();
        };

        if(this.itSnUML.getValue()!=""){
            var tms:number = selecteds.length;
            selecteds[tms] = this.itSnUML.getValue();
        };

        //var itensList:ITabela[] = this.getMainList().getDataProvider();
        var itensList:ITabela[] = [];
        if(this.itSnGerarApenasSelecionada.getValue()=="S"){
           itensList[0] = <ITabela>this.mainList.getSelectedItem();
        }else{
           itensList = this.mainList.getDataProvider();
        };
        //itensList[0] = <ITabela>this.mainList.getSelectedItem();
        var tmLst:number = itensList.length;
        for(var x:number =0;x<tmLst;x++){
            itensList[x].exportsto = selecteds;
        };
        /*
        var tabSelection = Object.merge({
            "idTabela":tabela.itidTabela.getValue()
            ,"tpTemplate":tabela.ittipoTemplate.getValue()

            ,"exportsto":[tabela.ittipoTemplate.getValue()]
            },this.getMainList().getSelectedItem());

        var tabSelection2 = Object.merge({
            "idTabela":tabela.itidTabela.getValue()
            ,"tpTemplate":tabela.ittipoTemplate.getValue()
            ,"exportsto":[tabela.ittipoTemplate.getValue(),"JSMOOLTOOLS@js","NODE_BLL@js"]
            },this.getMainList().getSelectedItem());
        */


        RequestManager.addRequest({
                "data":itensList
                ,"method":"post"
                ,"url":"gerador"
                ,"onLoad":function(dta:ITabela[]){
                        //this.itrs.setValue(dta);
                    console.log("gerado com sucesso!");
                }.bind(this)
        });

    }
}
