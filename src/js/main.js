//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var data = require("./reduced-districts.geo.json");
var mapElement = document.querySelector("leaflet-map.lunch");

if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var all = "reduced_lunch";

  data.features.forEach(function(f) {
  	["reduced_lunch"].forEach(function(prop) {f.properties[prop] = (f.properties[prop] * 100).toFixed(1);
  	});
	});

	var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

  layer.on({
  	     mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 2, fillOpacity: 0.5 });
      }
    });
	};

	var getColor = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 80 ? '#990000' :
     		value >= 60 ? '#d7301f' :
     		value >= 40 ? '#ef6548' :
        value >= 20 ? '#fdbb84' :
             
             '#fef0d9' ;
    } else {
      return "gray"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 2,
      opacity: .1,
      color: '#000',
      fillOpacity: 0.5
    };
    return s;
  }

    var geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

	var data2 = require("./championship_school.geo.json");
  var mapElement = document.querySelector("leaflet-map.champs");

  if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var champ = "championships";

  data2.features.forEach(function(f) {
	});

	var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))

  layer.on({
  	     mouseover: function(e) {
        layer.setStyle({ weight: 3, fillOpacity: .8 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 2, fillOpacity: 0.5 });
      }
    });
	};

	var getColor2 = function(d) {
    var value = d[champ];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 10 ? '#6e016b' :
     		value >= 7 ? '#d88419d' :
     		value >= 4 ? '#e8c6bb1' :
        value >= 1 ? '#9ebcda' :
             
             '#edf8fb' ;
    } else {
      return "gray"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor2(feature.properties),
      weight: 2,
      opacity: .1,
      color: '#000',
      fillOpacity: 0.5
    };
    return s;
  }

  var geojson = L.geoJson(data2, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

 map.scrollWheelZoom.disable();