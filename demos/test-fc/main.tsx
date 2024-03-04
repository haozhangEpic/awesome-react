/*
 * @Author: zhanghao
 * @Date: 2024-01-19 14:34:28
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-03-04 14:49:11
 * @Description: 
 * @FilePath: \awsome-react\demos\test-fc\main.tsx
 */
import { useState } from 'react';
import ReactDOM from 'react-dom';


function Child() {
  return <span>child</span>;
}
function App() {
  const [msg, setMsg] = useState('你好')
  // return msg === 222 ? <Child/> :<div>{msg}</div>
  return <div onClick={() => setMsg(msg === '你好' ? '世界' : '你好')}>{msg}</div>
  // return <div>1</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App /> as any
);
// ReactDOM.createRoot(document.getElementById('root')!)
