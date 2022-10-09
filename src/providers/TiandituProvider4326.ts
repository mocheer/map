/**
 * author mocheer
 */
import { AbstractMapProvider } from './AbstractMapProvider';
import { Coordinate } from '../core/Coordinate';
import { IMapProvider } from './IMapProvider';
import { Transformation } from '../core/math/Transformation';
import { LinearProjection } from '../core/projection/LinearProjection';
import { MercatorProjection } from '../core/projection/MercatorProjection';
/**
 * 天地图瓦片数据源提供程序
 */
export class TiandituProvider4326 extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: any;
	/**
	* 
	*/
	constructor(minZoom: number = AbstractMapProvider.MIN_ZOOM, maxZoom: number = AbstractMapProvider.MAX_ZOOM, tx: number = 0.0, ty: number = 0.0) {
		super(minZoom, maxZoom, tx, ty)
	}
	init(minZoom: number, maxZoom: number, tx: number, ty: number): void {
		// super.init(minZoom, maxZoom, tx, ty);
		//天地图的投影方式为经纬度直投
		// (1<<20)/2 = 524288 
		// 524288/Math.PI = 166886.05360752725
		var mZoom = 26
		var colCount = 1 << mZoom
		// // var t: Transformation = new Transformation(166886.05360752725 , 0, 524288 , -166886.05360752725, 0, 524288/2);
		// this.projection = new LinearProjection(mZoom, t);
		var t: Transformation = new Transformation(colCount / Math.PI / 2, 0, colCount / 2, 0, -colCount / Math.PI / 2, colCount / 4);//+ colCount / 133.05585
		this.projection = new LinearProjection(mZoom, t)
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
		var server: number = coord.row % 7;//随机镜像服务器编号
		var url: any = this.urlTemplate;
		var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom)
		return [result];
	}

	/**
	 * @return	天地图数据源字符串描述信息
	 */
	toString(): string {
		return "TiandituProvider4326_" + this.type;
	}
}

/**
 * 天地图-遥感（影像图）
 */
export class TiandituProvider4326_AERIAL extends TiandituProvider4326 {
	type: string = "AERIAL";
	urlTemplate: any = "http://t{0}.tianditu.com/DataServer?T=img_c&x={1}&y={2}&l={3}";
	constructor() {
		super();
	}
}

/**
 * 天地图-交通（矢量图）
 */
export class TiandituProvider4326_ROAD extends TiandituProvider4326 {
	type: string = "ROAD";
	urlTemplate: any = "http://t{0}.tianditu.com/DataServer?T=vec_c&x={1}&y={2}&l={3}";
	constructor() {
		super();
	}
}


