// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ issues }) => (
  <MapContainer center={[23.5, 87.3]} zoom={7} className="h-80 w-full my-4">
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {issues.map(issue => (
      <Marker key={issue.id} position={[issue.location.lat, issue.location.lng]}>
        <Popup>
          <strong>{issue.title}</strong><br />
          {issue.category}<br />
          {issue.status}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default MapView;
