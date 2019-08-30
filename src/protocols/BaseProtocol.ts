import { IAccount } from '../interfaces/IAccount'
import { ITx } from '../interfaces/ITx'
import { INetworks } from '../interfaces/INetworks';

export interface BaseProtocol {
    networks: INetworks | undefined;
    account: IAccount | undefined;
    tx: ITx | undefined;
    sdk: object | undefined;
    getSdk():any;
    listFeatures(): string[];
}