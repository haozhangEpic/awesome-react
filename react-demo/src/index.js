import React from 'react';
import ReactDOM from 'react-dom';

const jsx = (
	<div>
		<div>
			<span>handsome-react</span>
		</div>
	</div>
);
let root = document.querySelector('#root');
ReactDOM.createRoot(root).render(jsx);
console.log(React);
console.log(jsx);
console.log(root);
