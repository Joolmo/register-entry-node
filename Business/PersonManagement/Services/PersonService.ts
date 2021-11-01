import { Person } from "../../../Domain/Entities/Person";
import { IPersonRepository } from "../../../Domain/RepositoryInterfaces/IPersonRepository";
import { RegisterUserDTO } from "../DTOs/RegisterUser";
import { IPersonService } from "./IPersonService";

export class PersonService implements IPersonService {
    private repository: IPersonRepository

    public constructor(repository: IPersonRepository) {
        this.repository = repository
    }

    public async Register(dto: RegisterUserDTO) {
        const person = await this.repository.getById(dto.Id);
        if (!!person) {
            throw new Error("The user does not exist")
        }

        const entity: Person = {
            Name: dto.Name,
            ID: dto.Id,
            Employee: false,
            Surname: "DD",
        }
        await this.repository.create(entity)
        return true;
    }
}