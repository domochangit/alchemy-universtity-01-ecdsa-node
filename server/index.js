const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
    "0f4ad49869137f63e49778c6d37b334510c32de2683d7aa0823bd54814ed3b08": 100,
    "0343d2d460d8f99fe5613cfd2a1c1af85027590a013064e804b4bca311b0a1c876": 50,
    "037255efed29898aba1b032701afdd5e31a3b8e0f650822a0d39f2356f16addc83": 75,
};

// private key: e914d1987927f0c454b49802afc25d4294ecc4f822c977e8e54e3bed364d833a
// public key: 0f4ad49869137f63e49778c6d37b334510c32de2683d7aa0823bd54814ed3b08

// private key: 3381312fa502d3e0f2c7aed3dc8a3bfbc6762eb43cb6fcc9277acd317e93f494
// public key: 0343d2d460d8f99fe5613cfd2a1c1af85027590a013064e804b4bca311b0a1c876

// private key: 10cc82ce526e5452ac89d7b57d3512e26a776afc8b35cdcf9aa4596bbdd9542c
// public key: 037255efed29898aba1b032701afdd5e31a3b8e0f650822a0d39f2356f16addc83

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    // Sender should be determined from a signed message
    const { sender, recipient, amount } = req.body;

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
