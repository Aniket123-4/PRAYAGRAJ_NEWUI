

// import React, { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// interface PropertyLocationMapProps {
//   latitude: number | null;
//   longitude: number | null;
//   propertyName: string;
//   height?: string;
//   width?: string;
//   zoomLevel?: number;
//   onLoad?: () => void;
// }

// const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
//   latitude,
//   longitude,
//   propertyName,
//   height = '400px',
// //  width = '100%',
//   zoomLevel = 15,
//   onLoad
// }) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const apiKey = 'AIzaSyDxp8MamOh_0gBNHBq4m3bgCIgksc4YYgQ';

//   useEffect(() => {
//     if (!latitude || !longitude || !mapRef.current) {
//       onLoad?.();
//       return;
//     }

//     const loader = new Loader({
//       apiKey,
//       version: "weekly",
//       libraries: ["places"]
//     });

//     let map: google.maps.Map;
//     let marker: google.maps.Marker;

//     loader.load().then(() => {
//       const location = { lat: latitude, lng: longitude };

//       map = new google.maps.Map(mapRef.current as HTMLDivElement, {
//         center: location,
//         zoom: zoomLevel,
//         mapTypeControl: true,
//         streetViewControl: true,
//         fullscreenControl: true,
//         styles: [
//           {
//             featureType: "poi",
//             elementType: "labels",
//             stylers: [{ visibility: "off" }]
//           }
//         ]
//       });

//       marker = new google.maps.Marker({
//         position: location,
//         map: map,
//         title: propertyName || 'Property Location',
//         icon: {
//           url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//           scaledSize: new google.maps.Size(32, 32)
//         }
//       });

//       const infoWindow = new google.maps.InfoWindow({
//         content: `<div style="padding: 10px; min-width: 200px;">
//           <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${propertyName || 'Property'}</h3>
//           <p style="margin: 0; font-size: 14px;">Lat: ${latitude.toFixed(6)}</p>
//           <p style="margin: 0; font-size: 14px;">Lng: ${longitude.toFixed(6)}</p>
//         </div>`
//       });

//       marker.addListener("click", () => {
//         infoWindow.open(map, marker);
//       });

//       infoWindow.open(map, marker);
//       onLoad?.();
//     }).catch(error => {
//       console.error("Error loading Google Maps:", error);
//       onLoad?.();
//     });

//     return () => {
//       if (marker) marker.setMap(null);
//     };
//   }, [latitude, longitude, propertyName, zoomLevel, apiKey, onLoad]);

//   if (!latitude || !longitude) {
//     return (
//       <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
//         <p className="text-gray-500 dark:text-gray-400">No location data available for this property</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       ref={mapRef}
//       style={{ height, width: '100%' }}
//       className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm w-full"
//     />
//   );
// };

// export default PropertyLocationMap;

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Marker {
  lat: number;
  lng: number;
  title: string;
  description: string;
}

interface PropertyLocationMapProps {
  latitude: number | null;
  longitude: number | null;
  propertyName: string;
  height?: string;
  zoomLevel?: number;
  onLoad?: (success: boolean) => void;
  markers?: Marker[];
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  latitude,
  longitude,
  propertyName,
  height = '400px',
  zoomLevel = 15,
  onLoad,
  markers = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const apiKey = 'AIzaSyDxp8MamOh_0gBNHBq4m3bgCIgksc4YYgQ';

  useEffect(() => {
    setMapError(null);
    
    if ((!latitude || !longitude) && markers.length === 0) {
      onLoad?.(false);
      return;
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(() => {
      try {
        // Use first marker or provided coordinates as center
        const center = markers.length > 0 
          ? { lat: markers[0].lat, lng: markers[0].lng }
          : { lat: latitude!, lng: longitude! };

        const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
          center,
          zoom: markers.length > 1 ? 12 : zoomLevel,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Add markers if provided
        if (markers.length > 0) {
          markers.forEach(markerData => {
            const marker = new google.maps.Marker({
              position: { lat: markerData.lat, lng: markerData.lng },
              map: map,
              title: markerData.title,
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new google.maps.Size(32, 32)
              }
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `<div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${markerData.title}</h3>
                <p style="margin: 0; font-size: 14px;">${markerData.description}</p>
                <p style="margin: 0; font-size: 14px;">Lat: ${markerData.lat.toFixed(6)}</p>
                <p style="margin: 0; font-size: 14px;">Lng: ${markerData.lng.toFixed(6)}</p>
              </div>`
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });
          });
        } else {
          // Single marker for individual property
          const marker = new google.maps.Marker({
            position: { lat: latitude!, lng: longitude! },
            map: map,
            title: propertyName,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(32, 32)
            }
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600;">${propertyName}</h3>
              <p style="margin: 0; font-size: 14px;">Lat: ${latitude!.toFixed(6)}</p>
              <p style="margin: 0; font-size: 14px;">Lng: ${longitude!.toFixed(6)}</p>
            </div>`
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
          infoWindow.open(map, marker);
        }

        onLoad?.(true);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Failed to load map");
        onLoad?.(false);
      }
    }).catch(error => {
      console.error("Error loading Google Maps:", error);
      setMapError("Failed to load Google Maps");
      onLoad?.(false);
    });
  }, [latitude, longitude, propertyName, zoomLevel, apiKey, onLoad, markers]);

  if ((!latitude || !longitude) && markers.length === 0) {
    return (
      <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No location data available</p>
      </div>
    );
  }

  if (mapError) {
    return (
      <div style={{ height, width: '100%' }} className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-red-500 dark:text-red-400">{mapError}</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      style={{ height, width: '100%' }}
      className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm w-full"
    />
  );
};

export default PropertyLocationMap;