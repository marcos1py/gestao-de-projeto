import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth/Reducer';
import { projectReducer } from './Project/Reducer';
import { chatReducer } from './Chat/Reducer';
import { commentReducer } from './Comment/Reducer';
import {issueReducer} from './Issue/Reducer';
import { subscriptionReducer } from './Subscription/Reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        chat: chatReducer,
        comment:commentReducer,
        issue:issueReducer,
        subscription:subscriptionReducer
    },
});

export default store;
