import React from 'react';
import ReactDOM from 'react-dom/client';
import DAGBuilderApp from './DAGBuilderApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DAGBuilderApp />
  </React.StrictMode>
);