import { RequestRegisterPersonDto, RequestLoginPersonDto, ResponsePersonListDto, ResponseSuccessfulDto, ResponseErrorDto} from "../Dto";

export interface IPersonService {   
    GetPersonList(): Promise<ResponsePersonListDto | ResponseErrorDto>;
    LogPerson(requestLoginPersonDto: RequestLoginPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto>;
    RegisterPerson(requestRegisterPersonDto: RequestRegisterPersonDto): Promise<ResponseSuccessfulDto | ResponseErrorDto>;
}