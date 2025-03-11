import React, { useState, useRef, useEffect } from "react";
import "./VehicleListing.css";

import ToyotaTourPopup from "./ToyotaTourPopup/ToyotaTourPopup";
import Vehicle3DView from "./3DView/Vehicle3DView";
import { Hotspot, ThreeDModelData, Vehicle } from "../models/types";
import HotspotImageViewer from "./hotspot-details/HotspotImageViewer";



// SVG Icons as React components
const SearchIcon = () => (
  <svg
    className="search-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
    />
  </svg>
);

const CloneIcon = () => (
  <svg
    className="compare-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM362 464H54c-3.3 0-6-2.7-6-6V150c0-3.3 2.7-6 6-6h42v224c0 26.5 21.5 48 48 48h224v42c0 3.3-2.7 6-6 6zm96-96H150c-3.3 0-6-2.7-6-6V54c0-3.3 2.7-6 6-6h308c3.3 0 6 2.7 6 6v308c0 3.3-2.7 6-6 6z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="plus-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
    />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    className="arrow-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    className="arrow-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
    />
  </svg>
);

const InfoCircleIcon = () => (
  <svg
    className="info-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="close-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
    />
  </svg>
);

const Rotate3DIcon = () => (
  <svg
    className="rotate-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
    />
  </svg>
);

const StarIcon = () => (
  <svg
    className="star-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
    />
  </svg>
);

const SpeedIcon = () => (
  <svg
    className="speed-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
    />
  </svg>
);

const EngineIcon = () => (
  <svg
    className="engine-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
    />
  </svg>
);

const SafetyIcon = () => (
  <svg
    className="safety-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
    />
  </svg>
);

const ComfortIcon = () => (
  <svg
    className="comfort-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M176 96c26.5 0 48-21.5 48-48S202.5 0 176 0s-48 21.5-48 48 21.5 48 48 48zm112 96H64c-35.3 0-64 28.7-64 64v176c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h512v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V256c0-35.3-28.7-64-64-64H288zm-64-16h64V144h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H384V64h36c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12h-36c-26.5 0-48 21.5-48 48v16H224c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h12v32z"
    />
  </svg>
);

const VRViewIcon = () => (
  <svg
    className="vr-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h160.22c25.19 0 48.03-14.77 58.36-37.74l27.74-61.64C286.21 331.08 302.35 320 320 320s33.79 11.08 41.68 28.62l27.74 61.64C399.75 433.23 422.6 448 447.78 448H608c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM160 304c-35.35 0-64-28.65-64-64s28.65-64 64-64 64 28.65 64 64-28.65 64-64 64zm320 0c-35.35 0-64-28.65-64-64s28.65-64 64-64 64 28.65 64 64-28.65 64-64 64z"
    />
  </svg>
);

const FireIcon = () => (
  <svg
    className="fire-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
    />
  </svg>
);
const ThreeDModelIcon = () => (
  <svg
    className="three-d-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M239.1 6.3l-208 78c-18.7 7-31.1 25-31.1 45v225.1c0 18.2 10.3 34.8 26.5 42.9l208 104c13.5 6.8 29.4 6.8 42.9 0l208-104c16.3-8.1 26.5-24.8 26.5-42.9V129.3c0-20-12.4-37.9-31.1-44.9l-208-78C262 2.2 250 2.2 239.1 6.3zM256 68.4l192 72v1.1l-192 78-192-78v-1.1l192-72zm32 356V275.5l160-65v133.9l-160 80z"
    />
  </svg>
);

