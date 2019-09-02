/// <reference types="node" />
import { RawAeternityTransaction } from './unsigned-transactions/aeternity-transactions.serializer';
export declare abstract class UnsignedTransactionSerializer {
    abstract serialize(unsignedTx: UnsignedTransaction): SerializedSyncProtocolTransaction;
    abstract deserialize(serializedTx: SerializedSyncProtocolTransaction): UnsignedTransaction;
}
export interface UnsignedTransaction {
    transaction: RawAeternityTransaction;
    publicKey: string;
    callback?: string;
}
export declare type SerializedUnsignedTransaction = Buffer;
export declare enum SyncProtocolUnsignedTransactionKeys {
    UNSIGNED_TRANSACTION = 0,
    PUBLIC_KEY = 1,
    CALLBACK = 2
}
export interface SerializedSyncProtocolTransaction extends Array<SerializedUnsignedTransaction | Buffer | Buffer[]> {
    [0]: SerializedUnsignedTransaction;
    [1]: Buffer;
    [2]: Buffer;
}
