import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth/Reducer';
import { projectReducer } from './Project/Reducer';
import { chatReducer } from './Chat/Reducer';
import { andamentoReducer } from './Andamento/Reducer';
import {issueReducer} from './Issue/Reducer';
import { subscriptionReducer } from './Subscription/Reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        chat: chatReducer,
        andamento:andamentoReducer,
        issue:issueReducer,
        subscription:subscriptionReducer
    },
});

export default store;
