import { Account } from '../interfaces/Account'
import { Tx } from '../interfaces/Tx'

export abstract class BaseProtocol {
    account: Account | undefined;
    tx: Tx | undefined;
    sdk: object | undefined;
    getSdk():any {

    }
}