export type Account = {
  name: string;
  balance: string;
  currency: string;
  icon: string;
};

export type AccountToPaste = {
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

export type Currency = {
  end_date: string;
  iso_code: string;
  iso_numeric: string;
  name: string;
  start_date: string;
  symbol: string;
};
