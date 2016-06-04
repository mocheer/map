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
	var MapTile_1 = __webpack_require__(8);
	var ALLProviders = {
	    "GoogleProvider_AERIAL": GoogleProvider_1.GoogleProvider_AERIAL,
	    "GoogleProvider_HYBRID": GoogleProvider_1.GoogleProvider_HYBRID,
	    "GoogleProvider_ROAD": GoogleProvider_1.GoogleProvider_ROAD
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
	        var server = Math.round(Math.random() * 3);
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
	        var t = new Transformation_1.Transformation(1.068070779e7, 0, 3.355443185e7 + tx, 0, -1.068070890e7, 3.355443057e7 + ty);
	        this.projection = new MercatorProjection_1.MercatorProjection(26, t);
	        this.topLeftOutLimit = new Coordinate_1.Coordinate(0, Number.NEGATIVE_INFINITY, minZoom);
	        this.bottomRightInLimit = (new Coordinate_1.Coordinate(1, Number.POSITIVE_INFINITY, 0)).zoomTo(maxZoom);
	    }
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
	        return '(' + this.column + ',' + this.row + ' @' + this.zoom + ')';
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
	var LonLat_1 = __webpack_require__(7);
	var Coordinate_1 = __webpack_require__(4);
	var MercatorProjection = (function () {
	    function MercatorProjection(zoom, T) {
	        if (T)
	            this.T = T;
	        this.zoom = zoom;
	    }
	    MercatorProjection.prototype.project = function (point) {
	        point = this.rawProject(point);
	        if (this.T)
	            point = this.T.transform(point);
	        return point;
	    };
	    MercatorProjection.prototype.unproject = function (point) {
	        if (this.T)
	            point = this.T.untransform(point);
	        point = this.rawUnproject(point);
	        return point;
	    };
	    MercatorProjection.prototype.locationCoordinate = function (loc) {
	        var point = [Math.PI * loc.lon / 180, Math.PI * loc.lat / 180];
	        point = this.project(point);
	        return new Coordinate_1.Coordinate(point[1], point[0], this.zoom);
	    };
	    MercatorProjection.prototype.coordinateLocation = function (coordinate) {
	        coordinate = coordinate.zoomTo(this.zoom);
	        var point = [coordinate.column, coordinate.row];
	        point = this.unproject(point);
	        return new LonLat_1.LonLat(180 * point[0] / Math.PI, 180 * point[1] / Math.PI);
	    };
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
	}());
	exports.MercatorProjection = MercatorProjection;


/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var LonLat_1 = __webpack_require__(7);
	var MapTile = (function () {
	    function MapTile(provider, lon, lat, zoom) {
	        this.provider = provider;
	        this.lonlat = new LonLat_1.LonLat(lon, lat);
	        this.zoom = zoom;
	        var realMaxCoordinate = provider.locationCoordinate(this.lonlat);
	        var destination = zoom - realMaxCoordinate.zoom;
	        this.coordinate = realMaxCoordinate.zoomBy(destination).container();
	        this.urls = this.provider.getTileUrls(this.coordinate);
	        var maxCoordinate = this.coordinate.zoomBy(-destination);
	        var scale = Math.pow(2, destination);
	        this.scaleValue = provider.tileWidth * scale;
	        this.offsetX = (realMaxCoordinate.column - maxCoordinate.column) * this.scaleValue;
	        this.offsetY = (realMaxCoordinate.row - maxCoordinate.row) * this.scaleValue;
	        this.realMaxCoordinate = realMaxCoordinate;
	    }
	    MapTile.prototype.toString = function () {
	        var str = "provider:" + this.provider.toString() + "\n" +
	            "lonlat:" + this.lonlat.toString() + "\n" +
	            "zoom:" + this.zoom.toString() + "\n" +
	            "offset:" + this.offsetX + "," + this.offsetY + "\n" +
	            "coordinate:" + this.coordinate.toString() + "\n" +
	            "scaleValue:" + this.scaleValue.toString() + "\n" +
	            "urls:" + this.urls.toString() + "\n";
	        return str;
	    };
	    return MapTile;
	}());
	exports.MapTile = MapTile;


/***/ }
/******/ ]);