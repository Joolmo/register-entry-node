export const initialState = {people: []};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'register_person':
            state.people.push(action.payload);
            break;
        default:
            throw new Error('Invalid action');
    }
}