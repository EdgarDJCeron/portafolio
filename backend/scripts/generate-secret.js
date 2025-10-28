import crypto from 'crypto';

// Genera un JWT_SECRET seguro
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('\n🔐 JWT_SECRET generado:\n');
console.log(jwtSecret);
console.log('\n📋 Copia este valor y úsalo en tus variables de entorno en Render\n');
