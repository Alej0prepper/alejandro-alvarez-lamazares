"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type LeafletMap = {
  remove: () => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (html: string) => LeafletMarker;
};

type LeafletTileLayer = {
  addTo: (map: LeafletMap) => LeafletTileLayer;
};

type LeafletApi = {
  map: (id: string) => {
    setView: (coordinates: [number, number], zoom: number) => LeafletMap;
  };
  tileLayer: (
    url: string,
    options?: { attribution?: string }
  ) => LeafletTileLayer;
  marker: (coordinates: [number, number]) => LeafletMarker;
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

const leafletCssUrl = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const leafletScriptUrl = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

export default function HavanaMapClient() {
  const mapRef = useRef<LeafletMap | null>(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const [fullImage, setFullImage] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest("[data-full-image]");
      if (!(trigger instanceof HTMLElement)) return;

      const src = trigger.dataset.fullImage;
      if (!src) return;

      event.preventDefault();
      setFullImage({
        src,
        alt: trigger.dataset.fullAlt ?? "Imagen ampliada",
        width: Number(trigger.dataset.fullWidth ?? 1280),
        height: Number(trigger.dataset.fullHeight ?? 720),
      });
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFullImage(null);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!leafletReady || mapRef.current || !window.L) return;

    const map = window.L.map("map").setView([23.1136, -82.3666], 13);
    mapRef.current = map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    window.L.marker([23.136, -82.358])
      .addTo(map)
      .bindPopup(`
        <h3>Capitolio</h3>
        <img
          src="/fotos/capitolio.svg"
          width="250"
          alt="Capitolio de La Habana"
        >
      `);

    window.L.marker([23.141, -82.372])
      .addTo(map)
      .bindPopup(`
        <h3>Malecon</h3>
        <img
          src="/fotos/malecon.svg"
          width="250"
          alt="Malecon de La Habana"
        >
      `);

    window.L.marker([23.115855980630002, -82.43304489985582])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 46</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra46.jpg"
          data-full-alt="Foto de 3ra y 46"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra46.jpg"
            width="250"
            alt="Foto de 3ra y 46"
          >
        </button>
      `);

    window.L.marker([23.117946152409722, -82.43027799161936])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 40</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-40.jpg"
          data-full-alt="Foto de 3ra y 40"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/3ra-40.jpg"
            width="250"
            alt="Foto de 3ra y 40"
          >
        </button>
      `);

    window.L.marker([23.118414668230674, -82.42977191900748])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 38</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-38.jpg"
          data-full-alt="Foto de 3ra y 38"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/3ra-38.jpg"
            width="250"
            alt="Foto de 3ra y 38"
          >
        </button>
      `);

    window.L.marker([23.119269516002593, -82.42866938196576])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 36</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-36.jpg"
          data-full-alt="Foto de 3ra y 36"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/3ra-36.jpg"
            width="250"
            alt="Foto de 3ra y 36"
          >
        </button>
      `);

    window.L.marker([23.11891484578289, -82.42913907260892])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 36a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1-36a.jpg"
          data-full-alt="Foto de 3ra y 36a"
          data-full-width="964"
          data-full-height="1280"
        >
          <img
            src="/fotos/1-36a.jpg"
            width="250"
            alt="Foto de 3ra y 36a"
          >
        </button>
      `);

    window.L.marker([23.119851536902257, -82.42781405054902])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 34</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-34.jpg"
          data-full-alt="Foto de 3ra y 34"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-34.jpg"
            width="250"
            alt="Foto de 3ra y 34"
          >
        </button>
      `);

    window.L.marker([23.121715805620834, -82.42536177085346])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 28</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-28.jpg"
          data-full-alt="Foto de 3ra y 28"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-28.jpg"
            width="250"
            alt="Foto de 3ra y 28"
          >
        </button>
      `);

    window.L.marker([23.124800230591678, -82.4212358585147])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 18</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-18.jpg"
          data-full-alt="Foto de 3ra y 18"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-18.jpg"
            width="250"
            alt="Foto de 3ra y 18"
          >
        </button>
      `);

    return () => {
      map.remove();
      mapRef.current = null;
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
      <section className={styles.mapShell} aria-label="Mapa de La Habana">
        <div id="map" className={styles.map} />
      </section>
      {fullImage ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={fullImage.alt}
        >
          <button
            type="button"
            className={styles.lightboxBackdrop}
            aria-label="Cerrar imagen"
            onClick={() => setFullImage(null)}
          />
          <Image
            src={fullImage.src}
            alt={fullImage.alt}
            width={fullImage.width}
            height={fullImage.height}
            className={styles.lightboxImage}
          />
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setFullImage(null)}
          >
            Cerrar
          </button>
        </div>
      ) : null}
    </>
  );
}
