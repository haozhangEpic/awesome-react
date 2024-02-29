/*
 * @Author: zhanghao
 * @Date: 2024-01-19 14:34:28
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-26 14:03:52
 * @Description: 
 * @FilePath: \awsome-react\demos\test-fc\main.tsx
 */
import { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [msg, setMsg] = useState('你好')
  const onClick = () => {
    setMsg('世界')
  }
  return (
    <div>
      <button onClick={onClick}>{msg}</button>
    </div>
  );
}
function Child() {
  return <span>child</span>;
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App /> as any
);
// ReactDOM.createRoot(document.getElementById('root')!)
