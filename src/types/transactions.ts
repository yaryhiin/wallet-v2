export type Transaction = {
  type: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
};

export type TransactionDB = {
  id: string;
  user_id: string;
  account_id: string;
  type: string;
  category: string;
  amount: number;
  currency: string;
  date: string;
  created_at: string;
};
