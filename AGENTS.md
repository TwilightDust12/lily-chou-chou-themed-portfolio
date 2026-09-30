# Agent Instructions: Static Website Project 
 
## 1. Project Overview - **Project Name:** The Ether - **Category:** Personal Portfolio  - **Description:** I want to make a personal portfolio about lily chou-chou, i want it to be lily chou-chou themed, research about the movie to know about the story and the overall vibe and cinematography, i want to recreate that atmosphere with this website portfolio  - **Primary Goal:** Showcase portfolio pieces 
 
## 2. Technical Stack & Constraints - **Core Stack:** Plain HTML5, CSS3, Vanilla JavaScript (ES6+). - **Zero External Dependencies:** Do NOT use external build tools, package managers (npm/yarn), or third
party CSS/JS frameworks (no Tailwind CDN, Bootstrap, React, or jQuery). - **Font & Icon Constraints:** Modern web-safe system font stacks or Google Fonts via `<link>` tag. Use inline 
SVGs or local SVG files in `assets/` for icons. - **Paths:** All internal links, stylesheets, scripts, and asset references must use **relative paths** (e.g., 
`./assets/logo.png`, `./style.css`, `./script.js`) to ensure compatibility with GitHub Pages subdirectory hosting. 
 
## 3. Directory Layout 
```text 
my-website/ 
├── AGENTS.md 
├── index.html 
├── style.css 
├── script.js 
└── assets/ 
    └── background.jpg
    └── logo.png
    └── hero.png
 
## 4. UI/UX & Design Guidelines 
     Color Palette: 
     Primary: [e.g., #1E293B / Slate Navy] 
     Accent / CTA: [e.g., #3B82F6 / Vibrant Blue] 
     Background: [e.g., #F8FAFC / Off-white or #0F172A / Dark] 
     Text: [e.g., #0F172A / High-contrast dark neutral] 
     Typography: Clean, accessible sans-serif or serif system stack (e.g., system-ui, -apple-system, sans-serif). 
     Layout Approach: Mobile-first design using CSS Flexbox and CSS Grid. 
     Responsiveness: Fluid breakpoints (Mobile: < 640px, Tablet: 640px - 1024px, Desktop: > 1024px). 
 
## 5. Required Sections 
     Header / Navbar: Brand logo/title, navigation links, and a mobile hamburger menu toggle. 
     Hero Section: Clear value proposition/heading, short description, and primary Call-to-Action (CTA) button. 
     Core Content Section: 
          If Personal: About Me + Projects/Skills grid. 
          If Business: Products/Services showcase + Pricing/Menu. 
          If Organization: Mission/Vision + Officers/Events list. 
     Interactive Feature: [e.g., Light/Dark mode toggle, filterable gallery, interactive FAQ accordion, or modal  
window]. 
     Contact / CTA Section: Working static contact form UI or direct contact cards. 
     Footer: Copyright, quick links, and social links. 
## 6. Agent Rules of Engagement 
Always generate complete, functional code blocks—avoid placeholders, ellipsis comments (/* code 
continues here */), or truncated snippets. 
Ensure semantic HTML tags are prioritized (<header>, <nav>, <main>, <section>, <article>, <footer>). 
Keep CSS organized with clear section headers, CSS custom properties (:root), and smooth transitions. 
Keep JavaScript modular, event-driven, and scoped without polluting global namespace. 