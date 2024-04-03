// 在 sharedWorker.js 中创建 Shared Worker
let connections = 0;

onconnect = function (e) {
	const port = e.ports[0];
	connections++;

	port.onmessage = function (event) {
		console.log(`Message received in the shared worker: ${event}`);
		// 将收到的消息发送回所有连接的端口
		let str = '';
		for (const key in e) {
			str += `${key}=${JSON.stringify(event[key])}\n`;
		}
		port.postMessage(`Message echoed by the shared worker: ${str}`);
	};
	port.start();
};
