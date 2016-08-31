import {AbstractMapProvider} from './AbstractMapProvider';
import {Coordinate} from '../core/Coordinate';
import {IMapProvider} from './IMapProvider';
/**
 * 高德瓦片地图数据源提供程序
 */
export class GaoDeProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: string;
	/**
	 * 高德地图数据源构造函数
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
		var server: number = coord.row%4 +1;//随机镜像服务器编号
		var url: any = this.urlTemplate;
		var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom)
		return [result];
	}

	/**
	 * @return	高德数据源字符串描述信息
	 */
	toString(): string {
		return "GaoDeProvider_" + this.type;
	}
}

/**
 * 高德电子图(交通图)
 */
export class GaoDeProvider_ROAD extends GaoDeProvider {
	type: string = "ROAD";
	urlTemplate: string = "http://webrd0{0}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={1}&y={2}&z={3}";
	constructor() {
		super();
	}
}

/**
 * 高德卫星图
 */
export class GaoDeProvider_AERIAL extends GaoDeProvider {
	type: string = "AERIAL";
	urlTemplate: string = "http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=6&x={1}&y={2}&z={3}";
	constructor() {
		super();
	}
}

/**
 * 高德标注图
 */
export class GaoDeProvider_LABEL extends GaoDeProvider {
	type: string = "LABEL";
	urlTemplate: string = "http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=8&x={1}&y={2}&z={3}";
	constructor() {
		super();
	}
}

