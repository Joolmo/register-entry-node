import { Person } from "../Entities/Person";
import { IBaseDao } from "./IBaseDao";

export interface IPersonDao extends IBaseDao<Person> { }