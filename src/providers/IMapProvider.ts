import {Coordinate} from '../core//Coordinate';
import {LonLat} from '../core//LonLat';
/**
 * 瓦片数据源公共接口，所有数据源均须实现该接口
 */
export interface IMapProvider {
	/**
	 * @return 返回该 coord 瓦片坐标对应的图片URL数组。一个瓦片可能只包含一个图片，也可能包含多个图片。
	 */
	getTileUrls(coord:Coordinate):any[];

	/**
	 * 返回对空间坐标（经纬度坐标）投影和转换后的瓦片坐标（投影坐标）.
	 * @param	lonlat	空间坐标
	 * @return	对空间坐标（经纬度坐标）投影和转换后的瓦片坐标（投影坐标）.
	 */
	locationCoordinate(lonlat:LonLat):Coordinate;

	/**
	 * 根据瓦片坐标返回未投影转换的原始空间坐标（经纬度坐标）.
	 * @param	coordinate	投影转换后的投影坐标
	 * @return 			未投影转换的原始空间坐标（经纬度坐标）.
	 */
	coordinateLocation(coordinate:Coordinate):LonLat;

	/**
	 * 获取左上角最小缩放和右下角最大缩放范围，一个包含两个元素（投影坐标，Coordinate对象）的数组
	 * @return	一个Coordinate数组，包含两个元素。
	 */
	outerLimits(): any[];

	/**
	 * 返回一个描述地图数据源提供程序的投影和转换方式的字符串。地图切换数据源时，将通过该方法进行投影比对，若不相同，则清理当前地图范围内的所有瓦片，重新生成和更新。
	 * @return	一个描述地图数据源提供程序的投影和转换方式的字符串
	 */
	geometry():string;

	/**
	 * provider的字符串描述
	 * @return	字符串描述信息
	 */
	toString():string;

	/**
	 * 转换投影坐标为原始的投影坐标并返回一个新对象。通常用于将没有限制范围的水平坐标转换为一定范围内的水平坐标。
	 * @param	coord	待处理的投影坐标对象。
	 * @return		处理后的投影坐标，一个新对象。
	 */
	sourceCoordinate(coord:Coordinate):Coordinate;

	/**
	 * 获取瓦片宽度，单位为像素
	 * @return	瓦片宽度
	 */
	tileWidth:number;

	/**
	 * 获取瓦片高度，像素
	 * @return	瓦片高度
	 */
	tileHeight:number;
}
