import { IMenu } from "./IMenu";

export interface IProfile {
  emri?: string;
  mbiemri?: string;
  userName?: string;
  email?: string;
  nrTel?: string;
  preferuarat?: Array<IMenu>;
}
