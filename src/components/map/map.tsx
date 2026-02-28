import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/types';

type MapProps = {
  city: City;
  offers: Offer[];
  className?: string;
};

function Map({ city, offers, className }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      const map = L.map(mapRef.current).setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }
  }, [city]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    const map = mapInstanceRef.current;

    const markers = offers.map((offer) =>
      L.marker([offer.location.latitude, offer.location.longitude]).addTo(map),
    );

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [offers]);

  return <div ref={mapRef} className={className} />;
}

export default Map;
