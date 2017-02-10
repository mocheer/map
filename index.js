import Map from './src/Map.ts';
//set global
(function (global) {
    global.TMap = Map;
})(typeof window !== 'undefined' ? window : global);