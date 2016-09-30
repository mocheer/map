/**
 * author mocheer
 */
import {AbstractMapProvider} from './AbstractMapProvider.ts';
import {Coordinate} from '../core/Coordinate.ts';
import {IMapProvider} from './IMapProvider.ts';
/**
 * 谷歌瓦片地图数据源提供程序
 */
export class GoogleProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: any;
	/**
	 * 谷歌地图数据源构造函数
	 * @param	type		数据源类型，指定道路图、遥感图等
	 * @param	minZoom		数据源最小缩放级别
	 * @param	maxZoom		数据源最大缩放级别
	 */
	constructor() {
		super();
	}
	/**
	 * 返回特定投影坐标处的瓦片URL数组。
	 * @param	coord	投影坐标
	 * @return		坐标对应的瓦片数组。
	 */
	getTileUrls(coord: Coordinate): any[] {
		if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
			return null;
		}
		var sourceCoord: Coordinate = this.sourceCoordinate(coord);
		var server: number = coord.row%4;//随机镜像服务器编号
		var s: string = "Galileo".substr(0, Math.floor(Math.random() * 8));//暂时未发现 "&s=" 的意义，url有无此后缀都不影响瓦片地址的访问。
		var url: any = this.urlTemplate;
		var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom, s)
		return [result];
	}

	/**
	 * @return	谷歌数据源字符串描述信息
	 */
	toString(): string {
		return "GoogleProvider_" + this.type;
	}
}

/**
 * 谷歌遥感图
 */
export class GoogleProvider_AERIAL extends GoogleProvider {
	type: string = "AERIAL";
	urlTemplate: any = "http://mt{0}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}";
	constructor() {
		super();
	}
}

/**
 * 谷歌混合图
 */
export class GoogleProvider_HYBRID extends GoogleProvider {
	type: string = "HYBRID";
	urlTemplate: any = "http://mt{0}.google.cn/vt/lyrs=p&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}";
	constructor() {
		super();
	}
}

/**
 * 谷歌交通图
 */
export class GoogleProvider_ROAD extends GoogleProvider {
	type: string = "ROAD";
	urlTemplate: any = "http://mt{0}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"
	constructor() {
		super();
	}
}
