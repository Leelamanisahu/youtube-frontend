import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

// Lazy loading components
const Home = lazy(() => import('./components/Home.jsx'));
const Auth = lazy(() => import('./components/Auth.jsx'));
const VideoPage = lazy(() => import('./components/VideoPage.jsx'));
const Channel = lazy(() => import('./components/Channel.jsx'));
const SearchResult = lazy(() => import('./components/SearchResult.jsx'));
const ErrorPage = lazy(() => import('./components/ErrorPage.jsx')); 

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/auth',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: '/video/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoPage />
          </Suspense>
        ),
      },
      {
        path: '/channel/:channelId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: '/search/:searchQuery',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResult />
          </Suspense>
        ),
      },
    ],
    errorElement:(
      <Suspense fallback={<div>Loading...</div>}>
      <ErrorPage />
    </Suspense>
    )
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
