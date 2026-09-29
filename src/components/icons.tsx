import type { IconName } from "@/types/content";

/**
 * Inline SVG icon set.
 *
 * DELIBERATE: no `lucide-react`. The whole site needs ~12 icons; a
 * single local file of <path> elements costs 0KB, carries no version
 * risk, and gives exact control over `stroke-width` — which matters a
 * lot visually in a soft-UI system where hairlines vanish.
 *
 * All icons share one visual language: 16x16 viewBox, 1.75 stroke,
 * round caps and joins. Never mix families.
 */
type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function GaugeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 12a10 10 0 1 1 12 0" />
      <path d="M8 12 11 6" />
    </svg>
  );
}

export function ShieldIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 1.5 2.5 4v4c0 3.2 2.3 5.9 5.5 6.5 3.2-.6 5.5-3.3 5.5-6.5V4z" />
      <path d="m5.8 8 1.6 1.6 2.8-2.8" />
    </svg>
  );
}

export function LayersIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 1.8 1.8 5 8 8.2 14.2 5z" />
      <path d="M1.8 8 8 11.2 14.2 8" />
      <path d="M1.8 11 8 14.2 14.2 11" />
    </svg>
  );
}

export function SparkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" />
      <path d="M8 5.2A2.8 2.8 0 1 0 8 10.8 2.8 2.8 0 0 0 8 5.2Z" />
    </svg>
  );
}

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}

export function CrossIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function MobileIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" />
      <path d="M7 12.5h2" />
    </svg>
  );
}

export function GlobeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M1.8 8h12.4" />
      <path d="M8 1.8a9.6 9.6 0 0 1 0 12.4 9.6 9.6 0 0 1 0-12.4Z" />
    </svg>
  );
}

export function TerminalIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" />
      <path d="m4.5 6.5 2 1.8-2 1.8M8.5 10.5h3" />
    </svg>
  );
}

export function DatabaseIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <ellipse cx="8" cy="3.8" rx="5.2" ry="2" />
      <path d="M2.8 3.8v8.4c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2V3.8" />
      <path d="M2.8 8c0 1.1 2.3 2 5.2 2s5.2-.9 5.2-2" />
    </svg>
  );
}

export function AlertIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 2.2 14.5 13.5h-13z" />
      <path d="M8 6.4v3.2M8 11.6h.01" />
    </svg>
  );
}

export function TargetIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="6.2" />
      <circle cx="8" cy="8" r="3.4" />
      <path d="M8 1.8v1.6M8 12.6v1.6M1.8 8h1.6M12.6 8h1.6" />
    </svg>
  );
}

export function ClockIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.4V8l2.6 1.6" />
    </svg>
  );
}

export function MailIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <path d="m2 5 6 4 6-4" />
    </svg>
  );
}

export function PhoneIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5.6 2.5 7 5.4 5.6 6.9a7 7 0 0 0 3.5 3.5l1.5-1.4 2.9 1.4v2.2c0 .6-.5 1-1 1A11.4 11.4 0 0 1 2.4 3.5c0-.5.4-1 1-1h2.2Z" />
    </svg>
  );
}

export function LinkedInIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
      <path d="M4.6 6.8v4.6M4.6 4.4h.01M7.4 11.4V6.8M7.4 8.6c0-1 .7-1.8 1.6-1.8s1.6.8 1.6 1.8v2.8" />
    </svg>
  );
}

export function GitHubIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 1.6a6.4 6.4 0 0 0-2 12.5c.3.1.4-.2.4-.4v-1.4c-1.7.4-2.1-.8-2.1-.8-.3-.7-.7-.9-.7-.9-.6-.4 0-.4 0-.4.6 0 1 .7 1 .7.6 1 1.5.7 1.8.6 0-.4.2-.7.4-.8-1.4-.2-2.8-.7-2.8-3 0-.7.2-1.2.6-1.7 0-.2-.3-.8.1-1.6 0 0 .5-.2 1.7.6a6 6 0 0 1 3 0c1.2-.8 1.7-.6 1.7-.6.4.8.1 1.4.1 1.6.4.5.6 1 .6 1.7 0 2.3-1.4 2.8-2.8 3 .2.2.4.6.4 1.2v1.8c0 .2.1.5.4.4A6.4 6.4 0 0 0 8 1.6Z" />
    </svg>
  );
}

export function DownloadIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 2v7.4M5 6.8 8 9.8l3-3" />
      <path d="M2.5 11.5v1a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-1" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13 8H3.5M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8h9.5M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

const REGISTRY = {
  gauge: GaugeIcon,
  shield: ShieldIcon,
  layers: LayersIcon,
  spark: SparkIcon,
  check: CheckIcon,
  cross: CrossIcon,
  mobile: MobileIcon,
  globe: GlobeIcon,
  terminal: TerminalIcon,
  database: DatabaseIcon,
  alert: AlertIcon,
  target: TargetIcon,
} as const;

export function Icon({
  name,
  className,
  size = 16,
}: IconProps & { name: IconName }) {
  const Cmp = REGISTRY[name];
  return <Cmp className={className} size={size} />;
}
