import "./global.css";             // 👈 REQUIRED

import React from "react";
import { store } from './src/store';
import { Provider } from 'react-redux';
import AppNavigation from './src/app/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation colorScheme="light" />
    </Provider>
  );
}
