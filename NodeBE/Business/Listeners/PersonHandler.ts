import { Handler, IpcMainHandler, Listener } from "../../Helpers";
import { IPersonService } from "../ServiceInterfaces/IPersonService";

@Handler("person")
export class PersonHandler extends IpcMainHandler {
    private personService: IPersonService;

    constructor(personSevice: IPersonService) {
        super()
        this.personService = personSevice
    }

    @Listener("register")
    public RegisterPerson(personDto) {
        return this.personService.RegisterPerson()
    }
}