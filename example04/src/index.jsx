import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Scene from './Scene';
import {RecoilRoot} from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // 콘솔 두번 찍히는 문제 때문에 막음
    <RecoilRoot>
      <Scene />
    </RecoilRoot>
  // </React.StrictMode>
);
