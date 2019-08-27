import { RawAeternityTransaction } from './unsigned-transactions/aeternity-transactions.serializer'

export abstract class UnsignedTransactionSerializer {
  public abstract serialize(unsignedTx: UnsignedTransaction): SerializedSyncProtocolTransaction
  public abstract deserialize(serializedTx: SerializedSyncProtocolTransaction): UnsignedTransaction
}

export interface UnsignedTransaction {
  transaction:  RawAeternityTransaction 
  publicKey: string
  callback?: string
}

export type SerializedUnsignedTransaction = Buffer

export enum SyncProtocolUnsignedTransactionKeys {
  UNSIGNED_TRANSACTION = 0,
  PUBLIC_KEY = 1,
  CALLBACK = 2
}

export interface SerializedSyncProtocolTransaction extends Array<SerializedUnsignedTransaction | Buffer | Buffer[]> {
  [0]: SerializedUnsignedTransaction // SyncProtocolUnsignedTransactionKeys.UNSIGNED_TRANSACTION
  [1]: Buffer // SyncProtocolUnsignedTransactionKeys.PUBLIC_KEY
  [2]: Buffer // SyncProtocolUnsignedTransactionKeys.CALLBACK
}