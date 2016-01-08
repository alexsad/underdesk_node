import {AlertWindow} from "lib/underas/container";
import {FileInput, AlertMsg,Button} from "lib/underas/controller";
import {RequestManager} from "lib/underas/net";

export class UploadProject extends AlertWindow{
	itFile: FileInput;
	btSubmit: Button;
	constructor(){
		super("Escolha um projeto para importar!","");
		this.itFile = new FileInput("Escolha um projeto!");
		this.itFile.setLabel("arquivo .json!");
		this.itFile.setName("fileProject");
		this.itFile.setSize(12);
		//this.append(this.itFile);
		this.itFile.addEvent('fileselect', this.readyToUpload.bind(this));
		this.append(this.itFile);

		this.btSubmit = new Button("enviar");
		this.btSubmit.setIcon("send");
		this.btSubmit.setEnable(false);
		this.btSubmit.addEvent('click', this.enviarProjectFile.bind(this));

		this.addButton(this.btSubmit);

		this.getEle("form").on("submit", function(event:Event) {
			event.stopPropagation();
		}).attr({ 
			"action": RequestManager.getRootUrl()  +"projeto/import"
			,"method":"post"
			,"enctype":"multipart/form-data"
			,"target":"itarget"
		});
	}
	enviarProjectFile():void{
		if(this.itFile.isValid()){
			this.getEle("form").trigger("submit");
			$("#itarget").on('load', function() { 
				this.getEle().trigger('avatarchanged',[]);
			}.bind(this));
		};		
	}
	readyToUpload(evt:Event, numFiles:number, label:string) {
		if($("#itarget").length == 0 ){
			$("#hiddenThings").append('<iframe name="itarget" id="itarget"></iframe>');
		};
		this.btSubmit.setEnable(true);
	}
}