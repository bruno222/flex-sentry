import { createBrowserHistory } from 'history';

import * as Sentry from '@sentry/react';

export const startSentry = () => {
  const history = createBrowserHistory();

  // Array of Route Config Objects
  // Make sure the order of the routes is correct. The longest url under the same parent should be placed first and in decreasing order.
  // Doc: https://docs.sentry.io/platforms/javascript/guides/react/features/react-router/
  const routes = [{ path: '/agent-desktop/:taskReservation' }, { path: '/agent-desktop' }, { path: '/' }];

  Sentry.init({
    dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0', // ADD YOUR SENTRY DSN HERE
    integrations: [
      Sentry.reactRouterV5BrowserTracingIntegration({
        history,
        routes,
        // matchPath,
      }),
    ],

    // OfflineCaching
    // https://docs.sentry.io/platforms/javascript/guides/react/best-practices/offline-caching/
    transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};

export const sentrySetUser = (email: string) => {
  email && Sentry.setUser({ email });
};
