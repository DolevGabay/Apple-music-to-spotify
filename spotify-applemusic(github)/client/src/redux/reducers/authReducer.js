const initialState = {
    tokens: {
        Spotify: null,
        Apple: null
    },

    isAuthenticated: {
        Spotify: false,
        Apple: false
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    [action.service]: action.token
                },
                isAuthenticated: {
                    ...state.isAuthenticated,
                    [action.service]: true
                }
            };
        case 'LOGOUT':
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    [action.service]: null
                },
                isAuthenticated: {
                    ...state.isAuthenticated,
                    [action.service]: false
                }
            }
        default:
            return state;
    }
};

export default authReducer;