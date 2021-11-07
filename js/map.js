import {createCustomPopup} from './create-offer-card-element.js';
import {isActiveForm} from './form.js';

const MapDefaults = {
  ID: 'map-canvas',
  URL_TEMPLATE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ZOOM: 12,
  COORDS_DIGITS: 5,
  CenterCoords: {
    LAT: 35.68173,
    LNG: 139.75393,
  },
  coordsInput: document.querySelector('#address'),
};

const Pins = {
  Main: {
    URL: 'img/main-pin.svg',
    WIDTH: 52,
    HEIGHT: 52,
  },
  Default: {
    URL: 'img/pin.svg',
    WIDTH: 40,
    HEIGHT: 40,
  },
};

const mainPinIcon = L.icon({
  iconUrl: Pins.Main.URL,
  iconSize: [Pins.Main.WIDTH, Pins.Main.HEIGHT],
  iconAnchor: [Pins.Main.WIDTH / 2, Pins.Main.HEIGHT],
});

const mainMarker = L.marker(
  {
    lat: MapDefaults.CenterCoords.LAT,
    lng: MapDefaults.CenterCoords.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });

const setCoordsToInput = (lat, lng, digit = MapDefaults.COORDS_DIGITS) => {
  MapDefaults.coordsInput.value = `${lat.toFixed(digit)}, ${lng.toFixed(digit)}`;
};

const createMarkers = (points) => points.map((point) => {
  const pinIcon = L.icon({
    iconUrl: Pins.Default.URL,
    iconSize: [Pins.Default.WIDTH, Pins.Default.HEIGHT],
    iconAnchor: [Pins.Default.WIDTH / 2, Pins.Default.HEIGHT],
  });
  const {lat, lng} = point.location;

  return L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: pinIcon,
    },
  )
    .bindPopup(createCustomPopup(point));
});

export const renderMap = (points) => {
  const markersGroup = L.layerGroup(createMarkers(points));

  const map = L.map(MapDefaults.ID)
    .on('load', () => {
      isActiveForm(true);
      setCoordsToInput(MapDefaults.CenterCoords.LAT, MapDefaults.CenterCoords.LNG);
    })
    .setView({
      lat: MapDefaults.CenterCoords.LAT,
      lng: MapDefaults.CenterCoords.LNG,
    }, MapDefaults.ZOOM);

  L.tileLayer(MapDefaults.URL_TEMPLATE,{attribution: MapDefaults.TILE_ATTRIBUTION}).addTo(map);

  mainMarker
    .on('move', (evt) => {
      const {lat, lng} = evt.target.getLatLng();

      setCoordsToInput(lat, lng);
    })
    .addTo(map);

  markersGroup.addTo(map);

  return map;
};
