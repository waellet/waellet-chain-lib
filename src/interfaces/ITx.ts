
export interface ITx {
    sign(privateKey: Uint8Array, transaction: any): Promise<string>;
    prepare(type:string, values: object): Promise<any>;
    broadcast(signedTx: string): Promise<any>
}