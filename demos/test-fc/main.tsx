/*
 * @Author: zhanghao
 * @Date: 2024-01-19 14:34:28
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-03-08 14:45:47
 * @Description:
 * @FilePath: \awsome-react\demos\test-fc\main.tsx
 */
import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';

function Child() {
	return <span>child</span>;
}
function App() {
	const [num, setNum] = useState(100);
	const initData = () => {
		setNum(num + 1);
		console.log(num);
		setTimeout(() => {
			console.log(num);
			initData();
		}, 2000);
	};
	const arr =
		num % 2 === 0
			? [<li key={1}>1</li>, <li key={2}>2</li>, <li key={3}>3</li>]
			: [<li key={3}>3</li>, <li key={2}>2</li>, <li key={1}>1</li>];
	// console.log('arr=================>', arr[0].props.children = 55)
	return (
		// <>
		// 	<ul onClickCapture={() => setNum(num + 1)}>
		// 		<li>4</li>
		// 		<li>5</li>
		// 		{arr}
		// 	</ul>
		// </>
		<>
			<Child />
		</>
	);
	// return <div>1</div>
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	(<App />) as any
);

// ReactDOM.createRoot(document.getElementById('root')!)
