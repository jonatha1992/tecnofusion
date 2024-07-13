import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-auth-domain",
    projectId: "tu-project-id",
    storageBucket: "tu-storage-bucket",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
