import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "2345eseeswrdxewetr5e5446rd",
  authDomain: "my-lab6-app-bc08d.firebaseapp.com",
  projectId: "my-lab6-app-bc08d",
  storageBucket: "my-lab6-app-bc08d.firebasestorage.app",
  messagingSenderId: "986617836699",
  appId: "1:986617836699:web:671cde4a2b2112e18fc23e",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const auth = getAuth(app);

export { auth };
