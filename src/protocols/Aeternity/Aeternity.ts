import { BaseProtocol } from "../BaseProtocol";
import { AeternityAccount } from "./AeternityAccount";
import { AeternityTx } from "./AeternityTx";
import { AeternityNetworks } from './AeternityNetworks';


import Universal from '@aeternity/aepp-sdk/es/ae/Universal'


export class Aeternity implements BaseProtocol {
    public networks: AeternityNetworks;
    public account: AeternityAccount;
    public tx: AeternityTx;
    public sdk: any;

    public async setup(){
        this.networks = new AeternityNetworks()
        this.sdk = await this.getSdk();
        this.account = new AeternityAccount(this.sdk)
        this.tx = new AeternityTx(this.sdk)
    }
    public async getSdk(): Promise<object> {
        return await Universal({
            url:this.networks.activeNetwork.internalUrl, 
            internalUrl: this.networks.activeNetwork.internalUrl,
            networkId:  this.networks.activeNetwork.networkId, 
            nativeMode: true,
            compilerUrl: 'https://compiler.aepps.com'
        })
    }

    public listFeatures(): string[] {
        return [ "" ]
    }
}