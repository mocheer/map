/**
 * author mocheer
 */
import {AbstractMapProvider} from './AbstractMapProvider';
import {Coordinate} from '../core/Coordinate';
import {IMapProvider} from './IMapProvider';
/**
 * 天地图瓦片数据源提供程序
 */
export class TiandituProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: any;
	/**
	 * 天地图数据源构造函数
	 * @param	minZoom		数据源最小缩放级别
	 * @param	maxZoom		数据源最大缩放级别
	 */
	constructor() {
		super();
	// 	super(minZoom,maxZoom,tx,ty);
	// 	//天地图的投影方式为经纬度直投
	// 	var t:Transformation = new Transformation(166886.05360752725, 0, 524288, 0, -166886.05360752725, 524288);
	//  __projection = new  LinearProjection(20, t);
	//  _providerName = providerName;
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
		var server: number = coord.row%7;//随机镜像服务器编号
		var url: any = this.urlTemplate;
		var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom)
		return [result];
	}

	/**
	 * @return	天地图数据源字符串描述信息
	 */
	toString(): string {
		return "TiandituProvider_" + this.type;
	}
}

/**
 * 天地图-遥感（影像图）
 */
export class TiandituProvider_AERIAL extends TiandituProvider {
	type: string = "AERIAL";
	urlTemplate: any = "http://t{0}.tianditu.com/DataServer?T=img_w&x={1}&y={2}&l={3}";
	constructor() {
		super();
	}
}

/**
 * 天地图-交通（矢量图）
 */
export class TiandituProvider_ROAD extends TiandituProvider {
	type: string = "ROAD";
	urlTemplate: any = "http://t{0}.tianditu.com/DataServer?T=vec_w&x={1}&y={2}&l={3}";
	constructor() {
		super();
	}
}


