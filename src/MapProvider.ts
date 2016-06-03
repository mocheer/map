import {IMapProvider} from "./providers/IMapProvider";
import {GoogleProvider_AERIAL,GoogleProvider_HYBRID,GoogleProvider_ROAD} from "./providers/GoogleProvider";
import {LonLat} from './core//LonLat';
import {Coordinate} from './core//Coordinate';

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
    getLonLatCoordinate(lon:number,lat:number):Coordinate{
        var lonlat = new LonLat(lon,lat);
        return this.provider.locationCoordinate(lonlat);
    }
    getTileUrls(c:Coordinate):any{
        return this.provider.getTileUrls(c);
    }
}
