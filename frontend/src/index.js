import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from "redux";
import allReducers from './reducers/index';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <MyApp/>
    </PersistGate>
</Provider>, document.getElementById('root'));


