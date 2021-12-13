import { ipcMain } from "electron";
import { IPCMainHandler } from "./Decorators";
import { Container } from "./IoC";
import { AnyObject } from "./IoCTypes";

export class ContainerWithHandlers<T extends AnyObject = AnyObject> extends Container<T>{
    public RegisterHandler<Key extends keyof T, Value extends T[Key] & IPCMainHandler>(name: Key, factoryFunc: (dependencies: Partial<T>) => Value) {
        this.Register(name, factoryFunc).asTransient()

        const handlerInstance = this.dependencies[name] as IPCMainHandler

        handlerInstance.endpoints.forEach(endPoint => {
            ipcMain.handle(endPoint.path, (_, ...args) => {
                const handler = this.dependencies[name]
                return handler[endPoint.methodName](...args)
            })
        })
    }
}