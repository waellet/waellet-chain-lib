import { Tx } from "../../interfaces/Tx";
import { OBJECT_ID_TX_TYPE, TX_TYPE } from '@aeternity/aepp-sdk/es/tx/builder/schema';
import { Crypto, TxBuilder } from '@aeternity/aepp-sdk/es';
import BigNumber from 'bignumber.js'

export class AeternityTx implements Tx {
    public SUPPORTED_ТX_TYPES: string[] = [];
    public MAGNITUDE: number = 18;
    public MAX_UINT256: BigNumber = new BigNumber(2).exponentiatedBy(256).minus(1)
    public sdk:any 

    constructor(sdk) { 
        Object.keys(TX_TYPE).forEach(key => {
            this.SUPPORTED_ТX_TYPES.push(TX_TYPE[key]);
        });
        this.sdk = sdk
    }

    public async sign(privateKey: Uint8Array, transaction: Buffer): Promise<string> {
        let signature = Crypto.sign( Buffer.concat([Buffer.from(this.sdk.getNetworkId()), transaction]), privateKey)
        // let signature = Crypto.sign(transaction, privateKey)
        return TxBuilder.buildTx({ encodedTx: transaction, signatures: [ signature ]}, TX_TYPE.signed).tx
    }
    
    public async prepare(type: string, values: any): Promise<Buffer> {
        if(!this.SUPPORTED_ТX_TYPES.includes(type)) {
            throw new Error("Unsupported tx type")
        }
        
        values.amount = parseInt(new BigNumber(values.amount).shiftedBy(this.MAGNITUDE).toString());
        values.fee = parseInt(new BigNumber(values.fee).shiftedBy(this.MAGNITUDE).toString());
        let { nonce } = await this.sdk.getAccount("ak_2ELPCWzcTdiyYuumjaV4D7kE843d1Ts27zH1Y2LBMKDbNtfq1Q");

        let txObject;
        
        let { tx } = TxBuilder.buildTx({ ...values, ttl:0, nonce }, type )

        let encodedTx = Crypto.decodeBase64Check(Crypto.assertedType(tx, 'tx'))

        console.log(encodedTx);;

        txObject = TxBuilder.unpackTx(encodedTx, true).tx;

        console.log(txObject)
        
        return TxBuilder.buildTx(
            {
              ...txObject
            },
            OBJECT_ID_TX_TYPE[txObject.tag],
          ).rlpEncoded;
    }

    public async broadcast(signedTx: string): Promise<string> {
        signedTx = Buffer.from(signedTx).toString('hex')
        console.log(this.sdk.sendTransaction(signedTx))
        return ''
    }

}