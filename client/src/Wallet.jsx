import server from "./server";
import { secp256k1 } from '@noble/curves/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
    async function onChange(evt) {
        const privateKey = evt.target.value;
        setPrivateKey(privateKey);
        const address = toHex(secp256k1.getPublicKey(privateKey));
        console.log(address)
        setAddress(address);

        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    // Here the user has to put the private key in the UI, which is not ideal.
    // Normally, the signature should be done offline (like by using metamask).
    // At least, the transfer component is not sending the private key but the
    // signed message instead.
    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>

            <label>
                Private Key
                <input
                    placeholder="Type in a private key"
                    type="text"
                    value={privateKey}
                    onChange={onChange}
                />
                {/* Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input> */}
                <div>
                    Address: {address}
                    
                    {/* .slice(0, 10) ... */}
                </div>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
