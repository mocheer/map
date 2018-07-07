/**
 * author mocheer
 */
import { AbstractProjection } from './AbstractProjection';
import { LonLat } from '../LonLat';
import { Coordinate } from '../Coordinate';
import { Transformation } from '../math/Transformation';
import { lonLat_xy_wgs84, xy_LonLat_wgs84 } from '../math/GaussKruger'
/**
 * 
 */
export class GaussKrugerProjection extends AbstractProjection {
    centerLon: number
    tx: number
    ty: number
    constructor(zoom: number, T: Transformation, centerLon: number, tx: number = 500000, ty: number = 0) {
        super(zoom, T)
        this.centerLon = centerLon;
        this.tx = tx;
        this.ty = ty;
    }
    /**
     * 根据空间坐标计算原始投影坐标。
     * @return 原始投影坐标，是已经经过投影，但尚未进行矩阵转换的坐标.
     */
    rawProject(point: any[]): any[] {
        return lonLat_xy_wgs84(point[0], point[1], this.centerLon, this.tx, this.ty);
    }
    /**
     * 根据(尚未进行矩阵转换的)原始投影坐标计算对应的空间坐标
     * @return 原始投影坐标对应的空间坐标.
     */
    rawUnproject(point: any[]): any[] {
        return xy_LonLat_wgs84(point[0], point[1], this.centerLon, this.tx, this.ty);
    }
    /**
     * 返回对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @param	loc	空间坐标（经纬度坐标、以度为单位）
     * @return	对空间坐标（经纬度坐标）投影和转换后的最大 zoom 对应的投影坐标（瓦片坐标）.
     * @see		tileMap.core.Coordinate#zoomTo()
     */
    locationCoordinate(loc: LonLat): Coordinate {
        var point: any[] = this.project([loc.lon, loc.lat])
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
        return new LonLat(point[0], point[1]);
    }
    /**
     * 一个描述当前投影的字符串
     * @return	描述当前投影的字符串
     */
    toString(): string {
        return 'GaussKrugerProjection(' + this.zoom + ', ' + this.T.toString() + ')';
    }
}