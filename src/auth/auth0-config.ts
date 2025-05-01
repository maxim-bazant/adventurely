import { CacheLocation } from "@auth0/auth0-react";

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirectUri: window.location.origin,
  cacheLocation: "localstorage" as CacheLocation, // 👈 This persists login after reload
  useRefreshTokens: true // Optional: better UX for silent login
};
