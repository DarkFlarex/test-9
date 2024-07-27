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

export interface Category {
    id: string;
    type: string;
    name: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
    [id: string]: ApiCategory;
}

export interface CategoryMutation {
    type: string;
    name: string;
}