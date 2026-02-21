import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { mockOffers } from './mocks/mockOffers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App cardsCount={Setting.cardsCount} offers={mockOffers} />
  </React.StrictMode>
);
