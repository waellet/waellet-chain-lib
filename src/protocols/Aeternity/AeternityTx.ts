import { Tx } from "../../interfaces/Tx";

export class AeternityTx implements Tx {
   public async sign(): Promise<string> {
       return "signed transaction"
   }
}