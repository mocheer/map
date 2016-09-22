/**
 * author mocheer
 */
export class LonLat
{
    lon:number; /**经度，以度为单位表示。范围通常为-180 ~ 180，超出范围的将被映射到此范围内*/
    lat:number; /**纬度，以度为单位表示。范围为-90 ~ 90，取决于具体的数据源（墨卡托投影只支持到±84度）*/
    
    static  MAX_LAT:number = 84;
    static  MIN_LAT:number = -84;
    static  MAX_LON:number = 180;
    static  MIN_LON:number = -180;
    /**
     * 构造函数
     * @param	lon	经度，以度表示
     * @param	lat	纬度，以度表示
     */
    constructor(lon:number, lat:number)
    {
        this.lon = lon;
        this.lat = lat;
    }
     /**
     * 从字符串解析和生成 LonLat 空间坐标对象。
     * @param	str	待解析的空间信息字符串，例如：119.3, 25.1
     * @param	lonlat	若格式为“经度,纬度”，则为true；若为“纬度, 经度”，则为false。
     * @return	解析所得的空间坐标
     */
    static fromString(str:string, lonlat:Boolean=true):LonLat
    {
        var parts:Array<string> = str.split(/\s*,\s*/, 2);
        if (!lonlat) parts = parts.reverse();
        return new LonLat(parseFloat(parts[0]), parseFloat(parts[1]));
    }
    
    /**
     * 将当前空间坐标对象与loc对象比较是否相等。
     * @param	loc	与之进行比较的空间坐标对象
     * @return		若loc不为空，且当前对象与loc的经度、纬度相同，则返回true；否则返回false
     */
    equals(loc:LonLat):Boolean
    {
        return loc && loc.lat == this.lat && loc.lon == this.lon;
    }

    /**
     * 克隆当前对象，返回一个新对象
     * @return	克隆所得的新对象
     */
    clone():LonLat
    {
        return new LonLat(this.lon, this.lat);
    }
    /**
     * 返回当前空间对象在常规坐标范围内(经度±180，纬度±84)的对应映射空间坐标对象（新对象）。例如，362.0, 85.0将被转换为2.0, 84.0，182.0,84.0将被转换为-178.0,84.0
     * @return	当前空间对象在常规坐标范围内(经度±180，纬度±84)的对应映射空间坐标
     */
    normalize():LonLat
    {
        var loc:LonLat = this.clone();
        loc.lat = Math.max(LonLat.MIN_LAT, Math.min(LonLat.MAX_LAT, loc.lat));
        while (loc.lon > 180) loc.lon -= 360;
        while (loc.lon < -180) loc.lon += 360;
        return loc;
    }
    /**
     * 返回空间坐标对象的字符串表示形式
     * @param	precision	小数位数
     * @return		返回逗号分隔的经纬度字符串，如119.28037,25.01342
     */
    toString(precision:number=5):String
    {
        return [this.lon.toFixed(precision), this.lat.toFixed(precision)].join(',');
    }
}
