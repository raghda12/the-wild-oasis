import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
    /* Warm neutrals: grey-0 is the card surface, grey-50 the page ground */
    --color-grey-0: #ffffff;
    --color-grey-50: #f4f1ea;
    --color-grey-100: #eee9df;
    --color-grey-200: #e6e0d4;
    --color-grey-300: #d6cfc1;
    --color-grey-400: #9ca29d;
    --color-grey-500: #69706a;
    --color-grey-600: #414a44;
    --color-grey-700: #2a322d;
    --color-grey-800: #18201b;
    --color-grey-900: #0f1511;

    /* Slightly raised surface for table headers, footers and inputs */
    --color-surface-2: #faf8f4;

    /* Forest green */
    --color-brand-50: #f3f8f5;
    --color-brand-100: #e2ece5;
    --color-brand-200: #c3d9cb;
    --color-brand-500: #3f7d5f;
    --color-brand-600: #1e4a38;
    --color-brand-700: #163a2c;
    --color-brand-800: #102c21;
    --color-brand-900: #0b1f17;

    /* Amber accent */
    --color-accent: #e0a458;
    --color-accent-ink: #1b1409;

    /* Status colours (used by Tag and Stat as --color-{name}-100 / -700) */
    --color-blue-100: #e6eef7;
    --color-blue-700: #2a5687;
    --color-green-100: #e0efe5;
    --color-green-700: #1d6b43;
    --color-yellow-100: #f7e8d8;
    --color-yellow-700: #b45f1e;
    --color-silver-100: #edeae4;
    --color-silver-700: #58605a;
    --color-indigo-100: #e2ece5;
    --color-indigo-700: #1e4a38;

    --color-red-100: #fbe9e7;
    --color-red-700: #b42318;
    --color-red-800: #912018;

    /* Sidebar stays dark in both modes */
    --color-sidebar: #12211a;
    --color-sidebar-active: #1f3a2d;
    --color-sidebar-text: #b9c5be;
    --color-sidebar-muted: #7f9086;
    --color-sidebar-line: rgba(255, 255, 255, 0.08);

    /* Charts */
    --color-chart-grid: #ece7dd;
    --color-chart-total: #1e4a38;
    --color-chart-extras: #c77a2e;

    --backdrop-color: rgba(24, 32, 27, 0.35);

    --shadow-sm: 0 1px 2px rgba(24, 32, 27, 0.05);
    --shadow-md: 0 1px 2px rgba(24, 32, 27, 0.04), 0 8px 24px rgba(24, 32, 27, 0.05);
    --shadow-lg: 0 12px 32px rgba(24, 32, 27, 0.14);

    --image-grayscale: 0;
    --image-opacity: 100%;
  }

  &.dark-mode {
    --color-grey-0: #151d19;
    --color-grey-50: #0e1411;
    --color-grey-100: #1e2823;
    --color-grey-200: #26322b;
    --color-grey-300: #34423a;
    --color-grey-400: #6f7a73;
    --color-grey-500: #949d97;
    --color-grey-600: #c6ccc7;
    --color-grey-700: #e2dfd8;
    --color-grey-800: #ece8e0;
    --color-grey-900: #f6f3ec;

    --color-surface-2: #1a231e;

    --color-brand-50: #0e1411;
    --color-brand-100: #1e3329;
    --color-brand-200: #2c4a3b;
    --color-brand-500: #5ea882;
    --color-brand-600: #7bc49c;
    --color-brand-700: #95d3b0;
    --color-brand-800: #b5e0c7;
    --color-brand-900: #d6efe0;

    --color-accent: #e8ad66;
    --color-accent-ink: #1b1409;

    --color-blue-100: #1c2b3d;
    --color-blue-700: #a9c7ea;
    --color-green-100: #17301f;
    --color-green-700: #9fd8b3;
    --color-yellow-100: #3a2a19;
    --color-yellow-700: #e8ad66;
    --color-silver-100: #232b26;
    --color-silver-700: #b7beb9;
    --color-indigo-100: #1e3329;
    --color-indigo-700: #8fd0ac;

    --color-red-100: #fdecea;
    --color-red-700: #e5584b;
    --color-red-800: #b42318;

    --color-sidebar: #0a100d;
    --color-sidebar-active: #16241d;
    --color-sidebar-text: #b9c5be;
    --color-sidebar-muted: #7f9086;
    --color-sidebar-line: #1c2621;

    --color-chart-grid: #222d27;
    --color-chart-total: #7bc49c;
    --color-chart-extras: #e8ad66;

    --backdrop-color: rgba(0, 0, 0, 0.5);

    --shadow-sm: none;
    --shadow-md: none;
    --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);

    --image-grayscale: 0;
    --image-opacity: 95%;
  }

  --font-serif: "Fraunces", Georgia, serif;
  --font-sans: "Manrope", system-ui, sans-serif;

  --border-radius-tiny: 4px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 20px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: var(--font-sans);
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  -webkit-font-smoothing: antialiased;

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 500;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-brand-600);
  box-shadow: 0 0 0 4px var(--color-brand-100);
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--color-brand-600);
  outline-offset: 2px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
