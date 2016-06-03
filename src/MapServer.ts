import {MapProvider} from "./MapProvider";
export class MapServer {
    mapProvider: MapProvider;

    constructor(provider) {
        this.mapProvider = new MapProvider(provider);
        
    }

    getCoordinate(lon:number,lat:number,zoom:number=-1):any {
        var coordinate = this.mapProvider.getLonLatCoordinate(lon, lat);
        if(zoom>=0){
            coordinate = coordinate.zoomTo(zoom);
        }
        return coordinate.container().toString();
    }
    
    getTileUrls(lon:number,lat:number,zoom:number=26):any{
       var coordinate = this.mapProvider.getLonLatCoordinate(lon, lat).zoomTo(zoom);
       coordinate = coordinate.container();
       return this.mapProvider.getTileUrls(coordinate);
    }
}

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

// set global
(function (global, factory) {
    global.document ? factory(global) : function (w) {
        if (!w.document) {
            throw new Error("MapServer requires a window with a document");
        }
        return factory(w);
    };
} (typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    if (!noGlobal) {
        window.MapServer = MapServer;
    }
}
    )
);

