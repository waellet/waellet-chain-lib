import { BaseProtocol } from "../BaseProtocol";
import { AeternityAccount } from "./AeternityAccount";
import { AeternityTx } from "./AeternityTx";

export class Aeternity extends BaseProtocol {
    constructor() {
        super()
        this.account = new AeternityAccount()
        this.tx = new AeternityTx()
    }
}