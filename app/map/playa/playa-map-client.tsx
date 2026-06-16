"use client";

import Script from "next/script";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "../page.module.css";

type LeafletMap = {
  latLngToContainerPoint: (latlng: [number, number]) => { x: number; y: number };
  setMaxBounds: (bounds: unknown) => void;
  fitBounds: (bounds: unknown, options?: { padding?: [number, number] }) => void;
  dragging: { disable: () => void };
  scrollWheelZoom: { enable: () => void; disable: () => void };
  doubleClickZoom: { enable: () => void; disable: () => void };
  boxZoom: { enable: () => void; disable: () => void };
  keyboard: { enable: () => void; disable: () => void };
  touchZoom?: { enable: () => void; disable: () => void };
  tap?: { enable: () => void; disable: () => void };
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
  remove: () => void;
};

type GeoJsonFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry?: {
    type: string;
    coordinates: unknown;
  };
};

type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
};

type LeafletLayer = {
  addTo: (map: LeafletMap) => LeafletLayer;
  getBounds: () => unknown;
};

type LeafletApi = {
  map: (id: string, options?: { zoomControl?: boolean }) => {
    setView: (coordinates: [number, number], zoom: number) => LeafletMap;
  };
  tileLayer: (
    url: string,
    options?: { attribution?: string }
  ) => {
    addTo: (map: LeafletMap) => void;
  };
  geoJSON: (
    geojson: GeoJsonFeatureCollection,
    options?: {
      style?: (feature: GeoJsonFeature) => Record<string, unknown>;
    }
  ) => LeafletLayer;
};

const leafletCssUrl = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const leafletScriptUrl = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

type ClipGeometry = {
  path: string;
  width: number;
  height: number;
};

export default function PlayaMapClient() {
  const mapRef = useRef<LeafletMap | null>(null);
  const geoJsonRef = useRef<GeoJsonFeatureCollection | null>(null);
  const updateMaskRef = useRef<(() => void) | null>(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const [clipGeometry, setClipGeometry] = useState<ClipGeometry | null>(null);

  useEffect(() => {
    const leaflet = window.L as LeafletApi | undefined;
    if (!leafletReady || mapRef.current || !leaflet) return;

    const map = leaflet.map("playa-map", { zoomControl: true }).setView(
      [23.117, -82.442],
      12
    );
    mapRef.current = map;

    leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let cancelled = false;

    function updateMask() {
      const geojson = geoJsonRef.current;
      const currentMap = mapRef.current;
      const currentLeaflet = window.L as LeafletApi | undefined;
      if (!geojson || !currentMap || !currentLeaflet) return;

      const width = (document.getElementById("playa-map")?.clientWidth ?? 0);
      const height = (document.getElementById("playa-map")?.clientHeight ?? 0);
      if (!width || !height) return;

      const polygons = geojson.features
        .map((feature) => feature.geometry?.coordinates)
        .filter((coords): coords is number[][][] => Array.isArray(coords));

      const path = polygons
        .map((polygon) =>
          polygon
            .map((ring) =>
              ring
                .map(([lng, lat], index) => {
                  const projected = currentMap.latLngToContainerPoint([lat, lng]);
                  return `${index === 0 ? "M" : "L"} ${projected.x.toFixed(2)} ${projected.y.toFixed(2)}`;
                })
                .join(" ") + " Z"
            )
            .join(" ")
        )
        .join(" ");

      setClipGeometry({ width, height, path });
    }

    async function loadBoundary() {
      const response = await fetch("/data/playa.geojson");
      const geojson = (await response.json()) as GeoJsonFeatureCollection;
      if (cancelled || !leaflet || !mapRef.current) return;
      geoJsonRef.current = geojson;

      const layer = leaflet.geoJSON(geojson, {
        style: () => ({
          color: "#f7d55d",
          weight: 4,
          fillColor: "#1b6fa8",
          fillOpacity: 0.18,
        }),
      }).addTo(map);

      const bounds = layer.getBounds();
      map.setMaxBounds(bounds);
      map.fitBounds(bounds, { padding: [0, 0] });
      map.dragging.disable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.touchZoom?.enable();
      map.tap?.enable();

      updateMask();
      updateMaskRef.current = updateMask;
      map.on("zoomend", updateMask);
      map.on("moveend", updateMask);
      map.on("resize", updateMask);
    }

    void loadBoundary();

    return () => {
      cancelled = true;
      if (updateMaskRef.current) {
        mapRef.current?.off("zoomend", updateMaskRef.current);
        mapRef.current?.off("moveend", updateMaskRef.current);
        mapRef.current?.off("resize", updateMaskRef.current);
      }
      mapRef.current?.remove();
      mapRef.current = null;
      updateMaskRef.current = null;
    };
  }, [leafletReady]);

  return (
    <>
      <link rel="stylesheet" href={leafletCssUrl} />
      <Script
        src={leafletScriptUrl}
        strategy="afterInteractive"
        onReady={() => setLeafletReady(true)}
      />
      <section className={styles.mapShell} aria-label="Mapa del municipio Playa">
        {clipGeometry ? (
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              overflow: "hidden",
            }}
          >
            <defs>
              <clipPath id="playa-clip-path" clipPathUnits="userSpaceOnUse">
                <path d={clipGeometry.path} />
              </clipPath>
            </defs>
          </svg>
        ) : null}
        <div
          id="playa-map"
          className={styles.map}
          style={
            clipGeometry
              ? ({
                  clipPath: "url(#playa-clip-path)",
                  WebkitClipPath: "url(#playa-clip-path)",
                } as CSSProperties)
              : undefined
          }
        />
      </section>
    </>
  );
}
