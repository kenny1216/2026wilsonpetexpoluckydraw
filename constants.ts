
import { Prize } from './types';

export const PRIZES: Prize[] = [
  { id: 1, label: "$1,000 進貨折扣券", probability: 5, color: "#FDE047", icon: "fa-certificate" },
  { id: 2, label: "專業美容用品", probability: 10, color: "#60A5FA", icon: "fa-scissors" },
  { id: 3, label: "$500 進貨折扣券", probability: 15, color: "#F97316", icon: "fa-money-bill-wave" },
  { id: 4, label: "美容教學資源", probability: 15, color: "#A855F7", icon: "fa-book" },
  { id: 5, label: "$300 進貨折扣券", probability: 20, color: "#4ADE80", icon: "fa-ticket-alt" },
  { id: 6, label: "展場限定優惠資格", probability: 15, color: "#F472B6", icon: "fa-star" },
  { id: 7, label: "加購優惠券", probability: 10, color: "#FB923C", icon: "fa-cart-plus" },
  { id: 8, label: "再轉一次", probability: 10, color: "#94A3B8", icon: "fa-redo" },
];

export const APP_THEME = {
  primary: "#1e3a8a", // Wilson Blue
  secondary: "#fbbf24", // Gold
  accent: "#ef4444", // Red
};
