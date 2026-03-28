import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city';
import { URL_MARKER_DEFAULT } from '../../const';
import { URL_MARKER_CURRENT } from '../../const';
import { MapOffer } from '../../types/map-offers';
import { memo } from 'react';

type MapProps = {
  city: City;
  offers: MapOffer[];
  className?: string;
  activeOfferId?: string | null;
};

const defaultMarkerIcon = L.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeMarkerIcon = L.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  city,
  offers,
  className,
  activeOfferId,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      const map = L.map(mapRef.current);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
      );
    }
  }, [city]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    const map = mapInstanceRef.current;

    const markers = offers.map((offer) =>
      L.marker([offer.location.latitude, offer.location.longitude], {
        icon: offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
      }).addTo(map),
    );

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [offers, activeOfferId]);

  return <div ref={mapRef} className={className} />;
}

const MemorizedMap = memo(Map);

export default MemorizedMap;
