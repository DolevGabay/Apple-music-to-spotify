const initialState = {
    source: null,
    destination: null,
    transferData: null
}

const transferReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_SOURCE':
            return {
                ...state,
                source: action.service
            };
        case 'SET_DESTINATION':
            return {
                ...state,
                destination: action.service
            };
        case 'SET_TRANSFER_DATA':
            return {
                ...state,
                transferData: action.data
            };
        default:
            return state;
    }
};

export default transferReducer;