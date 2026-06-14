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

    window.L.marker([23.125485970817433, -82.42031854302327])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 16</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-16.jpg"
          data-full-alt="Foto de 3ra y 16"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-16.jpg"
            width="250"
            alt="Foto de 3ra y 16"
          >
        </button>
      `);

    window.L.marker([23.126089372327108, -82.41963564580203])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 14</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-14.jpg"
          data-full-alt="Foto de 3ra y 14"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-14.jpg"
            width="250"
            alt="Foto de 3ra y 14"
          >
        </button>
      `);

    window.L.marker([23.127342773933936, -82.4179098071476])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 10</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-10.jpg"
          data-full-alt="Foto de 3ra y 10"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-10.jpg"
            width="250"
            alt="Foto de 3ra y 10"
          >
        </button>
      `);

    window.L.marker([23.127965762083846, -82.4171355990969])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 8</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-8.jpg"
          data-full-alt="Foto de 3ra y 8"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/3ra-8.jpg"
            width="250"
            alt="Foto de 3ra y 8"
          >
        </button>
      `);

    window.L.marker([23.130589950740514, -82.41394393459011])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 0</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-0.jpg"
          data-full-alt="Foto de 3ra y 0"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-0.jpg"
            width="250"
            alt="Foto de 3ra y 0"
          >
        </button>
      `);

    window.L.marker([23.131387519601176, -82.41624492629329])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 2</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-2.jpg"
          data-full-alt="Foto de 1ra y 2"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-2.jpg"
            width="250"
            alt="Foto de 1ra y 2"
          >
        </button>
      `);

    window.L.marker([23.130124626430746, -82.41775769223638])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 6</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-6.jpg"
          data-full-alt="Foto de 1ra y 6"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-6.jpg"
            width="250"
            alt="Foto de 1ra y 6"
          >
        </button>
      `);

    window.L.marker([23.129512908276666, -82.41864818566388])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 8</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-8.jpg"
          data-full-alt="Foto de 1ra y 8"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-8.jpg"
            width="250"
            alt="Foto de 1ra y 8"
          >
        </button>
      `);

    window.L.marker([23.128901187332882, -82.41940993305364])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 10</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-10.jpg"
          data-full-alt="Foto de 1ra y 10"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/1ra-10.jpg"
            width="250"
            alt="Foto de 1ra y 10"
          >
        </button>
      `);

    window.L.marker([23.127115340808622, -82.42185610769813])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 16</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-16.jpg"
          data-full-alt="Foto de 1ra y 16"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-16.jpg"
            width="250"
            alt="Foto de 1ra y 16"
          >
        </button>
      `);

    window.L.marker([23.124480927181338, -82.42514986043298])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 24</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-24.jpg"
          data-full-alt="Foto de 1ra y 24"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-24.jpg"
            width="250"
            alt="Foto de 1ra y 24"
          >
        </button>
      `);

    window.L.marker([23.123928384422218, -82.42608326916724])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 26</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-26.jpg"
          data-full-alt="Foto de 1ra y 26"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-26.jpg"
            width="250"
            alt="Foto de 1ra y 26"
          >
        </button>
      `);

    window.L.marker([23.123267303504498, -82.42683428772054])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 28</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-28.jpg"
          data-full-alt="Foto de 1ra y 28"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-28.jpg"
            width="250"
            alt="Foto de 1ra y 28"
          >
        </button>
      `);

    window.L.marker([23.1187425325615, -82.4327819002503])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 42</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1-42.jpg"
          data-full-alt="Foto de 1ra y 42"
          data-full-width="964"
          data-full-height="1280"
        >
          <img
            src="/fotos/1-42.jpg"
            width="250"
            alt="Foto de 1ra y 42"
          >
        </button>
      `);

    window.L.marker([23.11907801819078, -82.43230983147204])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 40 a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1-40a.jpg"
          data-full-alt="Foto de 1ra y 40 a"
          data-full-width="1280"
          data-full-height="964"
        >
          <img
            src="/fotos/1-40a.jpg"
            width="250"
            alt="Foto de 1ra y 40 a"
          >
        </button>
      `);

    window.L.marker([23.119995665755518, -82.43105455763144])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 38</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1-38.jpg"
          data-full-alt="Foto de 1ra y 38"
          data-full-width="964"
          data-full-height="1280"
        >
          <img
            src="/fotos/1-38.jpg"
            width="250"
            alt="Foto de 1ra y 38"
          >
        </button>
      `);

    window.L.marker([23.122655554065236, -82.42770332339352])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 30</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-30.jpg"
          data-full-alt="Foto de 1ra y 30"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-30.jpg"
            width="250"
            alt="Foto de 1ra y 30"
          >
        </button>
      `);

    window.L.marker([23.121797126763685, -82.42881912232959])
      .addTo(map)
      .bindPopup(`
        <h3>1ra entre 34 y 32</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-34-32.jpg"
          data-full-alt="Foto de 1ra entre 34 y 32"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1ra-34-32.jpg"
            width="250"
            alt="Foto de 1ra entre 34 y 32"
          >
        </button>
      `);

    window.L.marker([23.12138271162881, -82.4292911911345])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 34</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1ra-34.jpg"
          data-full-alt="Foto de 1ra y 34"
          data-full-width="964"
          data-full-height="1280"
        >
          <img
            src="/fotos/1ra-34.jpg"
            width="250"
            alt="Foto de 1ra y 34"
          >
        </button>
      `);

    window.L.marker([23.120370616713, -82.43056103115356])
      .addTo(map)
      .bindPopup(`
        <h3>1ra y 36a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1-36a.jpg"
          data-full-alt="Foto de 1ra y 36a"
          data-full-width="964"
          data-full-height="1280"
        >
          <img
            src="/fotos/1-36a.jpg"
            width="250"
          alt="Foto de 1ra y 36a"
        >
        </button>
      `);

    window.L.marker([23.109455505553285, -82.42844227005845])
      .addTo(map)
      .bindPopup(`
        <h3>11 y 60</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/11-60.jpg"
          data-full-alt="Foto de 11 y 60"
          data-full-width="1280"
          data-full-height="964"
        >
          <img
            src="/fotos/11-60.jpg"
            width="250"
          alt="Foto de 11 y 60"
        >
        </button>
      `);

    window.L.marker([23.115788649305564, -82.43521083734515])
      .addTo(map)
      .bindPopup(`
        <h3>60 y 1ra a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/60-1a-a.jpg"
          data-full-alt="Foto de 60 y 1ra a"
          data-full-width="1280"
          data-full-height="964"
        >
          <img
            src="/fotos/60-1a-a.jpg"
            width="250"
          alt="Foto de 60 y 1ra a"
        >
        </button>
      `);

    window.L.marker([23.111237229600306, -82.43048590071552])
      .addTo(map)
      .bindPopup(`
        <h3>60 y 7ma a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/60-7maa.jpg"
          data-full-alt="Foto de 60 y 7ma a"
          data-full-width="1280"
          data-full-height="964"
        >
          <img
            src="/fotos/60-7maa.jpg"
            width="250"
          alt="Foto de 60 y 7ma a"
        >
        </button>
      `);

    window.L.marker([23.134034290397473, -82.41230042952621])
      .addTo(map)
      .bindPopup(`
        <h3>puntilla</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/puntilla.jpg"
          data-full-alt="Foto de puntilla"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/puntilla.jpg"
            width="250"
            alt="Foto de puntilla"
          >
        </button>
      `);

    window.L.marker([23.133266732021493, -82.412078978828])
      .addTo(map)
      .bindPopup(`
        <h3>puntilla2</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/puntilla2.jpg"
          data-full-alt="Foto de puntilla2"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/puntilla2.jpg"
            width="250"
          alt="Foto de puntilla2"
        >
        </button>
      `);

    window.L.marker([23.131852983095985, -82.41303942903318])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y b</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-b.jpg"
          data-full-alt="Foto de 3ra y b"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-b.jpg"
            width="250"
          alt="Foto de 3ra y b"
        >
        </button>
      `);

    window.L.marker([23.132563972414843, -82.41279527640154])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y c</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-c.jpg"
          data-full-alt="Foto de 3ra y c"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-c.jpg"
            width="250"
            alt="Foto de 3ra y c"
          >
        </button>
      `);

    window.L.marker([23.129919036234835, -82.41480224150817])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 2</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-2.jpg"
          data-full-alt="Foto de 3ra y 2"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-2.jpg"
            width="250"
            alt="Foto de 3ra y 2"
          >
        </button>
      `);

    window.L.marker([23.12866291206827, -82.41640977907548])
      .addTo(map)
      .bindPopup(`
        <h3>3ra y 6</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/3ra-6.jpg"
          data-full-alt="Foto de 3ra y 6"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/3ra-6.jpg"
            width="250"
            alt="Foto de 3ra y 6"
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
