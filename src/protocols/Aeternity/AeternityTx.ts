import { Tx } from "../../interfaces/Tx";
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { Crypto, TxBuilder } from '@aeternity/aepp-sdk/es';
import BigNumber from 'bignumber.js'

export class AeternityTx implements Tx {
    public SUPPORTED_ТX_TYPES: string[] = [];
    public MAGNITUDE: number = 18;
    public sdk:any 

    constructor(sdk) { 
        Object.keys(TX_TYPE).forEach(key => {
            this.SUPPORTED_ТX_TYPES.push(TX_TYPE[key]);
        });
        this.sdk = sdk
    }

    public async sign(privateKey: Uint8Array, transaction: Buffer): Promise<string> {
        let signature = Crypto.sign( Buffer.concat([Buffer.from(this.sdk.getNetworkId()), transaction]), privateKey)
        return TxBuilder.buildTx({ encodedTx: transaction, signatures: [ signature ]}, TX_TYPE.signed).tx
    }
    
    public async prepare(type: string, values: any): Promise<Buffer> {
        if(!this.SUPPORTED_ТX_TYPES.includes(type)) {
            throw new Error("Unsupported tx type")
        }
        
        // console.log(this.sdk.balance(values))

        values.amount = parseInt(new BigNumber(values.amount).shiftedBy(this.MAGNITUDE).toString());
        values.fee = parseInt(new BigNumber(values.fee).shiftedBy(this.MAGNITUDE).toString());

        let tx = await this.sdk[type]({...values})
        let encodedTx = Crypto.decodeBase64Check(Crypto.assertedType(tx, 'tx'))
        let txObject = TxBuilder.unpackTx(encodedTx, true).tx;
        let { rlpEncoded } = TxBuilder.buildTx({ ...txObject },OBJECT_ID_TX_TYPE[txObject.tag],);

        return rlpEncoded
    }

    public async broadcast(signedTx: string): Promise<string> {
        if(typeof signedTx == 'undefined' || signedTx == '') {
            throw new Error("invalid tx")
        }
        return await this.sdk.sendTransaction(signedTx)
    }

}