/**
 * author mocheer
 */
import MapProvider from "./MapProvider";
import {Coordinate} from './core//Coordinate';

export default class Map {
    Coordinate
    //
    provider:string;
    mapProvider: MapProvider;
    //
    constructor(provider) {
        this.Coordinate = Coordinate;
        this.provider = provider;
        this.mapProvider = new MapProvider(provider);
    }
    //
    getTile(lon,lat,zoom):any{
       return this.mapProvider.getTile(lon,lat,zoom);
    }
}
//
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


