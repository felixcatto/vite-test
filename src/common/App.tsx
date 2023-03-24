import React from 'react';
import { useState } from 'react';
import s from './App.module.css';
import cn from 'classnames';
import { omit } from 'lodash-es';

function App() {
  console.log(s);
  omit(s, 'ggwp');
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-6">ggwp</div>
        <div className="col-6">lanaya</div>
      </div>

      <div className="content">
        <div>
          <a href="https://vitejs.dev" target="_blank" className="flex justify-center">
            <img src="/img/vite.svg" className="logo" alt="Vite logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className={cn(s.ggwp, { [s.ggwp_odd]: count % 2 === 0 })}>ggwp lanaya</div>
        <div className="card">
          <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
