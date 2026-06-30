import type { Config } from "tailwindcss";

/**
 * Tailwind theme is a thin map over the CSS-variable design tokens.
 * Components consume semantic classes (bg-page, text-content-primary,
 * rounded-card, shadow-card, ...) — never raw hex / px values.
 */
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page-bg)",
        surface: {
          primary: "var(--color-surface-primary)",
          secondary: "var(--color-surface-secondary)",
          muted: "var(--color-surface-muted)",
          inverse: "var(--color-surface-inverse)",
        },
        content: {
          primary: "var(--color-content-primary)",
          secondary: "var(--color-content-secondary)",
          muted: "var(--color-content-muted)",
          inverse: "var(--color-content-inverse)",
        },
        action: {
          primary: "var(--color-action-primary)",
          hover: "var(--color-action-primary-hover)",
          secondary: "var(--color-action-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
        },
        edge: {
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
        },
        state: {
          success: "var(--color-success)",
          warning: "var(--color-warning)",
          danger: "var(--color-danger)",
        },
        focus: "var(--color-focus-ring)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
        display: "var(--font-family-display)",
      },
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-md)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
      },
      lineHeight: {
        tight: "var(--line-height-tight)",
        snug: "var(--line-height-snug)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
      },
      letterSpacing: {
        tightest: "var(--letter-spacing-tight)",
        normal: "var(--letter-spacing-normal)",
        wide: "var(--letter-spacing-wide)",
        wider: "var(--letter-spacing-wider)",
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      spacing: {
        "page-x": "var(--space-page-x)",
        header: "var(--size-header-height)",
        "section-sm": "var(--section-padding-sm)",
        "section-md": "var(--section-padding-md)",
        "section-lg": "var(--section-padding-lg)",
        "section-xl": "var(--section-padding-xl)",
      },
      maxWidth: {
        narrow: "var(--container-narrow)",
        default: "var(--container-default)",
        wide: "var(--container-wide)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        button: "var(--radius-button)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
      zIndex: {
        base: "var(--z-base)",
        raised: "var(--z-raised)",
        header: "var(--z-header)",
        drawer: "var(--z-drawer)",
        modal: "var(--z-modal)",
        toast: "var(--z-toast)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        section: "var(--duration-section)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      backdropBlur: {
        glass: "var(--glass-blur)",
        header: "var(--header-blur)",
      },
    },
  },
  plugins: [],
};

export default config;
