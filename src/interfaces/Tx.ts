import BigNumber from 'bignumber.js'

export interface Tx {
    sign(privateKey: string, transaction: any): Promise<string>;
    prepare(publicKey: string, offset: number, recipients: string[], values: BigNumber[],fee: BigNumber): Promise<any>;
    broadcast(signedTx: string)
}