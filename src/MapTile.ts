import {Coordinate} from './core//Coordinate';
import {LonLat} from './core//LonLat';
import {IMapProvider} from "./providers/IMapProvider";
/**
 * 地图中心瓦片
 */
export class MapTile {
    lonlat:LonLat;
    zoom:number;
    provider:IMapProvider;
    coordinate:Coordinate;
    offsetX:number;
    offsetY:number;
    urls:any;
    /**
     * @provider 地图图源
     * @zoom 地图当前缩放级别
     */
    constructor(provider:IMapProvider,lon:number,lat:number,zoom:number) {
        this.provider = provider;
        this.lonlat = new LonLat(lon,lat);
        this.zoom = zoom;
        //
        var realMaxCoordinate =  provider.locationCoordinate(this.lonlat);
        var destination = zoom - realMaxCoordinate.zoom;
        this.coordinate = realMaxCoordinate.zoomBy(destination).container();//缩小到当前级别的瓦片
        this.urls = this.provider.getTileUrls(this.coordinate);
        //  
        var maxCoordinate = this.coordinate.zoomBy(-destination);//放大到最大级别的瓦片
        var scale = Math.pow(2, destination);//缩放因子
        var scaleValue = provider.tileWidth*scale;
        this.offsetX = (realMaxCoordinate.column-maxCoordinate.column)*scaleValue;
        this.offsetY = (realMaxCoordinate.row-maxCoordinate.row)*scaleValue;
       
    }
    /**
     * 
     */
    toString():string{
        var str = "provider:"+this.provider.toString()+"\n" +
        "lonlat:"+this.lonlat.toString()+"\n" +
        "zoom:"+this.zoom.toString()+"\n" +
        "offset:"+this.offsetX+","+this.offsetY+"\n" +
        "coordinate:"+ this.coordinate.toString()+"\n" +
        "urls:"+this.urls.toString()+"\n";
        return str;
    }
}
