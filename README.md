#   map
A simple map service

## 弃用声明
这个版本太旧了，可以考虑直接用新算法：
1、弧度计算后置（这样4326的投影计算变得非常简单，3857不变）
2、矩阵变换，去掉bx和ay，6参数变成4参数
3、去掉计算瓦片总个数，优化相关算法

这样整体算法会很简洁，性能也更高。

## TODO
- 合成并导出在线地图 （√，需优化）

## 投影方式:
|名称|描述|
|----|----|
|MercatorProjection   |Web墨卡托投影 |
|LinearProjection     |线性投影      |
|GaussKrugerProjection|高斯-克里格投影|

## 在线地图:
|名称|地理坐标系|投影方式|备注|
|----|---------|-------|---|
|谷歌地图|WGS84|Web墨卡托投影|
|百度地图|WGS84|Web墨卡托投影|BD09坐标系|
|天地图  |WGS84|Web墨卡托投影/线性投影|
|高德地图|WGS84|Web墨卡托投影|
|苏州地图|Beijing54|高斯-克里格投影|iserver发布的服务，内网|

## example:
![example](assets/search.png)
