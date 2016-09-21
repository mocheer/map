import {AbstractMapProvider} from './AbstractMapProvider';
import {Coordinate} from '../core/Coordinate';
import {IMapProvider} from './IMapProvider';
import {Transformation} from '../core/math/Transformation'
import {GaussKrugerProjection} from '../core/projection/GaussKrugerProjection'
/**
 * 高斯克里格投影
 */
export class GaussKrugerProvider extends AbstractMapProvider implements IMapProvider {
	type: string;
    scales:number[];
	urlTemplate: any;

	/**
	 * 数据源构造函数
	 * @param	minZoom		数据源最小缩放级别
	 * @param	maxZoom		数据源最大缩放级别
	 */
	constructor(minZoom: number = AbstractMapProvider.MIN_ZOOM, maxZoom: number = AbstractMapProvider.MAX_ZOOM, tx: number = 0.0, ty: number = 0.0) {
		super(minZoom,maxZoom,tx,ty);
	}
	/**
	 * 返回特定投影坐标处的瓦片URL数组。
	 * @param	coord	投影坐标
	 * @return		坐标对应的瓦片数组。
	 */
	getTileUrls(coord: Coordinate): any[] {
		// if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
		// 	return null;
		// }
		var sourceCoord: Coordinate = this.sourceCoordinate(coord);
		var result = this.urlTemplate.format(sourceCoord.column, sourceCoord.row, this.scales[sourceCoord.zoom-8])
		return [result];
	}

	/**
	 * @return	数据源字符串描述信息
	 */
	toString(): string {
		return "GaussKrugerProvider_" + this.type;
	}
}

/**
 * Test
 */
export class GaussKrugerProvider_szsatellite extends GaussKrugerProvider {
	type:string = "szsatellite";
    scales:number[] = [
		4.5155555555374945E-7,
		9.031111111074989E-7,
		1.806222222214999E-6,
		3.6124444444300892E-6,
		7.2248888888601785E-6,
		1.4449777777721402E-5,
		2.889955555547204E-5,
		5.7799111110910654E-5,
		1.1559822222255629E-4,
		2.3119644444356247E-4,
		4.6239288888703917E-4
		// 9.247857777740789E-4,
		// 0.001849571555548243
	]
	urlTemplate: any = "http://10.38.13.145:8090/iserver/services/map-arcgis-szsatellite/rest/maps/图层/tileImage.png?transparent=false&cacheEnabled=true&width=256&height=256&x={0}&y={1}&scale={2}&redirect=false&overlapDisplayed=false";
	constructor() {
		super(8,26);
	}
	init(minZoom:number,maxZoom:number,tx:number,ty:number){
		var s:number = 2.57990355279992;//  2^18/(50805.0*2)= 2.57990355279992
        var t:Transformation = new Transformation(s, 0, 50805.0*s, 0, -s,3421129.0*s);	
        this.projection = new GaussKrugerProjection(maxZoom, t,120.58333299999998);	//120.58333299999998,30.45239409999
        this.topLeftOutLimit = new Coordinate(0, 0, minZoom);				
        this.bottomRightInLimit = (new Coordinate(1, 1, 0)).zoomTo(maxZoom);
    }
}

