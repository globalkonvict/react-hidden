import React, { useEffect, useState } from "react";
import debounce from "./debounce";

/**
 * Default breakpoints definition. These can be overridden via props to match the application's design system.
 */
const defaultBreakpoints = {
  xs: "(max-width: 575.98px)",
  sm: "(min-width: 576px) and (max-width: 767.98px)",
  md: "(min-width: 768px) and (max-width: 991.98px)",
  lg: "(min-width: 992px) and (max-width: 1199.98px)",
  xl: "(min-width: 1200px) and (max-width: 1599.98px)",
  xxl: "(min-width: 1600px)",
};

interface BreakpointProps {
  /** Extra small screens: screen < 576px */
  xs?: boolean;
  /** Small screens: screen ≥ 576px and < 768px */
  sm?: boolean;
  /** Medium screens: screen ≥ 768px and < 992px */
  md?: boolean;
  /** Large screens: screen ≥ 992px and < 1200px */
  lg?: boolean;
  /** Extra large screens: screen ≥ 1200px and < 1600px */
  xl?: boolean;
  /** Extra extra large screens: screen ≥ 1600px */
  xxl?: boolean;
}

interface MediaProps {
  /** Custom media query or queries for visibility control. */
  media?: string | string[];
}

interface HiddenProps extends BreakpointProps, MediaProps {
  /** The content that will be conditionally displayed. */
  children: React.ReactNode;
  /** Inverts the visibility logic. If true, the content is shown when the conditions are met. */
  invert?: boolean;
  /** Allows custom breakpoints to be defined, overriding the default ones. */
  breakpoints?: typeof defaultBreakpoints;
  /** Callback function that is called when the content becomes visible. */
  onShow?: () => void;
  /** Callback function that is called when the content becomes hidden. */
  onHide?: () => void;
  /** Debounce time in milliseconds for resize or orientation change events. */
  debounce?: number;
}

/**
 * The Hidden component conditionally renders its children based on the current viewport's size
 * or a custom media query. This enables selectively hiding content on different screen sizes
 * or according to custom criteria.
 *
 * @example
 * // Hides content on extra small screens.
 * <Hidden xs>
 *   <p>This text is hidden on extra small screens.</p>
 * </Hidden>
 *
 * @example
 * // Uses a custom media query to hide content.
 * <Hidden media="(max-width: 768px)">
 *   <p>This text is hidden on screen widths up to 768px.</p>
 * </Hidden>
 *
 * @example
 * // Inverts the logic to show content on extra small screens only.
 * <Hidden xs invert>
 *   <p>This text is only shown on extra small screens.</p>
 * </Hidden>
 *
 * @example
 * // Uses custom breakpoints and a visibility callback.
 * <Hidden breakpoints={{ xs: "(max-width: 640px)" }} xs onShow={() => console.log("Visible")}>
 *   <p>Custom breakpoint example.</p>
 * </Hidden>
 */
const Hidden: React.FC<HiddenProps> = ({
  children,
  media,
  invert = false,
  breakpoints = defaultBreakpoints,
  onShow,
  onHide,
  debounce: debounceTime = 100,
  ...breakpointProps
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = debounce(
      () => {
        const breakpointKeys = Object.keys(
          breakpointProps
        ) as (keyof typeof breakpointProps)[];
        const mediaQueries = media
          ? Array.isArray(media)
            ? media
            : [media]
          : breakpointKeys
              .filter((key) => breakpointProps[key])
              .map((key) => breakpoints[key]);

        const matchMediaQueries = mediaQueries.map((query) =>
          window.matchMedia(query)
        );
        const isMatch = matchMediaQueries.some((mq) => mq.matches);

        const newVisibility = invert ? isMatch : !isMatch;
        if (newVisibility !== isVisible) {
          setIsVisible(newVisibility);
          newVisibility ? onShow?.() : onHide?.();
        }
      },
      debounceTime,
      false
    );

    window.addEventListener("resize", updateVisibility);
    window.addEventListener("orientationchange", updateVisibility);
    updateVisibility(); // Initial visibility check

    return () => {
      window.removeEventListener("resize", updateVisibility);
      window.removeEventListener("orientationchange", updateVisibility);
    };
  }, [
    media,
    breakpointProps,
    invert,
    breakpoints,
    onShow,
    onHide,
    isVisible,
    debounceTime,
  ]);

  return (
    <div
      style={{ display: isVisible ? "block" : "none" }}
      aria-hidden={!isVisible}
    >
      {isVisible ? children : null}
    </div>
  );
};

export default Hidden;
