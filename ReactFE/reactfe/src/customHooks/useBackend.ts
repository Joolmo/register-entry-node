interface IApi {
    send: Function
}

declare global {
    interface Window {
        api: IApi
    }
}

export const useBackend = () => {
    const registerUser = (user) => {
        const result = window.api.send("RegisterUser", user);
        if (result) {
            
        }
    }  

    return {
        registerUser
    }
}