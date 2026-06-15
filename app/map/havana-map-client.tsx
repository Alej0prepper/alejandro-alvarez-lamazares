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

type LeafletIcon = unknown;

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
  marker: (
    coordinates: [number, number],
    options?: { icon?: LeafletIcon }
  ) => LeafletMarker;
  icon: (options: {
    iconUrl: string;
    shadowUrl?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
    shadowSize?: [number, number];
  }) => LeafletIcon;
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
  const modalHistoryRef = useRef(false);
  const modalOpenRef = useRef(false);
  const [leafletReady, setLeafletReady] = useState(false);
  const [fullImage, setFullImage] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    modalOpenRef.current = fullImage !== null;
  }, [fullImage]);

  function closeFullImage() {
    if (!modalOpenRef.current) return;
    if (modalHistoryRef.current) {
      modalHistoryRef.current = false;
      window.history.back();
      return;
    }
    setFullImage(null);
  }

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest("[data-full-image]");
      if (!(trigger instanceof HTMLElement)) return;

      const src = trigger.dataset.fullImage;
      if (!src) return;

      event.preventDefault();
      if (!modalOpenRef.current) {
        modalHistoryRef.current = true;
        window.history.pushState({ mapImageModal: true }, "");
      }
      setFullImage({
        src,
        alt: trigger.dataset.fullAlt ?? "Imagen ampliada",
        width: Number(trigger.dataset.fullWidth ?? 1280),
        height: Number(trigger.dataset.fullHeight ?? 720),
      });
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeFullImage();
      }
    }

    function handlePopState() {
      if (modalHistoryRef.current) {
        modalHistoryRef.current = false;
        setFullImage(null);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!leafletReady || mapRef.current || !window.L) return;

    const map = window.L.map("map").setView([23.11753779232512, -82.4221588972623], 13);
    mapRef.current = map;

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const redIcon = window.L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

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

    window.L.marker([23.124756921627522, -82.41418223853486])
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 8</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-8.jpg"
          data-full-alt="Foto de 7ma y 8"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-8.jpg"
            width="250"
          alt="Foto de 7ma y 8"
        >
        </button>
      `);

    window.L.marker([23.12023834604711, -82.41995438565672], {
      icon: redIcon,
    })
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 22 embajada de paises bajos</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-22-emb-paisesbajoss.jpg"
          data-full-alt="Foto de 7ma y 22 embajada de paises bajos"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-22-emb-paisesbajoss.jpg"
            width="250"
            alt="Foto de 7ma y 22 embajada de paises bajos"
          >
        </button>
      `);

    window.L.marker([23.11900703684868, -82.42164687518374], {
      icon: redIcon,
    })
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 26 farmacia internacional</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-26.jpg"
          data-full-alt="Foto de 7ma y 26 farmacia internacional"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-26.jpg"
            width="250"
            alt="Foto de 7ma y 26 farmacia internacional"
          >
        </button>
      `);

    window.L.marker([23.117160051865998, -82.42412245684295])
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 32</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-32.jpg"
          data-full-alt="Foto de 7ma y 32"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-32.jpg"
            width="250"
          alt="Foto de 7ma y 32"
        >
        </button>
      `);

    window.L.marker([23.116544384536617, -82.42495607106989])
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 34</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-34.jpg"
          data-full-alt="Foto de 7ma y 34"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-34.jpg"
            width="250"
          alt="Foto de 7ma y 34"
        >
        </button>
      `);

    window.L.marker([23.11578560926723, -82.42564275731354], {
      icon: redIcon,
    })
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 36 (consultores y abogados internacionales y embajadas aledañas)</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-36.jpg"
          data-full-alt="Foto de 7ma y 36"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-36.jpg"
            width="250"
          alt="Foto de 7ma y 36"
        >
        </button>
      `);

    window.L.marker([23.11536414516809, -82.42635249407289])
      .addTo(map)
      .bindPopup(`
        <h3>7ma y 36a</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/7ma-36a.jpg"
          data-full-alt="Foto de 7ma y 36a"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/7ma-36a.jpg"
            width="250"
          alt="Foto de 7ma y 36a"
        >
        </button>
      `);

    window.L.marker([23.096585810040633, -82.44837256957956])
      .addTo(map)
      .bindPopup(`
        <h3>9na y 5ta f arriba</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/9na-5taf-arriba.jpg"
          data-full-alt="Foto de 9na y 5ta f arriba"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/9na-5taf-arriba.jpg"
            width="250"
          alt="Foto de 9na y 5ta f arriba"
        >
        </button>
      `);

    window.L.marker([23.096289282517667, -82.44920915171234])
      .addTo(map)
      .bindPopup(`
        <h3>5ta f</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/9na-5taf.jpg"
          data-full-alt="Foto de 5ta f"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/9na-5taf.jpg"
            width="250"
          alt="Foto de 5ta f"
        >
        </button>
      `);

    window.L.marker([23.104318, -82.435607])
      .addTo(map)
      .bindPopup(`
        <h3>9na-76</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/9na-76.jpg"
          data-full-alt="Foto de 9na-76"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/9na-76.jpg"
            width="250"
          alt="Foto de 9na-76"
        >
        </button>
      `);

    window.L.marker([23.102103, -82.438027])
      .addTo(map)
      .bindPopup(`
        <h3>9na y 82</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/9na-82.jpg"
          data-full-alt="Foto de 9na y 82"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/9na-82.jpg"
            width="250"
          alt="Foto de 9na y 82"
        >
        </button>
      `);

    window.L.marker([23.108214, -82.426965])
      .addTo(map)
      .bindPopup(`
        <h3>15-52</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/15-52.jpg"
          data-full-alt="Foto de 15-52"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/15-52.jpg"
            width="250"
          alt="Foto de 15-52"
        >
        </button>
      `);

    window.L.marker([23.107254, -82.42611])
      .addTo(map)
      .bindPopup(`
        <h3>17-60</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/17-60.jpg"
          data-full-alt="Foto de 17-60"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/17-60.jpg"
            width="250"
          alt="Foto de 17-60"
        >
        </button>
      `);

    window.L.marker([23.107254, -82.42611])
      .addTo(map)
      .bindPopup(`
        <h3>19-36</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-36.jpg"
          data-full-alt="Foto de 19-36"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/19-36.jpg"
            width="250"
          alt="Foto de 19-36"
        >
        </button>
      `);

    window.L.marker([23.113187, -82.423596])
      .addTo(map)
      .bindPopup(`
        <h3>19-42</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-42.jpg"
          data-full-alt="Foto de 19-42"
          data-full-width="720"
          data-full-height="1280"
        >
          <img
            src="/fotos/19-42.jpg"
            width="250"
          alt="Foto de 19-42"
        >
        </button>
      `);

    window.L.marker([23.111855, -82.423725])
      .addTo(map)
      .bindPopup(`
        <h3>19-44</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-44.jpg"
          data-full-alt="Foto de 19-44"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/19-44.jpg"
            width="250"
          alt="Foto de 19-44"
        >
        </button>
      `);

    window.L.marker([23.109447, -82.424487])
      .addTo(map)
      .bindPopup(`
        <h3>19-48</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-48.jpg"
          data-full-alt="Foto de 19-48"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/19-48.jpg"
            width="250"
          alt="Foto de 19-48"
        >
        </button>
      `);

    window.L.marker([23.108609, -82.424519])
      .addTo(map)
      .bindPopup(`
        <h3>19-50</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-50.jpg"
          data-full-alt="Foto de 19-50"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/19-50.jpg"
            width="250"
          alt="Foto de 19-50"
        >
        </button>
      `);

    window.L.marker([23.10627, -82.425152])
      .addTo(map)
      .bindPopup(`
        <h3>19-60frente</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/19-62frente.jpg"
          data-full-alt="Foto de 19-60frente"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/19-62frente.jpg"
            width="250"
          alt="Foto de 19-60frente"
        >
        </button>
      `);

    window.L.marker([23.114006, -82.422223])
      .addTo(map)
      .bindPopup(`
        <h3>21/40</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-40.jpg"
          data-full-alt="Foto de 21/40"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-40.jpg"
            width="250"
          alt="Foto de 21/40"
        >
        </button>
      `);

    window.L.marker([23.114204, -82.422491])
      .addTo(map)
      .bindPopup(`
        <h3>21-402</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-402.jpg"
          data-full-alt="Foto de 21-402"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-402.jpg"
            width="250"
          alt="Foto de 21-402"
        >
        </button>
      `);

    window.L.marker([23.108401, -82.423564])
      .addTo(map)
      .bindPopup(`
        <h3>21-50</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-503.jpg"
          data-full-alt="Foto de 21-50"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-503.jpg"
            width="250"
          alt="Foto de 21-50"
        >
        </button>
      `);

    window.L.marker([23.107849, -82.427019])
      .addTo(map)
      .bindPopup(`
        <h3>60-15</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/60-15.jpg"
          data-full-alt="Foto de 60-15"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/60-15.jpg"
            width="250"
          alt="Foto de 60-15"
        >
        </button>
      `);

    window.L.marker([23.110444, -82.423167])
      .addTo(map)
      .bindPopup(`
        <h3>21-46</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-46.jpg"
          data-full-alt="Foto de 21-46"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-46.jpg"
            width="250"
          alt="Foto de 21-46"
        >
        </button>
      `);

    window.L.marker([23.105628, -82.424251])
      .addTo(map)
      .bindPopup(`
        <h3>21-60</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-60.jpg"
          data-full-alt="Foto de 21-60"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-60.jpg"
            width="250"
          alt="Foto de 21-60"
        >
        </button>
      `);

    window.L.marker([23.107701, -82.42483])
      .addTo(map)
      .bindPopup(`
        <h3>19-52</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/1952.jpg"
          data-full-alt="Foto de 19-52"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/1952.jpg"
            width="250"
          alt="Foto de 19-52"
        >
        </button>
      `);

    window.L.marker([23.116564, -82.421652])
      .addTo(map)
      .bindPopup(`
        <h3>21 y 30</h3>
        <button
          type="button"
          class="map-popup-image-button"
          data-full-image="/fotos/21-9.jpg"
          data-full-alt="Foto de 21 y 30"
          data-full-width="1280"
          data-full-height="720"
        >
          <img
            src="/fotos/21-9.jpg"
            width="250"
            alt="Foto de 21 y 30"
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
            onClick={closeFullImage}
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
            onClick={closeFullImage}
          >
            Cerrar
          </button>
        </div>
      ) : null}
    </>
  );
}
