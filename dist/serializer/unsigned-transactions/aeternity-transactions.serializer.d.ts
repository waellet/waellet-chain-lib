/// <reference types="node" />
import { SerializedSyncProtocolTransaction, UnsignedTransaction, UnsignedTransactionSerializer } from '../unsigned-transaction.serializer';
export declare type SerializedUnsignedAeternityTransaction = [Buffer, Buffer];
export interface RawAeternityTransaction {
    networkId: string;
    transaction: string;
}
export interface UnsignedAeternityTransaction extends UnsignedTransaction {
    transaction: RawAeternityTransaction;
}
export declare class AeternityUnsignedTransactionSerializer extends UnsignedTransactionSerializer {
    serialize(transaction: UnsignedAeternityTransaction): SerializedSyncProtocolTransaction;
    deserialize(serializedTx: SerializedSyncProtocolTransaction): UnsignedAeternityTransaction;
}
