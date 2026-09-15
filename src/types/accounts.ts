export type Account = {
  name: string;
  balance: number;
  currency: string;
  icon: string;
};

export type AccountDB = {
  id: string;
  user_id: string;
  name: string;
  balance: number;
  currency: string;
  icon: string;
  created_at: string;
};
