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
