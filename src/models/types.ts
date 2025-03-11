export interface Vehicle {
  id: number;
  name: string;
  type: string;
  photos: string[];
  colors: string[];
  colorNames?: string[];
  colorImages?: { [color: string]: string[] };
  colorThreeDModelData?: { [key: string]: ThreeDModelData };
  specs: {
    engine: string;
    performance: string;
    features: string[];
    peakPower: string;
    topSpeed: string;
    acceleration: string;
    fuelEconomy: string;
  };
  hotspots: Hotspot[];
  threeDModelData?: ThreeDModelData;
}

export interface Hotspot {
  id: number;
  x: number;
  y: number;
  title: string;
  description: string;
  image: string;
}
export interface ThreeDModelData {
  enabled: boolean;
  images: string[];
}