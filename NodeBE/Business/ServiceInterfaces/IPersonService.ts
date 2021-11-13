export interface IPersonService {   
    RegisterPerson(): Promise<void>
    GetPeople(): Promise<void>
    LogPersionEntry(): Promise<void>
}