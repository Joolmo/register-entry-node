import { RequestRegisterPersonDto, RequestLoginPersonDto } from "../Dto";

export interface IPersonService {   
    RegisterPerson(requestRegisterPersonDto: RequestRegisterPersonDto): Promise<void>;
    GetPersonList(): Promise<void>;
    LogPerson(requestLoginPersonDto: RequestLoginPersonDto): Promise<void>;
}