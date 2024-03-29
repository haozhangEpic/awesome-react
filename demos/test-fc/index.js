(function () {
	const MyGame = {};
	function update(frame) {
		// console.log('update===========>', frame);
	}
	function main(tFrame) {
		if (tFrame - MyGame.lastFps > 1000) {
			let frame = tFrame - MyGame.lastRender;
			let fps = Math.floor(1000 / frame);
			document.getElementById('fps').innerText = fps;
			MyGame.lastFps = tFrame;
		}
		MyGame.preTick = tFrame;
		MyGame.stopMain = window.requestAnimationFrame(main);
		var nextTick = MyGame.lastTick + MyGame.tickLength;
		var numTicks = 0;
		// 如果 tFrame < nextTick，则需要更新 0 个 ticks（对于 numTicks，默认为 0）。
		// 如果 tFrame = nextTick，则需要更新 1 tick（等等）。
		// 备注：正如我们在总结中提到的那样，你应该跟踪 numTicks 的大小。
		// 如果它很大，那么你的游戏是睡着了，或者机器无法跟上。
		if (tFrame > nextTick) {
			const timeSinceTick = tFrame - MyGame.lastTick;
			numTicks = Math.floor(timeSinceTick / MyGame.tickLength);
			// console.log('main=================>', timeSinceTick, numTicks);
		}

		queueUpdates(numTicks);
		// render(tFrame);
		MyGame.lastRender = tFrame;
	}

	function queueUpdates(numTicks) {
		for (let i = 0; i < numTicks; i++) {
			MyGame.lastTick += MyGame.tickLength; // 现在 lastTick 是这个刻度。
			update(MyGame.lastTick);
		}
	}

	MyGame.lastTick = performance.now();
	console.log('lastTick', performance.now(), new Date().getTime());
	MyGame.lastRender = MyGame.lastTick; // 假装第一次绘制是在第一次更新。
	MyGame.tickLength = 50; // 这将使你的模拟运行在 20Hz（50ms）
	MyGame.lastFps = performance.now();
	// setInitialState();
	main(performance.now()); // 开始循环
})();
// 示例用法
const tasks = [
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				console.log('Task1');
				resolve('Task 1');
			}, 2000)
		),
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				console.log('Task2');
				resolve('Task 2');
			}, 200)
		),
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				console.log('Task3');
				resolve('Task 3');
			}, 1500)
		),
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				console.log('Task4');
				resolve('Task 4');
			}, 200)
		),
	() =>
		new Promise((resolve) =>
			setTimeout(() => {
				console.log('Task5');
				resolve('Task 5');
			}, 800)
		)
];
function poolStask(task_, limit = 2) {
	return new Promise((resolve, reject) => {
		let result = new Array(task_.length);
		let workPool = [];
		let i = 0;
		function exec() {
			if (workPool.length < limit) {
				console.log('workPool===================>', workPool);
				const length = limit - workPool.length;
				for (let i_ = 0; i_ < length; i_++) {
					// console.log('execc===================>', limit - workPool.length, i_);
					// console.log('promise fulled===============>', task_[i], i);
					if (!task_[i]) {
						return;
					}
					let _i_ = i;
					workPool.push(
						task_[_i_]().then((e) => {
							workPool.splice(i_, 1);
							result[_i_] = e;
							if (result.every((m) => isEmpt)) {
								resolve(result);
								return e;
							}
							exec();
							return e;
						})
					);
					i += 1;
				}
			}
		}
		exec();
	});
}
poolStask(tasks, 3).then((result) => {
	console.log(result);
});