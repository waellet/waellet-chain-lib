import { Tx } from "../../interfaces/Tx";
export declare class AeternityTx implements Tx {
    sign(): Promise<string>;
    prepare(): Promise<string>;
    broadcast(): Promise<string>;
}