// Structured vehicle data - organized by category and model
const VEHICLE_DATA = {
  // Base directory for all vehicle images
  baseDir: "/Vehicle images/",

  // Vehicle categories with properly named keys to avoid transformations
  categories: {
    "COMPACT SUV": [
      {
        id: 1,
        name: "THE YARIS CROSS",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle1.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle2.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle3.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle4.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle5.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle6.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle7.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle8.png",
          ],
        },
        colors: [
          {
            code: "#C0C0C0",
            name: "Gray",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle1.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle2.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle3.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle4.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle5.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle6.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle7.png",
            "/Compact SUV/Yaris Cross/colour s/Silver Metallic S 28/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Yaris Cross/feature-performance-tight-turning-radius.jpg",
              "/Compact SUV/Yaris Cross/feature-design-and-comfort-dynamic-suv-style.jpg",
              "/Compact SUV/Yaris Cross/feature-design-and-comfort-power-back-door-with-kick-sensor.jpg",
              "/Compact SUV/Yaris Cross/feature-safety-hill-start-assist-control.jpg",
              
              
            ],
          },
          {
            code: "#293339",
            name: "Forest Green",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle1.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle2.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle3.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle4.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle5.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle6.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle7.jpg",
                "/Compact SUV/Yaris Cross/colour s/Greenish Gun Metal/vehicle8.jpg",
              ],
            },
            images: [
              "/Compact SUV/Yaris Cross/feature-performance-tight-turning-radius.jpg",
            ],
          },
          {
            code: "#0000",
            name: "Attitude Black",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle1.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle2.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle3.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle4.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle5.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle6.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle7.png",
                "/Compact SUV/Yaris Cross/colour s/Attitude Black/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Yaris Cross/feature-performance-tight-turning-radius.jpg",
            ],
          },
          {
            code: "#fffff",
            name: "platinumn white pearl",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle1.png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle2 (1).png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle3.png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle4 (1).png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle5 (1).png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle6.png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle7.png",
                "/Compact SUV/Yaris Cross/colour s/platinumn white pearl/vehicle8 (1).png",
                
              ],
            },
            images: [
             "/Compact SUV/Yaris Cross/feature-performance-tight-turning-radius.jpg",
            ],
          },
        ],
        specs: {
          engine: "4 cylinders, In-line type, 16-Valve DOHC with Dual VVT-i",
          performance: "114 HP @ 6,000 rpm / 121 Nm @ 4,800 rpm",
          features: [
            "Hybrid Electric Drivetrain",
            "Smart Entry & Start System",
            "Apple CarPlay & Android Auto",
          ],
          peakPower: "114 hp",
          topSpeed: "180 km/h",
          acceleration: "10.5 seconds (0-100 km/h)",
          fuelEconomy: "6.5L/100km",
          additionalSpecs: {
            transmission: "Dual-mode CVT with 7-Speed Sequential Shifting",
            turningRadius: "5.2 m",
            luggageSpace: "452 L (hybrid) / 458 L (petrol)",
            seating: "5 passengers",
            displaySize: "10.1-inch multimedia display",
          }
        },
        features: {
          design: [
            {
              title: "Dynamic SUV Style",
              description: "The bold design drives an elevated look with its sharp lines, powerful proportions, and sporty interior.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-dynamic-suv-style.jpg"
            },
            {
              title: "Class-leading Comfort",
              description: "Passengers enjoy ample headroom and legroom along with reclining seats. Long trips are more enjoyable in the roomy and quiet cabin.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-class-leading-comfort.jpg"
            },
            {
              title: "10.1-Inch Multimedia Display",
              description: "The large touchscreen display is compatible with Apple CarPlay® and Android Auto™. Enjoy seamless access to entertainment and smartphone functions.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-multimedia-display.jpg"
            },
            {
              title: "Panoramic Glass Roof",
              description: "Enjoy the spacious interior feel. The sleek glass roof allows natural light in and can be opened for fresh air.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-panoramic-glass-roof.jpg"
            },
            {
              title: "Ample Luggage Space",
              description: "The Yaris Cross comes with a generous 452 L luggage compartment in hybrid electric variants and 458 L in petrol variants.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-ample-luggage-space.jpg"
            },
            {
              title: "Power Back Door With Kick Sensor",
              description: "Enjoy hands-free access to the luggage compartment with a simple kicking motion under the rear bumper.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-power-back-door-with-kick-sensor.jpg"
            },
            {
              title: "Wireless Charging",
              description: "A wireless charging station in the cockpit lets you conveniently power up your Qi-compatible devices.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-wireless-charging.jpg"
            },
            {
              title: "Heat-reflecting Seats",
              description: "Slide into comfort with heat-dissipating front row seats. Special infrared reflection functions take away up to 70% of heat from the leather surface.",
              image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-heat-reflecting-seats.jpg"
            }
          ],
          performance: [
            {
              title: "Hybrid Electric Drivetrain",
              description: "Experience better fuel economy and acceleration with the hybrid electric drivetrain.",
              image: "/Compact SUV/Yaris Cross/feature-performance-hybrid-electric-drivetrain.jpg"
            },
            {
              title: "EV Mode",
              description: "Drive on pure electric power at low speeds for short distances to save fuel, reduce noise, and lower exhaust emissions.",
              image: "/Compact SUV/Yaris Cross/feature-performance-ev-mode.jpg"
            },
            {
              title: "Dual-mode CVT With 7-Speed Sequential Shifting",
              description: "The 7-speed CVT delivers a responsive drive with smooth shifting and greater fuel efficiency.",
              image: "/Compact SUV/Yaris Cross/feature-performance-cvt.jpg"
            },
            {
              title: "New Platform With Optimised Suspension",
              description: "Enjoy better handling and ride comfort with the newly developed lighter and more rigid platform.",
              image: "/Compact SUV/Yaris Cross/feature-performance-platform.jpg"
            },
            {
              title: "Tight Turning Radius",
              description: "The Yaris Cross exemplifies urban agility with a best-in-class turning radius of 5.2 m.",
              image: "/Compact SUV/Yaris Cross/feature-performance-turning-radius.jpg"
            }
          ],
          safety: [
            {
              title: "Panoramic View Monitor",
              description: "Get a bird's-eye view of the vehicle and its surroundings for even safer parking and driving in tight spaces.",
              image: "/Compact SUV/Yaris Cross/feature-safety-panoramic-view-monitor.jpg"
            },
            {
              title: "Vehicle Stability Control (VSC)",
              description: "VSC helps to prevent skidding and assists with stabilising your vehicle when cornering or making sudden turns.",
              image: "/Compact SUV/Yaris Cross/feature-safety-vsc.jpg"
            },
            {
              title: "Clearance Sonar",
              description: "Handle the vehicle more confidently and park more easily with help from sensors on the front and rear.",
              image: "/Compact SUV/Yaris Cross/feature-safety-clearance-sonar.jpg"
            },
            {
              title: "Six SRS Airbags",
              description: "Driver and front passenger airbags come standard, along with side airbags and curtain shield airbags.",
              image: "/Compact SUV/Yaris Cross/feature-safety-airbags.jpg"
            },
            {
              title: "Hill-start Assist Control",
              description: "Starting on a hill has never been easier with Hill-start Assist Control which holds the vehicle in place for two seconds.",
              image: "/Compact SUV/Yaris Cross/feature-safety-hill-start-assist.jpg"
            }
          ]
        },
        hotspots: [
          {
            id: 1,
            x: 35,
            y: 35,
            title: "Seat Set",
            description: "Projector-type LED headlights with auto-leveling function for enhanced visibility and safety.",
            image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-class-leading-comfort.jpg",
          },
          {
            id: 2,
            x: 55,
            y: 43,
            title: "Dashboard",
            description: "",
            image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-multi-media-screen.jpg",
          },
          {
            id: 3,
            x: 40,
            y: 30,
            title: "Panoramic Glass Roof",
            description: "Spacious panoramic glass roof that brings natural light into the cabin and can be opened for fresh air.",
            image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-panoramic-glass-roof.jpg",
          },
          {
            id: 4,
            x: 13,
            y: 40,
            title: "Boot Space",
            description: "Hands-free power back door with kick sensor for convenient access to the luggage compartment.",
            image: "/Compact SUV/Yaris Cross/feature-design-and-comfort-power-back-door-with-kick-sensor.jpg",
          },
          {
            id: 5,
            x: 40,
            y: 40,
            title: "feature-safety-six-srs-airbags",
            description: "Large touchscreen display with Apple CarPlay® and Android Auto™ connectivity for seamless smartphone integration.",
            image: "/Compact SUV/Yaris Cross/feature-safety-six-srs-airbags.jpg",
          }
        ],
      },
      {
        id: 2,
        name: "COROLLA CROSS",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle1.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle2 (1).png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle3.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle4.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle5.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle6.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle7.png",
            "/Compact SUV/Corolla Cross/colours/Red Mica Metallic/vehicle8.png",
          ],
        },
        colors: [
          {
            code: "#0000",
            name: "Attitude Black Micad",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle1.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle2.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle3.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle4.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle5.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle6.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle7.png",
                "/Compact SUV/Corolla Cross/colours/Attitude Black Mica/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Corolla Cross/THE-COROLLA-CROSS-SERIES.jpg",
              "/Compact SUV/Corolla Cross/Striking-Looks.jpg",
              "/Compact SUV/Corolla Cross/Stylish-Functional-Rear-Design.jpg",
            ],
          },
          {
            code: "#909090",
            name: "Celesite Gray Metalic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle1 (1).png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle2.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle3.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle4.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle5.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle6.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle7.png",
                "/Compact SUV/Corolla Cross/colours/Celesite Gray Metalic/vehicle8.png",

              ],
            },
            images: [
             "/Compact SUV/Corolla Cross/THE-COROLLA-CROSS-SERIES.jpg",
              "/Compact SUV/Corolla Cross/Striking-Looks.jpg",
              "/Compact SUV/Corolla Cross/Stylish-Functional-Rear-Design.jpg",
             
            ],
          },

          {
            code: "#3A1F04",
            name: "graphite Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle1 (1).png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle2.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle3.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle4.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle5.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle6.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle7.png",
                "/Compact SUV/Corolla Cross/colours/graphite Metallic/vehicle8.png",

              ],
            },
            images: [
              "/Compact SUV/Corolla Cross/THE-COROLLA-CROSS-SERIES.jpg",
              "/Compact SUV/Corolla Cross/Striking-Looks.jpg",
              "/Compact SUV/Corolla Cross/Stylish-Functional-Rear-Design.jpg",
             
            ],
          },
          {
            code: "#0000FF",
            name: "blue",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle1 (1).png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle2.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle3.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle4.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle5.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle6.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle7.png",
                "/Compact SUV/Corolla Cross/colours/Nebula Blue Metallic/vehicle8.png",

              ],
            },
            images: [
              "/Compact SUV/Corolla Cross/THE-COROLLA-CROSS-SERIES.jpg",
              "/Compact SUV/Corolla Cross/Striking-Looks.jpg",
              "/Compact SUV/Corolla Cross/Stylish-Functional-Rear-Design.jpg",
            ],
          },
          {
            code: "#fffff",
            name: "PLatinum white Pearl Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle1.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle2.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle3.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle4.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle5.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle6.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle7.png",
                "/Compact SUV/Corolla Cross/colours/PLatinum white Pearl Mica/vehicle8.png",

              ],
            },
            images: [
             "/Compact SUV/Corolla Cross/THE-COROLLA-CROSS-SERIES.jpg",
              "/Compact SUV/Corolla Cross/Striking-Looks.jpg",
              "/Compact SUV/Corolla Cross/Stylish-Functional-Rear-Design.jpg",
             
            ],
          },
          
        ],
        specs: {
          engine: "1.8 L, 4-cyl petrol",
          performance: "140 hp / 172 Nm",
          features: [
            "Hybrid Electric Drivetrain",
            "EV mode",
            "TNGA Platform with Optimised Suspension"
          ],
          peakPower: "140 hp",
          topSpeed: "170 km/h", // Keeping as is since not specified in your information
          acceleration: "11.2 seconds (0-100 km/h)", // Keeping as is since not specified
          fuelEconomy: "4.3L/100km", // Keeping as is since not specified
        },
        hotspots: [
          {
            id: 1,
            x: 35,
            y: 43,
            title: "Dashboard",
            description: ".",
            image: "/Compact SUV/Corolla Cross/Bold-SUV-Style.jpg",
          },
          {
            id: 2,
            x: 20,
            y: 50,
            title: "Engin",
            description: ".",
            image: "Compact SUV/Corolla Cross/Hybrid-Electric-Drivetrain.jpg",
          },
          {
            id: 3,
            x: 45,
            y: 45,
            title: "Airbags",
            description: ".",
            image: "/Compact SUV/Corolla Cross/Seven-SRS-Airbags-2.jpg",
          },
          
        ],
      },
      {
        id: 3,
        name: "RUSH",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Compact SUV/Rush/Colors/white/vehicle1.png",
            "/Compact SUV/Rush/Colors/white/vehicle2.png",
            "/Compact SUV/Rush/Colors/white/vehicle3.png",
            "/Compact SUV/Rush/Colors/white/vehicle4.png",
            "/Compact SUV/Rush/Colors/white/vehicle5.png",
            "/Compact SUV/Rush/Colors/white/vehicle6.png",
            "/Compact SUV/Rush/Colors/white/vehicle7.png",
            "/Compact SUV/Rush/Colors/white/vehicle8.png",
          ],
        },
        colors: [
          {
            code: "#000000",
            name: "Black Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle1.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle2.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle3.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle4.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle5.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle6.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle7.png",
                "/Compact SUV/Rush/Colors/Black Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Rush/Large-Chrome-Grille.jpg",
              "/Compact SUV/Rush/Hill-start-Assist-Control-HAC-1.jpg",
              "/Compact SUV/Rush/toyota-rush-masthead-d.jpg",
              
            ],
          },
          {
            code: "#AA6C39",
            name: "Bronze Mica Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle1 (1).png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle2.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle3.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle4.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle5.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle6.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle7.png",
                "/Compact SUV/Rush/Colors/Bronze Mica Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Rush/Large-Chrome-Grille.jpg",
              "/Compact SUV/Rush/Hill-start-Assist-Control-HAC-1.jpg",
              "/Compact SUV/Rush/toyota-rush-masthead-d.jpg",
            ],
          },
          {
            code: "#FF0000",
            name: "Red Mica Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle1 (1).png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle2.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle3.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle4.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle5.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle6.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle7.png",
                "/Compact SUV/Rush/Colors/Dark red Mica/vehicle8.png",
              ],
            },
            images: [
              "Compact SUV/Rush/Large-Chrome-Grille.jpg"
            ],
          },
        ],
        specs: {
          engine: "1.5 L Petrol Engine",
          performance: "Not specified in the information", // Performance details not provided
          features: [
            "7 Seats",
            "Auto Transmission Available",
            "Best-in-class Ground Clearance (220 mm)"
          ],
          peakPower: "Not specified", // Power details not provided in your information
          topSpeed: "Not specified", // Not provided in your information
          acceleration: "Not specified", // Not provided in your information
          fuelEconomy: "15.1 km/L",
        },
        hotspots: [
          {
            id: 1,
            x: 30,
            y: 48,
            title: "LED Headlights",
            description: "Never lose sight of your path with the stylish LED smoke headlights and front fog lights.",
            image: "/Compact SUV/Rush/LED-Headlights.jpg",
          },
          {
            id: 2,
            x: 70,
            y: 60,
            title: " Wheels",
            description: "The stylish, sharp-looking wheels exude toughness.",
            image: "/Compact SUV/Rush/Bold-17-Alloy-Wheels.jpg",
          },
          
          {
            id: 4,
            x: 50,
            y: 55,
            title: "Engine",
            description: ".",
            image: "/Compact SUV/Rush/1.5-L-Petrol-Engine.jpg",
          }
        ],
      },
      {
        id: 4,
        name: "RAIZE",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle1.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle2.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle3.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle4.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle5.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle6.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle7.png",
            "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle8.png",

          ],
        },
        colors: [
          {
            code: "#FF0000",
            name: "Red",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
            "/Compact SUV/Raize/colours/1/Red/vehicle1.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle2.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle3.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle4.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle5.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle6.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle7.png",
            "/Compact SUV/Raize/colours/1/Red/vehicle8.png",

              ],
            },
            images: [
              "/Compact SUV/Raize/toyota-raize-features-1-enhanced-stability-and-comfort.jpg",
              "/Compact SUV/Raize/toyota-raize-features-4-tight-turning-radius.jpg",
              "/Compact SUV/Raize/toyota-raize-features-1-bold-vibrant-exterior-1.jpg",
              
            ],
          },
          {
            code: "#68A699",
            name: "Turquoise Mica Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle1.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle2.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle3.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle4.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle5.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle6.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle7.png",
                "/Compact SUV/Raize/colours/1/Turquoise Mica Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Raize/toyota-raize-features-1-enhanced-stability-and-comfort.jpg",
              "/Compact SUV/Raize/toyota-raize-features-4-tight-turning-radius.jpg",
              "/Compact SUV/Raize/toyota-raize-features-1-bold-vibrant-exterior-1.jpg",
              
            ],
          },
          {
            code: "#fffff",
            name: "White",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Compact SUV/Raize/colours/1/White/vehicle1.png",
                "/Compact SUV/Raize/colours/1/White/vehicle2.png",
                "/Compact SUV/Raize/colours/1/White/vehicle3.png",
                "/Compact SUV/Raize/colours/1/White/vehicle4.png",
                "/Compact SUV/Raize/colours/1/White/vehicle5.png",
                "/Compact SUV/Raize/colours/1/White/vehicle6.png",
                "/Compact SUV/Raize/colours/1/White/vehicle7.png",
                "/Compact SUV/Raize/colours/1/White/vehicle8.png",
              ],
            },
            images: [
              "/Compact SUV/Raize/toyota-raize-features-1-enhanced-stability-and-comfort.jpg",
              "/Compact SUV/Raize/toyota-raize-features-4-tight-turning-radius.jpg",
              "/Compact SUV/Raize/toyota-raize-features-1-bold-vibrant-exterior-1.jpg",
              
            ],
          },
        ],
        specs: {
          engine: "1.5L 4-Cylinder Dynamic Force Engine",
          performance: "120 hp @ 5,800 rpm / 145 Nm @ 4,800 rpm",
          features: [
            "All-Wheel Drive System",
            "Toyota Safety Sense",
            "Apple CarPlay & Android Auto",
          ],
          peakPower: "120 hp",
          topSpeed: "180 km/h",
          acceleration: "10.5 seconds (0-100 km/h)",
          fuelEconomy: "6.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 32,
            y: 44,
            title: "Engin",
            description:
              "",
            image: "/Compact SUV/Raize/toyota-raize-features-2-effortless-acceleration.jpg",
          },
          {
            id: 2,
            x: 50,
            y: 40,
            title: "Seat",
            description:
              "",
            image:"/Compact SUV/Raize/toyota-raize-features-3-spacious-and-inviting.jpg",
          },
        ],
      },
    ],
    "HATCHBACK": [
      {
        id: 5,
        name: "PRIUS",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle1 (1).png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle2.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle3.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle4.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle5.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle6.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle7.png",
            "/Hatchback/Prius/Colours/Guardian Gray/vehicle8.png",

          ],
        },
        colors: [
          {
            code: "#F8F8FF",
            name: "Wind Chill Pearl",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
               "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle1.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle2.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle3.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle4.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle5.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle6.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle7.png",
          "/Hatchback/Prius/Colours/Wind Chill Pearl/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Prius/PRS_MY23_0014_V001_wm5OxCIwlyCe_zma2ygymgEJWj.avif",
              "/Hatchback/Prius/PRS_MY23_0075_V001_BbIulogbXMB_ngdRtlQ-1.avif",
              "/Hatchback/Prius/PRS_MY23_0015_V001_pGimYru9r1tSnn_AZpq4GKToMKdo.avif",
              "/Hatchback/Prius/PRS_MY23_0077_V001_wheel_UP0njwzsKwGQ8xu0thaYzjH9EZeG8YY.avif",
              "/Hatchback/Prius/PRS_MY24_0003_V001_qrInJeKBu6ckQK_dzXdLvXK3uAL.avif",
              "/Hatchback/Prius/PRS_MY23_0025_V001_hHYZry4GECU_rzhRgAsSe4q.avif",
              
            ],
          },
          {
            code: "#9B111E",
            name: "Supersonic Red",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Hatchback/Prius/Colours/Supersonic Red/vehicle1 (1).png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle2.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle3.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle4.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle5.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle6.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle7.png",
          "/Hatchback/Prius/Colours/Supersonic Red/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Prius/PRS_MY23_0014_V001_wm5OxCIwlyCe_zma2ygymgEJWj.avif",
              "/Hatchback/Prius/PRS_MY23_0075_V001_BbIulogbXMB_ngdRtlQ-1.avif",
              "/Hatchback/Prius/PRS_MY23_0015_V001_pGimYru9r1tSnn_AZpq4GKToMKdo.avif",
              "/Hatchback/Prius/PRS_MY23_0077_V001_wheel_UP0njwzsKwGQ8xu0thaYzjH9EZeG8YY.avif",
              "/Hatchback/Prius/PRS_MY24_0003_V001_qrInJeKBu6ckQK_dzXdLvXK3uAL.avif",
              "/Hatchback/Prius/PRS_MY23_0025_V001_hHYZry4GECU_rzhRgAsSe4q.avif",
            ],
          },
          {
            code: "#252525",
            name: "Midnight Black Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle1.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle2.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle3.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle4.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle5.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle6.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle7.png",
          "/Hatchback/Prius/Colours/Midnight Black Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Prius/PRS_MY23_0014_V001_wm5OxCIwlyCe_zma2ygymgEJWj.avif",
              "/Hatchback/Prius/PRS_MY23_0075_V001_BbIulogbXMB_ngdRtlQ-1.avif",
              "/Hatchback/Prius/PRS_MY23_0015_V001_pGimYru9r1tSnn_AZpq4GKToMKdo.avif",
              "/Hatchback/Prius/PRS_MY23_0077_V001_wheel_UP0njwzsKwGQ8xu0thaYzjH9EZeG8YY.avif",
              "/Hatchback/Prius/PRS_MY24_0003_V001_qrInJeKBu6ckQK_dzXdLvXK3uAL.avif",
              "/Hatchback/Prius/PRS_MY23_0025_V001_hHYZry4GECU_rzhRgAsSe4q.avif",
            ],
          },
        ],
        specs: {
          engine: "1.5L 4-Cylinder Dynamic Force Engine",
          performance: "120 hp @ 5,800 rpm / 145 Nm @ 4,800 rpm",
          features: [
            "All-Wheel Drive System",
            "Toyota Safety Sense",
            "Apple CarPlay & Android Auto",
          ],
          peakPower: "120 hp",
          topSpeed: "180 km/h",
          acceleration: "10.5 seconds (0-100 km/h)",
          fuelEconomy: "6.5L/100km",
        },
        hotspots: [
          
          {
            id: 2,
            x: 68,
            y: 45,
            title: "Side Mirror",
            description:
              "18-inch machine-faced alloy wheels with black accents",
            image: "/Hatchback/Prius/PRS_MY23_0027_V001_sAVBYTjl9DIGcOtAp.avif",
          },
        ],
      },
      {
        id: 6,
        name: "WIGO",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/Hatchback/Wigo/Colours/White/vehicle1.png",
            "/Hatchback/Wigo/Colours/White/vehicle2.png",
            "/Hatchback/Wigo/Colours/White/vehicle3.png",
            "/Hatchback/Wigo/Colours/White/vehicle4.png",
            "/Hatchback/Wigo/Colours/White/vehicle5.png",
            "/Hatchback/Wigo/Colours/White/vehicle6.png",
            "/Hatchback/Wigo/Colours/White/vehicle7.png",
            "/Hatchback/Wigo/Colours/White/vehicle8.png",
          ],
        },
        colors: [
          {
            code: "#000000",
            name: "Black",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Hatchback/Wigo/Colours/Black/vehicle1 (1).png",
                "/Hatchback/Wigo/Colours/Black/vehicle2.png",
                "/Hatchback/Wigo/Colours/Black/vehicle3.png",
                "/Hatchback/Wigo/Colours/Black/vehicle4.png",
                "/Hatchback/Wigo/Colours/Black/vehicle5.png",
                "/Hatchback/Wigo/Colours/Black/vehicle6.png",
                "/Hatchback/Wigo/Colours/Black/vehicle7.png",
                "/Hatchback/Wigo/Colours/Black/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Wigo/tyt_wigo2023_website_mobilebanner_1110x848px-copy-scaled.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_frontside_1080x1080px.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-01-copy.webp",
              "/Hatchback/Wigo/tyt_website_interior_800x450px-06-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_exterior_800x450px-04-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-03-copy.webp",
            ],
          },
          {
            code: "#808080",
            name: "Gray-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle1 (1).png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle2.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle3.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle4.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle5.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle6.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle7.png",
          "/Hatchback/Wigo/Colours/Gray-Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Wigo/tyt_wigo2023_website_mobilebanner_1110x848px-copy-scaled.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_frontside_1080x1080px.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-01-copy.webp",
              "/Hatchback/Wigo/tyt_website_interior_800x450px-06-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_exterior_800x450px-04-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-03-copy.webp",
            ],
          },
          {
            code: "#FFFFFF",
            name: "White",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Hatchback/Wigo/Colours/White/vehicle1.png",
                "/Hatchback/Wigo/Colours/White/vehicle2.png",
                "/Hatchback/Wigo/Colours/White/vehicle3.png",
                "/Hatchback/Wigo/Colours/White/vehicle4.png",
                "/Hatchback/Wigo/Colours/White/vehicle5.png",
                "/Hatchback/Wigo/Colours/White/vehicle6.png",
                "/Hatchback/Wigo/Colours/White/vehicle7.png",
                "/Hatchback/Wigo/Colours/White/vehicle8.png",
              ],
            },
            images: [
              "/Hatchback/Wigo/tyt_wigo2023_website_mobilebanner_1110x848px-copy-scaled.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_frontside_1080x1080px.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-01-copy.webp",
              "/Hatchback/Wigo/tyt_website_interior_800x450px-06-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_exterior_800x450px-04-copy.webp",
              "/Hatchback/Wigo/tyt_wigo2023_website_safety_800x450px-03-copy.webp",
            ],
          },
        ],
        specs: {
          engine: "1.5L VVT-i Engine",
          performance: "107 hp @ 6,000 rpm / 140 Nm @ 4,200 rpm",
          features: [
            "Push Start System",
            "6 SRS Airbags",
            "7-inch Touchscreen Display",
          ],
          peakPower: "107 hp",
          topSpeed: "175 km/h",
          acceleration: "10.8 seconds (0-100 km/h)",
          fuelEconomy: "5.8L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 73,
            y: 67,
            title: "Alloy Wheel",
            description:
              "14'' silver-finished alloy wheel with 10-spoke design",
            image:
              "/Hatchback/Wigo/tyt_wigo2023_website_exterior_800x450px-09-copy.webp",
          },
          {
            id: 2,
            x: 80,
            y: 48,
            title: "Power Retractable Mirror",
            description:
              "Foldable side mirrors with integrated signal lamp to create a sense of sleek.",
            image:
              "/Hatchback/Wigo/tyt_wigo2023_website_exterior_800x450px-04-copy.webp",
          },
          {
            id: 3,
            x: 63,
            y: 48,
            title: "Premium Experience",
            description: "8'' floating infotainment (Locally Installed)",
            image:
              "/Hatchback/Wigo/tyt_website_interior_800x450px-01-copy.webp",
          },
          {
            id: 4,
            x: 71,
            y: 45,
            title: "Compact yet spacious",
            description:
              "High quality 3D embossed seats with extra legroom for a more enjoyable ride",
            image:
              "/Hatchback/Wigo/tyt_website_interior_800x450px-06-copy.webp",
          },
          
         
        ],
      },
    ],
    "MPV": [
      {
        id: 7,
        name: "ALPHARD",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/MPV/Alphard/exterior_02_01.jpg",
              "/MPV/Alphard/exterior_03_01.jpg",
              "/MPV/Alphard/exterior_04_01.jpg",
              "/MPV/Alphard/20230621_01_06-scaled.jpg",
          ],
        },
        colors: [
          {
            code: "#fffff",
            name: "white",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/MPV/Alphard/exterior_04_01.jpg",
              ],
            },
            images: [
              "/MPV/Alphard/exterior_02_01.jpg",
              "/MPV/Alphard/exterior_03_01.jpg",
              "/MPV/Alphard/exterior_04_01.jpg",
              "/MPV/Alphard/20230621_01_06-scaled.jpg",
              
            ],
          },
         
        ],
        specs: {
          engine: "2.0L VVT-i Engine with Hybrid System",
          performance: "186 hp combined system output",
          features: [
            "7 Airbags",
            "Captain Seats",
            "Power Back Door with Kick Sensor",
          ],
          peakPower: "186 hp",
          topSpeed: "190 km/h",
          acceleration: "9.0 seconds (0-100 km/h)",
          fuelEconomy: "5.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 15,
            y: 57,
            title:
              "3-eye LED headlamp + LED clearance lamp + LED cornering lamp + LED sequential turn lamp",
            description: "",
            image: "/MPV/Alphard/exterior_03_01.jpg",
          },
        ],
      },
      
    ],
    "PICKUP & BUS": [
      {
        id: 8,
        name: "LITE ACE",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Pickup & Bus/Lite ACE/download-2.jpg",
          ],
        },
        colors: [
          
          
          {
            code: "#FFFFFF",
            name: "white",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
               "/Pickup & Bus/Lite ACE/download-2.jpg",
              ],
            },
            images: [
              "/Pickup & Bus/Lite ACE/download-2.jpg",
             "/Pickup & Bus/Lite ACE/design3.jpg",
             "/Pickup & Bus/Lite ACE/download-15.jpg",
             "/Pickup & Bus/Lite ACE/download-16.jpg",
            ],
          },
        ],
        specs: {
          engine: "2.8L Turbo Diesel",
          performance: "204 hp @ 3,400 rpm / 500 Nm @ 1,600-2,800 rpm",
          features: [
            "4x4 Drive System",
            "Downhill Assist Control",
            "Trailer Sway Control",
          ],
          peakPower: "204 hp",
          topSpeed: "170 km/h",
          acceleration: "11.0 seconds (0-100 km/h)",
          fuelEconomy: "8.0L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 72,
            y: 45,
            title: "Deck space offering both ample capacity and easy usability",
            description: "",
            image: "/Pickup & Bus/Lite ACE/download-15.jpg",
          },
        ],
      },
      {
        id: 9,
        name: "HIACE",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Pickup & Bus/Hiace/toyota-hiace-feature-2-long-wide-body.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-1-new-semi-bonneted-design.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-damage-resistant-bumpers.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-hazard-lights.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-6-multi-information-display.jpg",
          ],
        },
        colors: [
          {
            code: "#C0C0C0",
            name: "Silver-Mica-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Hiace/Colours/Silver-Mica-Metallic/vehicle1.png",
              ],
            },
            images: [
              "/Pickup & Bus/Hiace/toyota-hiace-feature-2-long-wide-body.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-1-new-semi-bonneted-design.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-damage-resistant-bumpers.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-hazard-lights.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-6-multi-information-display.jpg",
            ],
          },
          {
            code: "#C0C0C",
            name: "silver",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Hiace/Colours/White/vehicle1 (1).png",
              ],
            },
            images: [
              "/Pickup & Bus/Hiace/toyota-hiace-feature-2-long-wide-body.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-1-new-semi-bonneted-design.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-damage-resistant-bumpers.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-hazard-lights.jpg",
              "/Pickup & Bus/Hiace/toyota-hiace-feature-6-multi-information-display.jpg",
            ],
          },
         
        ],
        specs: {
          engine: "3.0L Turbo Diesel",
          performance: "136 hp @ 3,400 rpm / 300 Nm @ 1,200-2,400 rpm",
          features: [
            "16-Seater Configuration",
            "Dual Air Conditioning",
            "ABS with EBD",
          ],
          peakPower: "136 hp",
          topSpeed: "145 km/h",
          acceleration: "17.0 seconds (0-100 km/h)",
          fuelEconomy: "10.0L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 42,
            y: 45,
            title: "Roomy Interior",
            description:
              "With the engine ahead of the front seats, the cabin is quieter and more spacious for a tranquil ride.",
            image:
              "/Pickup & Bus/Hiace/toyota-hiace-feature-7-six-way-seat-adjustment.jpg",
          },
          {
            id: 2,
            x: 70,
            y: 60,
            title: "Robust Bumpers",
            description:
              "Durable, reinforced bumpers protect your Ace while emphasising its toughness.",
            image:
              "/Pickup & Bus/Hiace/toyota-hiace-feature-3-damage-resistant-bumpers.jpg",
          },
          {
            id: 3,
            x: 65,
            y: 48,
            title: "4.2-inch TFT LCD display",
            description:
              "The HD multi-info display with a tachometer and speedometer keeps you informed",
            image:
              "/Pickup & Bus/Hiace/toyota-hiace-feature-5-4.2-inch-tft-lcd-display.jpg",
          },
        ],
      },
      {
        id: 10,
        name: "HIACE(KDH)",
        
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/Pickup & Bus/hiace(KDH)/HH1408-G.jpg",
              "/Pickup & Bus/hiace(KDH)/Untitled-design-8.jpg",
              "/Pickup & Bus/hiace(KDH)/hhhh_9.jpg",
              "/Pickup & Bus/hiace(KDH)/hhhh_4.jpg",
              "/Pickup & Bus/hiace(KDH)/HH6115-F.jpg",
            
          ],
        },
        colors: [
          {
            code: "#FFFFFF",
            name: "white",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/hiace(KDH)/colours/white/vehicle1.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle2.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle3.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle4.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle5.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle6.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle7.png",
          "/Pickup & Bus/hiace(KDH)/colours/white/vehicle8.png"
              ],
            },
            images: [
              "/Pickup & Bus/hiace(KDH)/HH1408-G.jpg",
              "/Pickup & Bus/hiace(KDH)/Untitled-design-8.jpg",
              "/Pickup & Bus/hiace(KDH)/hhhh_9.jpg",
              "/Pickup & Bus/hiace(KDH)/hhhh_4.jpg",
              "/Pickup & Bus/hiace(KDH)/HH6115-F.jpg",
            ],
          },
          
          
        ],
        specs: {
          engine: "3.0L Turbo Diesel",
          performance: "136 hp @ 3,400 rpm / 300 Nm @ 1,200-2,400 rpm",
          features: [
            "16-Seater Configuration",
            "Dual Air Conditioning",
            "ABS with EBD",
          ],
          peakPower: "136 hp",
          topSpeed: "145 km/h",
          acceleration: "17.0 seconds (0-100 km/h)",
          fuelEconomy: "10.0L/100km",
        },
        hotspots: [
          
          {
            id: 2,
            x: 75,
            y: 44,
            title: "Room for your gear",
            description:
              "HiAce LWB holds 6.2m³ of cargo, while SLWB offers 9.3m³ for more capacity.",
            image: "/Pickup & Bus/hiace(KDH)/hhhh_4.jpg",
          },
          {
            id: 3,
            x: 34,
            y: 44,
            title: "Easy access",
            description:
              "A lower, wider front step makes cab access easier for both driver and passenger.",
            image: "/Pickup & Bus/hiace(KDH)/hhhh_9.jpg",
          },
        ],
      },
      {
        id: 11,
        name: "COASTER",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/Pickup & Bus/Coaster/coaster_bep_design-hero_1920x1080_v2.webp",
           "/Pickup & Bus/Coaster/Untitled-design-41.webp",
             
          ],
        },
        colors: [
          {
            code: "#B3CDE0",
            name: "Lavender-Blue-White",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Coaster/2/Lavender-Blue-White/vehicle1 (1).png",
              ],
            },
            images: [
              "/Pickup & Bus/Coaster/coaster_bep_design-hero_1920x1080_v2.webp",
              "/Pickup & Bus/Coaster/Untitled-design-41.webp",
                
            ],
          },
          {
            code: "#F5F5DC",
            name: "White-Beige",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Coaster/2/White-Beige/vehicle1.png",
              ],
            },
            images: [
              "/Pickup & Bus/Coaster/coaster_bep_design-hero_1920x1080_v2.webp",
              "/Pickup & Bus/Coaster/Untitled-design-41.webp",
                
            ],
          },
          {
            code: "#40E0D0",
            name: "White-Turquoise",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Coaster/2/White-Turquoise/vehicle1.png",
              ],
            },
            images: [
              "/Pickup & Bus/Coaster/coaster_bep_design-hero_1920x1080_v2.webp",
              "/Pickup & Bus/Coaster/Untitled-design-41.webp",
                 
            ],
          },
        ],
        specs: {
          engine: "3.0L Turbo Diesel",
          performance: "136 hp @ 3,400 rpm / 300 Nm @ 1,200-2,400 rpm",
          features: [
            "16-Seater Configuration",
            "Dual Air Conditioning",
            "ABS with EBD",
          ],
          peakPower: "136 hp",
          topSpeed: "145 km/h",
          acceleration: "17.0 seconds (0-100 km/h)",
          fuelEconomy: "10.0L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 25,
            y: 50,
            title: "Dashboard",
            description: "",
            image: "/Pickup & Bus/Coaster/COAS1701-4068.jpg",
          },
          
          {
            id: 3,
            x: 70,
            y: 42,
            title: "More storage than ever",
            description:
              "feature an integrated luggage rack for ample bag storage",
            image:
              "/Pickup & Bus/Coaster/coaster_bep_design-ksp-storage_625x625.jpg",
          },
        ],
      },
      {
        id: 12,
        name: "HILUX",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/Pickup & Bus/HIlux/Impact-absorbing-Frame.jpg",
           "/Pickup & Bus/HIlux/Dramatic-Looks.jpg",
           "/Pickup & Bus/HIlux/SRS-Airbags.jpg",
           "/Pickup & Bus/HIlux/Aerodynamic-Efficiency.jpg",
          ],
        },
        colors: [
          {
            code: "#252525",
            name:  "Attitude-Black-Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle1.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle2.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle3.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle4.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle5.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle6.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle7.png",
          "/Pickup & Bus/Hilux/Attitude-Black-Mica/vehicle8.png",
              ],
            },
            images: [
             "/Pickup & Bus/HIlux/Impact-absorbing-Frame.jpg",
             "/Pickup & Bus/Hilux/Dramatic-Looks.jpg",
             "/Pickup & Bus/Hilux/SRS-Airbags.jpg",
             "/Pickup & Bus/Hilux/Aerodynamic-Efficiency.jpg",
            ],
          },
          {
            code: "#00008B",
            name: "Dark Blue Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle1 (1).png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle2.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle3.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle4.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle5.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle6.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle7.png",
          "/Pickup & Bus/Hilux/Dark Blue Mica/vehicle8.png",
              ],
            },
            images: [
             "/Pickup & Bus/HIlux/Impact-absorbing-Frame.jpg",
             "/Pickup & Bus/Hilux/Dramatic-Looks.jpg",
             "/Pickup & Bus/Hilux/SRS-Airbags.jpg",
             "/Pickup & Bus/Hilux/Aerodynamic-Efficiency.jpg",
            ],
          },
          {
            code:  "#808080",
            name: "Gray Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle1.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle2.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle3.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle4.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle5.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle6.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle7.png",
                "/Pickup & Bus/Hilux/Gray Metallic/vehicle8.png",
              ],
            },
            images: [
             "/Pickup & Bus/HIlux/Impact-absorbing-Frame.jpg",
             "/Pickup & Bus/Hilux/Dramatic-Looks.jpg",
             "/Pickup & Bus/Hilux/SRS-Airbags.jpg",
             "/Pickup & Bus/Hilux/Aerodynamic-Efficiency.jpg",
            ],
          },
        ],
        specs: {
          engine: "3.0L Turbo Diesel",
          performance: "136 hp @ 3,400 rpm / 300 Nm @ 1,200-2,400 rpm",
          features: [
            "16-Seater Configuration",
            "Dual Air Conditioning",
            "ABS with EBD",
          ],
          peakPower: "136 hp",
          topSpeed: "145 km/h",
          acceleration: "17.0 seconds (0-100 km/h)",
          fuelEconomy: "10.0L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 30,
            y: 52,
            title: "Ample Cargo Space",
            description:
              "The spacious cargo bed holds up to 920 kg, with tie-down hooks for security.",
            image: "/Pickup & Bus/Hilux/Ample-Cargo-Space-2.jpg",
          },
          {
            id: 2,
            x: 57,
            y: 47,
            title: "Spacious Interior",
            description: "Comfortable seating for up to 16 passengers",
            image: "/Pickup & Bus/Hilux/Spacious-Interior.jpg",
          },
        ],
      },
    ],
    "SEDAN": [
      {
        id: 13,
        name: "YARIS ATIV",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Sedan/Yaris Ativ/2.jpg",
              "/Sedan/Yaris Ativ/3.jpg",
              "/Sedan/Yaris Ativ/4.jpg",
          ],
        },
        colors: [
          {
            code: "#000000",
            name: "Attitude Black",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Sedan/Yaris Ativ/2.jpg",
              ],
            },
            images: [
              "/Sedan/Yaris Ativ/2.jpg",
              "/Sedan/Yaris Ativ/3.jpg",
              "/Sedan/Yaris Ativ/4.jpg",
            ],
          },
          
         
        ],
        specs: {
          engine: "2.5L Dynamic Force Engine with Hybrid System",
          performance: "218 hp combined system output",
          features: [
            "Leather Seat Surfaces",
            "Head-Up Display",
            "JBL Premium Audio System",
          ],
          peakPower: "218 hp",
          topSpeed: "210 km/h",
          acceleration: "7.5 seconds (0-100 km/h)",
          fuelEconomy: "4.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 62,
            y: 43,
            title: "Spacious Interior",
            description: "",
            image: "/Sedan/Yaris Ativ/interior-6_720x430.jpg",
          },
          {
            id: 2,
            x: 43,
            y: 63,
            title: "17'' Aluminium Rims",
            description: "",
            image: "/Sedan/Yaris Ativ/exterior-4_720x430.jpg",
          },
          {
            id: 3,
            x: 92,
            y: 52,
            title: "LED Rear Combination Lamps",
            description: "",
            image: "/Sedan/Yaris Ativ/exterior-5_720x430.jpg",
          },
        ],
      },
      {
        id: 14,
        name: "COROLLA",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/Sedan/corolla/Untitled-design-13.jpg",
              "/Sedan/corolla/CORO1902-2004.jpg",
              "/Sedan/corolla/CORO1902-3014.jpg",
              "/Sedan/corolla/toyota-corolla-altis-safety-seven-srs-airbags.jpg",
              "/Sedan/corolla/CORO1902-3020.jpg",
          ],
        },
        colors: [
          {
            code: "#AAA9AD",
            name: "Silver-Mica-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle1.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle2.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle3.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle4.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle5.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle6.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle7.png",
                "/Sedan/corolla/Silver-Mica-Metallic/vehicle8.png",
              ],
            },
            images: [
              "/Sedan/corolla/Untitled-design-13.jpg",
              "/Sedan/corolla/CORO1902-2004.jpg",
              "/Sedan/corolla/CORO1902-3014.jpg",
              "/Sedan/corolla/toyota-corolla-altis-safety-seven-srs-airbags.jpg",
              "/Sedan/corolla/CORO1902-3020.jpg",
            ],
          },
          
          
        ],
        specs: {
          engine: "2.5L Dynamic Force Engine with Hybrid System",
          performance: "218 hp combined system output",
          features: [
            "Leather Seat Surfaces",
            "Head-Up Display",
            "JBL Premium Audio System",
          ],
          peakPower: "218 hp",
          topSpeed: "210 km/h",
          acceleration: "7.5 seconds (0-100 km/h)",
          fuelEconomy: "4.5L/100km",
        },
        hotspots: [
          
        ],
      },
      {
        id: 15,
        name: "CAMRY HYBRID",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/Sedan/camry hybrid/2-1.webp",
              "/Sedan/camry hybrid/720x430-18-inch-rims.jpg",
              "/Sedan/camry hybrid/KeyPoints_720x430_4.jpg",
              "/Sedan/camry hybrid/ModelDesignSection_1890x1004_3 (1).jpg",
          ],
        },
        colors: [
         
          {
            code: "#3366CC",
            name:"Ocean Gem",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
               "/Sedan/camry hybrid/colours/Ocean Gem/vehicle1.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle2.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle3.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle4.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle5.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle6.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle7.png",
                "/Sedan/camry hybrid/colours/Ocean Gem/vehicle8.png",
              ],
            },
            images: [
              "/Sedan/camry hybrid/2-1.webp",
              "/Sedan/camry hybrid/720x430-18-inch-rims.jpg",
              "/Sedan/camry hybrid/KeyPoints_720x430_4.jpg",
              "/Sedan/camry hybrid/ModelDesignSection_1890x1004_3 (1).jpg",
            ],
          },
          {
            code: "#FFFFFF",
            name: "Heavy Metal",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle1 (1).png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle2.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle3.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle4.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle5.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle6.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle7.png",
                "/Sedan/camry hybrid/colours/Heavy Metal/vehicle8.png",
              ],
            },
            images: [
              "/Sedan/camry hybrid/2-1.webp",
              "/Sedan/camry hybrid/720x430-18-inch-rims.jpg",
              "/Sedan/camry hybrid/KeyPoints_720x430_4.jpg",
              "/Sedan/camry hybrid/ModelDesignSection_1890x1004_3 (1).jpg",
            ],
          },
        ],
        specs: {
          engine:  "3.3L Twin-Turbo V6 Diesel",
          performance: "304 hp @ 4,000 rpm / 700 Nm @ 1,600-2,600 rpm",
          features: [
            "Multi-Terrain Select",
          "Crawl Control",
          "Kinetic Dynamic Suspension System",
          ],
          peakPower: "304 hp",
          topSpeed: "220 km/h",
          acceleration:  "6.5 seconds (0-100 km/h)",
          fuelEconomy:  "9.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 54,
            y: 44,
            title: "Luxury Interior",
            description: "",
            image: "/Sedan/camry hybrid/ModelDesignSection_1890x1004_3 (1).jpg",
          },
          {
            id: 2,
            x: 51,
            y: 56,
            title: "18” Alloy RIms",
            description: "",
            image: "/Sedan/camry hybrid/720x430-18-inch-rims.jpg",
          },
          {
            id: 3,
            x: 35,
            y: 46,
            title: "Luxury Interior",
            description: "",
            image: "/Sedan/camry hybrid/ModelDesignSection_1890x1004_1.jpg",
          },
        ],
      },
    ],
    "SUV": [
      {
        id: 16,
        name: "LAND CRUISER 250",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/SUV/land-cruiser-250/002_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/003_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/101_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/002_LandCruiser250-scaled.jpg",
          ],
        },
        colors: [
          {
            code: "#B87333",
            name: "copper",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/land-cruiser-250/003_LandCruiser250-scaled.jpg",
              ],
            },
            images: [
              "/SUV/land-cruiser-250/002_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/003_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/101_LandCruiser250-scaled.jpg",
              "/SUV/land-cruiser-250/002_LandCruiser250-scaled.jpg",
            ],
          },
          
         
         
        ],
        specs: {
          engine: "2.8L - 1GD-FTV (TURBO DIESEL)",
          performance: "201 HP / 500 Nm",
          horsepower: "201 (Diesel)",
          features: [
            "GA-F Platform",
            "High-mount double wishbone front suspension",
            "Trailing link axle rear suspension",
            "Full LED lamp with auto-leveling function",
            "LED daytime running lamp"
          ],
          safety: [
            "SRS airbags (front seats)",
            "SRS knee airbags (front seats)",
            "SRS side airbags (front seats)",
            "SRS curtain shield airbags (front, second, third seats)",
            "Blind Spot Monitor [BSM]",
            "High-strength lightweight body frame"
          ],
          design: {
            exterior: [
              "Powerful design that accentuates the vehicle's character as an off-road vehicle",
              "Unique and simple profile worthy of being called functional beauty",
              "Three reflector type LED headlamp (Local specification)"
            ],
            lighting: "Full LED lamp with advanced design (with auto-leveling function) + LED clearance lamp (with pick-up lighting function) & LED daytime running lamp"
          },
          platform: {
            name: "GA-F Platform",
            description: "A robust platform with improved off-road performance. The traditional ladder frame has been revamped based on the concept of TNGA. Ultra-high tensile steel plates ensure excellent robustness and high rigidity."
          },
          suspension: {
            front: "High-mount double wishbone front suspension",
            rear: "Trailing link axle rear suspension"
          },
          peakPower: "304 hp",
          topSpeed: "220 km/h",
          acceleration: "6.5 seconds (0-100 km/h)",
          fuelEconomy: "9.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 73,
            y: 35,
            title: "Interior",
            description: "",
            image: "/SUV/land-cruiser-250/other_09_01.jpg",
          },
          {
            id: 2,
            x: 40,
            y: 54,
            title: "Three reflector type LED headlamp",
            description: "",
            image: "/SUV/land-cruiser-250/204_LandCruiser250-1-scaled.jpg",
          },
          // {
          //   id: 3,
          //   x: 41,
          //   y: 64,
          //   title: "LED fog lamps (front and rear)",
          //   description: "Supports bad weather conditions",
          //   image: "/SUV/land-cruiser-250/204_LandCruiser250-1-scaled.jpg",
          // },
        ],
      },
      {
        id: 17,
        name: "LAND CRUISER(300)",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
           "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-car-vehicle-stability-control-vhs.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-10-speed-automatic-transmission.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-completely-redesigned.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-car-lc300-toughness-inside-out.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
          ],
        },
        colors: [
          {
            code: "#8B6C42",
            name: "Dusty-Bronze",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle1.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle2.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle3.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle4.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle5.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle6.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle7.png",
                "/SUV/land-cruiser-300/Dusty-Bronze/vehicle8.png",
              ],
            },
            images: [
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-car-vehicle-stability-control-vhs.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-10-speed-automatic-transmission.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-completely-redesigned.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-car-lc300-toughness-inside-out.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
            ],
          },
          {
            code: "#0D0D0D",
            name: "Ebony",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/land-cruiser-300/Ebony/vehicle1 (1).png",
                "/SUV/land-cruiser-300/Ebony/vehicle2.png",
                "/SUV/land-cruiser-300/Ebony/vehicle3.png",
                "/SUV/land-cruiser-300/Ebony/vehicle4.png",
                "/SUV/land-cruiser-300/Ebony/vehicle5.png",
                "/SUV/land-cruiser-300/Ebony/vehicle6.png",
                "/SUV/land-cruiser-300/Ebony/vehicle7.png",
                "/SUV/land-cruiser-300/Ebony/vehicle8.png",
              ],
            },
            images: [
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-car-vehicle-stability-control-vhs.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-10-speed-automatic-transmission.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-completely-redesigned.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-car-lc300-toughness-inside-out.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
            ],
          },
          {
            code: "#C0C0C0",
            name: "Eclipse-Black",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle1.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle2.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle3.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle4.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle5.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle6.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle7.png",
                "/SUV/land-cruiser-300/Eclipse-Black/vehicle8.png",
              ],
            },
            images: [
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-car-vehicle-stability-control-vhs.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-10-speed-automatic-transmission.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-completely-redesigned.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-car-lc300-toughness-inside-out.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
            ],
          },
          {
            code: "#FFFFFF",
            name: "Glacier white",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/land-cruiser-300/Glacier white/vehicle1.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle2.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle3.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle4.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle5.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle6.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle7.png",
                "/SUV/land-cruiser-300/Glacier white/vehicle8.png",
              ],
            },
            images: [
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-car-vehicle-stability-control-vhs.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-10-speed-automatic-transmission.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-300-completely-redesigned.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-car-lc300-toughness-inside-out.webp",
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
            ],
          },
        ],
        specs: {
          engine: "3.3L V6 Twin-Turbo, Diesel, Auto",
          performance: "80L (Main) + 30L (Sub)",
          safety: "10 Airbags",
          features: [
            "TNGA Platform",
            "12.3 inch Multimedia Display",
            "Rear Entertainment System",
            "Anti-lock Braking System (ABS)",
            "Vehicle Stability Control (VSC)"
          ],
          peakPower: "304 hp",
          topSpeed: "220 km/h",
          acceleration: "6.5 seconds (0-100 km/h)",
          fuelEconomy: "9.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 30,
            y: 53,
            title: "Commanding Power",
            description:
              "A bold front design with a massive grille exudes power and uniqueness.",
            image:
              "/SUV/land-cruiser-300/toyota-nbt-brunei-landcruiser-commanding-power.webp",
          },
          {
            id: 2,
            x: 54,
            y: 60,
            title: "20-inch Premium Wheels",
            description: "",
            image:
              "/SUV/land-cruiser-300/toyota-nbt-brunei-land-cruiser-20-inch-premium-wheels.webp",
          },
          {
            id: 3,
            x: 50,
            y: 40,
            title: "12.3 inch Multimedia Display",
            description:
              "A bold front design with a massive grille exudes power and uniqueness.",
            image:
              "/SUV/land-cruiser-300/toyota-nbt-brunei-123-inch-multimedia-display-land-cruiser-300.webp",
          },
          {
            id: 4,
            x: 68,
            y: 37,
            title: "12.3 inch Multimedia Display",
            description:
              "A bold front design with a massive grille exudes power and uniqueness.",
            image:
              "/SUV/land-cruiser-300/toyota-nbt-brunei-10-srs-airbags-land-cruiser-300.webp",
          },
        ],
      },
      {
        id: 18,
        name: "FORTUNER",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/SUV/Fortuner/toyota-fortuner-overview.jpg",
              "/SUV/Fortuner/Power-Back-Door.jpg",
              "/SUV/Fortuner/Multimedia-System-with-Smart-Connectivity.jpg",
              "/SUV/Fortuner/Variable-Flow-Control-VFC-Power-Steering-e1725949885257.jpg",
              "/SUV/Fortuner/Convenient-Storage-and-Amenities.jpg",
          ],
        },
        colors: [
          {
            code: "#252525",
            name: "Attitude-Black-Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/fortuner/Attitude-Black-Mica/vehicle1.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle2.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle3.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle4.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle5.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle6.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle7.png",
                "/SUV/fortuner/Attitude-Black-Mica/vehicle8.png",
              ],
            },
            images: [
              "/SUV/Fortuner/toyota-fortuner-overview.jpg",
              "/SUV/Fortuner/Power-Back-Door.jpg",
              "/SUV/Fortuner/Multimedia-System-with-Smart-Connectivity.jpg",
              "/SUV/Fortuner/Variable-Flow-Control-VFC-Power-Steering-e1725949885257.jpg",
              "/SUV/Fortuner/Convenient-Storage-and-Amenities.jpg",
            ],
          },
          {
            code: "#755C48",
            name: "Avant-Garde-Bronze-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle1 (1).png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle2.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle3.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle4.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle5.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle6.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle7.png",
                "/SUV/fortuner/Avant-Garde-Bronze-Metallic/vehicle8.png",
              ],
            },
            images: [
              "/SUV/Fortuner/toyota-fortuner-overview.jpg",
              "/SUV/Fortuner/Power-Back-Door.jpg",
              "/SUV/Fortuner/Multimedia-System-with-Smart-Connectivity.jpg",
              "/SUV/Fortuner/Variable-Flow-Control-VFC-Power-Steering-e1725949885257.jpg",
              "/SUV/Fortuner/Convenient-Storage-and-Amenities.jpg",
            ],
          },
          {
            code: "#808080",
            name: "Gray-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/fortuner/Gray-Metallic/vehicle1 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle2 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle3 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle4 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle5 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle6 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle7 (1).png",
                "/SUV/fortuner/Gray-Metallic/vehicle8 (1).png",
              ],
            },
            images: [
              "/SUV/Fortuner/toyota-fortuner-overview.jpg",
              "/SUV/Fortuner/Power-Back-Door.jpg",
              "/SUV/Fortuner/Multimedia-System-with-Smart-Connectivity.jpg",
              "/SUV/Fortuner/Variable-Flow-Control-VFC-Power-Steering-e1725949885257.jpg",
              "/SUV/Fortuner/Convenient-Storage-and-Amenities.jpg",
            ],
          },
          {
            code: "#5C4033",
            name: "Phantom-Brown-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle1.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle2.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle3.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle4.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle5.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle6.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle7.png",
                "/SUV/fortuner/Phantom-Brown-Metallic/vehicle8.png",
              ],
            },
            images: [
              "/SUV/Fortuner/toyota-fortuner-overview.jpg",
              "/SUV/Fortuner/Power-Back-Door.jpg",
              "/SUV/Fortuner/Multimedia-System-with-Smart-Connectivity.jpg",
              "/SUV/Fortuner/Variable-Flow-Control-VFC-Power-Steering-e1725949885257.jpg",
              "/SUV/Fortuner/Convenient-Storage-and-Amenities.jpg",
            ],
          },
        ],
        specs: {
          engine: "3.3L Twin-Turbo V6 Diesel",
          performance: "304 hp @ 4,000 rpm / 700 Nm @ 1,600-2,600 rpm",
          features: [
            "Multi-Terrain Select",
            "Crawl Control",
            "Kinetic Dynamic Suspension System",
          ],
          peakPower: "304 hp",
          topSpeed: "220 km/h",
          acceleration: "6.5 seconds (0-100 km/h)",
          fuelEconomy: "9.5L/100km",
        },
        hotspots: [
          
        ],
      },
      {
        id: 19,
        name: "RAV4",
        threeDModelData: {
          enabled: true,
          // Array of images for the 360-degree view (8-12 images for smooth rotation)
          images: [
            "/SUV/rav4/toyota-rav4-overview.jpg",
              "/SUV/rav4/Controls-at-Your-Fingertips.jpg",
              "/SUV/rav4/Dual-Zone-Climate-Control.jpg",
              "/SUV/rav4/Luxury-Seating.jpg",
          ],
        },
        colors: [
          {
            code:  "#252525",
            name: "Attitude-Black-Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/rav4/Attitude-Black-Mica/vehicle1.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle2.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle3.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle4.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle5.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle6.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle7.png",
                "/SUV/rav4/Attitude-Black-Mica/vehicle8.png",
              ],
            },
            images: [
              "/SUV/rav4/toyota-rav4-overview.jpg",
              "/SUV/rav4/Controls-at-Your-Fingertips.jpg",
              "/SUV/rav4/Dual-Zone-Climate-Control.jpg",
              "/SUV/rav4/Luxury-Seating.jpg",
            ],
          },
          {
            code:  "#00008B",
            name: "Dark-Blue-Mica",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/rav4/Dark-Blue-Mica/vehicle1.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle2.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle3.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle4.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle5.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle6.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle7.png",
                "/SUV/rav4/Dark-Blue-Mica/vehicle8.png"
              ],
            },
            images: [
             "/SUV/rav4/toyota-rav4-overview.jpg",
              "/SUV/rav4/Controls-at-Your-Fingertips.jpg",
              "/SUV/rav4/Dual-Zone-Climate-Control.jpg",
              "/SUV/rav4/Luxury-Seating.jpg",
            ],
          },
          {
            code: "#5F9EA0",
            name: "Grayish Blue",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/rav4/Grayish-Blue/vehicle1 (1).png",
                "/SUV/rav4/Grayish-Blue/vehicle2.png",
                "/SUV/rav4/Grayish-Blue/vehicle3.png",
                "/SUV/rav4/Grayish-Blue/vehicle4.png",
                "/SUV/rav4/Grayish-Blue/vehicle5.png",
                "/SUV/rav4/Grayish-Blue/vehicle6.png",
                "/SUV/rav4/Grayish-Blue/vehicle7.png",
                "/SUV/rav4/Grayish-Blue/vehicle8.png",
              ],
            },
            images: [
              "/SUV/rav4/toyota-rav4-overview.jpg",
              "/SUV/rav4/Controls-at-Your-Fingertips.jpg",
              "/SUV/rav4/Dual-Zone-Climate-Control.jpg",
              "/SUV/rav4/Luxury-Seating.jpg",
            ],
          },
          {
            code: "#808080",
            name: "Gray-Metallic",
            threeDModelData: {
              enabled: true,
              // Array of images for the 360-degree view (8-12 images for smooth rotation)
              images: [
                "/SUV/rav4/Gray-Metallic/vehicle1 (1).png",
                "/SUV/rav4/Gray-Metallic/vehicle2.png",
                "/SUV/rav4/Gray-Metallic/vehicle3.png",
                "/SUV/rav4/Gray-Metallic/vehicle4.png",
                "/SUV/rav4/Gray-Metallic/vehicle5.png",
                "/SUV/rav4/Gray-Metallic/vehicle6.png",
                "/SUV/rav4/Gray-Metallic/vehicle7.png",
                "/SUV/rav4/Gray-Metallic/vehicle8.png",
              ],
            },
            images: [
              "/SUV/rav4/toyota-rav4-overview.jpg",
              "/SUV/rav4/Controls-at-Your-Fingertips.jpg",
              "/SUV/rav4/Dual-Zone-Climate-Control.jpg",
              "/SUV/rav4/Luxury-Seating.jpg",
            ],
          },
        ],
        specs: {
          engine: "3.3L Twin-Turbo V6 Diesel",
          performance: "304 hp @ 4,000 rpm / 700 Nm @ 1,600-2,600 rpm",
          features: [
            "Multi-Terrain Select",
            "Crawl Control",
            "Kinetic Dynamic Suspension System",
          ],
          peakPower: "304 hp",
          topSpeed: "220 km/h",
          acceleration: "6.5 seconds (0-100 km/h)",
          fuelEconomy: "9.5L/100km",
        },
        hotspots: [
          {
            id: 1,
            x: 33,
            y: 52,
            title: "LED Headlights",
            description:
              "Sleek headlights, fog lamps, and DRLs ensure maximum visibility in all conditions.",
            image: "/SUV/rav4/LED-Headlights-1.jpg",
          },
          {
            id: 2,
            x: 62,
            y: 44,
            title: "Power Adjustable Side View Mirrors",
            description:
              "Auto-adjustable heated mirrors ensure clear visibility in any condition.",
            image: "/SUV/rav4/Power-Adjustable-Side-View-Mirrors.jpg",
          },
          {
            id: 3,
            x: 64,
            y: 39,
            title: "Luxury Seating",
            description:
              "Breathable leather seats resist UV, dirt, and wear, with memory for perfect positioning.",
            image: "/SUV/rav4/Luxury-Seating.jpg",
          },
          {
            id: 4,
            x: 58,
            y: 33,
            title: "Tilt and Slide Moonroof",
            description:
              "The sleek moonroof adds natural light and opens for fresh air, enhancing the interior.",
            image: "/SUV/rav4/Tilt-and-Slide-Moonroof.jpg",
          },
          {
            id: 5,
            x: 45,
            y: 43,
            title: "Seven-inch Multimedia Display",
            description: "",
            image: "/SUV/rav4/Seven-inch-Multimedia-Display.jpg",
          },
        ],
      },
    ],
  },
};

