import { Icon } from "@/components/icons";
import type { Metric } from "@/types/content";

type NeuMetricProps = {
  metric: Metric;
  index?: number;
};

/**
 * A hard number from the resume, given visual weight.
 *
 * INTEGRITY RULE: this component renders ONLY real measurements. A
 * capability label must never borrow the numeral treatment, or it
 * implies a measurement that was never made — the fastest way to lose a
 * technical reader's trust.
 *
 * The numeral uses --color-ink (13.54:1), NOT the semantic colour. A 40px
 * coloured numeral on a light clay surface costs legibility and buys
 * nothing: the semantic hue lives on the ICON, where it is redundant
 * third-channel reinforcement behind the icon shape and the text label.
 */
export function NeuMetric({ metric, index = 0 }: NeuMetricProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-i": index } as React.CSSProperties}
      className="neu-inset flex flex-col gap-2 rounded-lg p-4"
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-base ${
          metric.kind === "volume"
            ? "text-volume"
            : metric.kind === "quality"
              ? "text-quality"
              : "text-impact"
        }`}
      >
        <Icon name={metric.icon} size={16} />
      </span>

      <p className="metric-value text-2xl text-ink">{metric.value}</p>

      <div>
        <p className="text-sm text-body">{metric.label}</p>
        <p className="mt-1 text-xs text-muted">{metric.detail}</p>
      </div>
    </div>
  );
}
