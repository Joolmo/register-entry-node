import { RegisterUserDTO } from "../DTOs/RegisterUser";

export interface IPersonService {
    Register: (dto: RegisterUserDTO) => void 
}