/**
 * author mocheer
 */
import {MercatorProjection} from './MercatorProjection';
import {LonLat} from '../LonLat';
import {Coordinate} from '../Coordinate';
/**
 * 功能：实现百度地图的经纬度到百度坐标的相互转换。本类提取自百度地图js文件，具体投影方式和实现原理暂未研究。
 * 备注：百度坐标原点位于经纬度原点，坐标轴方向也和经纬度坐标相同，原本以像素为单位，除以256即为瓦片坐标，在此直接调整为以瓦片行列号为坐标。
 */
export class BaiduProjection extends MercatorProjection {
	static EARTHRADIUS:number = 6370996.81;
	static MCBAND:any[] = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
	static LLBAND:any[] = [75, 60, 45, 30, 15, 0];
	static MC2LL:any[] = [
		[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
		[- 7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
		[- 3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
		[- 1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
		[3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
		[2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]
	];
	static LL2MC:any[] = [
		[- 0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
		[0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
		[0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
		[0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
		[- 0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
		[- 0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
	];

    rawProject(point:any[]):any[]
    {
		return BaiduProjection.convertLL2MC(point)
    }
    rawUnproject(point:any[]):any[]
    {
		return BaiduProjection.convertMC2LL(point)
    }

	locationCoordinate(loc:LonLat):Coordinate {
        var point:any[] =this.project([loc.lon, loc.lat])
        return new Coordinate(point[1], point[0], this.zoom);
    }
    coordinateLocation(coordinate:Coordinate):LonLat {
        coordinate = coordinate.zoomTo(this.zoom);
        var point:any[] = [coordinate.column, coordinate.row];
        point = this.unproject(point);
        return new LonLat(point[0],point[1]);
    }
	
	static convertMC2LL(aR:any[]):any[] {
		aR = [aR[0] * 256, aR[1] * 256];
		var aS:any[], aU:any[];
		aS = [Math.abs(aR[0]), Math.abs(aR[1])];
		for (var aT:number = 0; aT < BaiduProjection.MCBAND.length; aT++) {
			if (aS[1] >= BaiduProjection.MCBAND[aT]) {
				aU = BaiduProjection.MC2LL[aT];
				break
			}
		}
		return BaiduProjection.convertor(aR, aU);
	}
	static convertLL2MC(e:any[]):any[] {
		var aR:any[], aT:any[];
		aR = [BaiduProjection.getLoop(e[0], -180, 180),BaiduProjection.getRange(e[1], -74, 74)]
		var aS:number;
		for (aS = 0; aS < BaiduProjection.LLBAND.length; aS++) {
			if (aR[1] >= BaiduProjection.LLBAND[aS]) {
				aT = BaiduProjection.LL2MC[aS];
				break
			}
		}
		if (!aT) {
			for (aS = BaiduProjection.LLBAND.length - 1; aS >= 0; aS--) {
				if (e[1] <= -BaiduProjection.LLBAND[aS]) {
					aT = BaiduProjection.LL2MC[aS];
					break
				}
			}
		}
		var aU:any[] = BaiduProjection.convertor(e, aT);
		return [parseFloat(aU[0].toFixed(2)) / 256, parseFloat(aU[1].toFixed(2)) / 256]
	}
	static convertor(aR:any[], aS:any[]):any[] {
		if (!aR || !aS) {
			return null;
		}
		var e:number = aS[0] + aS[1] * Math.abs(aR[0]);
		var i:number = Math.abs(aR[1]) / aS[9];
		var aT:number = aS[2] + aS[3] * i + aS[4] * i * i + aS[5] * i * i * i + aS[6] * i * i * i * i + aS[7] * i * i * i * i * i + aS[8] * i * i * i * i * i * i;
		e *= (aR[0] < 0 ? -1 :1);
		aT *= (aR[1] < 0 ? -1 :1);
		return [e, aT]
	}
	static getRange(aR:number, min:any, max:any):number {
		if (min != null) {
			aR = Math.max(aR, min)
		}
		if (max != null) {
			aR = Math.min(aR, max)
		}
		return aR
	}
	static getLoop(aR:number, i:number, e:number):number {
		while (aR > e) {
			aR -= e - i
		}
		while (aR < i) {
			aR += e - i
		}
		return aR
	}
}