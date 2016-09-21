//地理坐标系Geographic coordinate system
/**
 * WGS-84转换参数
 * WGS-84椭球体：长半轴：a = 6378137  短半轴：b = 6356752.3142 c = 6399593.6258 扁率倒数：f = 298.257223563 第一偏心率：e2 = 0.0066943799013 第二偏心率：e12 = 0.00673949674227
 */
export const wgs84: any = { "a": 6378137, "f": 298.257223563 }
/**
 * 西安80转换参数
 * 1975年国际椭球体、西安80坐标系:长半轴：a = 6378140  短半轴：b = 6356755.2881575287 c = 6399596.6519880105 扁率倒数：f = 298.257 第一偏心率：e2 = 0.006694384999588 第二偏心率：e12 = 0.006739501819473
 */
export const c80: any = { "a": 6378140, "f": 298.257 }
/**
 * 北京54转换参数
 * 克拉索夫斯基椭球体、北京54坐标系：长半轴：a = 6378245  短半轴：b = 6356863.0187730473 c = 6399698.9017827110 扁率倒数：f = 298.3 第一偏心率：e2 = 0.006693421622966 第二偏心率：e12 = 0.006738525414683
 */
export const bj54: any = { "a": 6378245, "f": 298.3 }
/**
 * 国家2000大地坐标系
 * 全球地心坐标系：长半轴：a＝6378137m 扁率倒数：f＝298.257222101 地心引力常数：GM＝3.986004418×1014m3s-2 自转角速度：ω＝7.292l15×10-5rad s-1
 */
export const cgc2000: any = { "a": 6378137, "f": 298.257222101 }