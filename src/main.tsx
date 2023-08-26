import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/index.tsx';
import routes from './router.config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          { routes.map((route, index) => <Route path={`/${route.path}/*`} element={<Layout />} key={index}></Route> )}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
