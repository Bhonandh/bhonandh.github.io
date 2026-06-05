/*
'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Updated coordinates for Tampa, FL
const TAMPA: [number, number] = [27.9506, -82.4572];

export const LocationMap = () => {
  return (
    <MapContainer
      center={TAMPA}
      zoom={12}
      zoomControl={false}
      attributionControl
      dragging={false}
      touchZoom={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      boxZoom={false}
      keyboard={false}
      className="location-map__canvas"
      aria-hidden="true"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
    </MapContainer>
  );
};

export default LocationMap; */

'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates for Tampa, FL
const TAMPA: [number, number] = [27.9506, -82.4572];

export const LocationMap = () => {
  return (
    <MapContainer
      center={TAMPA}
      zoom={12}
      minZoom={10}                
      maxZoom={18}                // Allows them to zoom in quite close to see buildings
      zoomControl={true}         // Keeping buttons because they zoom perfectly into the dead center
      attributionControl={false}
      dragging={false}            // Disables dragging so the map stays centered on Tampa
      touchZoom={false}           // Disables pinch-to-zoom shifting on mobile
      doubleClickZoom={false}     // Disables double-click shifting
      scrollWheelZoom={false}     // Disables mouse scroll shifting completely
      boxZoom={false}
      keyboard={false}
      className="location-map__canvas"
      aria-hidden="true"
    >
      {/* Premium Apple Maps inspired light theme */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
        maxZoom={20}
      />
    </MapContainer>
  );
};

export default LocationMap;