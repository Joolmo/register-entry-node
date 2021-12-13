import { useContext } from 'react';
import { GlobalContext } from "../Providers/GlobalProvider"

export const usePeople = () => {
    const globalContext = useContext(GlobalContext)

    const registerPerson = async (personData) => {
        const response = await window.api.send("person/register", personData);
        if (!!response.SuccesfulMessage) {
            globalContext.dispatch("register", personData)
        }
        else {
            globalContext.dispatch("error", response.error)
        }
    }

    return {
        registerPerson
    }
}