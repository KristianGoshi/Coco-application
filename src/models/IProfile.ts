import { IMenu } from "./IMenu";

export interface IProfile {
  userName?: string;
  email?: string;
  nrTel?: string;
  password?: string;
  preferuarat?: Array<IMenu>;
}
