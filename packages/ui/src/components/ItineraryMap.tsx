import React, { useEffect, useRef, useState } from 'react'
import { YStack, Text } from 'tamagui'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type ItineraryMapProps = {
  itineraryId: string
}

export const ItineraryMap: React.FC<ItineraryMapProps> = ({ itineraryId }) => {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });
  });

  return (
    <YStack space>
      <Text fontSize="$6" fontWeight="bold">Itinerary Map</Text>
      <div ref={mapContainer} style={{ height: '400px', width: '100%' }} />
      <Text>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </Text>
    </YStack>
  )
}
