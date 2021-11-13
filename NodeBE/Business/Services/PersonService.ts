import { IEntryDao } from "../../Data/DaoInterfaces/IEntryDao";
import { IPersonService } from "./IPersonService";

export class PersonService implements IPersonService{
    private entryDao: IEntryDao
    
    constructor(entryDao: IEntryDao) {
        this.entryDao = entryDao
    }
    
    RegisterPerson(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    GetPersonList(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    LogPerson(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}