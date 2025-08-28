/*const admin = require('firebase-admin');
const readline = require('readline');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Digite o UID do usuário: ', (uid) => {
  rl.question('Digite o tipo de usuário (rh ou colaborador): ', (tipo) => {
    admin.auth().setCustomUserClaims(uid, { tipoUsuario: tipo })
      .then(() => {
        console.log(`✅ Claim "${tipo}" definida para o usuário ${uid}`);
        rl.close();
      })
      .catch((error) => {
        console.error('❌ Erro ao definir claim:', error);
        rl.close();
      });
  });
});*/

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Substitua pelo UID do usuário RH
const uid = '5eN1LD2FA1hJYYTblCukIWaTEks1';

admin.auth().setCustomUserClaims(uid, { tipoUsuario: 'rh' })
  .then(() => {
    console.log(`✅ Claim 'tipoUsuario: rh' aplicada ao usuário ${uid}`);
  })
  .catch((error) => {
    console.error('❌ Erro ao aplicar claim:', error);
  });