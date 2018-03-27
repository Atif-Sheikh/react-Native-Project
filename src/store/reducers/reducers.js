import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    user: [],
    email: '',
    error: '',
    signuperror: '',
    allPosts: [],
    keys: [],
    ngos: [],
    users: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.SIGNUP:
            return ({
                // ...state,
                user: action.payload,
            });
        case ActionTypes.GETKEYS:
            return ({
                ...state,
                keys: action.payload,
            });
        case ActionTypes.GETNOGOS:
            return ({
                ...state,
                ngos: action.payload,
            });
        case ActionTypes.GETUSERS:
            return ({
                ...state,
                users: action.payload,
            });
        case ActionTypes.GETDATA:
            return ({
                ...state,
                allPosts: action.payload,
            });
        case ActionTypes.SIGNUPERROR:
            return ({
                ...state,
                signuperror: action.payload,
            });
        case ActionTypes.SIGNIN:
            return ({
                // ...state,
                user: action.payload,
            });
        case ActionTypes.ERROR:
            return ({
                ...state,
                error: action.payload,
            });
        default:
            return state;
    };
};