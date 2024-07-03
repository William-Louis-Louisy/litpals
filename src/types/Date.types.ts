import { Dispatch, SetStateAction } from "react";

export type Bloop = {
  day: string;
  month: string;
  year: string;
};

export interface IDateProps {
  bloop: Bloop;
  setDate: Dispatch<SetStateAction<Bloop>>;
}
