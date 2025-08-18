# zkCargoPass

zkCargoPass is a modern web application for secure, privacy-preserving document management and proof generation in the cargo and logistics industry. It leverages zero-knowledge proofs (ZKPs), AI validation, and Web3 authentication to streamline and secure document workflows.

## Features

- **Secure Document Upload:** Upload and manage cargo documents with privacy and security.
- **AI-Powered Validation:** Automatic document validation using AI before proof generation.
- **Zero-Knowledge Proofs:** Generate and verify ZKPs for document authenticity without revealing sensitive data.
- **Web3 Authentication:** Login and user management via Web3Auth for enhanced security.
- **Multi-language Support:** English and Portuguese (Brazil) localization.
- **Modern UI:** Responsive, dark/light theme, and accessible design.
- **Dashboard:** Track document history, platform status, budget consumption, and more.
- **Demo Scheduling:** Request a live demo directly from the app.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **State/Context:** React Context API
- **Authentication:** Web3Auth
- **Internationalization:** i18next, react-i18next
- **Icons:** Lucide React
- **Linting/Formatting:** Biome

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Build

```sh
pnpm build
```

### Lint & Format

```sh
pnpm lint
pnpm format
```

## Project Structure

- `src/`
  - `components/` – UI components (dashboard, auth, demo, etc.)
  - `contexts/` – React context providers (theme, language, web3auth)
  - `i18n/` – Localization config and translations
  - `assets/` – Images and static assets
  - `utils/` – Utility functions
- `public/` – Static files
- `index.html` – Main HTML entry
- `vite.config.ts` – Vite configuration
- `tailwind.config.js` – Tailwind CSS config

## Environment Variables

Some features (like Web3Auth) may require environment variables or API keys. See `src/contexts/web3authContext.tsx` for configuration.

## License

[MIT](LICENSE) (add your license file if needed)

---
