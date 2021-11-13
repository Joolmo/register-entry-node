import { Container } from "../Helpers/IoC"
import assert = require('assert');

interface IWeapon { hit(): string }
interface IWarrior { attack(): string }
interface ICounter { count(): number }
type Config = {hello: string}

class Katana implements IWeapon {
  public hit() { return "hit with katana" }
}

class Ninja implements IWarrior {
  private weapon: IWeapon

  constructor(weapon: IWeapon) { this.weapon = weapon }

  public attack() { return `ninja ${this.weapon.hit()}` }
}

class Counter implements ICounter {
  private totalCount: number = 0

  public count() { return ++this.totalCount; }
}

type InterfaceMappings = {
  IWeapon: IWeapon,
  IWarrior: IWarrior,
  ICounterSingleton: ICounter,
  ICounterTransient: ICounter
  Config: Config
}

describe('IoC container', function () {
  it('should be able to register nested dependencies', function () {
    const c = new Container<InterfaceMappings>()
    const expected = "ninja hit with katana"

    c.Register("IWarrior", c => new Ninja(c.IWeapon))
    c.Register("IWeapon", _ => new Katana())
  
    const warrior = c.dependencies.IWarrior
    const result = warrior.attack();

    assert(result === expected)
  });

  it('should be able to register singelton', function() {
    const c = new Container<InterfaceMappings>()
    const expectedSingleton = 2

    c.Register("ICounterSingleton", _ => new Counter()).asSingelton()

    const singletonOne = c.dependencies.ICounterSingleton;
    const singletonTwo = c.dependencies.ICounterSingleton;

    singletonOne.count()
    const resultSingletion = singletonTwo.count()

    assert(resultSingletion == expectedSingleton);
  });

  it('should be able to register transient scope', function() {
    const c = new Container<InterfaceMappings>()
    const expectedTransient = 1

    c.Register("ICounterTransient", _ => new Counter()).asTransient()

    const transientOne = c.dependencies.ICounterTransient;
    const transientTwo = c.dependencies.ICounterTransient;

    transientOne.count()
    const resultTransient = transientTwo.count()

    assert(resultTransient == expectedTransient);
  });

  it('should be able to configuration scope', function() {
    const c = new Container<InterfaceMappings>()

    c.Register("Config", _ => ({hello: "helloWorld"})).asConfiguration()

    const config = c.dependencies.Config;
    assert(Object.isFrozen(config))
  });

  it('should be able to dispose transient', async function() {
    const c = new Container<InterfaceMappings>()
    const expectedResult = undefined

    c.Register("ICounterTransient", _ => new Counter()).asTransient()

    let referece: WeakRef<ICounter> = undefined;

    const ChangeScope = () => {
      const transient = c.dependencies.ICounterTransient;
      referece = new WeakRef(transient)
      transient.count()
    }
    ChangeScope()

    await new Promise(resolve => setTimeout(resolve, 9000));

    assert(expectedResult === referece.deref());
  });
});