// Tools to generate key pairs
// run with:
// node scripts/generate.js

// TODO as ethereum does, it can be good to show (not use) the last 20 bytes of the keccak hash of the public key

// const secp = require ("ethereum-cryptography/secp256k1");
const { secp256k1 } = require("@noble/curves/secp256k1");
const { toHex } = require("ethereum-cryptography/utils.js");

const privateKey = secp256k1.utils.randomPrivateKey();
console.log("private key:", toHex(privateKey));

const uncompressedPublicKey = secp256k1.getPublicKey(privateKey, false);
console.log("uncompressed public key:", toHex(uncompressedPublicKey));

const compressedPublicKey = secp256k1.getPublicKey(privateKey, true);
console.log("compressed public key:", toHex(compressedPublicKey));
