import { createBrowserHistory } from 'history';

import * as Sentry from '@sentry/react';

export const startSentry = (email: string, flexVersion: string) => {
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
      Sentry.replayIntegration()
    ],
    replaysSessionSampleRate: 0.1, // overall replay sampling
    replaysOnErrorSampleRate: 1.0, // sampling on errors 


    // OfflineCaching
    // https://docs.sentry.io/platforms/javascript/guides/react/best-practices/offline-caching/
    transport: Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport),

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // Get info about Flex and about the Agent
    initialScope: {
      tags: { flexVersion },
      user: { email },
    },
  });

  createFeedbackWidget();
};

/**
 * Alternative way to create the Feedback Widget, as the previous way 
 * was not working as expected, Flex was replacing the Sentry widget with its own.
 */
function createFeedbackWidget() {
  const feedback = Sentry.feedbackIntegration({    
    autoInject: false,
  });
  
  setTimeout(() => {
    console.log('Rendering Sentry Feedback Widget...');
    const widget = feedback.createWidget();      
  }, 5000);
}