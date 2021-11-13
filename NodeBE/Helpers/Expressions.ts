import acron from 'acron'

type Context<T> = {
    input: object,
    output: (arg: T) => boolean
}

interface IExpression<T> {
    interpret(context: Context<T>): void
}

interface ITerminalExpresion<T> extends IExpression<T> { }

type Leave<T> = ITerminalExpresion<T> | INonTerminalExpresion<T>
interface INonTerminalExpresion<T> extends IExpression<T> {
    left: Leave<T>,
    rigth: Leave<T>
}

enum ComparissionOperators {
    eq = "eq",
    gt = "gt",
    ls = "ls",
    nq = "nq"
}

enum LogicalOperators {
    and,
    not,
    or
}

export class ComparissionOperatorExpression<T> implements ITerminalExpresion<T> {
    operators: {[key in ComparissionOperators]: string}

    constructor(operators: {[key in ComparissionOperators]: string}) {
        this.operators = operators;
    }

    interpret(context: Context<T>) {
        let result: Context<T>["output"]
        const key = Object.keys(context.input)[0]
        const keyValue = context.input[key]; 
        const operatorSymbol =  Object.keys(keyValue)[0]
        const value = keyValue[operatorSymbol]
        const operator = this.operators[operatorSymbol]
        delete context.input[key];

        switch(operator) {
            case ComparissionOperators.eq:
                result = (arg: T) => arg[key] == value
                break;
            
            default:
                throw new Error("Not implemented excepcion")
        }

        context.output = result;
        return;
    }
} 

export class LogicalOperatorExpression<T> implements INonTerminalExpresion<T> {
    left: Leave<T>
    rigth: Leave<T>
    operator: LogicalOperators

    constructor(left: Leave<T>, rigth: Leave<T>, operator: LogicalOperators) {
        this.left = left;
        this.rigth = rigth;
        this.operator = operator
    }

    interpret(context: Context<T>) {
        this.left.interpret(context)
        const leftResult = context.output;
        
        this.rigth.interpret(context);
        const rigthResult = context.output;

        let result: Context<T>["output"];
        switch(this.operator) {
            case LogicalOperators.and:
                result = (arg: T) => leftResult(arg) && rigthResult(arg)
                break;
            default:
                throw new Error("Not implemented excepcion")
        }

        context.output = result;
        return;
    }  
}

type JoseEntity = {
    nombre: string
    edad: number
}

const context: Context<JoseEntity> = {
    input: {
        nombre: {eq: "jose"},
        edad: {eq: 10}
    },
    output: undefined
}

const comparision = new ComparissionOperatorExpression<JoseEntity>({eq: "eq", gt: "qt", ls: "ls", nq: "nq"})
const andExpression = new LogicalOperatorExpression<JoseEntity>(comparision, comparision, LogicalOperators.and);
andExpression.interpret(context);
const result = context.output;


const expression = entity => entity.age > 10
const ast = acron.parse(expression.toString())
