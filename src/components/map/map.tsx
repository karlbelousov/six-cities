import { useEffect, useRef } from 'react';
import { City, Location } from '../../types/offer';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';
import { Marker, Icon } from 'leaflet';
import { CityLocation, URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  city: City;
  locations: (Location & {id?: number})[];
  place?: 'cities' | 'property';
  activeOffer?: null | number;
}

function Map({city, locations, activeOffer, place = 'cities'}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      locations.forEach(({id, latitude: lat, longitude: lng}) => {
        const marker = new Marker({
          lat,
          lng
        });

        marker
          .setIcon(activeOffer === id ? currentCustomIcon : defaultCustomIcon)
          .addTo(map);

        markers.push(marker);
      });

      const { latitude: lat, longitude: lng} = CityLocation[city.name];
      map.setView({lat, lng});
    }

    return () => {
      if (map) {
        markers.forEach((marker) => {
          map.removeLayer(marker);
        });
      }
    };
  }, [map, city, locations, activeOffer]);

  return (
    <section className={`${place}__map map`} ref={mapRef}></section>
  );
}

export default Map;
