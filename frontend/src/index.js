import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import allReducers from './reducers/index';
import {persistReducer, persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <MyApp/>
    </PersistGate>
</Provider>, document.getElementById('root'));


