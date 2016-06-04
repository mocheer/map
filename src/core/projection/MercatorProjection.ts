import {IProjection} from './IProjection';
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
import {Transformation} from '../math/Transformation';
/**
 * 墨卡托投影
 */
export class MercatorProjection implements IProjection 
{
    T:Transformation; // 矩阵转换对象
    zoom:number;  // 最大缩放级别
    /**
     * @param	zoom
     * @param	T
     */
    constructor(zoom:number, T:Transformation)
    {
        if (T)this.T = T;
        this.zoom = zoom;
    }
    /**
     * 对空间坐标进行投影转换和矩阵变换，返回所得的最终投影坐标
     * @return 经过投影和矩阵转换所得的投影坐标.
     */
    project(point:any[]):any[] {
        point = this.rawProject(point);
        if (this.T)point = this.T.transform(point);
        return point;
    }

    /**
     * 对投影坐标进行逆向投影转换和矩阵变换，返回对应的空间坐标
     * @return 未矩阵转换和投影的原始坐标（空间坐标）
     */
    unproject(point:any[]):any[]
    {
        if (this.T)point = this.T.untransform(point);
        point = this.rawUnproject(point);
        return point;
    }
    /**
     * 返回对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @param	loc	空间坐标（经纬度坐标、以度为单位）
     * @return			对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @see		tileMap.core.Coordinate#zoomTo()
     */
    locationCoordinate(loc:LonLat):Coordinate {
        var point:any[] = [Math.PI * loc.lon / 180, Math.PI * loc.lat / 180];
        point = this.project(point);
        return new Coordinate(point[1], point[0], this.zoom);
    }

    /**
     * 根据瓦片坐标返回未投影转换的原始空间坐标（经纬度坐标）.
     * @param	coordinate	投影转换后的投影坐标
     * @return  未投影转换的原始空间坐标（经纬度坐标）.
     */
    coordinateLocation(coordinate:Coordinate):LonLat {
        coordinate = coordinate.zoomTo(this.zoom);
        var point:any[] = [coordinate.column, coordinate.row];
        point = this.unproject(point);
        return new LonLat(180 * point[0] / Math.PI, 180 * point[1] / Math.PI);
    }
    /**
     * 根据空间坐标计算原始投影坐标。
     * @return 原始投影坐标，是已经经过投影，但尚未进行矩阵转换的坐标.
     * @see http://mathworld.wolfram.com/MercatorProjection.html http://mathworld.wolfram.com/MercatorProjection.html(2)
     */
    rawProject(point:any[]):any[]
    {
        return [point[0], Math.log(Math.tan(0.25 * Math.PI + 0.5 * point[1]))];
    }
    /**
     * 根据原始投影坐标计算对应的空间坐标
     * @return 原始投影坐标对应的空间坐标.
     * @see http://mathworld.wolfram.com/MercatorProjection.html http://mathworld.wolfram.com/MercatorProjection.html(7)
     */
    rawUnproject(point:any[]):any[]
    {
        return [point[0], 2 * Math.atan(Math.pow(Math.E, point[1])) - 0.5 * Math.PI];
    }
     /**
     * 一个描述当前投影的字符串
     * @return	描述当前投影的字符串
     */
    toString():string
    {
        return 'Mercator('+this.zoom+', '+ this.T.toString()+')';
    }
}

