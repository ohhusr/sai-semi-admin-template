import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from '@douyinfe/semi-ui';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import 'reset-css';
import './index.css';
import './mock';
import rootReducer from './store';
import { SyncRouter } from './routes';

const store = configureStore({ reducer: rootReducer });
function App() {
  function fetchUserInfo() {
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    axios.get('/api/userInfo').then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data, userLoading: false },
      });
    });
  }

  function checkLogin() {
    return localStorage.getItem('userStatus') === 'login';
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  
  return (
    <>
      <BrowserRouter>
        <ConfigProvider>
          <Provider store={store}>
            <SyncRouter />
          </Provider>
        </ConfigProvider>
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
