import $xhr = require("promised-xhr");
$xhr.base = "";

export class InitApp{
    private title: string;
    private refresh:Function;
    constructor(){
	   this.title = "FerrugemJS";
    }
}
