import app = require("../../../server");

interface IRequestType{
  body:{}
  ,params:{}
  ,query:{}
  ,files:{}
}
interface IResponseType{
  send(p_res: any): void
  ,status(p_status: number): void
  ,json(p_res: any): void
}


var tmpElement:any = null;
export interface IRoute {
    verb: string;
    url: string;
    handlerName: string;
}

export interface IControllerConfiguration {
    routes: IRoute[];
    root: string;
}

export interface IControllerClass extends Function {
    prototype: {};
    name: string;
    $$controllerConfiguration:IControllerConfiguration;
    new (): Function;
}

function methodDecoratorFactory(verbName: string): (path?: string) => MethodDecorator {
    return function (path?: string): MethodDecorator {
        return function (target: any, handlerName: string, descriptor: TypedPropertyDescriptor<Function>) {
            if(!target.$$controllerConfiguration){
                target.$$controllerConfiguration = {
                    routes:[],
                    root: null
                };
            };
            if(!path){
                path="/";
            };
            target.$$controllerConfiguration.routes.push({
                "verb":verbName
                ,"url": path
                ,"handlerName": handlerName
            });
        };
    }
}

export function Controller(p_root?: string): ClassDecorator {
    return function (target: IControllerClass) {
      tmpElement = new target();
      var tmpConfig:IControllerClass = <IControllerClass> target.prototype;
          if (!p_root) {
              p_root = "/" + target.name.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
          };
          tmpConfig.$$controllerConfiguration.routes.forEach(route => {
              console.log(p_root+route.url+" "+route.verb);            
              app.server[route.verb](
                p_root + route.url
                //, target.prototype[route.handlerName].bind(tmpElement)
                ,(req:IRequestType,res:IResponseType)=>{
                   target.prototype[route.handlerName]
                        .apply(tmpElement,[route.verb=="get"||route.verb=="delete"?req.params:req.body])
                        .then((dta:any)=>res.json(dta))
                        .catch((err:any)=>{
                            res.status(400);
                            res.json(err);
                        });
                }
            );
          });
    }
}

export const Get = methodDecoratorFactory('get');
export const Post = methodDecoratorFactory('post');
export const Put = methodDecoratorFactory('put');
export const Delete = methodDecoratorFactory('del');
export const Patch = methodDecoratorFactory('patch');
