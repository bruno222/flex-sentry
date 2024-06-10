import { startSentry } from './sentry';

import * as FlexPlugin from '@twilio/flex-plugin';
import FlexSentryPlugin from './FlexSentryPlugin';

startSentry();

FlexPlugin.loadPlugin(FlexSentryPlugin);
