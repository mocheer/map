/**
 * author mocheer
 */
/**
 * 瓦片坐标。通过地图切片行号、列号、缩放级别即可唯一确定一个屏幕坐标
 */
export class Coordinate {
    row: number;
    column: number;
    zoom: number;
    /**
     * @param	row	行
     * @param	column	列
     * @param	zoom  缩放级别
     */
    constructor(row: number, column: number, zoom: number) {
        this.row = row;
        this.column = column;
        this.zoom = zoom;
    }
    /**
     * 返回一个包含当前坐标的新的 coordinate 对象。即：向下取整。
     */
    container(): Coordinate {
        return new Coordinate(Math.floor(this.row), Math.floor(this.column), this.zoom);
    }

    /**
     * 将当前坐标缩放至 destination 级别，返回缩放后的对象副本。该方法不修改原始对象。
     * @param	destination	缩放后的缩放级别
     * @return	缩放后对应的坐标（行、列、缩放级别）
     */
    zoomTo(destination: number): Coordinate {
        return new Coordinate(this.row * Math.pow(2, destination - this.zoom), this.column * Math.pow(2, destination - this.zoom), destination);
    }

    /**
     * 对当前坐标缩放 distance 级，返回缩放后对象副本。该方法不修改原始对象。
     * @param	distance	要进行缩放的等级(正数为放大，负数为缩小)
     * @return	缩放后对应的坐标（行、列、缩放级别）
     */
    zoomBy(distance: number): Coordinate {
        return new Coordinate(this.row * Math.pow(2, distance), this.column * Math.pow(2, distance), this.zoom + distance);
    }
    /**
     * 当前坐标是否恰为某行（即不含小数）
     * @return	如果恰为某行，则返回true，否则返回false
     */
    isRowEdge(): Boolean {
        return Math.round(this.row) == this.row;
    }
    /**
     * 当前坐标是否恰为某列（即不含小数）
     * @return	如果恰为某列，则返回true，否则返回false
     */
    isColumnEdge(): Boolean {
        return Math.round(this.column) == this.column;
    }
    /**
     * 当前坐标是否恰为某行列（即不含小数）
     * @return	如果恰为某行某列，则返回true，否则返回false
     */
    isEdge(): Boolean {
        return this.isRowEdge() && this.isColumnEdge();
    }
    /**
     * 返回当前坐标上移 distance 行对应的坐标，即：row - distance
     * @param	distance	往上的行数
     * @return			对应坐标
     */
    up(distance: number = 1): Coordinate {
        return new Coordinate(this.row - distance, this.column, this.zoom);
    }
    /**
     * 返回当前坐标右移 distance 列对应的坐标，即：column + distance
     * @param	distance	往右的列数
     * @return			对应坐标
     */
    right(distance: number = 1): Coordinate {
        return new Coordinate(this.row, this.column + distance, this.zoom);
    }
    /**
     * 返回当前坐标下移 distance 行对应的坐标，即：row + distance
     * @param	distance	下移的行数
     * @return			对应坐标
     */
    down(distance: number = 1): Coordinate {
        return new Coordinate(this.row + distance, this.column, this.zoom);
    }
    /**
     * 返回当前坐标左移 distance 列对应的坐标，即：column - distance
     * @param	distance	往左的列数
     * @return			对应坐标
     */
    left(distance: number = 1): Coordinate {
        return new Coordinate(this.row, this.column - distance, this.zoom);
    }
    /**
     * 如果两个坐标对象表示同一个位置，则返回true，否则返回false.
     */
    equalTo(coord: Coordinate): Boolean {
        return coord && coord.row == this.row && coord.column == this.column && coord.zoom == this.zoom;
    }
    /**
    * 返回当前坐标对应的副本
    * @return	当前坐标对应的副本
    */
    clone(): Coordinate {
        return new Coordinate(this.row, this.column, this.zoom);
    }

    /**
     * 返回坐标的字符串表示形式
     * @return	坐标的字符串表示形式，格式为：column,row,zoom
     */
    toString(): string {
        return this.column + ',' + this.row + ',' + this.zoom;
    }
}
