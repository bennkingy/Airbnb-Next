import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && center) {
      const map = mapRef.current;
      map.flyTo(center as L.LatLngExpression);
    }
  }, [center]);

  const FlyToLocation = () => {
    const map = useMap();
    if (center) {
      map.flyTo(center as L.LatLngExpression);
    }
    return null;
  };

  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51, -0.09]}
      zoom={center ? 8 : 4}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
      // @ts-ignore
      whenCreated={(map) => {
        mapRef.current = map;
      }}
      zoomControl={false} // Hide the zoom controls
    >
      <TileLayer url={url} attribution={attribution} />
      <FlyToLocation />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
