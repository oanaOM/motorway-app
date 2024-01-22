import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
  },
});
