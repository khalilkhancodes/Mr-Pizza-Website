---
name: Midnight Gilded
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1c1c'
  surface-container: '#1f2020'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e4e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e4e2e1'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#121212'
  on-primary-container: '#7e7d7d'
  inverse-primary: '#5f5e5e'
  secondary: '#ffca45'
  on-secondary: '#3f2e00'
  secondary-container: '#e4ae00'
  on-secondary-container: '#5b4400'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#101212'
  on-tertiary-container: '#7c7d7e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdf9a'
  secondary-fixed-dim: '#f7be1d'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e4e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style

The design system for this premium fast-food experience is rooted in **Modern Minimalism** with a **High-Contrast / Bold** edge. It aims to elevate the fast-food category from "disposable" to "intentional luxury." The target audience consists of discerning urbanites who value quality and speed but refuse to compromise on aesthetic excellence.

The emotional response should be one of "exclusive accessibility"—a feeling of entering a high-end lounge that happens to serve exceptional burgers. The UI utilizes solid color blocks, expansive whitespace, and meticulous typography to create a sense of order and premium craft. By avoiding gradients and excessive ornamentation, the design system allows the professional food photography to become the focal point, treated with the same reverence as a fashion editorial.

## Colors

This design system adheres to a strict 60-30-10 color distribution to maintain a sophisticated atmosphere:

*   **60% Primary (Deep Charcoal #121212):** Used for the dominant background surfaces, page containers, and primary UI scaffolding. It provides the "Midnight" canvas that makes the other colors pop.
*   **30% Secondary (Sophisticated Gold #EAB308):** Used for call-to-action elements, primary buttons, price tags, and highlighting key brand moments. This conveys the "Gilded" quality.
*   **10% Accent (Off-White #FAFAFA):** Reserved for body text, critical labels, and high-contrast borders to ensure maximum legibility and a crisp finish.

Do not use gradients. All transitions between colors must be hard-edged and intentional.

## Typography

The typographic strategy relies on the tension between the classic, high-contrast serifs of **Playfair Display** and the clinical, geometric precision of **Inter**. 

Headlines should be treated as hero elements. Large display sizes use negative letter-spacing to create a "tight" editorial look. Body text is prioritized for legibility against dark backgrounds, using slightly increased line height and the neutral clarity of Inter. All labels and secondary navigation elements use Inter in uppercase with generous tracking to reinforce the premium, structured feel.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop to maintain the "framed" look of a luxury catalog, transitioning to a fluid model for mobile. 

*   **Desktop:** A 12-column grid with a 1280px max-width. Columns are separated by 24px gutters.
*   **Mobile:** A 4-column fluid grid with 20px side margins.
*   **Spacing Rhythm:** Use a strict 8px baseline. Large vertical gaps (48px to 80px) should be used between sections to allow the food photography to "breathe." Content should never feel cramped; if in doubt, increase the whitespace.

## Elevation & Depth

To maintain the solid-color aesthetic, this design system rejects traditional shadows. Depth is achieved through **Tonal Layers** and **Bold Borders**:

1.  **Level 0 (Background):** #121212.
2.  **Level 1 (Containers/Cards):** A slightly lighter charcoal (#1A1A1A) to distinguish from the base background.
3.  **Borders:** Use 1px solid borders in #262626 for subtle separation, or #EAB308 (Gold) for high-importance focus states.
4.  **Photography:** Depth is created by the natural shadows within professional studio photography, which should feature dark, moody backgrounds that blend seamlessly into the #121212 UI.

## Shapes

The shape language is primarily **Sharp**, utilizing 0px corners for large layout containers and images to emphasize a "surgical" and architectural precision. 

To ensure the UI remains usable and modern, interactive components like buttons and input fields use **Soft** rounding (4px - 8px). This subtle rounding prevents the interface from feeling "hostile" while maintaining the overall geometric and sophisticated character of the brand.

## Components

### Buttons
*   **Primary:** Solid #EAB308 (Gold) background with #121212 text. Bold Inter, uppercase. 4px border radius.
*   **Secondary:** Ghost style. 1px solid #FAFAFA border with #FAFAFA text. 
*   **Tertiary:** Text-only, #EAB308 with a 1px underline on hover.

### Cards (Menu Items)
*   Background: #1A1A1A.
*   Image: Full-bleed top section, sharp corners.
*   Content: Playfair Display for item names, Inter for descriptions and price. Price should be #EAB308.

### Input Fields
*   Background: #121212.
*   Border: 1px solid #262626.
*   Focus State: 1px solid #EAB308. 
*   Label: Inter, uppercase, 12px, #FAFAFA.

### Chips (Dietary Tags)
*   Small, rectangular with 2px rounding. 
*   Background: #262626. 
*   Text: #FAFAFA, 10px Inter.

### Lists (Menu Selection)
*   Divided by 1px #262626 lines. 
*   Hover state: Background shifts to #1A1A1A.
*   Arrow icons: Sharp, minimal chevron in #EAB308.

### Specialized Components
*   **The "Gold Frame":** High-value promotions should be wrapped in a 2px solid Gold border with generous 48px internal padding.
*   **Photography Overlay:** Text placed over images must use a 40% black scrim to ensure white typography remains legible.