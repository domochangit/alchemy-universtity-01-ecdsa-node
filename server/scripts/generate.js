// Tools to generate key pairs
// run with:
// node scripts/generate.js

// TODO as ethereum does, it can be good to show (not use) the last 20 bytes of the keccak hash of the public key

const { getPublicKey, utils } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));
