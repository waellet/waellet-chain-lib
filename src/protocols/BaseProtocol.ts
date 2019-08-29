import { Account } from '../interfaces/Account'
import { Tx } from '../interfaces/Tx'
import { Networks } from '../interfaces/Networks';

export abstract class BaseProtocol {
    networks: Networks | undefined;
    account: Account | undefined;
    tx: Tx | undefined;
    sdk: object | undefined;
    getSdk():any {

    }
}