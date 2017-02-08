/**
 * author mocheer
 */
import {AbstractProjection} from './AbstractProjection';
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
import {Transformation} from '../math/Transformation';

/**
 * 线性投影，也即我们常说的无投影，或经纬度投影
 */
export class LinearProjection extends AbstractProjection {
    /**
     * 构造函数
     * @param	zoom	最大缩放级别
     * @param	T	转换矩阵
     */
	constructor(zoom: number, T: Transformation) {
        super(zoom, T);
    }

    /**
     * 根据空间坐标计算原始投影坐标。
     * @return 原始投影坐标，是已经经过投影，但尚未进行矩阵转换的坐标.
     */
    rawProject(point:any[]):any[] {
        return point;
    }

    /**
     * 根据原始投影坐标计算对应的空间坐标
     * @return 原始投影坐标对应的空间坐标.
     */
    rawUnproject(point:any[]):any[] {
        return point;
    }
      /**
     * 一个描述当前投影的字符串
     * @return	描述当前投影的字符串
     */
    toString():string {
        return 'Linear(' + this.zoom + ', ' + this.T.toString() + ')';
    }
}
