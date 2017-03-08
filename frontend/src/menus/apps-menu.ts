export class AppsMenu{
	private refresh:Function;
	private _visible:boolean;
	private setVisible(on:boolean){
		//alert(on);
		this.refresh({_visible:on});
	}
}