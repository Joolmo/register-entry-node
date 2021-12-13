import React, {useReducer, createContext} from 'react';
import { PeopleReducer, initialState } from '../Reducers/PeopleReducer'

export const GlobalContext = createContext();


export const GlobalProvider = (props) => {

    const [state, dispatch] = useReducer(PeopleReducer, initialState);


    return (
        <GlobalContext.Provider value={{state, dispatch}}>
            {props.children}    
        </GlobalContext.Provider>
    )
}
