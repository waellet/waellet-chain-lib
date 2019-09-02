import Wallet from './src/index'

let wallet = new Wallet();

async function fns () {
    // let generateWallet = await wallet.Aeternity.account.generateWallet();
    // console.log('generateWallet => ', generateWallet)
    // let getAccount = await wallet.Aeternity.account.getAccount({ idx: 1 });
    // console.log('getAccount => ', getAccount)
    // let getKeypair = await wallet.Aeternity.account.getKeypair({ activeAccount: 0, account: { publicKey: 'ak_2mH7SkpxSCpPaykm6AmPDfANNeYVWFJB8K7sD2DCaJqvWJboEq' } });
    // console.log('getKeypair => ', getKeypair)
    let encryptedPrivateKey = {
        "name":"keystore",
        "version":1,
        "public_key":"ak_2dY7HSsxH3yGL5j7mNvYYjFGTZwqtLNyoLSSaymn1wLKFSneeQ",
        "id":"70e7ccdf-a0e3-4c49-90fc-0c11543b1f91",
        "crypto": {
            "secret_type":"ed25519",
            "symmetric_alg":"xsalsa20-poly1305",
            "ciphertext":"00b134ca3d9b5e7e4aa66bad35e50bdfb5c83c74e698e9c3be40e8487471cc7a31df9df99743439443474a07ef0e88a5052862df9090069c5ebc5d974be3701ea19e2b544c662192b4431957797e8cad",
            "cipher_params": {
                "nonce":"6ff48fbcd7f37ebe2013c5a8ec38cf14ed9c18ca1d85c14c"
            },
            "kdf":"argon2id",
            "kdf_params": {
                "memlimit_kib":65536,
                "opslimit":3,
                "parallelism":1,
                "salt":"6fa0953dd227061647709fbc9ffdd868"
            }
        }
    }
    let unlockWallet = await wallet.Aeternity.account.unlockWallet({ accountPassword: '123123123', encryptedPrivateKey: encryptedPrivateKey});
    console.log('unlockWallet => ', unlockWallet)
    // let generateKeyPair = await wallet.Aeternity.account.generateKeyPair('123123123', '3c9ed46b5da9b5686abcbd85870adc66c1706c62d2000857820870b960593a6dcb9734abe47a122a2917462ede5994a0a7eff304cab6aeb66d6c1ad021b6eb6c', 'ak_2dY7HSsxH3yGL5j7mNvYYjFGTZwqtLNyoLSSaymn1wLKFSneeQ');
    // console.log('generateKeyPair => ', generateKeyPair)
}

fns();