import { ipcMain } from "electron";
import { Container } from "../../../Helpers/ContainerIoC";
import { RegisterUserDTO } from "../DTOs/RegisterUser";
import { IPersonService } from "../Services/IPersonService";

class PersonHandler {
    personService: IPersonService

    constructor(personService: IPersonService) {
        this.personService = personService
    }

    public RegisterUser(dto: RegisterUserDTO) {
        try {
            this.personService.Register(dto)
            return null as any
        }
        catch {
            return null as any
        }
    }
}

const setUpHandlers = async (ipcMain: Electron.IpcMain, handlers: object[]) => {
    const handlersFunctions = handlers.map(handler => 
        Object.getOwnPropertyNames(handler)
            .filter(attr => typeof handler[attr] === "function")
    )

    for(let handlerIndex = 0; handlerIndex < handlersFunctions.length; handlerIndex++) {
        for(const funcName in handlersFunctions[handlerIndex]) {
            ipcMain.on(`${funcName}Request`, async (_, arg) => {
                const handlerFunction = handlers[handlerIndex][funcName]
                const dto = arg[0]
                const response = await handlerFunction(dto)

                ipcMain.emit(`${funcName}Response`, response)
            })
        }
    }
} 

const container = new Container<{PersonHandler: PersonHandler}>()
setUpHandlers(ipcMain, [container.get("PersonHandler")])