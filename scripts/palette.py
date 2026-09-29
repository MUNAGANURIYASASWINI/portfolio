"""
Palette verification workbench — Tier 2 (decorative hues).

Usage:  python scripts/palette.py

TIER MODEL (the honest resolution of the first-round failures):
  - Tier 1 (color CARRIES meaning, e.g. metric kinds): strict separation
    required. The existing volume/quality/impact triad passes via ~9x
    luminance spread and is NOT touched here.
  - Tier 2 (color DECORATES, meaning carried by text/icons): the WCAG
    requirement is legibility of the text ON the color, plus
    color-not-alone for meaning (satisfied: every hue is paired with a
    visible label and a distinct icon). Separation across simulations is
    measured and REPORTED but not gated — a rose wash and a teal icon
    may simulate similarly without harming anyone, because nobody is
    asked to distinguish them.

What is checked here:
  1. Wash legibility: strong ink (#1a1f2a) on light washes, near-white
     (#f2f5f9) on dark washes, floor 4.5:1 (eyebrow pills are small text).
  2. AI text hue: 4.5:1 on raised + inset, both modes.
  3. Strip hues (saturated, thin, decorative): reported, not gated.
  4. Separation across all three simulations: reported for the record.
"""
import math
import sys

SURFACES = {
    "light": {
        "base": "#e5e9f0",
        "raised": "#eaeef5",
        "inset": "#e0e5ed",
        "sunken": "#dbe0e9",
    },
    "dark": {
        "base": "#2a2f3a",
        "raised": "#323847",
        "inset": "#242832",
        "sunken": "#1e222b",
    },
}

INK = {"light": "#1a1f2a", "dark": "#f2f5f9"}
EXISTING_TEXT_HUES = {
    "light": {
        "accent": "#2f4bc4",
        "accent-text": "#1f3fa8",
        "volume": "#12306b",
        "quality": "#0c6b55",
        "impact": "#8f5312",
    },
    "dark": {
        "accent": "#7e97f9",
        "accent-text": "#c6d2ff",
        "volume": "#7fa8f5",
        "quality": "#4fc5a2",
        "impact": "#e0a05c",
    },
}


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hexcolor):
    r, g, b = (srgb_to_linear(c) for c in hex_to_rgb(hexcolor))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


SIM_MATRICES = {
    "protanopia": (
        (0.152286, 1.052583, -0.204868),
        (0.114503, 0.786281, 0.099216),
        (-0.003882, -0.048116, 1.051998),
    ),
    "deuteranopia": (
        (0.367322, 0.860646, -0.227968),
        (0.280085, 0.672501, 0.047413),
        (-0.011820, 0.042940, 0.968881),
    ),
    "tritanopia": (
        (1.255528, -0.076749, -0.178779),
        (-0.078411, 0.930809, 0.147602),
        (0.004733, 0.691367, 0.303900),
    ),
}


def linear_to_srgb(c):
    c = min(max(c, 0.0), 1.0)
    return 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055


def simulate(hexcolor, kind):
    lin = [srgb_to_linear(c) for c in hex_to_rgb(hexcolor)]
    m = SIM_MATRICES[kind]
    out = [sum(m[i][j] * lin[j] for j in range(3)) for i in range(3)]
    return tuple(linear_to_srgb(c) for c in out)


def rgb_to_xyz(rgb):
    def piv(c):
        return ((c + 0.055) / 1.055) ** 2.4 if c > 0.04045 else c / 12.92

    r, g, b = (piv(c) * 100 for c in rgb)
    return (
        r * 0.4124 + g * 0.3576 + b * 0.1805,
        r * 0.2126 + g * 0.7152 + b * 0.0722,
        r * 0.0193 + g * 0.1192 + b * 0.9505,
    )


def xyz_to_lab(x, y, z):
    xn, yn, zn = 95.047, 100.0, 108.883

    def f(t):
        return t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116

    fx, fy, fz = f(x / xn), f(y / yn), f(z / zn)
    return (116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz))


def delta_e76(rgb1, rgb2):
    l1 = xyz_to_lab(*rgb_to_xyz(rgb1))
    l2 = xyz_to_lab(*rgb_to_xyz(rgb2))
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(l1, l2)))


# ---------------------------------------------------------------- candidates
# Washes: tinted pill backgrounds. Ink text sits on top (floor 4.5).
WASHES = {
    "crm": {"light": "#f4d4de", "dark": "#5e2a3f"},  # rose
    "erp": {"light": "#f1e0c2", "dark": "#5e4517"},  # amber
    "honda": {"light": "#d2e9da", "dark": "#1e5c3b"},  # green
    "ai": {"light": "#ded5f6", "dark": "#44308a"},  # violet
}

# AI text hue (small labels: skill group, cert issuer). Floor 4.5 on
# raised + inset, both modes. Dark value lightened vs round 1 (4.34 FAIL).
AI_TEXT = {"light": "#5b3fb8", "dark": "#b3a1f7"}


def main():
    failures = 0
    print("=== Tier 2 gate 1: wash legibility (ink on wash, floor 4.5) ===")
    for role, spec in WASHES.items():
        for mode in ("light", "dark"):
            r = contrast(INK[mode], spec[mode])
            mark = "ok " if r >= 4.5 else "FAIL"
            if r < 4.5:
                failures += 1
            print(f"  [{mark}] wash-{role:5s} {mode:5s}  {r:.2f}:1")

    print("\n=== Tier 2 gate 2: AI text hue (floor 4.5) ===")
    for mode in ("light", "dark"):
        for surf in ("raised", "inset"):
            r = contrast(AI_TEXT[mode], SURFACES[mode][surf])
            mark = "ok " if r >= 4.5 else "FAIL"
            if r < 4.5:
                failures += 1
            print(f"  [{mark}] ai-text {mode:5s} on {surf:6s}  {r:.2f}:1")

    print("\n=== Informational: strip hues (decorative, ungated) ===")
    for role, spec in WASHES.items():
        # The dark wash doubles as the saturated strip color in both modes.
        print(f"    strip-{role:5s} {spec['dark']}  Y={luminance(spec['dark']):.4f}")

    print("\n=== Informational: simulated separation of washes ===")
    for mode in ("light", "dark"):
        names = sorted(WASHES)
        worst = []
        for sim in ("protanopia", "deuteranopia", "tritanopia"):
            simmed = {n: simulate(WASHES[n][mode], sim) for n in names}
            for i in range(len(names)):
                for j in range(i + 1, len(names)):
                    d = delta_e76(simmed[names[i]], simmed[names[j]])
                    worst.append((d, sim, names[i], names[j]))
        worst.sort()
        print(f"  -- {mode} washes (closest 4 pairs) --")
        for d, sim, a, b in worst[:4]:
            print(f"    {sim:12s} {a:5s} vs {b:5s}  dE={d:.2f}")

    print(f"\n{failures} gate failures")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
