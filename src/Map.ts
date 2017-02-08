/**
 * author mocheer
 */
import {MapProvider} from "./MapProvider";
export class Map {
    provider:string;
    mapProvider: MapProvider;
   
    constructor(provider) {
        this.provider = provider;
        this.mapProvider = new MapProvider(provider);
    }
    
    getMapTile(lon,lat,zoom):any{
       return this.mapProvider.getMapTile(lon,lat,zoom);
    }
}

// set global
(<any>window).Map = Map;
loadUtility();

function loadUtility(){
    if (!String.prototype["format"]) {
        String.prototype["format"] = function (args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof (args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                }
                else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg = new RegExp("({[" + i + "]})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        }
    }
}

