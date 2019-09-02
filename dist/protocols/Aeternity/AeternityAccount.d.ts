/// <reference types="node" />
import { Account } from "../../interfaces/Account";
export declare class AeternityAccount implements Account {
    generateSeeds(): Promise<Buffer>;
    generateHdWallet(seed: any): Promise<any>;
    getHdWalletAccount(wallet: any, accountIdx?: number): Promise<any>;
    generateWallet(): Promise<string>;
}
