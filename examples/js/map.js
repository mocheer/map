/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var MapProvider_1 = __webpack_require__(1);
	var MapServer = (function () {
	    function MapServer(provider) {
	        this.provider = provider;
	        this.mapProvider = new MapProvider_1.MapProvider(provider);
	    }
	    MapServer.prototype.getMapTile = function (lon, lat, zoom) {
	        return this.mapProvider.getMapTile(lon, lat, zoom);
	    };
	    return MapServer;
	}());
	exports.MapServer = MapServer;
	(function (global, factory) {
	    global.document ? factory(global) : function (w) {
	        if (!w.document) {
	            throw new Error("MapServer requires a window with a document");
	        }
	        return factory(w);
	    };
	}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	    if (!noGlobal) {
	        window.MapServer = MapServer;
	        loadUtility();
	    }
	}));
	function loadUtility() {
	    if (!String.prototype["format"]) {
	        String.prototype["format"] = function (args) {
	            var result = this;
	            if (arguments.length > 0) {
	                if (arguments.length == 1 && typeof (args) == "object") {
	                    for (var key in args) {
	                        if (args[key] != undefined) {
	                            var reg = new RegExp("({" + key + "})", "g");
	                            result = result.replace(reg, args[key]);
	                        }
	                    }
	                }
	                else {
	                    for (var i = 0; i < arguments.length; i++) {
	                        if (arguments[i] != undefined) {
	                            var reg = new RegExp("({[" + i + "]})", "g");
	                            result = result.replace(reg, arguments[i]);
	                        }
	                    }
	                }
	            }
	            return result;
	        };
	    }
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GoogleProvider_1 = __webpack_require__(2);
	var BaiduProvider_1 = __webpack_require__(9);
	var GaoDeProvider_1 = __webpack_require__(11);
	var TianDiProvider_1 = __webpack_require__(12);
	var GaussKrugerProvider_1 = __webpack_require__(13);
	var MapTile_1 = __webpack_require__(17);
	var ALLProviders = {
	    "GaussKrugerProvider_szsatellite": GaussKrugerProvider_1.GaussKrugerProvider_szsatellite,
	    "GoogleProvider_AERIAL": GoogleProvider_1.GoogleProvider_AERIAL,
	    "GoogleProvider_HYBRID": GoogleProvider_1.GoogleProvider_HYBRID,
	    "GoogleProvider_ROAD": GoogleProvider_1.GoogleProvider_ROAD,
	    "BaiduProvider_AERIAL": BaiduProvider_1.BaiduProvider_AERIAL,
	    "BaiduProvider_ROAD": BaiduProvider_1.BaiduProvider_ROAD,
	    "TianDiProvider_AERIAL": TianDiProvider_1.TianDiProvider_AERIAL,
	    "TianDiProvider_ROAD": TianDiProvider_1.TianDiProvider_ROAD,
	    "GaoDeProvider_AERIAL": GaoDeProvider_1.GaoDeProvider_AERIAL,
	    "GaoDeProvider_ROAD": GaoDeProvider_1.GaoDeProvider_ROAD
	};
	var MapProvider = (function () {
	    function MapProvider(provider) {
	        provider = ALLProviders[provider];
	        if (provider) {
	            this.provider = new provider();
	        }
	    }
	    MapProvider.prototype.getMapTile = function (lon, lat, zoom) {
	        var tile = new MapTile_1.MapTile(this.provider, lon, lat, zoom);
	        return tile;
	    };
	    return MapProvider;
	}());
	exports.MapProvider = MapProvider;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractMapProvider_1 = __webpack_require__(3);
	var GoogleProvider = (function (_super) {
	    __extends(GoogleProvider, _super);
	    function GoogleProvider() {
	        _super.call(this);
	    }
	    GoogleProvider.prototype.getTileUrls = function (coord) {
	        if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
	            return null;
	        }
	        var sourceCoord = this.sourceCoordinate(coord);
	        var server = coord.row % 4;
	        var s = "Galileo".substr(0, Math.floor(Math.random() * 8));
	        var url = this.urlTemplate;
	        var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom, s);
	        return [result];
	    };
	    GoogleProvider.prototype.toString = function () {
	        return "GoogleProvider_" + this.type;
	    };
	    return GoogleProvider;
	}(AbstractMapProvider_1.AbstractMapProvider));
	exports.GoogleProvider = GoogleProvider;
	var GoogleProvider_AERIAL = (function (_super) {
	    __extends(GoogleProvider_AERIAL, _super);
	    function GoogleProvider_AERIAL() {
	        _super.call(this);
	        this.type = "AERIAL";
	        this.urlTemplate = "http://mt{0}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}";
	    }
	    return GoogleProvider_AERIAL;
	}(GoogleProvider));
	exports.GoogleProvider_AERIAL = GoogleProvider_AERIAL;
	var GoogleProvider_HYBRID = (function (_super) {
	    __extends(GoogleProvider_HYBRID, _super);
	    function GoogleProvider_HYBRID() {
	        _super.call(this);
	        this.type = "HYBRID";
	        this.urlTemplate = "http://mt{0}.google.cn/vt/lyrs=p&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}";
	    }
	    return GoogleProvider_HYBRID;
	}(GoogleProvider));
	exports.GoogleProvider_HYBRID = GoogleProvider_HYBRID;
	var GoogleProvider_ROAD = (function (_super) {
	    __extends(GoogleProvider_ROAD, _super);
	    function GoogleProvider_ROAD() {
	        _super.call(this);
	        this.type = "ROAD";
	        this.urlTemplate = "http://mt{0}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={1}&y={2}&z={3}&s={4}";
	    }
	    return GoogleProvider_ROAD;
	}(GoogleProvider));
	exports.GoogleProvider_ROAD = GoogleProvider_ROAD;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Coordinate_1 = __webpack_require__(4);
	var Transformation_1 = __webpack_require__(5);
	var MercatorProjection_1 = __webpack_require__(6);
	var AbstractMapProvider = (function () {
	    function AbstractMapProvider(minZoom, maxZoom, tx, ty) {
	        if (minZoom === void 0) { minZoom = AbstractMapProvider.MIN_ZOOM; }
	        if (maxZoom === void 0) { maxZoom = AbstractMapProvider.MAX_ZOOM; }
	        if (tx === void 0) { tx = 0.0; }
	        if (ty === void 0) { ty = 0.0; }
	        this.init(minZoom, maxZoom, tx, ty);
	    }
	    AbstractMapProvider.prototype.init = function (minZoom, maxZoom, tx, ty) {
	        var t = new Transformation_1.Transformation(1.068070779e7, 0, 3.355443185e7 + tx, 0, -1.068070890e7, 3.355443057e7 + ty);
	        this.projection = new MercatorProjection_1.MercatorProjection(26, t);
	        this.topLeftOutLimit = new Coordinate_1.Coordinate(0, Number.NEGATIVE_INFINITY, minZoom);
	        this.bottomRightInLimit = (new Coordinate_1.Coordinate(1, Number.POSITIVE_INFINITY, 0)).zoomTo(maxZoom);
	    };
	    AbstractMapProvider.prototype.geometry = function () {
	        return this.projection.toString();
	    };
	    AbstractMapProvider.prototype.sourceCoordinate = function (coord) {
	        var wrappedColumn = coord.column % Math.pow(2, coord.zoom);
	        while (wrappedColumn < 0) {
	            wrappedColumn += Math.pow(2, coord.zoom);
	        }
	        return new Coordinate_1.Coordinate(coord.row, wrappedColumn, coord.zoom);
	    };
	    AbstractMapProvider.prototype.outerLimits = function () {
	        return [this.topLeftOutLimit.clone(), this.bottomRightInLimit.clone()];
	    };
	    AbstractMapProvider.prototype.locationCoordinate = function (lonlat) {
	        return this.projection.locationCoordinate(lonlat);
	    };
	    AbstractMapProvider.prototype.coordinateLocation = function (coordinate) {
	        return this.projection.coordinateLocation(coordinate);
	    };
	    Object.defineProperty(AbstractMapProvider.prototype, "tileWidth", {
	        get: function () {
	            return 256;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AbstractMapProvider.prototype, "tileHeight", {
	        get: function () {
	            return 256;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AbstractMapProvider.MIN_ZOOM = 1;
	    AbstractMapProvider.MAX_ZOOM = 20;
	    return AbstractMapProvider;
	}());
	exports.AbstractMapProvider = AbstractMapProvider;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Coordinate = (function () {
	    function Coordinate(row, column, zoom) {
	        this.row = row;
	        this.column = column;
	        this.zoom = zoom;
	    }
	    Coordinate.prototype.container = function () {
	        return new Coordinate(Math.floor(this.row), Math.floor(this.column), this.zoom);
	    };
	    Coordinate.prototype.zoomTo = function (destination) {
	        return new Coordinate(this.row * Math.pow(2, destination - this.zoom), this.column * Math.pow(2, destination - this.zoom), destination);
	    };
	    Coordinate.prototype.zoomBy = function (distance) {
	        return new Coordinate(this.row * Math.pow(2, distance), this.column * Math.pow(2, distance), this.zoom + distance);
	    };
	    Coordinate.prototype.isRowEdge = function () {
	        return Math.round(this.row) == this.row;
	    };
	    Coordinate.prototype.isColumnEdge = function () {
	        return Math.round(this.column) == this.column;
	    };
	    Coordinate.prototype.isEdge = function () {
	        return this.isRowEdge() && this.isColumnEdge();
	    };
	    Coordinate.prototype.up = function (distance) {
	        if (distance === void 0) { distance = 1; }
	        return new Coordinate(this.row - distance, this.column, this.zoom);
	    };
	    Coordinate.prototype.right = function (distance) {
	        if (distance === void 0) { distance = 1; }
	        return new Coordinate(this.row, this.column + distance, this.zoom);
	    };
	    Coordinate.prototype.down = function (distance) {
	        if (distance === void 0) { distance = 1; }
	        return new Coordinate(this.row + distance, this.column, this.zoom);
	    };
	    Coordinate.prototype.left = function (distance) {
	        if (distance === void 0) { distance = 1; }
	        return new Coordinate(this.row, this.column - distance, this.zoom);
	    };
	    Coordinate.prototype.equalTo = function (coord) {
	        return coord && coord.row == this.row && coord.column == this.column && coord.zoom == this.zoom;
	    };
	    Coordinate.prototype.clone = function () {
	        return new Coordinate(this.row, this.column, this.zoom);
	    };
	    Coordinate.prototype.toString = function () {
	        return this.column + ',' + this.row + ',' + this.zoom;
	    };
	    return Coordinate;
	}());
	exports.Coordinate = Coordinate;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var Transformation = (function () {
	    function Transformation(ax, bx, cx, ay, by, cy) {
	        this.ax = ax;
	        this.bx = bx;
	        this.cx = cx;
	        this.ay = ay;
	        this.by = by;
	        this.cy = cy;
	    }
	    Transformation.prototype.toString = function () {
	        return 'T([' + this.ax + ',' + this.bx + ',' + this.cx + '][' + this.ay + ',' + this.by + ',' + this.cy + '])';
	    };
	    Transformation.prototype.transform = function (point) {
	        var x = point[0];
	        var y = point[1];
	        return [this.ax * x + this.bx * y + this.cx, this.ay * x + this.by * y + this.cy];
	    };
	    Transformation.prototype.untransform = function (point) {
	        var x = point[0];
	        var y = point[1];
	        return [(x * this.by - y * this.bx - this.cx * this.by + this.cy * this.bx) / (this.ax * this.by - this.ay * this.bx),
	            (x * this.ay - y * this.ax - this.cx * this.ay + this.cy * this.ax) / (this.bx * this.ay - this.by * this.ax)];
	    };
	    return Transformation;
	}());
	exports.Transformation = Transformation;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractProjection_1 = __webpack_require__(7);
	var MercatorProjection = (function (_super) {
	    __extends(MercatorProjection, _super);
	    function MercatorProjection(zoom, T) {
	        _super.call(this, zoom, T);
	    }
	    MercatorProjection.prototype.rawProject = function (point) {
	        return [point[0], Math.log(Math.tan(0.25 * Math.PI + 0.5 * point[1]))];
	    };
	    MercatorProjection.prototype.rawUnproject = function (point) {
	        return [point[0], 2 * Math.atan(Math.pow(Math.E, point[1])) - 0.5 * Math.PI];
	    };
	    MercatorProjection.prototype.toString = function () {
	        return 'Mercator(' + this.zoom + ', ' + this.T.toString() + ')';
	    };
	    return MercatorProjection;
	}(AbstractProjection_1.AbstractProjection));
	exports.MercatorProjection = MercatorProjection;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var LonLat_1 = __webpack_require__(8);
	var Coordinate_1 = __webpack_require__(4);
	var AbstractProjection = (function () {
	    function AbstractProjection(zoom, T) {
	        this.T = T;
	        this.zoom = zoom;
	    }
	    AbstractProjection.prototype.project = function (point) {
	        point = this.rawProject(point);
	        if (this.T)
	            point = this.T.transform(point);
	        return point;
	    };
	    AbstractProjection.prototype.unproject = function (point) {
	        if (this.T)
	            point = this.T.untransform(point);
	        return this.rawUnproject(point);
	    };
	    AbstractProjection.prototype.locationCoordinate = function (loc) {
	        var point = this.project([Math.PI * loc.lon / 180, Math.PI * loc.lat / 180]);
	        return new Coordinate_1.Coordinate(point[1], point[0], this.zoom);
	    };
	    AbstractProjection.prototype.coordinateLocation = function (coordinate) {
	        coordinate = coordinate.zoomTo(this.zoom);
	        var point = [coordinate.column, coordinate.row];
	        point = this.unproject(point);
	        return new LonLat_1.LonLat(180 * point[0] / Math.PI, 180 * point[1] / Math.PI);
	    };
	    AbstractProjection.prototype.rawProject = function (point) {
	        console.error("Abstract method not implemented by subclass.");
	        return null;
	    };
	    AbstractProjection.prototype.rawUnproject = function (point) {
	        console.error("Abstract method not implemented by subclass.");
	        return null;
	    };
	    AbstractProjection.prototype.toString = function () {
	        console.error("Abstract method not implemented by subclass.");
	        return "";
	    };
	    return AbstractProjection;
	}());
	exports.AbstractProjection = AbstractProjection;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var LonLat = (function () {
	    function LonLat(lon, lat) {
	        this.lon = lon;
	        this.lat = lat;
	    }
	    LonLat.fromString = function (str, lonlat) {
	        if (lonlat === void 0) { lonlat = true; }
	        var parts = str.split(/\s*,\s*/, 2);
	        if (!lonlat)
	            parts = parts.reverse();
	        return new LonLat(parseFloat(parts[0]), parseFloat(parts[1]));
	    };
	    LonLat.prototype.equals = function (loc) {
	        return loc && loc.lat == this.lat && loc.lon == this.lon;
	    };
	    LonLat.prototype.clone = function () {
	        return new LonLat(this.lon, this.lat);
	    };
	    LonLat.prototype.normalize = function () {
	        var loc = this.clone();
	        loc.lat = Math.max(LonLat.MIN_LAT, Math.min(LonLat.MAX_LAT, loc.lat));
	        while (loc.lon > 180)
	            loc.lon -= 360;
	        while (loc.lon < -180)
	            loc.lon += 360;
	        return loc;
	    };
	    LonLat.prototype.toString = function (precision) {
	        if (precision === void 0) { precision = 5; }
	        return [this.lon.toFixed(precision), this.lat.toFixed(precision)].join(',');
	    };
	    LonLat.MAX_LAT = 84;
	    LonLat.MIN_LAT = -84;
	    LonLat.MAX_LON = 180;
	    LonLat.MIN_LON = -180;
	    return LonLat;
	}());
	exports.LonLat = LonLat;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractMapProvider_1 = __webpack_require__(3);
	var Coordinate_1 = __webpack_require__(4);
	var Transformation_1 = __webpack_require__(5);
	var BaiduProjection_1 = __webpack_require__(10);
	var BaiduProvider = (function (_super) {
	    __extends(BaiduProvider, _super);
	    function BaiduProvider() {
	        _super.call(this);
	    }
	    BaiduProvider.prototype.init = function (minZoom, maxZoom, tx, ty) {
	        if (minZoom === void 0) { minZoom = 1; }
	        if (maxZoom === void 0) { maxZoom = 19; }
	        var t = new Transformation_1.Transformation(1, 0, 131072, 0, -1, 131072);
	        this.projection = new BaiduProjection_1.BaiduProjection(18, t);
	        this.topLeftOutLimit = new Coordinate_1.Coordinate(0, 0, minZoom);
	        this.bottomRightInLimit = (new Coordinate_1.Coordinate(1, 1, 0)).zoomTo(maxZoom);
	    };
	    BaiduProvider.prototype.getTileUrls = function (coord) {
	        if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
	            return null;
	        }
	        var sourceCoord = this.sourceCoordinate(coord);
	        var _nZ = Math.pow(2, 18 - coord.zoom);
	        var _nX = coord.column - 131072 / _nZ;
	        var _nY = 131072 / _nZ - coord.row - 1;
	        var server = coord.row % 4;
	        var url = this.urlTemplate;
	        var result = url.format(server, _nX.toString().replace("-", "M"), _nY.toString().replace("-", "M"), coord.zoom);
	        return [result];
	    };
	    BaiduProvider.prototype.toString = function () {
	        return "BaiduProvider_" + this.type;
	    };
	    return BaiduProvider;
	}(AbstractMapProvider_1.AbstractMapProvider));
	exports.BaiduProvider = BaiduProvider;
	var BaiduProvider_AERIAL = (function (_super) {
	    __extends(BaiduProvider_AERIAL, _super);
	    function BaiduProvider_AERIAL() {
	        _super.call(this);
	        this.type = "AERIAL";
	        this.urlTemplate = "http://online{0}.map.bdimg.com/tile/?qt=tile&x={1}&y={2}&z={3}&styles=sl&v=068&udt=20150418";
	    }
	    return BaiduProvider_AERIAL;
	}(BaiduProvider));
	exports.BaiduProvider_AERIAL = BaiduProvider_AERIAL;
	var BaiduProvider_ROAD = (function (_super) {
	    __extends(BaiduProvider_ROAD, _super);
	    function BaiduProvider_ROAD() {
	        _super.call(this);
	        this.type = "ROAD";
	        this.urlTemplate = "http://online{0}.map.bdimg.com/tile/?qt=tile&x={1}&y={2}&z={3}&styles=pl&udt=20150421&scaler=1";
	    }
	    return BaiduProvider_ROAD;
	}(BaiduProvider));
	exports.BaiduProvider_ROAD = BaiduProvider_ROAD;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var MercatorProjection_1 = __webpack_require__(6);
	var LonLat_1 = __webpack_require__(8);
	var Coordinate_1 = __webpack_require__(4);
	var BaiduProjection = (function (_super) {
	    __extends(BaiduProjection, _super);
	    function BaiduProjection() {
	        _super.apply(this, arguments);
	    }
	    BaiduProjection.prototype.rawProject = function (point) {
	        return BaiduProjection.convertLL2MC(point);
	    };
	    BaiduProjection.prototype.rawUnproject = function (point) {
	        return BaiduProjection.convertMC2LL(point);
	    };
	    BaiduProjection.prototype.locationCoordinate = function (loc) {
	        var point = this.project([loc.lon, loc.lat]);
	        return new Coordinate_1.Coordinate(point[1], point[0], this.zoom);
	    };
	    BaiduProjection.prototype.coordinateLocation = function (coordinate) {
	        coordinate = coordinate.zoomTo(this.zoom);
	        var point = [coordinate.column, coordinate.row];
	        point = this.unproject(point);
	        return new LonLat_1.LonLat(point[0], point[1]);
	    };
	    BaiduProjection.convertMC2LL = function (aR) {
	        aR = [aR[0] * 256, aR[1] * 256];
	        var aS, aU;
	        aS = [Math.abs(aR[0]), Math.abs(aR[1])];
	        for (var aT = 0; aT < BaiduProjection.MCBAND.length; aT++) {
	            if (aS[1] >= BaiduProjection.MCBAND[aT]) {
	                aU = BaiduProjection.MC2LL[aT];
	                break;
	            }
	        }
	        return BaiduProjection.convertor(aR, aU);
	    };
	    BaiduProjection.convertLL2MC = function (e) {
	        var aR, aT;
	        aR = [BaiduProjection.getLoop(e[0], -180, 180), BaiduProjection.getRange(e[1], -74, 74)];
	        var aS;
	        for (aS = 0; aS < BaiduProjection.LLBAND.length; aS++) {
	            if (aR[1] >= BaiduProjection.LLBAND[aS]) {
	                aT = BaiduProjection.LL2MC[aS];
	                break;
	            }
	        }
	        if (!aT) {
	            for (aS = BaiduProjection.LLBAND.length - 1; aS >= 0; aS--) {
	                if (e[1] <= -BaiduProjection.LLBAND[aS]) {
	                    aT = BaiduProjection.LL2MC[aS];
	                    break;
	                }
	            }
	        }
	        var aU = BaiduProjection.convertor(e, aT);
	        return [parseFloat(aU[0].toFixed(2)) / 256, parseFloat(aU[1].toFixed(2)) / 256];
	    };
	    BaiduProjection.convertor = function (aR, aS) {
	        if (!aR || !aS) {
	            return null;
	        }
	        var e = aS[0] + aS[1] * Math.abs(aR[0]);
	        var i = Math.abs(aR[1]) / aS[9];
	        var aT = aS[2] + aS[3] * i + aS[4] * i * i + aS[5] * i * i * i + aS[6] * i * i * i * i + aS[7] * i * i * i * i * i + aS[8] * i * i * i * i * i * i;
	        e *= (aR[0] < 0 ? -1 : 1);
	        aT *= (aR[1] < 0 ? -1 : 1);
	        return [e, aT];
	    };
	    BaiduProjection.getRange = function (aR, min, max) {
	        if (min != null) {
	            aR = Math.max(aR, min);
	        }
	        if (max != null) {
	            aR = Math.min(aR, max);
	        }
	        return aR;
	    };
	    BaiduProjection.getLoop = function (aR, i, e) {
	        while (aR > e) {
	            aR -= e - i;
	        }
	        while (aR < i) {
	            aR += e - i;
	        }
	        return aR;
	    };
	    BaiduProjection.EARTHRADIUS = 6370996.81;
	    BaiduProjection.MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
	    BaiduProjection.LLBAND = [75, 60, 45, 30, 15, 0];
	    BaiduProjection.MC2LL = [
	        [1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2],
	        [-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86],
	        [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
	        [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
	        [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
	        [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]
	    ];
	    BaiduProjection.LL2MC = [
	        [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
	        [0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5],
	        [0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5],
	        [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
	        [-0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
	        [-0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
	    ];
	    return BaiduProjection;
	}(MercatorProjection_1.MercatorProjection));
	exports.BaiduProjection = BaiduProjection;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractMapProvider_1 = __webpack_require__(3);
	var GaoDeProvider = (function (_super) {
	    __extends(GaoDeProvider, _super);
	    function GaoDeProvider() {
	        _super.call(this);
	    }
	    GaoDeProvider.prototype.getTileUrls = function (coord) {
	        if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
	            return null;
	        }
	        var sourceCoord = this.sourceCoordinate(coord);
	        var server = coord.row % 4 + 1;
	        var url = this.urlTemplate;
	        if (typeof url === "object") {
	            return url.map(function (value) {
	                return value.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom);
	            });
	        }
	        var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom);
	        return [result];
	    };
	    GaoDeProvider.prototype.toString = function () {
	        return "GaoDeProvider_" + this.type;
	    };
	    return GaoDeProvider;
	}(AbstractMapProvider_1.AbstractMapProvider));
	exports.GaoDeProvider = GaoDeProvider;
	var GaoDeProvider_ROAD = (function (_super) {
	    __extends(GaoDeProvider_ROAD, _super);
	    function GaoDeProvider_ROAD() {
	        _super.call(this);
	        this.type = "ROAD";
	        this.urlTemplate = "http://webrd0{0}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={1}&y={2}&z={3}";
	    }
	    return GaoDeProvider_ROAD;
	}(GaoDeProvider));
	exports.GaoDeProvider_ROAD = GaoDeProvider_ROAD;
	var GaoDeProvider_AERIAL = (function (_super) {
	    __extends(GaoDeProvider_AERIAL, _super);
	    function GaoDeProvider_AERIAL() {
	        _super.call(this);
	        this.type = "AERIAL";
	        this.urlTemplate = ["http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=6&x={1}&y={2}&z={3}", "http://webst0{0}.is.autonavi.com/appmaptile?scale=1&style=8&x={1}&y={2}&z={3}"];
	    }
	    return GaoDeProvider_AERIAL;
	}(GaoDeProvider));
	exports.GaoDeProvider_AERIAL = GaoDeProvider_AERIAL;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractMapProvider_1 = __webpack_require__(3);
	var TianDiProvider = (function (_super) {
	    __extends(TianDiProvider, _super);
	    function TianDiProvider() {
	        _super.call(this);
	    }
	    TianDiProvider.prototype.getTileUrls = function (coord) {
	        if (coord.row < 0 || coord.row >= Math.pow(2, coord.zoom)) {
	            return null;
	        }
	        var sourceCoord = this.sourceCoordinate(coord);
	        var server = coord.row % 7;
	        var url = this.urlTemplate;
	        var result = url.format(server, sourceCoord.column, sourceCoord.row, sourceCoord.zoom);
	        return [result];
	    };
	    TianDiProvider.prototype.toString = function () {
	        return "TianDiProvider_" + this.type;
	    };
	    return TianDiProvider;
	}(AbstractMapProvider_1.AbstractMapProvider));
	exports.TianDiProvider = TianDiProvider;
	var TianDiProvider_AERIAL = (function (_super) {
	    __extends(TianDiProvider_AERIAL, _super);
	    function TianDiProvider_AERIAL() {
	        _super.call(this);
	        this.type = "AERIAL";
	        this.urlTemplate = "http://t{0}.tianditu.com/DataServer?T=img_w&x={1}&y={2}&l={3}";
	    }
	    return TianDiProvider_AERIAL;
	}(TianDiProvider));
	exports.TianDiProvider_AERIAL = TianDiProvider_AERIAL;
	var TianDiProvider_ROAD = (function (_super) {
	    __extends(TianDiProvider_ROAD, _super);
	    function TianDiProvider_ROAD() {
	        _super.call(this);
	        this.type = "ROAD";
	        this.urlTemplate = "http://t{0}.tianditu.com/DataServer?T=vec_w&x={1}&y={2}&l={3}";
	    }
	    return TianDiProvider_ROAD;
	}(TianDiProvider));
	exports.TianDiProvider_ROAD = TianDiProvider_ROAD;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractMapProvider_1 = __webpack_require__(3);
	var Coordinate_1 = __webpack_require__(4);
	var Transformation_1 = __webpack_require__(5);
	var GaussKrugerProjection_1 = __webpack_require__(14);
	var GaussKrugerProvider = (function (_super) {
	    __extends(GaussKrugerProvider, _super);
	    function GaussKrugerProvider(minZoom, maxZoom, tx, ty) {
	        if (minZoom === void 0) { minZoom = AbstractMapProvider_1.AbstractMapProvider.MIN_ZOOM; }
	        if (maxZoom === void 0) { maxZoom = AbstractMapProvider_1.AbstractMapProvider.MAX_ZOOM; }
	        if (tx === void 0) { tx = 0.0; }
	        if (ty === void 0) { ty = 0.0; }
	        _super.call(this, minZoom, maxZoom, tx, ty);
	    }
	    GaussKrugerProvider.prototype.getTileUrls = function (coord) {
	        var sourceCoord = this.sourceCoordinate(coord);
	        var result = this.urlTemplate.format(sourceCoord.column, sourceCoord.row, this.scales[sourceCoord.zoom - 8]);
	        return [result];
	    };
	    GaussKrugerProvider.prototype.toString = function () {
	        return "GaussKrugerProvider_" + this.type;
	    };
	    return GaussKrugerProvider;
	}(AbstractMapProvider_1.AbstractMapProvider));
	exports.GaussKrugerProvider = GaussKrugerProvider;
	var GaussKrugerProvider_szsatellite = (function (_super) {
	    __extends(GaussKrugerProvider_szsatellite, _super);
	    function GaussKrugerProvider_szsatellite() {
	        _super.call(this, 8, 26);
	        this.type = "szsatellite";
	        this.scales = [
	            4.5155555555374945E-7,
	            9.031111111074989E-7,
	            1.806222222214999E-6,
	            3.6124444444300892E-6,
	            7.2248888888601785E-6,
	            1.4449777777721402E-5,
	            2.889955555547204E-5,
	            5.7799111110910654E-5,
	            1.1559822222255629E-4,
	            2.3119644444356247E-4,
	            4.6239288888703917E-4
	        ];
	        this.urlTemplate = "http://10.38.13.145:8090/iserver/services/map-arcgis-szsatellite/rest/maps/图层/tileImage.png?transparent=false&cacheEnabled=true&width=256&height=256&x={0}&y={1}&scale={2}&redirect=false&overlapDisplayed=false";
	    }
	    GaussKrugerProvider_szsatellite.prototype.init = function (minZoom, maxZoom, tx, ty) {
	        var s = 2.57990355279992;
	        var t = new Transformation_1.Transformation(s, 0, 50805.0 * s, 0, -s, 3421129.0 * s);
	        this.projection = new GaussKrugerProjection_1.GaussKrugerProjection(maxZoom, t, 120.58333299999998);
	        this.topLeftOutLimit = new Coordinate_1.Coordinate(0, 0, minZoom);
	        this.bottomRightInLimit = (new Coordinate_1.Coordinate(1, 1, 0)).zoomTo(maxZoom);
	    };
	    return GaussKrugerProvider_szsatellite;
	}(GaussKrugerProvider));
	exports.GaussKrugerProvider_szsatellite = GaussKrugerProvider_szsatellite;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AbstractProjection_1 = __webpack_require__(7);
	var LonLat_1 = __webpack_require__(8);
	var Coordinate_1 = __webpack_require__(4);
	var GaussKruger_1 = __webpack_require__(15);
	var GaussKrugerProjection = (function (_super) {
	    __extends(GaussKrugerProjection, _super);
	    function GaussKrugerProjection(zoom, T, centerLon) {
	        _super.call(this, zoom, T);
	        this.centerLon = centerLon;
	    }
	    GaussKrugerProjection.prototype.rawProject = function (point) {
	        return GaussKruger_1.lonLat_xy_bj54(point[0], point[1], this.centerLon, 0, 0);
	    };
	    GaussKrugerProjection.prototype.rawUnproject = function (point) {
	        return GaussKruger_1.xy_LonLat_bj54(point[0], point[1], this.centerLon, 0, 0);
	    };
	    GaussKrugerProjection.prototype.locationCoordinate = function (loc) {
	        var point = this.project([loc.lon, loc.lat]);
	        return new Coordinate_1.Coordinate(point[1], point[0], this.zoom);
	    };
	    GaussKrugerProjection.prototype.coordinateLocation = function (coordinate) {
	        coordinate = coordinate.zoomTo(this.zoom);
	        var point = [coordinate.column, coordinate.row];
	        point = this.unproject(point);
	        return new LonLat_1.LonLat(point[0], point[1]);
	    };
	    GaussKrugerProjection.prototype.toString = function () {
	        return 'GaussKrugerProjection(' + this.zoom + ', ' + this.T.toString() + ')';
	    };
	    return GaussKrugerProjection;
	}(AbstractProjection_1.AbstractProjection));
	exports.GaussKrugerProjection = GaussKrugerProjection;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var GCS_1 = __webpack_require__(16);
	function lonLat_xy_wgs84(lon, lat, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return lonLat_xy(lon, lat, GCS_1.wgs84.a, GCS_1.wgs84.f, centerLon, xOffset, yOffset);
	}
	exports.lonLat_xy_wgs84 = lonLat_xy_wgs84;
	function lonLat_xy_c80(lon, lat, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return lonLat_xy(lon, lat, GCS_1.c80.a, GCS_1.c80.f, centerLon, xOffset, yOffset);
	}
	exports.lonLat_xy_c80 = lonLat_xy_c80;
	function lonLat_xy_bj54(lon, lat, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return lonLat_xy(lon, lat, GCS_1.bj54.a, GCS_1.bj54.f, centerLon, xOffset, yOffset);
	}
	exports.lonLat_xy_bj54 = lonLat_xy_bj54;
	function lonLat_xy_cgc2000(lon, lat, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return lonLat_xy(lon, lat, GCS_1.cgc2000.a, GCS_1.cgc2000.f, centerLon, xOffset, yOffset);
	}
	exports.lonLat_xy_cgc2000 = lonLat_xy_cgc2000;
	function lonLat_xy(lon, lat, a, f, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    lon = lon - centerLon;
	    var arr = [];
	    var x = 0;
	    var y = 0;
	    var ee = (2 * f - 1) / f / f;
	    var ee2 = ee / (1 - ee);
	    var rB, tB, m;
	    rB = lat * Math.PI / 180;
	    tB = Math.tan(rB);
	    m = Math.cos(rB) * lon * Math.PI / 180;
	    var N = a / Math.sqrt(1 - ee * Math.sin(rB) * Math.sin(rB));
	    var it2 = ee2 * Math.pow(Math.cos(rB), 2);
	    y = m * m / 2 + (5 - tB * tB + 9 * it2 + 4 * it2 * it2) * Math.pow(m, 4) / 24 + (61 - 58 * tB * tB + Math.pow(tB, 4)) * Math.pow(m, 6) / 720;
	    y = meridianLength(lat, a, f) + N * tB * y;
	    x = N * (m + (1 - tB * tB + it2) * Math.pow(m, 3) / 6 + (5 - 18 * tB * tB + Math.pow(tB, 4) + 14 * it2 - 58 * tB * tB * it2) * Math.pow(m, 5) / 120);
	    arr[0] = (x + xOffset).toFixed(5);
	    arr[1] = (y + yOffset).toFixed(5);
	    return arr;
	}
	exports.lonLat_xy = lonLat_xy;
	function xy_LonLat_wgs84(x, y, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return xy_LonLat(x, y, GCS_1.wgs84.a, GCS_1.wgs84.f, centerLon, xOffset, yOffset);
	}
	exports.xy_LonLat_wgs84 = xy_LonLat_wgs84;
	function xy_LonLat_c80(x, y, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return xy_LonLat(x, y, GCS_1.c80.a, GCS_1.c80.f, centerLon, xOffset, yOffset);
	}
	exports.xy_LonLat_c80 = xy_LonLat_c80;
	function xy_LonLat_bj54(x, y, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return xy_LonLat(x, y, GCS_1.bj54.a, GCS_1.bj54.f, centerLon, xOffset, yOffset);
	}
	exports.xy_LonLat_bj54 = xy_LonLat_bj54;
	function xy_LonLat_cgc2000(x, y, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    return xy_LonLat(x, y, GCS_1.cgc2000.a, GCS_1.cgc2000.f, centerLon, xOffset, yOffset);
	}
	exports.xy_LonLat_cgc2000 = xy_LonLat_cgc2000;
	function xy_LonLat(x, y, a, f, centerLon, xOffset, yOffset) {
	    if (xOffset === void 0) { xOffset = 500000; }
	    if (yOffset === void 0) { yOffset = 0; }
	    var L = 0;
	    var B = 0;
	    y -= yOffset;
	    x -= xOffset;
	    if (x > 1000000) {
	        return null;
	    }
	    var ee = (2 * f - 1) / f / f;
	    var ee2 = ee / (1 - ee);
	    var cA, cB, cC, cD, cE;
	    cA = 1 + 3 * ee / 4 + 45 * ee * ee / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
	    cB = 3 * ee / 4 + 15 * ee * ee / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
	    cC = 15 * ee * ee / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
	    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
	    cE = 315 * Math.pow(ee, 4) / 131072;
	    var Bf = y / (a * (1 - ee) * cA);
	    do {
	        B = Bf;
	        Bf = (y + a * (1 - ee) * (cB * Math.sin(2 * Bf) / 2 - cC * Math.sin(4 * Bf) / 4 + cD * Math.sin(6 * Bf) / 6) - cE * Math.sin(8 * Bf) / 8) / (a * (1 - ee) * cA);
	    } while (Math.abs(B - Bf) > 0.00000000001);
	    var N = a / Math.sqrt(1 - ee * Math.pow(Math.sin(Bf), 2));
	    var V2 = 1 + ee2 * Math.pow(Math.cos(Bf), 2);
	    var it2 = ee2 * Math.pow(Math.cos(Bf), 2);
	    var tB2 = Math.pow(Math.tan(Bf), 2);
	    B = Bf - V2 * Math.tan(Bf) / 2 * (Math.pow(x / N, 2) - (5 + 3 * tB2 + it2 - 9 * it2 * tB2) * Math.pow(x / N, 4) / 12 + (61 + 90 * tB2 + 45 * tB2 * tB2) * Math.pow(x / N, 6) / 360);
	    L = (x / N - (1 + 2 * tB2 + it2) * Math.pow(x / N, 3) / 6 + (5 + 28 * tB2 + 24 * tB2 * tB2 + 6 * it2 + 8 * it2 * tB2) * Math.pow(x / N, 5) / 120) / Math.cos(Bf);
	    B = B * 180 / Math.PI;
	    L = L * 180 / Math.PI;
	    L += centerLon;
	    return [L.toFixed(5), B.toFixed(5)];
	}
	exports.xy_LonLat = xy_LonLat;
	function meridianLength(lat, a, f) {
	    var ee = (2 * f - 1) / f / f;
	    var rB = lat * Math.PI / 180;
	    var cA, cB, cC, cD, cE;
	    cA = 1 + 3 * ee / 4 + 45 * Math.pow(ee, 2) / 64 + 175 * Math.pow(ee, 3) / 256 + 11025 * Math.pow(ee, 4) / 16384;
	    cB = 3 * ee / 4 + 15 * Math.pow(ee, 2) / 16 + 525 * Math.pow(ee, 3) / 512 + 2205 * Math.pow(ee, 4) / 2048;
	    cC = 15 * Math.pow(ee, 2) / 64 + 105 * Math.pow(ee, 3) / 256 + 2205 * Math.pow(ee, 4) / 4096;
	    cD = 35 * Math.pow(ee, 3) / 512 + 315 * Math.pow(ee, 4) / 2048;
	    cE = 315 * Math.pow(ee, 4) / 131072;
	    return a * (1 - ee) * (cA * rB - cB * Math.sin(2 * rB) / 2 + cC * Math.sin(4 * rB) / 4 - cD * Math.sin(6 * rB) / 6 + cE * Math.sin(8 * rB) / 8);
	}
	exports.meridianLength = meridianLength;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	exports.wgs84 = { "a": 6378137, "f": 298.257223563 };
	exports.c80 = { "a": 6378140, "f": 298.257 };
	exports.bj54 = { "a": 6378245, "f": 298.3 };
	exports.cgc2000 = { "a": 6378137, "f": 298.257222101 };


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Coordinate_1 = __webpack_require__(4);
	var LonLat_1 = __webpack_require__(8);
	var MapTile = (function () {
	    function MapTile(provider, lon, lat, zoom) {
	        this.provider = provider;
	        this.lonlat = new LonLat_1.LonLat(lon, lat);
	        var realMaxCoordinate = provider.locationCoordinate(this.lonlat);
	        var destination = zoom - realMaxCoordinate.zoom;
	        this.coordinate = realMaxCoordinate.zoomBy(destination).container();
	        var maxCoordinate = this.coordinate.zoomBy(-destination);
	        var scale = Math.pow(2, destination);
	        this.scaleValue = provider.tileWidth * scale;
	        this.offset = [(realMaxCoordinate.column - maxCoordinate.column) * this.scaleValue, (realMaxCoordinate.row - maxCoordinate.row) * this.scaleValue];
	        this.realMaxCoordinate = realMaxCoordinate;
	    }
	    MapTile.prototype.getUrls = function () {
	        if (this.urls === undefined) {
	            this.urls = this.provider.getTileUrls(this.coordinate);
	        }
	        return this.urls;
	    };
	    MapTile.prototype.getOffsetLonlat = function (offset) {
	        var column = this.realMaxCoordinate.column - offset[0] / this.scaleValue;
	        var row = this.realMaxCoordinate.row - offset[1] / this.scaleValue;
	        var coordinate = new Coordinate_1.Coordinate(row, column, this.realMaxCoordinate.zoom);
	        return this.provider.coordinateLocation(coordinate);
	    };
	    MapTile.prototype.toString = function () {
	        var lonlat = this.lonlat;
	        var point = [Math.PI * lonlat.lon / 180, Math.PI * lonlat.lat / 180];
	        var transformXY = this.provider["projection"]["rawProject"](point);
	        var str = "provider:" + this.provider.toString() + "\n" +
	            "lonlat:" + lonlat.toString() + "(地理坐标)\n" +
	            "transformXY:" + transformXY.toString() + "(投影坐标)\n" +
	            "maxCoordinate:" + this.realMaxCoordinate.container().toString() + "(参考缩放级别的瓦片坐标)\n" +
	            "coordinate:" + this.coordinate.toString() + "(瓦片坐标)\n" +
	            "scaleValue:" + this.scaleValue.toString() + "(缩放因子)\n" +
	            "offset:" + this.offset + "(偏移坐标)\n" +
	            "urls:" + this.getUrls() + "(瓦片服务地址)\n";
	        return str;
	    };
	    return MapTile;
	}());
	exports.MapTile = MapTile;


/***/ }
/******/ ]);