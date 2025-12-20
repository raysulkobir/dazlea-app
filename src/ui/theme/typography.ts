// src/ui/theme/typography.ts
import { Platform, useWindowDimensions } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

type FontSizeOptions = {
  /** Clamp the lower bound (default 10) */
  min?: number;
  /** Clamp the upper bound (default 32) */
  max?: number;
  /** Only for iOS: how aggressively to scale (0..1). Default 0.5 */
  factor?: number;
};

/**
 * Returns a platform-aware, clamped, proportional font size.
 * - iOS: prefers `moderateScale` (width-based + factor for subtle scaling)
 * - Android: prefers `verticalScale` (height-based, typical for Android screens)
 */
export function getProportionalFontSize(
  baseFontSize: number,
  opts: FontSizeOptions = {}
) {
  const size = Number.isFinite(baseFontSize) ? baseFontSize : 14;

  const {
    min = 10,
    max = 32,
    factor = 0.5, // used only by moderateScale
  } = opts;

  const scaled =
    Platform.OS === 'ios'
      ? moderateScale(size, factor)
      : verticalScale(size);

  // clamp to avoid extremes on very small/very large devices
  const clamped = Math.max(min, Math.min(max, scaled));

  // round to 0.5pt to reduce sub-pixel rendering jitter
  return Math.round(clamped * 2) / 2;
}

/** Helper to derive a sensible lineHeight from a fontSize */
const lh = (fs: number, ratio = 1.35) => Math.round(fs * ratio);

/**
 * Build a Typography scale using proportional font sizes.
 * Call this once for a static theme, or inside a hook for responsive updates.
 */
export function createTypography(opts?: FontSizeOptions) {
  const title = getProportionalFontSize(20, opts);
  const subtitle = getProportionalFontSize(16, opts);
  const body = getProportionalFontSize(14, opts);
  const caption = getProportionalFontSize(12, opts);

  return {
    title:   { fontSize: title,   fontWeight: '700' as const, lineHeight: lh(title, 1.4) },
    subtitle:{ fontSize: subtitle, fontWeight: '600' as const, lineHeight: lh(subtitle, 1.35) },
    body:    { fontSize: body,    fontWeight: '400' as const, lineHeight: lh(body, 1.4) },
    caption: { fontSize: caption, fontWeight: '400' as const, lineHeight: lh(caption, 1.33) },
  } as const;
}

/** Static (non-reactive) Typography — good enough for most apps */
export const Typography = createTypography();

/**
 * Hook version that recomputes when window size changes
 * (use if you want dynamic scaling on orientation/size changes).
 */
export function useTypography(opts?: FontSizeOptions) {
  // Triggers re-render on rotation or size change
  useWindowDimensions();
  return createTypography(opts);
}
