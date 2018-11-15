/**
 * author mocheer
 */
import {IProjection} from '../core/projection/IProjection';
import {Coordinate} from '../core//Coordinate';
import {LonLat} from '../core//LonLat';
import {Transformation} from '../core/math/Transformation';
import {MercatorProjection} from '../core/projection/MercatorProjection';
/**
 * AbstractMapProvider 是所有 MapProvider 的基类，用于对地图提供瓦片数据源。
 */
export class AbstractMapProvider  {
	static MIN_ZOOM: number = 1;
	static MAX_ZOOM: number = 20;
	projection: IProjection;
	//当前数据源的边界范围
	topLeftOutLimit: Coordinate;
	bottomRightInLimit: Coordinate;

	/**
	* 抽象构造函数，通常在子类中通过super()调用，不应该被直接实例化。
	*/
	constructor(minZoom: number = AbstractMapProvider.MIN_ZOOM, maxZoom: number = AbstractMapProvider.MAX_ZOOM, tx: number = 0.0, ty: number = 0.0) {
		this.init(minZoom,maxZoom,tx,ty)
	}
	// web墨卡托  原点 [-180,85]  即  [-20037508.3427892,20037508.3427892]
	// 
	//转换矩阵参数说明：
	//投影转换前的经纬度都会被换算成弧度，即经度范围为-pi - pi，纬度范围为 -pi/2 - pi/2
	//由于总缩放级别为26级，因此共有列数 colCount = 2^26 = 67108864
	//由于经度范围为(-pi - pi)，转换后须为 0-colCount，因此cx = colCount/2 = 33554432。33554431.85来自互联网，可能是加了少量修正。
	//由于纬度范围为(-pi/2 - pi/2)，转换后应为 -colCount/2 - colCount/2，因此 ax = (colCount/2) / pi = 10680707.430881743590348355907974
	//tan 72.3432° 约等于π
	init(minZoom:number,maxZoom:number,tx:number,ty:number){
		var t: Transformation = new Transformation(1.068070779e7, 0, 3.355443185e7 + tx, 0, -1.068070890e7, 3.355443057e7 + ty);
		this.projection = new MercatorProjection(26, t);
		this.topLeftOutLimit = new Coordinate(0, Number.NEGATIVE_INFINITY, minZoom);
		this.bottomRightInLimit = (new Coordinate(1, Number.POSITIVE_INFINITY, 0)).zoomTo(maxZoom);
	}
	/**
	 * 一个描述当前provider的投影信息的字符串
	 * @return	描述当前provider的投影信息
	 */
	geometry(): string {
		return this.projection.toString();
	}

	/**
	 * 对切片的投影坐标（行、列坐标）中的列坐标（水平坐标）进行处理，使之位于正常的列坐标范围内。
	 * 由于地图允许水平方向任意漫游，因此列坐标可能超出范围（例如小于0，或大于最大值），该方法将之映射为
	 * 由于地图不允许纵向漫游超出范围，因此行坐标（纵向坐标）不进行处理。
	 * @param	coord	待处理的坐标.
	 * @return		处理后生成的新坐标对象
	 */
	sourceCoordinate(coord: Coordinate): Coordinate {
		var wrappedColumn: number = coord.column % Math.pow(2, coord.zoom);
		while (wrappedColumn < 0) {
			wrappedColumn += Math.pow(2, coord.zoom);
		}
		return new Coordinate(coord.row, wrappedColumn, coord.zoom);
	}

	/**
	 * 返回一个数组，该数组包含两个投影坐标对象，分别为左上角、最小级别的投影坐标，以及右下角最大级别的投影坐标
	 * @return	一个数组，该数组包含两个投影坐标对象，分别为左上角、最小级别的投影坐标，以及右下角最大级别的投影坐标
	 */
	outerLimits(): any[] {
		return [this.topLeftOutLimit.clone(), this.bottomRightInLimit.clone()];
	}

	/**
	 * 返回对空间坐标（经纬度坐标）投影和转换后所得的瓦片坐标（投影坐标）.
	 * @param	LonLat	空间坐标
	 * @return	空间坐标对应的投影坐标
	 */
	locationCoordinate(lonlat: LonLat): Coordinate {
		return this.projection.locationCoordinate(lonlat);
	}
	/**
	 * 返回投影坐标对应的原始空间坐标信息
	 * @param	coordinate	投影坐标
	 * @return	投影坐标对应的空间坐标
	 */
	coordinateLocation(coordinate: Coordinate): LonLat {
		return this.projection.coordinateLocation(coordinate);
	}
	/**
	 * 获取瓦片宽度，256像素
	 * @return	瓦片宽度，256像素
	 */
	get tileWidth(): number {
		return 256;
	}
	/**
	 * 获取瓦片高度，256像素
	 * @return	瓦片高度，256像素
	 */
	get tileHeight(): number {
		return 256;
	}
}
