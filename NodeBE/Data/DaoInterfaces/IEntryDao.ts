import { Entry } from "../Entities/Entry";
import { IBaseDao } from "./IBaseDao";

export interface IEntryDao extends IBaseDao<Entry> { }