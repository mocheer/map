/**
 * author mocheer
 */
import {AbstractProjection} from './AbstractProjection';
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
import {Transformation} from '../math/Transformation';
/**
 * 墨卡托投影
 */
export class MercatorProjection extends AbstractProjection 
{
    /**
     * @param	zoom
     * @param	T
     */
    constructor(zoom:number, T:Transformation)
    {
       super(zoom,T)
    }
    /**
     * 根据空间坐标计算原始投影坐标。
     * @return 原始投影坐标，是已经经过投影，但尚未进行矩阵转换的坐标.
     * @see http://mathworld.wolfram.com/MercatorProjection.html
     */
    rawProject(point:any[]):any[]
    {
        return [point[0], Math.log(Math.tan(0.25 * Math.PI + 0.5 * point[1]))];
    }
    /**
     * 根据原始投影坐标计算对应的空间坐标
     * @return 原始投影坐标对应的空间坐标.
     * @see http://mathworld.wolfram.com/MercatorProjection.html
     */
    rawUnproject(point:any[]):any[]
    {
        return [point[0], 2 * Math.atan(Math.pow(Math.E, point[1])) - 0.5 * Math.PI];
    }
     /**
     * 一个描述当前投影的字符串
     * @return	描述当前投影的字符串
     */
    toString():string
    {
        return 'Mercator('+this.zoom+', '+ this.T.toString()+')';
    }
}

