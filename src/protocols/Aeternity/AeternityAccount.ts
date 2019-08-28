import { Account } from "../../interfaces/Account";

export class AeternityAccount implements Account {
    sdk:object = { };
    constructor(sdk) {
        this.sdk = sdk;
    }
    
}