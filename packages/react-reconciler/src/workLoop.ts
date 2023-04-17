import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnfiber(fiber: FiberNode) {
	// TODO 调度功能
	//fiberRootNode
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);
	//开始循环工作
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop发生错误', e);
			}
			workInProgress = null;
		}
	} while (true);

	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;

	// wip fiberNode树 树中的flags
	commitRoot(root);
}

// commit阶段
function commitRoot(root: FiberRootNode) {
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.log('commit阶段开始', finishedWork);
	}
	// 提交完成以后重置
	root.finishedWork = null;

	//判断是否存在3个子阶段需要执行的操作
	//root flags  root subtreeFlags
	const subtreeHasEffect =
		(finishedWork.subtreeFlags & MutationMask) !== NoFlags;

	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

	if (subtreeHasEffect || rootHasEffect) {
		//beforeMutation

		//mutation  Placement
		commitMutationEffects(finishedWork);
		root.current = finishedWork;

		//layout
	} else {
		root.current = finishedWork;
	}
}

// 循环工作函数
function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
// 处理当前指针指向的工作单元
function performUnitOfWork(fiber: FiberNode) {
	// 开始比较
	const next = beginWork(fiber);
	// 比较完成以后替换props
	fiber.memoizedProps = fiber.pendingProps;

	if (next === null) {
		// 没有子节点进行别的处理
		completeUnitOfWork(fiber);
	} else {
		//如果子元素还有继续执行递归
		workInProgress = next;
	}
}
//处理还有兄弟节点的情况
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		// 完成比较工作
		completeWork(node);
		// 获取兄弟fiber
		const sibling = node.sibling;
		//如果有兄弟fiber就指向兄弟fiber，没有就指向父fiber
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
