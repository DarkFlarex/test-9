export interface Transaction {
    id: string;
    type: string;
    category: string;
    amount: number;
    createdAt: string;
}

export type ApiTransaction = Omit<Transaction, 'id'>;

export interface ApiTransactions {
    [id: string]: ApiTransaction;
}

export interface TransactionMutation {
    type: string;
    category: string;
    amount: string;
    createdAt: string;
}