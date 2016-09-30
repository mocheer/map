/**
 * author mocheer
 */
import {IMapProvider} from "./providers/IMapProvider.ts"
import {GoogleProvider_AERIAL,GoogleProvider_HYBRID,GoogleProvider_ROAD} from "./providers/GoogleProvider.ts"
import {BaiduProvider_AERIAL,BaiduProvider_ROAD} from "./providers/BaiduProvider.ts"
import {GaoDeProvider_AERIAL,GaoDeProvider_ROAD} from "./providers/GaoDeProvider.ts"
import {TiandituProvider_AERIAL,TiandituProvider_ROAD} from "./providers/TiandituProvider.ts"
import {GaussKrugerProvider_SZ} from "./providers/GaussKrugerProvider.ts"
import {MapTile} from "./MapTile.ts"
import {Coordinate} from './core//Coordinate.ts';
const ALLProviders ={
    "GaussKrugerProvider_SZ":GaussKrugerProvider_SZ,
    //谷歌地图
   "GoogleProvider_AERIAL":GoogleProvider_AERIAL,
   "GoogleProvider_HYBRID":GoogleProvider_HYBRID,
   "GoogleProvider_ROAD":GoogleProvider_ROAD,
   //天地图
   "BaiduProvider_AERIAL":BaiduProvider_AERIAL,
   "BaiduProvider_ROAD":BaiduProvider_ROAD,
   //天地图
   "TiandituProvider_AERIAL":TiandituProvider_AERIAL,
   "TiandituProvider_ROAD":TiandituProvider_ROAD,
   //高德地图
   "GaoDeProvider_AERIAL":GaoDeProvider_AERIAL,
   "GaoDeProvider_ROAD":GaoDeProvider_ROAD
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
