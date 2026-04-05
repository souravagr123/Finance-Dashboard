It is a high-performance personal finance dashboard built to demonstrate modern frontend architecture, complex state management, and data visualization. Developed by Sourav Agarwal, a B.Tech Computer Science student at the forefront of the React 19 and Tailwind 4 ecosystem.

Quick Start & Setup
To review this project locally, ensure you have Node.js (v18+) installed.

1. Clone and Install:
git clone (https://github.com/souravagr123/Finance-Dashboard.git)
cd finance-dashboard
npm install

2. Dependency Alignment:
This project utilizes Radix UI primitives and Tailwind 4. Ensure all scoped packages are installed to avoid permission errors:
npm install react-router-dom lucide-react recharts clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip embla-carousel-react cmdk vaul react-hook-form react-day-picker date-fns sonner next-themes

3. Path Alias Support:
The project uses @/ aliases for clean directory management. Verify your vite.config.js is updated with path.resolve to map to the src directory.

4. Run:
npm run dev

Overview of Technical Approach
* State Architecture: Implemented a centralized Context API (FinanceProvider) to manage global transaction data, user roles, and complex filtering logic without prop-drilling.

* Next-Gen Styling: Utilized Tailwind CSS 4 for a CSS-first configuration, implementing a sophisticated Glassmorphism design system with native CSS variable theming for Light/Dark modes.

* Modular Component Design: Followed a strict Atomic Design pattern, separating Radix-based UI primitives from feature-rich dashboard modules like TransactionList and InsightsPanel.

* Data Integrity: Used Memoization (useMemo, useCallback) to optimize chart rendering and transaction filtering, ensuring 60fps performance even with large mock datasets.

Key Professional Features
1. Role-Based Workspace
* Admin Access: Full CRUD (Create, Read, Update, Delete) capabilities over financial records.
* Viewer Access: A read-only analytical mode, perfect for demonstrating secure data handling and UI permissioning.

2. Predictive Analytics & Insights
* Insights Engine: Automatically calculates the top spending category, savings rate percentage, and month-over-month expense fluctuations.
* Trend Visualization: Interactive Area and Pie charts provide a visual summary of income vs. expenses over time.

3. Search & Optimization
* Multi-Factor Filtering: Users can filter transactions by type, category, or search string, with real-time sorting by date or amount.
* Mobile-First UX: Integrated a custom useIsMobile hook and Vaul drawers to ensure the dashboard remains fully functional on mobile devices.

About the Developer
I am a 2nd-year B.Tech Computer Science student with a proven track record of leadership—from representing Bihar at national youth festivals to managing large-scale events as an NSS volunteer. My background as a state-level football player instills the discipline and teamwork I bring to every software engineering project. I am currently seeking a summer internship to apply my skills in React, AI/ML, and Financial Analysis.