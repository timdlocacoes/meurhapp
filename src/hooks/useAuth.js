import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <- controle de carregamento

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          const claims = tokenResult.claims;
          console.log("Custom Claims:", claims);

          const perfilRef = doc(db, "usuarios", firebaseUser.uid);
          const perfilSnap = await getDoc(perfilRef);

          let nomeFinal = firebaseUser.displayName || "Usuário";
          let tipoFinal = claims.tipoUsuario || "colaborador";

          if (perfilSnap.exists()) {
            const perfilData = perfilSnap.data();
            nomeFinal = perfilData.nome || nomeFinal;
            tipoFinal = claims.tipoUsuario || perfilData.tipoUsuario || perfilData.tipo || "colaborador";
          } else {
            console.warn("Perfil não encontrado no Firestore. Usando dados mínimos.");
          }

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nome: nomeFinal,
            tipoUsuario: tipoFinal,
            displayName: nomeFinal,
          });
        } catch (error) {
          console.error("Erro ao buscar perfil do usuário:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false); // <- só termina o loading após tudo estar pronto
    });

    return () => unsubscribe();
  }, []);

  return { user, loading }; // <- agora retorna também o loading
}