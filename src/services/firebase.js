// Importa os módulos do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

// 🔐 Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMOWBA4vt0zC71QJyk5nS_wpp00exks5I",
  authDomain: "appmeurh-208f2.firebaseapp.com",
  projectId: "appmeurh-208f2",
  storageBucket: "appmeurh-208f2.firebasestorage.app",
  messagingSenderId: "524174458098",
  appId: "1:524174458098:web:a7d3893bd11643a663646b",
  measurementId: "G-46L64MCF4R"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const db = getFirestore(app);
const auth = getAuth(app);

// Define persistência local para manter o usuário logado
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistência de autenticação configurada com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao configurar persistência:", error);
  });

// Exporta os serviços
export { db, auth };