import { ipcMain } from "electron";
import { Endpoint } from "./Decorators";
import { Container } from "./IoC";
import { AnyObject } from "./IoCTypes";

export class ContainerWithHandlers<T extends AnyObject> extends Container<T> {
    public RegisterHandler<Key extends keyof T>(name: Key, factoryFunc: (dependencies: Partial<T>) => T[Key]) {
        this.Register(name, factoryFunc).asTransient()

        const handlerInstance = this.dependencies[name]
        const endpoints = handlerInstance.endpoints as Endpoint[]
        console.log(handlerInstance)

        endpoints.forEach(endPoint => {
            ipcMain.handle(endPoint.path, (_, ...args) => {
                const handler = this.dependencies[name]
                return handler[endPoint.methodName](args)
            })
        })
    }
}