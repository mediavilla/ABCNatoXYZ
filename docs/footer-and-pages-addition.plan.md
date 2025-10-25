# Footer and Pages Addition Plan

## Overview

Add a comprehensive footer component, standardize headers with breadcrumbs, and create 10 new static content pages with React Router routing.

## Component Creation

### 1. Footer Component (`src/components/Footer.jsx`)

- Multi-column responsive layout (4 columns on desktop, stacks on mobile)
- Column 1: About & Info links (About ABCNATO, FAQs)
- Column 2: Resources (Freebies, Articles, Links and Resources)
- Column 3: Site (Feedback, Roadmap, Design System)
- Column 4: Your logo/branding with link to https://mediavilla.design
- Bottom row: Legal links (Privacy Policy, Terms and Conditions, Cookie Policy)
- Copyright and existing attribution text
- Use Tailwind responsive classes, Framer Motion animations
- Match existing design system colors and styling

### 2. Header Component (`src/components/Header.jsx`)

- Extract header from `Home.jsx` (lines 204-207)
- Props: `title` (string), `showThemeToggle` (boolean, default true)
- Includes ThemeToggle component
- Consistent styling with backdrop blur and border

### 3. Breadcrumb Component (`src/components/Breadcrumb.jsx`)

- Display navigation path (e.g., "Home > About")
- Use React Router's `useLocation` hook
- Clickable links to navigate back
- Positioned below header, above main content
- Simple, minimal design with separators

## Page Creation

Create 10 new pages in `src/pages/` directory, all following the same structure:

- Import and use Header, Breadcrumb, and Footer components
- Main content area with placeholder text
- Consistent page animations from existing pages

### Pages to Create:

1. `About.jsx` - About ABCNATO
2. `FAQ.jsx` - Frequently Asked Questions
3. `Freebies.jsx` - Free resources
4. `Articles.jsx` - Articles and blog posts
5. `Resources.jsx` - Links and Resources
6. `Feedback.jsx` - Feedback form/info
7. `Roadmap.jsx` - Product roadmap
8. `Privacy.jsx` - Privacy Policy
9. `Terms.jsx` - Terms and Conditions
10. `Cookies.jsx` - Cookie Policy

Each page will have:

- Framer Motion page transitions (reuse variants from Home.jsx)
- Responsive container with max-width
- Heading and placeholder content sections
- Proper semantic HTML structure

## File Updates

### 1. Update `src/App.jsx`

- Add 10 new Route components for the new pages
- Import all new page components

### 2. Update `src/pages/Home.jsx`

- Replace footer (lines 275-278) with `<Footer />` component
- Replace header (lines 204-207) with `<Header title="NATO Alphabet" />`
- Add Breadcrumb component after header

### 3. Update `src/pages/DesignSystem.jsx`

- Replace footer (lines 584-587) with `<Footer />` component
- Replace header (lines 198-210) with `<Header title="Design System" />`
- Add Breadcrumb component after header

## Routing Structure

All routes will use React Router with the following paths:

- `/` - Home (existing)
- `/design-system` - Design System (existing)
- `/about` - About ABCNATO
- `/faq` - FAQs
- `/freebies` - Freebies
- `/articles` - Articles
- `/resources` - Links and Resources
- `/feedback` - Feedback
- `/roadmap` - Roadmap
- `/privacy` - Privacy Policy
- `/terms` - Terms and Conditions
- `/cookies` - Cookie Policy

## Design Considerations

- All components will use existing design system colors and patterns
- Responsive breakpoints: mobile-first, then sm, md, lg
- Footer links will open in same window (internal navigation)
- External link to mediavilla.design will also open in same window
- Maintain consistent spacing and typography
- Use Framer Motion for smooth transitions
- Ensure accessibility with proper ARIA labels and semantic HTML

## Files to Create (13 new files)

1. `src/components/Footer.jsx`
2. `src/components/Header.jsx`
3. `src/components/Breadcrumb.jsx`
4. `src/pages/About.jsx`
5. `src/pages/FAQ.jsx`
6. `src/pages/Freebies.jsx`
7. `src/pages/Articles.jsx`
8. `src/pages/Resources.jsx`
9. `src/pages/Feedback.jsx`
10. `src/pages/Roadmap.jsx`
11. `src/pages/Privacy.jsx`
12. `src/pages/Terms.jsx`
13. `src/pages/Cookies.jsx`

## Files to Modify (3 files)

1. `src/App.jsx` - Add routes
2. `src/pages/Home.jsx` - Replace header/footer
3. `src/pages/DesignSystem.jsx` - Replace header/footer