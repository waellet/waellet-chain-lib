/// <reference types="node" />
export interface Account {
    generateSeeds(): Promise<Buffer>;
    generateWallet(): Promise<string>;
}
