import { Account } from "../../interfaces/Account";
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from '@aeternity/bip39';
import { derivePathFromKey, getKeyPair, derivePathFromSeed } from '@aeternity/hd-wallet/src/hd-key';
import { Crypto } from '@aeternity/aepp-sdk/es';
import { generateHDWallet } from '@aeternity/hd-wallet/src';
import * as Keystore from '@aeternity/aepp-sdk/es/utils/keystore'


export class AeternityAccount implements Account {

    public async generateSeeds(): Promise<Uint8Array> {
        let seeds = [
            {id:0,name:"volcano",selected:false},
            {id:1,name:"entire",selected:false},
            {id:2,name:"magnet",selected:false},
            {id:3,name:"glow",selected:false},
            {id:4,name:"zero",selected:false},
            {id:5,name:"crack",selected:false},
            {id:6,name:"arena",selected:false},
            {id:7,name:"episode",selected:false},
            {id:8,name:"shrimp",selected:false},
            {id:9,name:"buffalo",selected:false},
            {id:10,name:"tiny",selected:false},
            {id:11,name:"aunt",selected:false}
        ];
        let mnemonic = generateMnemonic();
        mnemonic = mnemonic.split(" ");
        seeds.forEach(function(item, index) {
            item.name = mnemonic[index]
        });
        
        let seed = seeds.slice();
        let sorted = seed.sort((a, b) => (a.id > b.id) ? 1 : -1);
        let originalSeed = sorted.map(seed => seed.name).join(",");
        originalSeed = originalSeed.replace(/,/g, ' ');
        let seed_ = mnemonicToSeed(originalSeed);

        return seed_;
    }

    public async generateHdWallet (seed:object){
        if (typeof seed == 'string' ) {
            seed = Buffer.from(seed,'hex');
        }
        return generateHDWallet(seed);
    }

    public async getHdWalletAccount (wallet: any, accountIdx = 0) {
        if(wallet.chainCode.constructor !== Uint8Array) {
            wallet = JSON.parse(JSON.stringify(wallet));
            wallet = {
                chainCode:new Uint8Array(new Uint8Array(Object.values(wallet.chainCode))),
                privateKey:new Uint8Array(new Uint8Array(Object.values(wallet.privateKey)))
            }
        }
        const keyPair = getKeyPair(derivePathFromKey(`${accountIdx}h/0h/0h`, wallet).privateKey);
        return {
            ...keyPair,
            idx:accountIdx,
            address: Crypto.aeEncodeKey(keyPair.publicKey)
        };
    }
    
    public async generateWallet(): Promise<any> {
        let seeds = await this.generateSeeds();
        let wallet = await this.generateHdWallet(seeds);
        let {address} = await this.getHdWalletAccount(wallet);
        return ({generate:true,address});
    }

    public async getKeypair({ activeAccount, account }: {activeAccount: number, account: any}): Promise<object> {
        let seeds = await this.generateSeeds();
        let wallet = await this.generateHdWallet(seeds);
        let {secretKey} = await this.getHdWalletAccount(wallet,activeAccount)
        var res = {
            publicKey: account.publicKey,
            secretKey: secretKey
        }
        return res;
    }

    public async getAccount({ idx }: {idx: number}): Promise<any> {
        let seed = await this.generateSeeds();
        let wallet = await this.generateHdWallet(seed);
        return ({
            address: await this.getHdWalletAccount(wallet, idx)
        })
    }
    
    public async unlockWallet({ accountPassword, encryptedPrivateKey }: {accountPassword: string, encryptedPrivateKey: any }): Promise<any> {
        // await this.generateKeyPair('123123123', '3c9ed46b5da9b5686abcbd85870adc66c1706c62d2000857820870b960593a6dcb9734abe47a122a2917462ede5994a0a7eff304cab6aeb66d6c1ad021b6eb6c', 'ak_2dY7HSsxH3yGL5j7mNvYYjFGTZwqtLNyoLSSaymn1wLKFSneeQ')
        // .then(async (res:any)=> {
        //     res.encryptedPrivateKey = JSON.parse(res.encryptedPrivateKey);
        //     console.log('res', typeof res.encryptedPrivateKey, res.encryptedPrivateKey)
            let match = await Keystore.decrypt(
                // res.
                encryptedPrivateKey.crypto.ciphertext,
                accountPassword,
                // res.
                encryptedPrivateKey.crypto.cipher_params.nonce,
                // res.
                encryptedPrivateKey.crypto.kdf_params.salt
            );
            if(match != false) {
                let wallet = await this.generateHdWallet(match)
                let { address } = await this.getHdWalletAccount(wallet)
                return ({ decrypt: true, address })
            }else {
                return ({ decrypt: false })
            }
        // })
    }
    
    public async generateKeyPair (passphrase: string, privateKey: any, address: string): Promise<object> {
        if (typeof privateKey == 'object') {
            privateKey = privateKey.toString('hex');
        }
        const hexStr = await Crypto.hexStringToByte(privateKey.trim())
        const keys = await Crypto.generateKeyPairFromSecret(hexStr)
        const keystore = await Keystore.dump('keystore', passphrase, keys.secretKey);
        keystore.public_key = address;
        return {
            publicKey: keystore.public_key,
            encryptedPrivateKey: JSON.stringify(keystore)
        };
    }
    
    
}