import {Coordinate} from './core//Coordinate';
import {LonLat} from './core//LonLat';
import {IMapProvider} from "./providers/IMapProvider";
/**
 * 地图瓦片信息
 */
export class MapTile {
    lonlat:LonLat;
    provider:IMapProvider;
    coordinate:Coordinate;
    realMaxCoordinate:Coordinate;
    offset:any;
    scaleValue:number;
    urls:any;
    /**
     * @provider 地图图源
     * @zoom 地图当前缩放级别
     */
    constructor(provider:IMapProvider,lon:number,lat:number,zoom:number) {
        this.provider = provider;
        this.lonlat = new LonLat(lon,lat);
        //
        var realMaxCoordinate =  provider.locationCoordinate(this.lonlat);
        var destination = zoom - realMaxCoordinate.zoom;
        this.coordinate = realMaxCoordinate.zoomBy(destination).container();//缩小到当前级别的瓦片
        //  
        var maxCoordinate = this.coordinate.zoomBy(-destination);//放大到最大级别的瓦片
        var scale = Math.pow(2, destination);//缩放因子
        this.scaleValue = provider.tileWidth*scale;
        this.offset = [(realMaxCoordinate.column-maxCoordinate.column)*this.scaleValue,(realMaxCoordinate.row-maxCoordinate.row)*this.scaleValue]
        this.realMaxCoordinate = realMaxCoordinate;
    }
    getUrls(){
        if(this.urls===undefined){
             this.urls = this.provider.getTileUrls(this.coordinate);
        }
        return this.urls;
    }
    getOffsetLonlat(offset){
        var column = this.realMaxCoordinate.column - offset[0]/this.scaleValue;
        var row = this.realMaxCoordinate.row - offset[1]/this.scaleValue;
        var coordinate = new Coordinate(row,column,this.realMaxCoordinate.zoom)
        return this.provider.coordinateLocation(coordinate);
    }
    /**
     * 
     */
    toString():string{
        var str = "provider:"+this.provider.toString()+"\n" +
        "lonlat:"+this.lonlat.toString()+"\n" +
        "coordinate:"+ this.coordinate.toString()+"\n" +
        "scaleValue:"+ this.scaleValue.toString()+"\n" +
        "offset:"+this.offset+"\n" +
        "urls:"+this.getUrls()+"\n"
        return str;
    }
}