// Helper function to get full image path
const getImagePath = (relativePath: string) => {
  return VEHICLE_DATA.baseDir + relativePath.replace(/^\//, "");
};

// Prepare vehicle data in the expected format for the component
const prepareVehicleData = (): Vehicle[] => {
  const vehicles: Vehicle[] = [];

  Object.entries(VEHICLE_DATA.categories).forEach(
    ([categoryName, categoryVehicles]) => {
      categoryVehicles.forEach((vehicle) => {
        // Prepare color information
        const colors = vehicle.colors.map((color) => color.code);
        const colorNames = vehicle.colors.map((color) => color.name);
        const colorImages: { [key: string]: string[] } = {};

        // NEW: Prepare color-specific 3D model data
        const colorThreeDModelData: { [key: string]: ThreeDModelData } = {};

        vehicle.colors.forEach((color) => {
          colorImages[color.code] = color.images.map((img) =>
            getImagePath(img)
          );

          // Add color-specific 3D model data if it exists
          if (color.threeDModelData && color.threeDModelData.enabled) {
            colorThreeDModelData[color.code] = {
              enabled: color.threeDModelData.enabled,
              images: color.threeDModelData.images.map((img) =>
                getImagePath(img)
              ),
            };
          }
        });

        // Add vehicle to the array
        vehicles.push({
          id: vehicle.id,
          name: vehicle.name,
          type: categoryName,
          photos: vehicle.colors[0].images.map((img) => getImagePath(img)),
          colors,
          colorNames,
          colorImages,
          // Add the new color-specific 3D model data
          colorThreeDModelData,
          specs: vehicle.specs,
          hotspots: vehicle.hotspots.map((hotspot) => ({
            ...hotspot,
            image: getImagePath(hotspot.image),
          })),
          threeDModelData: vehicle.threeDModelData
            ? {
                enabled: vehicle.threeDModelData.enabled,
                images: vehicle.threeDModelData.images.map((img) =>
                  getImagePath(img)
                ),
              }
            : { enabled: false, images: [] },
        });
      });
    }
  );

  return vehicles;
};

// Fallback URL for images that fail to load
const FALLBACK_IMAGE =
  "/Vehicle images/Compact SUV/Corolla Cross/THE-COROLLA-CROSS.jpg";

const VehicleListing: React.FC = () => {
  const [selectedVehicle1, setSelectedVehicle1] = useState<string>("");
  const [selectedVehicle2, setSelectedVehicle2] = useState<string>("");
  const [vehicle1, setVehicle1] = useState<Vehicle | null>(null);
  const [selectedVehicle3, setSelectedVehicle3] = useState<string>("");
  const [vehicle3, setVehicle3] = useState<Vehicle | null>(null);
  const [vehicle2, setVehicle2] = useState<Vehicle | null>(null);
  // Create vehicle data from the structured image organization
  const sampleVehicles = prepareVehicleData();
  const vehicles: Vehicle[] = sampleVehicles; // Assuming sampleVehicles is the list of vehicles
  // Define vehicle types - directly use the keys from VEHICLE_DATA.categories
  const vehicleTypes = Object.keys(VEHICLE_DATA.categories);

  // State management
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(
    vehicleTypes[0]
  );
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    sampleVehicles.find((v) => v.type === vehicleTypes[0]) || null
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedVehicle ? selectedVehicle.colors[0] : ""
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Engine");
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [rotationDegree, setRotationDegree] = useState<number>(0);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(true);
  const [animateBackground, setAnimateBackground] = useState<boolean>(false);
  const [showVRView, setShowVRView] = useState<boolean>(false);
  const [ratingScore, setRatingScore] = useState<number>(4);
  const [interactionCount, setInteractionCount] = useState<number>(0);

  // Add this with your other state declarations
const [showColorOptions, setShowColorOptions] = useState(false);

  // New states for 360-degree view and 3D model
  const [current360ImageIndex, setCurrent360ImageIndex] = useState<number>(0);
  const [is360ViewActive, setIs360ViewActive] = useState<boolean>(false);
  const [show3DView, setShow3DView] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [current3DModelImages, setCurrent3DModelImages] = useState<string[]>(
    []
  );
  const [current3DVehicleName, setCurrent3DVehicleName] = useState<string>("");

  const [showHotspotImageViewer, setShowHotspotImageViewer] =
    useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [lastMouseX, setLastMouseX] = useState(0);
  const dragSensitivity = 15; // Pixels of movement needed to change images

  const mainImageRef = useRef<HTMLDivElement>(null);
  const rotationInterval = useRef<NodeJS.Timeout | null>(null);
  const rotation360Interval = useRef<NodeJS.Timeout | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Effect for simple CSS rotation
  
useEffect(() => {
  if (isRotating) {
    rotationInterval.current = setInterval(() => {
      setRotationDegree((prev) => (prev + 0.5) % 360); // Changed from +1 to +0.5 for slower rotation
    }, 150); // Changed from 100ms to 150ms for slower updates
  } else if (rotationInterval.current) {
    clearInterval(rotationInterval.current);
  }

  return () => {
    if (rotationInterval.current) {
      clearInterval(rotationInterval.current);
    }
  };
}, [isRotating]);

  // Effect for 360-degree rotation by cycling through images
  // useEffect(() => {
  //   if (
  //     is360ViewActive &&
  //     selectedVehicle?.threeDModelData?.enabled &&
  //     selectedVehicle.threeDModelData?.images
  //   ) {
  //     // Set up an interval that cycles through the 360 images
  //     rotation360Interval.current = setInterval(() => {
  //       setCurrent360ImageIndex((prevIndex) => {
  //         if (!selectedVehicle?.threeDModelData?.images) return 0;
  //         const nextIndex =
  //           (prevIndex + 1) % selectedVehicle.threeDModelData.images.length;
  //         return nextIndex;
  //       });
  //     }, 300); // Adjust speed as needed
  //   } else if (rotation360Interval.current) {
  //     clearInterval(rotation360Interval.current);
  //   }

  //   return () => {
  //     if (rotation360Interval.current) {
  //       clearInterval(rotation360Interval.current);
  //     }
  //   };
  // }, [is360ViewActive, selectedVehicle]);

  // Auto-hide banner effect
  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  // Track user interactions
  useEffect(() => {
    const trackInteraction = () => {
      setInteractionCount((prev) => prev + 1);
      // If user has interacted more than 5 times, animate background
      if (interactionCount > 5 && !animateBackground) {
        setAnimateBackground(true);
      }
    };

    document.addEventListener("click", trackInteraction);

    return () => {
      document.removeEventListener("click", trackInteraction);
    };
  }, [interactionCount, animateBackground]);

  // Auto-close welcome modal
  useEffect(() => {
    if (showWelcomeModal) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showWelcomeModal]);

  // Filter vehicles by selected type and search term
  const filteredVehicles = sampleVehicles
    .filter((vehicle) => vehicle.type === selectedVehicleType)
    .filter(
      (vehicle) =>
        searchTerm === "" ||
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Get vehicles for comparison
  const vehiclesToCompare = sampleVehicles.filter((vehicle) =>
    compareList.includes(vehicle.id)
  );

  // Handle vehicle type selection
  const handleVehicleTypeSelect = (type: string) => {
    setSelectedVehicleType(type);
    // Find the first vehicle for this type
    const firstVehicleOfType = sampleVehicles.find((v) => v.type === type);

    if (firstVehicleOfType) {
      setSelectedVehicle(firstVehicleOfType);
      setSelectedColor(firstVehicleOfType.colors[0]);
      setSelectedColorIndex(0);
      setCurrentPhotoIndex(0);
      setActiveTab("Engine");
      setIsRotating(false);
      setIs360ViewActive(false);
      setShowVRView(false);
    } else {
      setSelectedVehicle(null);
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (is360ViewActive && e.touches.length > 0) {
      setIsDragging(true);
      setTouchStartX(e.touches[0].clientX);
      setLastMouseX(e.touches[0].clientX);
    }
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && is360ViewActive && selectedVehicle && e.touches.length > 0) {
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - lastMouseX;
  
      if (Math.abs(deltaX) >= dragSensitivity) {
        const colorSpecificModelData =
          selectedVehicle.colorThreeDModelData &&
          selectedVehicle.colorThreeDModelData[selectedColor];
  
        // Get the right set of images based on color selection
        const threeDImages =
          colorSpecificModelData && colorSpecificModelData.enabled
            ? colorSpecificModelData.images
            : selectedVehicle.threeDModelData?.images || [];
  
        const totalImages = threeDImages.length;
        if (totalImages > 0) {
          const imagesToMove = Math.floor(Math.abs(deltaX) / (dragSensitivity * 2)); // Using the same sensitivity as mouse
  
          if (imagesToMove > 0) {
            let newIndex;
  
            if (deltaX < 0) {
              newIndex = (current360ImageIndex + imagesToMove) % totalImages;
            } else {
              newIndex =
                (current360ImageIndex - imagesToMove + totalImages) %
                totalImages;
            }
  
            setCurrent360ImageIndex(newIndex);
            setLastMouseX(currentX);
          }
        }
      }
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // NEW: Handle hotspot click to open the popup viewer
  const handleHotspotClick = (hotspot: Hotspot) => {
    if (isRotating || is360ViewActive || showVRView) return;
    setSelectedHotspot(hotspot);
    setShowHotspotImageViewer(true);
  };

  // NEW: Close the hotspot image viewer
  const closeHotspotImageViewer = () => {
    setShowHotspotImageViewer(false);
    setSelectedHotspot(null);
  };

  // Handle individual vehicle selection
  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedColor(vehicle.colors[0]);
    setSelectedColorIndex(0);
    setCurrentPhotoIndex(0);
    setActiveTab("Engine");
    setIsRotating(false);
    setIs360ViewActive(false);
    setShowVRView(false);
    setCurrent360ImageIndex(0);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (is360ViewActive) {
      setIsDragging(true);
      setDragStartX(e.clientX);
      setLastMouseX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && is360ViewActive && selectedVehicle) {
      const currentX = e.clientX;
      const deltaX = currentX - lastMouseX;
  
      if (Math.abs(deltaX) >= dragSensitivity) {
        const colorSpecificModelData =
          selectedVehicle.colorThreeDModelData &&
          selectedVehicle.colorThreeDModelData[selectedColor];
  
        // Get the right set of images based on color selection
        const threeDImages =
          colorSpecificModelData && colorSpecificModelData.enabled
            ? colorSpecificModelData.images
            : selectedVehicle.threeDModelData?.images || [];
  
        const totalImages = threeDImages.length;
        if (totalImages > 0) {
          const imagesToMove = Math.floor(Math.abs(deltaX) / (dragSensitivity * 2)); // Doubled the divisor for slower rotation
  
          if (imagesToMove > 0) {
            let newIndex;
  
            if (deltaX < 0) {
              newIndex = (current360ImageIndex + imagesToMove) % totalImages;
            } else {
              newIndex =
                (current360ImageIndex - imagesToMove + totalImages) %
                totalImages;
            }
  
            setCurrent360ImageIndex(newIndex);
            setLastMouseX(currentX);
          }
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Handle color selection
  const handleColorSelect = (color: string, index: number) => {
    setSelectedColor(color);
    setSelectedColorIndex(index);
    setCurrentPhotoIndex(0);

    // Only reset 360 view if the selected vehicle doesn't have
    // color-specific 3D model data for the selected color
    const hasColorSpecific3DData =
      selectedVehicle?.colorThreeDModelData?.[color]?.enabled;

    if (!hasColorSpecific3DData) {
      setIsRotating(false);
      setIs360ViewActive(false);
    } else if (is360ViewActive) {
      // If already in 360 view mode, reset the index but keep the mode
      setCurrent360ImageIndex(0);
    }
  };

  // Handle photo navigation
  const handlePrevPhoto = () => {
    if (!selectedVehicle || isRotating || is360ViewActive || showVRView) return;
    const photos =
      selectedVehicle.colorImages?.[selectedColor] || selectedVehicle.photos;
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNextPhoto = () => {
    if (!selectedVehicle || isRotating || is360ViewActive || showVRView) return;
    const photos =
      selectedVehicle.colorImages?.[selectedColor] || selectedVehicle.photos;
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  // Handle clicking on a thumbnail
  const handleThumbnailClick = (index: number) => {
    if (isRotating || is360ViewActive || showVRView) return;
    setCurrentPhotoIndex(index);
  };

  // Handle VR view toggle
  const toggleVRView = () => {
    setShowVRView(!showVRView);
    setIsRotating(false);
    setIs360ViewActive(false);
  };

  // Handle hotspot hover events
  const handleHotspotHover = (hotspot: Hotspot) => {
    if (isRotating || is360ViewActive || showVRView) return;
    setActiveHotspot(hotspot);
  };

  const handleHotspotLeave = () => {
    setActiveHotspot(null);
  };

  // Handle rating change
  const handleRatingChange = (score: number) => {
    setRatingScore(score);
  };

  // Function to handle opening 3D view from vehicle card
  const handleOpen3DView = (vehicle: Vehicle) => {
    if (vehicle.threeDModelData?.enabled && vehicle.threeDModelData.images) {
      setCurrent3DModelImages(vehicle.threeDModelData.images);
      setCurrent3DVehicleName(vehicle.name);
      setShow3DView(true);
    }
  };

  // Function to close 3D view
  const close3DView = () => {
    setShow3DView(false);
  };

  const toggle3DRotation = () => {
    // Toggle showing/hiding color options
    setShowColorOptions(!showColorOptions);
    
    // If toggling to hide, also disable 360 view
    if (showColorOptions) {
      setIs360ViewActive(false);
      setIsRotating(false);
      setCurrent360ImageIndex(0);
    } else if (selectedVehicle) {
      // First, just show the colors, don't activate 360 yet
      setIs360ViewActive(false);
      setIsRotating(false);
    }
  };

  const activateColorView = (color: string, index: number) => {
    setSelectedColor(color);
    setSelectedColorIndex(index);
    setCurrentPhotoIndex(0);
  
    // Check if the selected vehicle has color-specific 3D model data
    const colorSpecificModelData =
      selectedVehicle?.colorThreeDModelData?.[color];
  
    if (colorSpecificModelData && colorSpecificModelData.enabled) {
      // Preload images for smoother experience
      colorSpecificModelData.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
  
      // Activate 360 view mode
      setIs360ViewActive(true);
      setIsRotating(false);
      setCurrent360ImageIndex(0);
    } else if (
      selectedVehicle?.threeDModelData?.enabled &&
      selectedVehicle.threeDModelData.images.length > 1
    ) {
      // Fallback to default 3D model data
      selectedVehicle.threeDModelData.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
  
      setIs360ViewActive(true);
      setIsRotating(false);
      setCurrent360ImageIndex(0);
    }
  };
  // Get 3D button label based on current state
  const get3DButtonLabel = () => {
    if (is360ViewActive) return "Exit 360° View";
    return showColorOptions ? "Hide Available Colors" : "View Available Colors";
  };

  // Handle compare button click
  const handleCompareToggle = (vehicleId: number) => {
    setCompareList((prevList) => {
      if (prevList.includes(vehicleId)) {
        return prevList.filter((id) => id !== vehicleId);
      } else {
        if (prevList.length >= 3) {
          // Limit comparisons to 3 vehicles
          alert(
            "You can compare up to 3 vehicles at a time. Please remove one before adding another."
          );
          return prevList;
        }
        return [...prevList, vehicleId];
      }
    });
  };

  // Handle compare modal
  const toggleCompareModal = () => {
    if (compareList.length === 0) {
      alert("Please select at least 1 vehicle to compare.");
      return;
    }
    
    // Pre-populate the dropdown selections with vehicles from compareList
    if (compareList.length >= 1) {
      const vehicleId1 = compareList[0].toString();
      setSelectedVehicle1(vehicleId1);
      setVehicle1(vehicles.find((v) => v.id === Number(vehicleId1)) || null);
    }
    
    if (compareList.length >= 2) {
      const vehicleId2 = compareList[1].toString();
      setSelectedVehicle2(vehicleId2);
      setVehicle2(vehicles.find((v) => v.id === Number(vehicleId2)) || null);
    }
    
    if (compareList.length >= 3) {
      const vehicleId3 = compareList[2].toString();
      setSelectedVehicle3(vehicleId3);
      setVehicle3(vehicles.find((v) => v.id === Number(vehicleId3)) || null);
    }
    
    setShowCompareModal(!showCompareModal);
  };

  // Handle tab selection
  const handleTabSelect = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Get current vehicle images based on selected color
  const getCurrentImages = () => {
    if (!selectedVehicle) return [];
    return (
      selectedVehicle.colorImages?.[selectedColor] || selectedVehicle.photos
    );
  };

  // Get current vehicle image (handles 360 view as well)
  const getCurrentImage = () => {
    if (!selectedVehicle) return FALLBACK_IMAGE;

    if (is360ViewActive) {
      // Check for color-specific 3D model data first
      const colorSpecificModelData =
        selectedVehicle.colorThreeDModelData &&
        selectedVehicle.colorThreeDModelData[selectedColor];

      if (
        colorSpecificModelData &&
        colorSpecificModelData.enabled &&
        colorSpecificModelData.images.length > 0
      ) {
        // Use color-specific 3D images
        return colorSpecificModelData.images[current360ImageIndex];
      } else if (
        selectedVehicle.threeDModelData?.enabled &&
        selectedVehicle.threeDModelData?.images.length > 0
      ) {
        // Fallback to default 3D images
        return selectedVehicle.threeDModelData.images[current360ImageIndex];
      }
    }

    // For non-360 view, use normal color images
    const images = getCurrentImages();
    return images[currentPhotoIndex] || FALLBACK_IMAGE;
  };

  // Generate star rating elements
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`rating-star ${i <= ratingScore ? "active" : ""}`}
          onClick={() => handleRatingChange(i)}
        >
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  // Error handling for image loading
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    // Set a fallback image URL if local image fails to load
    target.src = FALLBACK_IMAGE;
  };

  return (
    <div
      className={`enhanced-vehicle-showroom ${
        animateBackground ? "animate-bg" : ""
      }`}
      ref={backgroundRef}
    >
      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <div className="welcome-modal-content">
              <h2>Welcome to the Ultimate Vehicle Experience</h2>
              <p>
                Explore our interactive showroom with 360° views, VR mode, and
                feature highlights.
              </p>
              <div className="welcome-features">
                <div className="welcome-feature">
                  <Rotate3DIcon />
                  <span>360° Views</span>
                </div>
                <div className="welcome-feature">
                  <VRViewIcon />
                  <span>VR Mode</span>
                </div>
                <div className="welcome-feature">
                  <InfoCircleIcon />
                  <span>Interactive Hotspots</span>
                </div>
              </div>
              <button
                className="welcome-btn"
                onClick={() => setShowWelcomeModal(false)}
              >
                Start Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Banner */}
      {showBanner && (
        <div className="notification-banner">
          <div className="banner-icon">
            <FireIcon />
          </div>
          <p>
            Experience our new interactive showroom with 360° views and VR mode!
          </p>
          <button className="banner-close" onClick={() => setShowBanner(false)}>
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Header with Search Bar */}
      <div className="showroom-header">
  <div className="search-container">
    <div className="toyota-logo">
      <img src="/toyota-logo1.png" alt="Toyota Logo" />
    </div>
   
    <div className="compare-btn-top" onClick={toggleCompareModal}>
      <CloneIcon />
      <span>Compare</span>
      {compareList.length > 0 && (
        <span className="compare-count">{compareList.length}</span>
      )}
    </div>
  </div>
</div>

      {/* Vehicle Type Navigation */}
      <div className="vehicle-types-container">
        <div className="vehicle-types">
          {vehicleTypes.map((type) => (
            <button
              key={type}
              className={`vehicle-type-btn ${
                selectedVehicleType === type ? "active" : ""
              }`}
              onClick={() => handleVehicleTypeSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Vehicle Grid */}
        <div className="vehicle-grid-container">
          <h3 className="section-title">Select Vehicle</h3>
          <div className="vehicle-grid">
          {filteredVehicles.length > 0 ? (
  filteredVehicles.map((vehicle) => (
    <div
      key={vehicle.id}
      className={`vehicle-card ${

        
        selectedVehicle?.id === vehicle.id ? "selected" : ""
      }`}
      onClick={() => handleVehicleSelect(vehicle)}
    >

      
      <div className="vehicle-thumbnail">
        <img
          src={vehicle.photos[0]}
          alt={vehicle.name}
          onError={handleImageError}
        />
      </div>

      <div className="vehicle-card-info">
        <div className="vehicle-name">{vehicle.name}</div>
      </div>

      {/* First button: Compare */}
      
<button
  className={`compare-button ${
    compareList.includes(vehicle.id) ? "active" : ""
  }`}
  onClick={(e) => {
    e.stopPropagation();
    handleCompareToggle(vehicle.id);
  }}
>
  <CloneIcon />
  <span>
    {compareList.includes(vehicle.id) ? "Remove from Compare" : "Add to Compare"}
  </span>
</button>

      {/* Second button: View 3D, only show if the vehicle has 3D model data */}
      {vehicle.threeDModelData?.enabled && (
        <button
          className="view-3d-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the card click event
            handleOpen3DView(vehicle);
          }}
        >
          <ThreeDModelIcon />
          <span>View Auto 3D Mode</span>
        </button>
      )}
    </div>
  ))
) : (
  <div className="no-vehicles-message">
    No vehicles found for this category
  </div>
)}
          </div>
        </div>

        {/* Selected Vehicle Details */}
        {selectedVehicle && (
          <div className="vehicle-details-container">
           

<div className="vehicle-details-left">
  {/* Color Options - Now conditionally rendered based on 360 view being active */}
  {/* {is360ViewActive && ( */}
  {showColorOptions && (
  <div className="color-options-container">
    <span className="color-label">Available Colors</span>
    <div className="color-options">
      {selectedVehicle.colors.map((color, index) => (
        <button
          key={color}
          className={`color-btn ${
            selectedColor === color ? "active" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => activateColorView(color, index)}
          aria-label={`Select ${
            selectedVehicle.colorNames?.[index] || color
          } color`}
          title={selectedVehicle.colorNames?.[index] || color}
        />
      ))}
    </div>
    <span className="selected-color-name">
      {selectedVehicle.colorNames?.[selectedColorIndex] ||
        selectedColor}
    </span>
  </div>
)}
  

  
  {/* View Toggle Buttons */}
<div className="view-toggle-container">
  <button
    className={`view-toggle-btn ${
      showColorOptions || is360ViewActive || isRotating ? "active" : ""
    }`}
    onClick={toggle3DRotation}
  >
    <Rotate3DIcon />
    <span>{get3DButtonLabel()}</span>
  </button>
  <button
    className={`view-toggle-btn vr-btn ${
      showVRView ? "active" : ""
    }`}
    onClick={toggleVRView}
  >
    <VRViewIcon />
    <span>{showVRView ? "Exit VR Mode" : "Enter VR Mode"}</span>
  </button>
</div>

  {/* Rest of your component remains the same */}

              {/* Main Vehicle Image with Hotspots */}
              <div
                  className={`main-image-container ${
                    showVRView ? "vr-mode" : ""
                  } ${is360ViewActive ? "rotating-360" : ""}`}
                  ref={mainImageRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                <img
                  src={getCurrentImage()}
                  alt={selectedVehicle.name}
                  className={`main-vehicle-image ${
                    isRotating ? "rotating" : ""
                  } ${showVRView ? "vr-image" : ""}`}
                  style={{
                    transform: isRotating
                      ? `rotateY(${rotationDegree}deg)`
                      : "none",
                  }}
                  onError={handleImageError}

                  
                />
                

                {/* VR Mode Overlay */}
                {showVRView && (
                  <div className="vr-overlay">
                    <div className="vr-guide">
                      <span>Move device to look around</span>
                      <div className="vr-controls">
                        <button>
                          <ToyotaTourPopup />
                        </button>
                        {/* <button onClick={toggleVRView}>Exit VR</button> */}
                      </div>
                    </div>
                  </div>
                )}
                {/* Hotspots (only show when not in special modes) */}
                {!isRotating &&
  !is360ViewActive &&
  !showVRView &&
  currentPhotoIndex === 0 && // Only show hotspots on the first image
  selectedVehicle.hotspots.map((hotspot) => (
    <div
      key={hotspot.id}
      className="hotspot"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      onMouseEnter={() => handleHotspotHover(hotspot)}
      onMouseLeave={handleHotspotLeave}
      onClick={() => handleHotspotClick(hotspot)}
    >
      <span className="hotspot-dot"></span>
      <span className="hotspot-pulse"></span>
    </div>
  ))}


                {/* Hotspot Popup */}
                {activeHotspot &&
  !is360ViewActive &&
  !isRotating &&
  !showVRView &&
  currentPhotoIndex === 0 && ( // Only show hotspot popup on the first image
    <div
      className="hotspot-popup"
      style={{
        left: `${activeHotspot.x}%`,
        top: `${activeHotspot.y + 5}%`,
      }}
    >
      <div className="hotspot-popup-content">
        <h4>{activeHotspot.title}</h4>
        <p>{activeHotspot.description}</p>
        <img
          src={activeHotspot.image}
          alt={activeHotspot.title}
          className="hotspot-image"
          onError={handleImageError}
        />
      </div>
    </div>
  )}

                {/* Navigation Arrows (only when not in special modes) */}
                {!isRotating && !is360ViewActive && !showVRView && (
                  <>
                    <button
                      className="nav-arrow prev"
                      onClick={handlePrevPhoto}
                    >
                      <ChevronLeftIcon />
                    </button>
                    <button
                      className="nav-arrow next"
                      onClick={handleNextPhoto}
                    >
                      <ChevronRightIcon />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails (only when not in special modes) */}
              {!isRotating && !is360ViewActive && !showVRView && (
                <div className="thumbnails-container">
                  {getCurrentImages().map((imageSrc, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        currentPhotoIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleThumbnailClick(index)}
                    >
                      <img
                        src={imageSrc}
                        alt={`${selectedVehicle.name} view ${index + 1}`}
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="vehicle-details-right">
              {/* Vehicle Name and Rating */}
              <div className="vehicle-header">
                <h2 className="vehicle-title">{selectedVehicle.name}</h2>
                {/* <div className="vehicle-rating">
                  {renderRatingStars()}
                  <span className="rating-count">(128 reviews)</span>
                </div> */}
              </div>

              {/* Vehicle Specifications */}
              <div className="vehicle-specs">
                <p className="specs-description">
                  Experience the perfect blend of style, performance, and
                  practicality with the {selectedVehicle.name}. Designed for
                  modern drivers who demand more from their vehicles, this{" "}
                  {selectedVehicle.type.toLowerCase()}
                  offers cutting-edge technology, superior comfort, and
                  exceptional driving dynamics.
                </p>

                {/* Specification Tabs */}
                <div className="specs-tabs">
                  <button
                    className={`spec-tab ${
                      activeTab === "Engine" ? "active" : ""
                    }`}
                    onClick={() => handleTabSelect("Engine")}
                  >
                    <EngineIcon />
                    <span>Engine</span>
                  </button>
                  <button
                    className={`spec-tab ${
                      activeTab === "Performance" ? "active" : ""
                    }`}
                    onClick={() => handleTabSelect("Performance")}
                  >
                    <SpeedIcon />
                    <span>Performance</span>
                  </button>
                  <button
                    className={`spec-tab ${
                      activeTab === "Safety" ? "active" : ""
                    }`}
                    onClick={() => handleTabSelect("Safety")}
                  >
                    <SafetyIcon />
                    <span>Safety</span>
                  </button>
                  <button
                    className={`spec-tab ${
                      activeTab === "Comfort" ? "active" : ""
                    }`}
                    onClick={() => handleTabSelect("Comfort")}
                  >
                    <ComfortIcon />
                    <span>Comfort</span>
                  </button>
                </div>

                {/* Specification Content */}
                <div className="specs-content">
                  {activeTab === "Engine" && (
                    <>
                      <p className="spec-title">
                        {selectedVehicle.specs.engine}
                      </p>
                      <div className="spec-detail">
                        <p>{selectedVehicle.specs.performance}</p>
                        <p>
                          The powerful and efficient engine delivers responsive
                          acceleration while maintaining excellent fuel economy,
                          making it perfect for both city commutes and weekend
                          adventures.
                        </p>
                      </div>
                      <div className="info-tag">
                        <InfoCircleIcon />
                        <span>
                          Toyota's Dynamic Force engines are designed for
                          optimal performance and efficiency.
                        </span>
                      </div>
                    </>
                  )}

                  {activeTab === "Performance" && (
                    <>
                      <p className="spec-title">Performance Specifications</p>
                      <div className="spec-detail">
                        <div className="performance-metrics">
                          <div className="performance-metric">
                            <div className="metric-icon">
                              <SpeedIcon />
                            </div>
                            <div className="metric-value">
                              {selectedVehicle.specs.peakPower}
                            </div>
                            <div className="metric-label">Peak Power</div>
                          </div>
                          <div className="performance-metric">
                            <div className="metric-icon">
                              <SpeedIcon />
                            </div>
                            <div className="metric-value">
                              {selectedVehicle.specs.topSpeed}
                            </div>
                            <div className="metric-label">Top Speed</div>
                          </div>
                          <div className="performance-metric">
                            <div className="metric-icon">
                              <SpeedIcon />
                            </div>
                            <div className="metric-value">
                              {selectedVehicle.specs.acceleration}
                            </div>
                            <div className="metric-label">Acceleration</div>
                          </div>
                          <div className="performance-metric">
                            <div className="metric-icon">
                              <EngineIcon />
                            </div>
                            <div className="metric-value">
                              {selectedVehicle.specs.fuelEconomy}
                            </div>
                            <div className="metric-label">Fuel Economy</div>
                          </div>
                        </div>
                        {/* <div className="performance-chart">
                          <div className="chart-title">Power Delivery</div>
                          <div className="chart-bars">
                            <div
                              className="chart-bar"
                              style={{ height: "60%" }}
                            >
                              <div className="bar-value">60%</div>
                              <div className="bar-label">
                                1000
                                <br />
                                RPM
                              </div>
                            </div>
                            <div
                              className="chart-bar"
                              style={{ height: "75%" }}
                            >
                              <div className="bar-value">75%</div>
                              <div className="bar-label">
                                2000
                                <br />
                                RPM
                              </div>
                            </div>
                            <div
                              className="chart-bar"
                              style={{ height: "85%" }}
                            >
                              <div className="bar-value">85%</div>
                              <div className="bar-label">
                                3000
                                <br />
                                RPM
                              </div>
                            </div>
                            <div
                              className="chart-bar"
                              style={{ height: "100%" }}
                            >
                              <div className="bar-value">100%</div>
                              <div className="bar-label">
                                4000
                                <br />
                                RPM
                              </div>
                            </div>
                            <div
                              className="chart-bar"
                              style={{ height: "95%" }}
                            >
                              <div className="bar-value">95%</div>
                              <div className="bar-label">
                                5000
                                <br />
                                RPM
                              </div>
                            </div>
                            <div
                              className="chart-bar"
                              style={{ height: "80%" }}
                            >
                              <div className="bar-value">80%</div>
                              <div className="bar-label">
                                6000
                                <br />
                                RPM
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}

                  {activeTab === "Safety" && (
                    <>
                      <p className="spec-title">Safety Features</p>
                      <div className="spec-detail">
                        <div className="safety-features">
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Pre-Collision Safety System
                            </div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Lane Departure Alert with Steering Assist
                            </div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Dynamic Radar Cruise Control
                            </div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">7 SRS Airbags</div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Vehicle Stability Control
                            </div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Hill-start Assist Control
                            </div>
                          </div>
                          <div className="safety-feature">
                            <div className="feature-icon">
                              <SafetyIcon />
                            </div>
                            <div className="feature-text">
                              Anti-lock Braking System with EBD
                            </div>
                          </div>
                        </div>
                        <div className="safety-rating">
                          <div className="safety-rating-title">
                            Safety Rating
                          </div>
                          <div className="safety-stars">
                            <span className="safety-star active">
                              <StarIcon />
                            </span>
                            <span className="safety-star active">
                              <StarIcon />
                            </span>
                            <span className="safety-star active">
                              <StarIcon />
                            </span>
                            <span className="safety-star active">
                              <StarIcon />
                            </span>
                            <span className="safety-star active">
                              <StarIcon />
                            </span>
                          </div>
                          <div className="safety-badges">
                            <div className="safety-badge">NHTSA 5-Star</div>
                            <div className="safety-badge">
                              IIHS Top Safety Pick+
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab === "Comfort" && (
                    <>
                      <p className="spec-title">Comfort & Convenience</p>
                      <div className="spec-detail">
                        <div className="comfort-features">
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              Dual-Zone Automatic Climate Control
                            </div>
                          </div>
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              Power-adjustable Front Seats
                            </div>
                          </div>
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              Smart Entry & Push Start System
                            </div>
                          </div>
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              9-inch Touchscreen Display Audio
                            </div>
                          </div>
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              Apple CarPlay & Android Auto
                            </div>
                          </div>
                          <div className="comfort-feature">
                            <div className="feature-icon">
                              <ComfortIcon />
                            </div>
                            <div className="feature-text">
                              Wireless Charging Pad
                            </div>
                          </div>
                        </div>

                        {/* <div className="interior-preview">
                          <h4 className="interior-title">Interior Preview</h4>
                          <div className="interior-image-container">
                            <img
                              src={getImagePath(
                                "/Compact SUV/Corolla Cross/Spacious-Room.jpg"
                              )}
                              alt="Interior view"
                              className="interior-image"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = FALLBACK_IMAGE;
                              }}
                            />
                            <div className="interior-overlay">
                              <button className="interior-view-btn">
                                View 360° Interior
                              </button>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Call to Action */}
              {/* <div className="cta-container">
                <button className="cta-button primary">
                  Book a Test Drive
                  <span className="btn-shine"></span>
                </button>
                <button className="cta-button secondary">
                  Download Brochure
                </button>
                <button className="cta-button tertiary">
                  Share <span className="share-count">203</span>
                </button>
              </div> */}
            </div>
          </div>
        )}

        {/* 3D View Modal */}
        {show3DView && (
          <Vehicle3DView
            images={current3DModelImages}
            vehicleName={current3DVehicleName}
            onClose={close3DView}
            fallbackImage={FALLBACK_IMAGE}
          />
        )}

{showCompareModal && (
  <div className="modal-overlay">
    <div className="comparison-modal">
      <div className="modal-header">
        <h3>Vehicle Comparison</h3>
        <button className="close-modal" onClick={toggleCompareModal}>
          <CloseIcon />
        </button>
      </div>

      

      {/* Vehicle Selection Dropdowns with Clear Buttons */}
      <div
  style={{
    display: "flex",
    flexDirection: "row",
    gap: "90px",
    padding: "20px",
    border: "1px solid #0000",
    borderRadius: "10px",
    backgroundColor: "#00000",
    marginLeft: "auto",
  }}
>
  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <select
      value={selectedVehicle1}
      onChange={(e) => {
        const selectedId = e.target.value;
        setSelectedVehicle1(selectedId);
        const vehicle = vehicles.find((v) => v.id === Number(selectedId)) || null;
        setVehicle1(vehicle);
        
        // Update compareList
        if (vehicle) {
          // Make sure this vehicle is in the compareList
          if (!compareList.includes(vehicle.id)) {
            setCompareList((prev) => [...prev, vehicle.id]);
          }
        }
      }}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        fontSize: "14px",
        
      }}
    >
      <option value="">Select Vehicle 1</option>
      {vehicles.map((vehicle) => (
        <option key={vehicle.id} value={vehicle.id}>
          {vehicle.name}
        </option>
      ))}
    </select>
    {selectedVehicle1 && (
      <button
      onClick={() => {
        setSelectedVehicle1("");
        setVehicle1(null);
        
        // Also remove from compareList if it exists
        if (selectedVehicle1) {
          setCompareList((prev) => prev.filter(id => id !== Number(selectedVehicle1)));
        }
      }}
        style={{
          padding: "8px 12px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    )}
  </div>

  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <select
      value={selectedVehicle2}
      onChange={(e) => {
        const selectedId = e.target.value;
        setSelectedVehicle2(selectedId);
        setVehicle2(vehicles.find((v) => v.id === Number(selectedId)) || null);
      }}
      style={{
        padding: "8px",
        border: "1px solid #0000",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <option value="">Select Vehicle 2</option>
      {vehicles
        .filter((v) => v.id !== Number(selectedVehicle1))
        .map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name}
          </option>
        ))}
    </select>
    {selectedVehicle2 && (
      <button
        onClick={() => {
          setSelectedVehicle2("");
          setVehicle2(null);
        }}
        style={{
          padding: "8px 12px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    )}
  </div>

  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <select
      value={selectedVehicle3}
      onChange={(e) => {
        const selectedId = e.target.value;
        setSelectedVehicle3(selectedId);
        setVehicle3(vehicles.find((v) => v.id === Number(selectedId)) || null);
      }}
      style={{
        padding: "8px",
        border: "1px solid #00000",
        borderRadius: "5px",
        fontSize: "14px",
      }}
    >
      <option value="">Select Vehicle 3</option>
      {vehicles
        .filter((v) => v.id !== Number(selectedVehicle1) && v.id !== Number(selectedVehicle2))
        .map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.name}
          </option>
        ))}
    </select>
    {selectedVehicle3 && (
      <button
        onClick={() => {
          setSelectedVehicle3("");
          setVehicle3(null);
        }}
        style={{
          padding: "8px 12px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    )}
  </div>
</div>


      {/* Comparison Table */}
      {(vehicle1 || vehicle2 || vehicle3) && (
        <div className="comparison-content">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Specification</th>
                {vehicle1 && <th>{vehicle1.name}</th>}
                {vehicle2 && <th>{vehicle2.name}</th>}
                {vehicle3 && <th>{vehicle3.name}</th>}
              </tr>
            </thead>
            <tbody>
              <tr className="highlight-row">
                <td>Engine</td>
                {vehicle1 && <td>{vehicle1.specs.engine}</td>}
                {vehicle2 && <td>{vehicle2.specs.engine}</td>}
                {vehicle3 && <td>{vehicle3.specs.engine}</td>}
              </tr>
              <tr>
                <td>Performance</td>
                {vehicle1 && <td>{vehicle1.specs.performance}</td>}
                {vehicle2 && <td>{vehicle2.specs.performance}</td>}
                {vehicle3 && <td>{vehicle3.specs.performance}</td>}
              </tr>
              <tr className="highlight-row">
                <td>Peak Power</td>
                {vehicle1 && <td>{vehicle1.specs.peakPower}</td>}
                {vehicle2 && <td>{vehicle2.specs.peakPower}</td>}
                {vehicle3 && <td>{vehicle3.specs.peakPower}</td>}
              </tr>
              <tr>
                <td>Top Speed</td>
                {vehicle1 && <td>{vehicle1.specs.topSpeed}</td>}
                {vehicle2 && <td>{vehicle2.specs.topSpeed}</td>}
                {vehicle3 && <td>{vehicle3.specs.topSpeed}</td>}
              </tr>
              <tr className="highlight-row">
                <td>Features</td>
                {vehicle1 && (
                  <td>
                    <ul className="feature-list">
                      {vehicle1?.specs.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                )}
                {vehicle2 && (
                  <td>
                    <ul className="feature-list">
                      {vehicle2?.specs.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                )}
                {vehicle3 && (
                  <td>
                    <ul className="feature-list">
                      {vehicle3?.specs.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                )}
              </tr>
              <tr>
                <td>Available Colors</td>
                {vehicle1 && (
                  <td>
                    <div className="compare-colors">
                      {vehicle1?.colors.map((color, index) => (
                        <div
                          key={index}
                          className="compare-color-swatch"
                          style={{ backgroundColor: color }}
                          title={vehicle1.colorNames?.[index] || color}
                        ></div>
                      ))}
                    </div>
                  </td>
                )}
                {vehicle2 && (
                  <td>
                    <div className="compare-colors">
                      {vehicle2?.colors.map((color, index) => (
                        <div
                          key={index}
                          className="compare-color-swatch"
                          style={{ backgroundColor: color }}
                          title={vehicle2.colorNames?.[index] || color}
                        ></div>
                      ))}
                    </div>
                  </td>
                )}
                {vehicle3 && (
                  <td>
                    <div className="compare-colors">
                      {vehicle3?.colors.map((color, index) => (
                        <div
                          key={index}
                          className="compare-color-swatch"
                          style={{ backgroundColor: color }}
                          title={vehicle3.colorNames?.[index] || color}
                        ></div>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="modal-footer">
        <button className="cta-button primary" onClick={toggleCompareModal}>
          Close Comparison
        </button>
      </div>
    </div>
  </div>
)}


        {/* Hotspot Image Viewer Modal */}
        {showHotspotImageViewer && selectedHotspot && (
          <HotspotImageViewer
            title={selectedHotspot.title}
            description={selectedHotspot.description}
            image={selectedHotspot.image}
            onClose={closeHotspotImageViewer}
          />
        )}

        {/* Footer */}
        <div className="showroom-footer">
          <div className="footer-content">
          <div className="footer-brand">
  <img src="/footer-logo-r.png" alt="Toyota Logo" className="footer-brand-logo" />
  
</div>
            <div className="footer-links">
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Terms of Use
              </a>
              <a href="#" className="footer-link">
                Contact Us
              </a>
              <a href="#" className="footer-link">
                Dealer Locator
              </a>
            </div>
            <div className="footer-social">
              <span className="footer-social-text">Follow Us:</span>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  FB
                </a>
                <a href="#" className="social-icon">
                  TW
                </a>
                <a href="#" className="social-icon">
                  IG
                </a>
                <a href="#" className="social-icon">
                  YT
                </a>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            © 2025 Toyota Motor Corporation. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
