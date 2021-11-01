export class Container<Types extends object> {
    private services: Partial<Types>

    public constructor(){
        this.services = {};
    }

    public get<Key extends keyof Types>(type: Key) {
        const instance = this.services[type]
        if (!instance) {
            throw Error("The instance does not exist")
        }

        return instance
    }

    public service<Key extends keyof Types>(name: Key, cb: (c: Container<Types>) => Types[Key]){
        Object.defineProperty(this, name, {
            get: () => {
                if(!this.services.hasOwnProperty(name)){
                    this.services[name] = cb(this);
                }

                return this.services[name];
            },
            configurable: true,
            enumerable: true
        });

        return this;
    }
}