Project Overview

This repository contains a polished frontend implementation for the Government Public Library, Prayagraj. It focuses on a premium, responsive UI and robust integration with backend services for dynamic data: membership, collections, archives, tenders, and more. The app is production-ready with TypeScript types, unit-able components, and a well-documented structure.

Modules / Pages

The site includes the following main modules (matching the reference design):

Dashboard / Homepage — Hero banner, welcome text, featured news/events, quick links and highlights.

Membership — Membership plans, signup/registration form with client-side validation and API integration.

Services — Cards & icon list describing in-person and online services.

E-Services — E-books, journals, online catalog; data fetched from API endpoints.

Archives — Dropdown categories (Historical Documents, Old Newspapers, Rare Books) with dynamic fetching and filters.

Collection — Grid layout for Books, Magazines, Journals, Digital Media. Includes filter and sort controls.

Manuscript — Rare manuscripts listing with search and server-side pagination.

About Us — Mission, vision, history, team members with profile cards.

Contact Us — Contact form with validation, Google Maps embed, and API submission.

Tender / Notice Board — Dynamically fetch and display latest tenders & notices from API.

Core Features

Fully responsive using Tailwind CSS utility classes

Modern Navbar with sticky header, dropdowns, search, and theme toggle

Premium UI: soft shadows, rounded corners, smooth micro-interactions using Framer Motion

Redux Toolkit for global state (auth, membership, collections, UI state)

API handling via Axios or RTK Query for caching/optimistic updates

Accessible markup (semantic HTML, ARIA attributes, keyboard navigation)

Icons via Lucide (or Material Icons) and modern typography

Unit-friendly component structure; prepared for tests

Tech Stack

React 18+ with TypeScript

Redux Toolkit & RTK Query (or Axios with custom hooks)

Tailwind CSS (with JIT), PostCSS

Framer Motion for animations

Lucide icons (or Material) for crisp UI icons

React Router v6 for routing

ESLint + Prettier for code style

Build and deploy to Vercel / Netlify / GitHub Pages or any static host.

Set environment variables on the host and configure redirects if needed for API proxies.

Contributing

Fork the repo

Create a feature branch: git checkout -b feat/awesome-component

Commit changes with clear messages

Submit a PR — maintainers will review

Credits & Contact

Developed by Aniket Sahu

Email: sahuaniket5jan@gmail.com

If you need additional features (CMS integration, backend templates, or a deployment pipeline), reach out by email.

License

This project is released under the MIT License.