import {AbstractMapProvider} from './AbstractMapProvider'
import {Coordinate} from '../core/Coordinate'
import {IMapProvider} from './IMapProvider'
import {Transformation} from '../core/math/Transformation'
import {BaiduProjection} from '../core/projection/BaiduProjection'
/**
 * 百度瓦片地图数据源提供程序
 */
export class BaiduProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
	/**
	 * 各类数据源URL模板，根据镜像服务器编号、数据源类型、投影坐标等，可生成最终的瓦片URL数组
	 */
	urlTemplate: any;
	/**
	 * 百度地图数据源构造函数
	 * @param	type		数据源类型，指定道路图、遥感图等
	 * @param	minZoom		数据源最小缩放级别
	 * @param	maxZoom		数据源最大缩放级别
	 */
	constructor() {
		super();
	}
	/**
	 * 原始投影坐标到行列坐标的转换矩阵。百度地图的参考缩放级别为18，但最大有19级，因此此处参数为2^18 / 2 = 131072
	 * 由于百度投影坐标原点位于大地原点（经纬度0,0），且坐标轴方向和经纬度坐标相同，因此此处设置转换矩阵Transformation，将坐标原点转换为左上角，适应地图平台的处理方式。
	 */
	init(minZoom:number=1,maxZoom:number=19,tx:number,ty:number){
		var t:Transformation = new Transformation(1, 0, 131072, 0, -1, 131072);	
        this.projection = new BaiduProjection(18, t);		//百度地图的参考缩放级别为18。尽管可以放大到19级。
        this.topLeftOutLimit = new Coordinate(0, 0, minZoom);		//地图左上角边界
        this.bottomRightInLimit = (new Coordinate(1, 1, 0)).zoomTo(maxZoom);	//地图右下角边界
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
        var _nZ:number = Math.pow(2, 18 - coord.zoom);		//当前缩放级别到百度参考级别18的倍数差
        var _nX:number = coord.column - 131072 / _nZ;		//瓦片列坐标
        var _nY:number = 131072 / _nZ - coord.row - 1;		//瓦片行坐标
		var server: number = coord.row%4;//随机镜像服务器编号0-3
		var url: any = this.urlTemplate;
        var result = url.format(server, _nX.toString().replace("-", "M"), _nY.toString().replace("-", "M"), coord.zoom)
		return [result];
	}

	/**
	 * @return	百度数据源字符串描述信息
	 */
	toString(): string {
		return "BaiduProvider_" + this.type;
	}
}

/**
 * 百度遥感图
 */
export class BaiduProvider_AERIAL extends BaiduProvider {
	type: string = "AERIAL";
	urlTemplate: any = "http://online{0}.map.bdimg.com/tile/?qt=tile&x={1}&y={2}&z={3}&styles=sl&v=068&udt=20150418";
	constructor() {
		super();
	}
}

/**
 * 百度交通图
 */
export class BaiduProvider_ROAD extends BaiduProvider {
	type: string = "ROAD";
	urlTemplate: any = "http://online{0}.map.bdimg.com/tile/?qt=tile&x={1}&y={2}&z={3}&styles=pl&udt=20150421&scaler=1"
	constructor() {
		super();
	}
}
