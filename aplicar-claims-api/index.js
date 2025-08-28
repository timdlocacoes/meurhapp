const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const app = express();

//const serviceAccount = require('./serviceAccountKey.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(express.json());

app.post('/aplicar-claim', async (req, res) => {
  const { uid } = req.body;

  try {
    const perfil = await admin.firestore().doc(`usuarios/${uid}`).get();
    const tipoUsuario = perfil.data()?.tipo || 'colaborador';

    await admin.auth().setCustomUserClaims(uid, { tipoUsuario });
    res.send(`✅ Claim '${tipoUsuario}' aplicada ao usuário ${uid}`);
  } catch (error) {
    res.status(500).send('❌ Erro ao aplicar claim: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});