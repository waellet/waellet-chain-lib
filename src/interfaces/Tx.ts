export interface Tx {
    sign(privateKey: string, transaction: any): Promise<string>
}