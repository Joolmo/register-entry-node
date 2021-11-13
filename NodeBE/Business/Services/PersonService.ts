import { IEntryDao } from "../../Data/DaoInterfaces/IEntryDao";
import { IPersonService } from "../ServiceInterfaces/IPersonService";

export class PersonService implements IPersonService{
    private entryDao: IEntryDao
    
    constructor(entryDao: IEntryDao) {
        this.entryDao = entryDao
    }
    
    RegisterPerson(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    GetPeople(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    LogPersionEntry(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}