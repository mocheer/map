/**
 * author mocheer
 */
import {IProjection} from './IProjection';
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
import {Transformation} from '../math/Transformation';
/**
 * 抽象投影转换类.
 * 投影过程包括两个部分，一是将空间坐标转换为投影坐标；二是在步骤一的基础上对投影坐标进行矩阵转换，得到瓦片行列坐标，这部分是可选的。
 * 即：空间坐标（经纬度） -> 投影坐标 -> 瓦片坐标
 */
export class AbstractProjection implements IProjection {
    T: Transformation; // 矩阵转换对象
    zoom: number;  // 最大缩放级别
    /**
     * @param	zoom
     * @param	T
     */
    constructor(zoom: number, T: Transformation) {
        this.T = T;
        this.zoom = zoom;
    }
    /**
     * 对空间坐标进行投影转换和矩阵变换，返回所得的最终投影坐标
     * @return 经过投影和矩阵转换所得的投影坐标.
     */
    project(point: any[]): any[] {
        point = this.rawProject(point);
        if (this.T) point = this.T.transform(point);
        return point;
    }

    /**
     * 对投影坐标进行逆向投影转换和矩阵变换，返回对应的空间坐标
     * @return 未矩阵转换和投影的原始坐标（空间坐标）
     */
    unproject(point: any[]): any[] {
        if (this.T) point = this.T.untransform(point);
        return this.rawUnproject(point);
    }
    /**
     * 返回对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @param	loc	空间坐标（经纬度坐标、以度为单位）
     * @return	对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @see		tileMap.core.Coordinate#zoomTo()
     */
    locationCoordinate(loc: LonLat): Coordinate {
        var point: any[] = this.project([Math.PI * loc.lon / 180, Math.PI * loc.lat / 180])
        return new Coordinate(point[1], point[0], this.zoom);
    }

    /**
     * 根据瓦片坐标返回未投影转换的原始空间坐标（经纬度坐标）.
     * @param	coordinate	投影转换后的投影坐标
     * @return  未投影转换的原始空间坐标（经纬度坐标）.
     */
    coordinateLocation(coordinate: Coordinate): LonLat {
        coordinate = coordinate.zoomTo(this.zoom);
        var point: any[] = [coordinate.column, coordinate.row];
        point = this.unproject(point);
        return new LonLat(180 * point[0] / Math.PI, 180 * point[1] / Math.PI);
    }
    /**
     * 根据空间坐标计算原始投影坐标。
     * @return 原始投影坐标，是已经经过投影，但尚未进行矩阵转换的坐标.
     */
    rawProject(point: any[]): any[] {
        console.error("Abstract method not implemented by subclass.")
        return null
    }
   /**
     * 根据(尚未进行矩阵转换的)原始投影坐标计算对应的空间坐标
     * @return 原始投影坐标对应的空间坐标.
     */
    rawUnproject(point: any[]): any[] {
        console.error("Abstract method not implemented by subclass.")
        return null
    }
    /**
    * 一个描述当前投影的字符串
    * @return	描述当前投影的字符串
    */
    toString():string {
        console.error("Abstract method not implemented by subclass.")
        return ""
    }
}

