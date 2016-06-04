/**
 * 自定义的用于投影转换的类
 */
export class Transformation {
    protected  ax:number;
    protected  bx:number;
    protected  cx:number;
    protected  ay:number;
    protected  by:number;
    protected  cy:number;
    /**
     * 构造函数，参数和Matrix有所调整。相当于 "new flash.geom.Matrix(ax,bx,ay,by,cx,cy)"
     */
    constructor(ax:number, bx:number, cx:number, ay:number, by:number, cy:number){
        this.ax = ax;
        this.bx = bx;
        this.cx = cx;
        this.ay = ay;
        this.by = by;
        this.cy = cy;
    }
    /**
     * 描述当前转换的字符串
     * @return	返回描述当前转换的字符串，格式为：T([ax, bx, cx][ay,by,cy])
     */
    toString():string {
        return 'T([' + this.ax + ',' +this. bx + ',' + this.cx + '][' + this.ay + ',' + this.by + ',' + this.cy + '])';
    }
    /**
     * 对点进行转换。
     * @param	point	待转换的点
     * @return		转换后的点
     */
    transform(point:any[]):any[] {
        var x = point[0];
        var y = point[1];
        return [this.ax * x + this.bx * y + this.cx, this.ay * x + this.by * y + this.cy];
    }
    /**
     * 对点进行反矩阵转换；即：p = untransform(transform(p))
     * @param	point	待处理的点对象
     * @return		反转换后的对象
     */
    untransform(point:any[]):any[] {
        var x = point[0];
        var y = point[1];
        return  [(x * this.by - y * this.bx - this.cx *this. by + this.cy * this.bx) / (this.ax * this.by - this.ay * this.bx),
            (x * this.ay - y * this.ax -this. cx * this.ay + this.cy * this.ax) / (this.bx * this.ay - this.by * this.ax)];
    }
}
