!function(t){function o(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,o),i.loaded=!0,i.exports}var r={};return o.m=t,o.c=r,o.p="",o(0)}([function(t,o,r){"use strict";function n(){String.prototype.format||(String.prototype.format=function(t){var o=this;if(arguments.length>0)if(1==arguments.length&&"object"==typeof t){for(var r in t)if(void 0!=t[r]){var n=new RegExp("({"+r+"})","g");o=o.replace(n,t[r])}}else for(var i=0;i<arguments.length;i++)if(void 0!=arguments[i]){var n=new RegExp("({["+i+"]})","g");o=o.replace(n,arguments[i])}return o})}var i=r(1),e=function(){function t(t){this.provider=t,this.mapProvider=new i.MapProvider(t)}return t.prototype.getMapTile=function(t,o,r){return this.mapProvider.getMapTile(t,o,r)},t}();o.MapServer=e,function(t,o){t.document?o(t):function(t){if(!t.document)throw new Error("MapServer requires a window with a document");return o(t)}}("undefined"!=typeof window?window:this,function(t,o){o||(t.MapServer=e,n())})},function(t,o,r){"use strict";var n=r(2),i=r(8),e={GoogleProvider_AERIAL:n.GoogleProvider_AERIAL,GoogleProvider_HYBRID:n.GoogleProvider_HYBRID,GoogleProvider_ROAD:n.GoogleProvider_ROAD},s=function(){function t(t){t=e[t],t&&(this.provider=new t)}return t.prototype.getMapTile=function(t,o,r){var n=new i.MapTile(this.provider,t,o,r);return n},t}();o.MapProvider=s},function(t,o,r){"use strict";var n=this&&this.__extends||function(t,o){function r(){this.constructor=t}for(var n in o)o.hasOwnProperty(n)&&(t[n]=o[n]);t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)},i=r(3),e=function(t){function o(){t.call(this)}return n(o,t),o.prototype.getTileUrls=function(t){if(t.row<0||t.row>=Math.pow(2,t.zoom))return null;var o=this.sourceCoordinate(t),r=Math.round(3*Math.random()),n="Galileo".substr(0,Math.floor(8*Math.random())),i=this.urlTemplate,e=i.format(r,o.column,o.row,o.zoom,n);return[e]},o.prototype.toString=function(){return"GoogleProvider_"+this.type},o}(i.AbstractMapProvider);o.GoogleProvider=e;var s=function(t){function o(){t.call(this),this.type="AERIAL",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return n(o,t),o}(e);o.GoogleProvider_AERIAL=s;var a=function(t){function o(){t.call(this),this.type="HYBRID",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=p&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return n(o,t),o}(e);o.GoogleProvider_HYBRID=a;var u=function(t){function o(){t.call(this),this.type="ROAD",this.urlTemplate="http://mt{0}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}"}return n(o,t),o}(e);o.GoogleProvider_ROAD=u},function(t,o,r){"use strict";var n=r(4),i=r(5),e=r(6),s=function(){function t(o,r,s,a){void 0===o&&(o=t.MIN_ZOOM),void 0===r&&(r=t.MAX_ZOOM),void 0===s&&(s=0),void 0===a&&(a=0);var u=new i.Transformation(10680707.79,0,33554431.85+s,0,-10680708.9,33554430.57+a);this.projection=new e.MercatorProjection(26,u),this.topLeftOutLimit=new n.Coordinate(0,Number.NEGATIVE_INFINITY,o),this.bottomRightInLimit=new n.Coordinate(1,Number.POSITIVE_INFINITY,0).zoomTo(r)}return t.prototype.geometry=function(){return this.projection.toString()},t.prototype.sourceCoordinate=function(t){for(var o=t.column%Math.pow(2,t.zoom);0>o;)o+=Math.pow(2,t.zoom);return new n.Coordinate(t.row,o,t.zoom)},t.prototype.outerLimits=function(){return[this.topLeftOutLimit.clone(),this.bottomRightInLimit.clone()]},t.prototype.locationCoordinate=function(t){return this.projection.locationCoordinate(t)},t.prototype.coordinateLocation=function(t){return this.projection.coordinateLocation(t)},Object.defineProperty(t.prototype,"tileWidth",{get:function(){return 256},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"tileHeight",{get:function(){return 256},enumerable:!0,configurable:!0}),t.MIN_ZOOM=1,t.MAX_ZOOM=20,t}();o.AbstractMapProvider=s},function(t,o){"use strict";var r=function(){function t(t,o,r){this.row=t,this.column=o,this.zoom=r}return t.prototype.container=function(){return new t(Math.floor(this.row),Math.floor(this.column),this.zoom)},t.prototype.zoomTo=function(o){return new t(this.row*Math.pow(2,o-this.zoom),this.column*Math.pow(2,o-this.zoom),o)},t.prototype.zoomBy=function(o){return new t(this.row*Math.pow(2,o),this.column*Math.pow(2,o),this.zoom+o)},t.prototype.isRowEdge=function(){return Math.round(this.row)==this.row},t.prototype.isColumnEdge=function(){return Math.round(this.column)==this.column},t.prototype.isEdge=function(){return this.isRowEdge()&&this.isColumnEdge()},t.prototype.up=function(o){return void 0===o&&(o=1),new t(this.row-o,this.column,this.zoom)},t.prototype.right=function(o){return void 0===o&&(o=1),new t(this.row,this.column+o,this.zoom)},t.prototype.down=function(o){return void 0===o&&(o=1),new t(this.row+o,this.column,this.zoom)},t.prototype.left=function(o){return void 0===o&&(o=1),new t(this.row,this.column-o,this.zoom)},t.prototype.equalTo=function(t){return t&&t.row==this.row&&t.column==this.column&&t.zoom==this.zoom},t.prototype.clone=function(){return new t(this.row,this.column,this.zoom)},t.prototype.toString=function(){return this.column+","+this.row+","+this.zoom},t}();o.Coordinate=r},function(t,o){"use strict";var r=function(){function t(t,o,r,n,i,e){this.ax=t,this.bx=o,this.cx=r,this.ay=n,this.by=i,this.cy=e}return t.prototype.toString=function(){return"T(["+this.ax+","+this.bx+","+this.cx+"]["+this.ay+","+this.by+","+this.cy+"])"},t.prototype.transform=function(t){var o=t[0],r=t[1];return[this.ax*o+this.bx*r+this.cx,this.ay*o+this.by*r+this.cy]},t.prototype.untransform=function(t){var o=t[0],r=t[1];return[(o*this.by-r*this.bx-this.cx*this.by+this.cy*this.bx)/(this.ax*this.by-this.ay*this.bx),(o*this.ay-r*this.ax-this.cx*this.ay+this.cy*this.ax)/(this.bx*this.ay-this.by*this.ax)]},t}();o.Transformation=r},function(t,o,r){"use strict";var n=r(7),i=r(4),e=function(){function t(t,o){o&&(this.T=o),this.zoom=t}return t.prototype.project=function(t){return t=this.rawProject(t),this.T&&(t=this.T.transform(t)),t},t.prototype.unproject=function(t){return this.T&&(t=this.T.untransform(t)),t=this.rawUnproject(t)},t.prototype.locationCoordinate=function(t){var o=[Math.PI*t.lon/180,Math.PI*t.lat/180];return o=this.project(o),new i.Coordinate(o[1],o[0],this.zoom)},t.prototype.coordinateLocation=function(t){t=t.zoomTo(this.zoom);var o=[t.column,t.row];return o=this.unproject(o),new n.LonLat(180*o[0]/Math.PI,180*o[1]/Math.PI)},t.prototype.rawProject=function(t){return[t[0],Math.log(Math.tan(.25*Math.PI+.5*t[1]))]},t.prototype.rawUnproject=function(t){return[t[0],2*Math.atan(Math.pow(Math.E,t[1]))-.5*Math.PI]},t.prototype.toString=function(){return"Mercator("+this.zoom+", "+this.T.toString()+")"},t}();o.MercatorProjection=e},function(t,o){"use strict";var r=function(){function t(t,o){this.lon=t,this.lat=o}return t.fromString=function(o,r){void 0===r&&(r=!0);var n=o.split(/\s*,\s*/,2);return r||(n=n.reverse()),new t(parseFloat(n[0]),parseFloat(n[1]))},t.prototype.equals=function(t){return t&&t.lat==this.lat&&t.lon==this.lon},t.prototype.clone=function(){return new t(this.lon,this.lat)},t.prototype.normalize=function(){var o=this.clone();for(o.lat=Math.max(t.MIN_LAT,Math.min(t.MAX_LAT,o.lat));o.lon>180;)o.lon-=360;for(;o.lon<-180;)o.lon+=360;return o},t.prototype.toString=function(t){return void 0===t&&(t=5),[this.lon.toFixed(t),this.lat.toFixed(t)].join(",")},t.MAX_LAT=84,t.MIN_LAT=-84,t.MAX_LON=180,t.MIN_LON=-180,t}();o.LonLat=r},function(t,o,r){"use strict";var n=r(4),i=r(7),e=function(){function t(t,o,r,n){this.provider=t,this.lonlat=new i.LonLat(o,r);var e=t.locationCoordinate(this.lonlat),s=n-e.zoom;this.coordinate=e.zoomBy(s).container();var a=this.coordinate.zoomBy(-s),u=Math.pow(2,s);this.scaleValue=t.tileWidth*u,this.offset=[(e.column-a.column)*this.scaleValue,(e.row-a.row)*this.scaleValue],this.realMaxCoordinate=e}return t.prototype.getUrls=function(){return void 0===this.urls&&(this.urls=this.provider.getTileUrls(this.coordinate)),this.urls},t.prototype.getOffsetLonlat=function(t){var o=this.realMaxCoordinate.column-t[0]/this.scaleValue,r=this.realMaxCoordinate.row-t[1]/this.scaleValue,i=new n.Coordinate(r,o,this.realMaxCoordinate.zoom);return this.provider.coordinateLocation(i)},t.prototype.toString=function(){var t=this.lonlat,o=[Math.PI*t.lon/180,Math.PI*t.lat/180],r=this.provider.projection.project(o),n="provider:"+this.provider.toString()+"\nlonlat:"+t.toString()+"(经纬度-地理坐标)\ntransformXY:"+r.toString()+"(投影坐标)\ncoordinate:"+this.coordinate.toString()+"(瓦片坐标)\nscaleValue:"+this.scaleValue.toString()+"\noffset:"+this.offset+"(偏移坐标)\nurls:"+this.getUrls()+"(瓦片服务地址)\n";return n},t}();o.MapTile=e}]);