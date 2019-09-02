export interface Account {
    generateSeeds(): Promise<any>;
    generateWallet(): Promise<any>;
    getAccount({ idx }): Promise<any>;
    getKeypair({ activeAccount, account }): Promise<any>;
    unlockWallet({ accountPassword, encryptedPrivateKey }): Promise<any>;
    generateKeyPair(passphrase, privateKey, address): Promise<any>;
}