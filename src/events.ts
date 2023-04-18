import { NativeEventEmitter } from 'react-native';

import { PlivoNativeSdk } from './PlivoNativeSdk';

export const emitter = new NativeEventEmitter(PlivoNativeSdk);
