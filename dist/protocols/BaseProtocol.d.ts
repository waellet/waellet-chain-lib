import { Account } from '../interfaces/Account';
import { Tx } from '../interfaces/Tx';
export declare abstract class BaseProtocol {
    account: Account | undefined;
    tx: Tx | undefined;
}
