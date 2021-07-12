import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/es/locale-provider/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { PersistGate } from 'redux-persist/lib/integration/react';
import 'suneditor/dist/css/suneditor.min.css';

import AppRouter from './app-router';
import { ErrorBoundary, Loading } from './components';
import store, { persistor } from './store';

moment.locale('vi');

function App() {
    return (
        <ConfigProvider locale={vi_VN}>
            <Provider store={store}>
                <PersistGate loading={<Loading full />} persistor={persistor}>
                    <ErrorBoundary>
                        <AppRouter />
                    </ErrorBoundary>
                </PersistGate>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
