// FILE: artifacts/ishu/src/components/icons/ProfessionalIcon.tsx
// PURPOSE: Convert legacy emoji/string icon tokens into professional UI icons.

import type { CSSProperties } from "react";
import { Icons } from "@/components/icons";

export interface ProfessionalIconProps {
  icon: string | null | undefined;
  size?: number;
  className?: string;
  style?: CSSProperties;
  strokeWidth?: number;
}

const ICON_TOKEN_TO_KEY: Record<string, keyof typeof Icons> = {
  // Emoji tokens used across category pages
  "🏛️": "Building",
  "📋": "Document",
  "🏦": "Building",
  "🚂": "Rocket",
  "⚔️": "Shield",
  "⚙️": "Settings",
  "🩺": "Academic",
  "🗺️": "Location",
  "📚": "BookOpen",
  "👮": "Shield",
  "🔧": "Tools",
  "⚖️": "Security",
  "📄": "Document",
  "🤖": "AI",
  "🖼️": "Image",
  "📝": "Document",
  "🔄": "Loading",
  "🎓": "Graduation",
  "🪪": "CreditCard",
  "💡": "Sparkles",
  "🎯": "TrendingUp",
  "🏆": "Trophy",
  "📖": "BookOpen",
  "📑": "Document",
  "✍️": "Edit",
  "📓": "BookOpen",
  "🔢": "ChartBar",
  "🏠": "Home",
  "ℹ️": "Info",
  "📩": "Mail",

  // String icon names from APIs and seed data
  filetext: "Document",
  filetype: "Document",
  filesearch2: "Search",
  filecode2: "Code",
  filespreadsheet: "Excel",
  fileimage: "Image",
  scissors: "Tools",
  archive: "Archive",
  presentation: "Presentation",
  pencil: "Edit",
  signature: "Edit",
  stamp: "Verified",
  rotatecw: "Loading",
  globe: "Globe",
  unlock: "Key",
  lock: "Lock",
  foldertree: "Folder",
  wrench: "Tools",
  listordered: "List",
  scanline: "Search",
  scansearch: "Search",
  gitcompare: "ChartBar",
  eyeoff: "EyeOff",
  crop: "Image",
  languages: "Globe",
  workflow: "Stack",
  messagesquare: "Chat",
  trash2: "Delete",
  replace: "ArrowRight",
  move: "ArrowRight",
  search: "Search",
  sparkles: "Sparkles",
  cpu: "CPU",
  checksquare: "Success",
  settings: "Settings",
  keyround: "Key",
  harddriveupload: "Upload",
  bot: "AI",
  layoutdashboard: "Dashboard",
  barchart3: "ChartBar",
  vote: "Flag",
  pentool: "Edit",
  academic: "Academic",
  clipboardlist: "List",
  flaskconical: "Sparkles",
  wrenchscrewdriver: "Tools",
  clipboarddocument: "Document",
  clipboarddocumentcheck: "Check",
  banknotes: "Money",
  currencydollar: "Dollar",
  receiptpercent: "Receipt",
  buildinglibrary: "Library",
  rectanglestack: "Stack",
  qrcode: "Code",
  grid3x3: "Grid",
  image: "Image",
  type: "Document",
  arrowleftright: "Loading",
  brain: "Brain",
  building2: "Building",
  train: "Rocket",
  target: "TrendingUp",
  atom: "Sparkles",
  heartpulse: "Academic",
  mappin: "Location",
  graduationcap: "Graduation",
  shieldcheck: "Shield",
  scale: "Security",
  newspaper: "News",
  calculator: "ChartBar",
  award: "Trophy",
  creditcard: "CreditCard",
  stethoscope: "Academic",
  briefcase: "Building",
  globealt: "Globe",
  flag: "Flag",
  leaf: "Sparkles",
  treepine: "Sparkles",
  lightbulb: "Sparkles",
  rocket: "Rocket",
  filecheck: "Success",
  clipboardcheck: "Check",
  folderopen: "FolderOpen",
  mail: "Mail",
  home: "Home",
  info: "Info",
};

function normalizeToken(icon: string): string {
  return icon.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

const ICON_KEY_BY_NORMALIZED = Object.keys(Icons).reduce<Record<string, keyof typeof Icons>>(
  (acc, key) => {
    acc[normalizeToken(key)] = key as keyof typeof Icons;
    return acc;
  },
  {},
);

function resolveIconKey(icon: string | null | undefined): keyof typeof Icons {
  if (!icon) {
    return "Tools";
  }

  if (Object.prototype.hasOwnProperty.call(Icons, icon)) {
    return icon as keyof typeof Icons;
  }

  if (Object.prototype.hasOwnProperty.call(ICON_TOKEN_TO_KEY, icon)) {
    return ICON_TOKEN_TO_KEY[icon];
  }

  const normalized = normalizeToken(icon);
  return ICON_TOKEN_TO_KEY[normalized] ?? ICON_KEY_BY_NORMALIZED[normalized] ?? "Tools";
}

export function ProfessionalIcon({
  icon,
  size = 16,
  className,
  style,
  strokeWidth = 1.9,
}: ProfessionalIconProps) {
  const iconKey = resolveIconKey(icon);
  const IconComponent = Icons[iconKey] ?? Icons.Tools;

  return (
    <IconComponent
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
      focusable="false"
    />
  );
}

export default ProfessionalIcon;
