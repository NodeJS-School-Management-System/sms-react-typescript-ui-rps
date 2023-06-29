import { InputHTMLAttributes } from "react";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  renderSelectClass: boolean;
  headingText: string;
  classnumeral?: string;
  setClassNumeral?: React.Dispatch<React.SetStateAction<string>>;
  isEmployee?: boolean;
}

export type DataTableProps = {
  headerData?: string[];
  captionText: string;
  students?: object[];
  employees?: object[];
  creditors?: object[];
  data?: object[];
  emailAvailable?: boolean;
  deleteCreditor?: any;
};

export type ReusableAnalyticsProps = {
  captionText: string;
  tableHeaders: string[];
  grants?: object[];
  deleteAsset?: any;
  data?: object[];
  deleteNotice?: any;
  deleteIncome?: any;
};

export type ReusableAddItemProps = {
  itemname: string;
};
