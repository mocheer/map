import {IMapProvider} from "./providers/IMapProvider"
import {GoogleProvider_AERIAL,GoogleProvider_HYBRID,GoogleProvider_ROAD} from "./providers/GoogleProvider"
import {BaiduProvider_AERIAL,BaiduProvider_ROAD} from "./providers/BaiduProvider"
import {GaoDeProvider_AERIAL,GaoDeProvider_ROAD} from "./providers/GaoDeProvider"
import {TianDiProvider_AERIAL,TianDiProvider_ROAD} from "./providers/TianDiProvider"
import {GaussKrugerProvider_szsatellite} from "./providers/GaussKrugerProvider"
import {MapTile} from "./MapTile"
const ALLProviders ={
    "GaussKrugerProvider_szsatellite":GaussKrugerProvider_szsatellite,
    //谷歌地图
   "GoogleProvider_AERIAL":GoogleProvider_AERIAL,
   "GoogleProvider_HYBRID":GoogleProvider_HYBRID,
   "GoogleProvider_ROAD":GoogleProvider_ROAD,
   //天地图
   "BaiduProvider_AERIAL":BaiduProvider_AERIAL,
   "BaiduProvider_ROAD":BaiduProvider_ROAD,
   //天地图
   "TianDiProvider_AERIAL":TianDiProvider_AERIAL,
   "TianDiProvider_ROAD":TianDiProvider_ROAD,
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
