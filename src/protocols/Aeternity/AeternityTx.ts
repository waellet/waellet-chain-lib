import { Tx } from "../../interfaces/Tx";

export class AeternityTx implements Tx {
    public async sign(): Promise<string> {
        return "signed transaction"
    }
    public async prepare(): Promise<string> {
        return "prepare transaction"
    }
    public async broadcast(): Promise<string> {
        return "broadcast transaction"
    }
}