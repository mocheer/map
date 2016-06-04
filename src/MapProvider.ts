import {IMapProvider} from "./providers/IMapProvider";
import {GoogleProvider_AERIAL,GoogleProvider_HYBRID,GoogleProvider_ROAD} from "./providers/GoogleProvider";
import {MapTile} from "./MapTile";
const ALLProviders ={
   "GoogleProvider_AERIAL":GoogleProvider_AERIAL,
   "GoogleProvider_HYBRID":GoogleProvider_HYBRID,
   "GoogleProvider_ROAD":GoogleProvider_ROAD
}
export class MapProvider {
    provider: IMapProvider;
    
    constructor(provider: any) {
        provider = ALLProviders[provider];
        if(provider){
            this.provider = new provider();
        }
    }

    getMapTile(lon,lat,zoom):MapTile{
       var tile = new MapTile(this.provider,lon,lat,zoom);
       return tile;
    }
}
