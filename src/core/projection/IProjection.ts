/**
 * author mocheer
 */
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
/**
 * 地图投影转换公共接口，所有投影均须实现该接口。
 */
export interface IProjection
{
    /**
     * 返回经过投影转换后的投影坐标
     * @param	point 待进行投影转换的空间坐标
     * @return	 经过投影和矩阵转换后的投影坐标
     */
    project(point:any[]):any[];
    /**
     * 根据投影坐标，计算和返回对应的空间坐标
     * @param	point 投影坐标
     * @return	投影坐标对应的空间坐标
     */
    unproject(point:any[]):any[];
    /**
     * 返回对空间坐标（经纬度坐标）投影和转换后的投影坐标（瓦片坐标）.
     * @param	location 空间坐标
     * @return	对空间坐标（经纬度坐标）投影和转换后的投影坐标（瓦片坐标）.
     */
    locationCoordinate(location:LonLat):Coordinate;
    /**
     * 根据瓦片坐标返回未投影转换的原始空间坐标（经纬度坐标）.
     * @param	coordinate	投影转换后的投影坐标
     * @return  未投影转换的原始空间坐标（经纬度坐标）.
     */
    coordinateLocation(coordinate:Coordinate):LonLat;
    /**
     * 一个描述当前投影的字符串
     * @return	描述当前投影的字符串
     */
    toString():string;
}  
