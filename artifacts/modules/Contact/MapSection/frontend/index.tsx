// @ts-nocheck
// ============================================================================
// FILE: Contact/MapSection/frontend/index.tsx
// PURPOSE: Interactive map section showing ISHU's coverage across India.
//          Uses Leaflet.js with react-leaflet for the interactive map.
//          Falls back to a static display if Leaflet fails to load.
// TECH: React, Leaflet.js, react-leaflet, CSS Modules
// ISOLATION: ONLY renders the map. No cross-section dependencies.
// ============================================================================

import { Suspense, lazy, useState, useEffect } from "react";
import { MAP_CENTER, MAP_ZOOM, MAP_LOCATIONS } from "../../_shared/constants";
import styles from "./styles.module.css";
import { MapPin } from "lucide-react";

/**
 * MapSectionContent renders either the Leaflet map (if loaded) or a
 * static fallback. Leaflet requires the browser's window object,
 * so we load it dynamically.
 */
function MapContent() {
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Leaflet and react-leaflet (browser-only)
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([reactLeaflet, L]) => {
      // Fix Leaflet's default marker icon path issue in bundled environments
      delete (L.default.Icon.Default.prototype as any)._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });
      setMapComponents(reactLeaflet);
    }).catch((err) => {
      console.warn("[MapSection] Leaflet failed to load:", err);
    });
  }, []);

  // Leaflet hasn't loaded yet — show fallback
  if (!MapComponents) {
    return (
      <div className={styles.mapFallback}>
        <div className={styles.mapFallbackIcon}>🗺️</div>
        <p>Loading interactive map...</p>
        <p style={{ fontSize: "0.8rem" }}>Serving students across all 28 states &amp; 8 Union Territories</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <MapContainer
      center={[MAP_CENTER.lat, MAP_CENTER.lng]}
      zoom={MAP_ZOOM}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {MAP_LOCATIONS.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>
            <strong>{loc.label}</strong><br />
            {loc.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

/**
 * MapSection is the top-level export for the Contact page map.
 */
export default function MapSection() {
  return (
    <section className={styles.section} id="map-section" aria-label="Location map">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>Our Reach Across India</h2>
        <div className={styles.mapContainer}>
          <MapContent />
        </div>
      </div>
    </section>
  );
}
