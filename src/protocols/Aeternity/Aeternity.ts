import { BaseProtocol } from "../BaseProtocol";
import { AeternityAccount } from "./AeternityAccount";
import { AeternityTx } from "./AeternityTx";
import Universal from '@aeternity/aepp-sdk/es/ae/Universal'


export class Aeternity extends BaseProtocol {
    constructor() {
        super()
    }
    public async setup(){
        this.sdk = await this.getSdk();
        this.account = new AeternityAccount(this.sdk)
        this.tx = new AeternityTx(this.sdk)
    }
    public async getSdk(): Promise<object> {
        return await Universal({
            url: "https://sdk-testnet.aepps.com" , 
            internalUrl: "https://sdk-testnet.aepps.com" ,
            networkId:  "ae_uat" , 
            keyPair: {
                publicKey:"ak_2ELPCWzcTdiyYuumjaV4D7kE843d1Ts27zH1Y2LBMKDbNtfq1Q",
                secretKey:"5a4f1fb3cd5707368361fa04b667715ff6c5b38bd301a055b2dafb714ca6d930a1f9161de91531699f8422de282a816aaa0bc98c64dfce819ef8c857d608cfed"
            },
            nativeMode: true,
            compilerUrl: 'https://compiler.aepps.com'
        })
    }
}