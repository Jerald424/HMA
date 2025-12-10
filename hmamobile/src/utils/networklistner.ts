import NetInfo from '@react-native-community/netinfo';

let unsubscribe = null;
let lastState = null;

export const startNetworkListener = callback => {
  // Avoid duplicate listeners
  if (unsubscribe) return;

  unsubscribe = NetInfo.addEventListener(state => {
    const isConnected = Boolean(state.isConnected && state.isInternetReachable);

    // avoid calling callback repeatedly for same state
    if (lastState !== isConnected) {
      lastState = isConnected;
      callback(isConnected);
    }
  });
};

export const stopNetworkListener = () => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
};
