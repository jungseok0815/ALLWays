import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil'; // RecoilRoot 추가
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot> {/* RecoilRoot 추가 */}
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
