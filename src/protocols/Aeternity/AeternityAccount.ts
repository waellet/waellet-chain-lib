import { IAccount } from "../../interfaces/IAccount";

export class AeternityAccount implements IAccount {
    sdk:object = { };
    constructor(sdk) {
        this.sdk = sdk;
    }

    public initSdk(): void {

    }
}