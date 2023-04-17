import { ReactElementType } from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { createFiberFromElement, FiberNode } from './fiber';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';

/**
 *
 * @param shouldTrackEffects 标记是否拥有副作用
 * @returns 调节生成子节点的方法
 */
function ChildReconciler(shouldTrackEffects: boolean) {
	// 根据reactElement生成子fiber
	function reconcileSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		//根据element 创建fiber
		const fiber = createFiberFromElement(element);
		// 链接创建出来的fiber的父节点
		fiber.return = returnFiber;
		return fiber;
	}
	// 文本节点生成文本fiber
	function reconcileSingTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | null
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}
	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			// 首屏渲染时
			fiber.flags = Placement;
		}
		return fiber;
	}
	// 根据父fiber节点中的子节点信息来生成子节点fiber
	return function reconcileChildFibers(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		newChild?: ReactElementType
	) {
		//判断当前需要生成的子fiber的类型
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				//如果是reactElement类型
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcileSingleElement(returnFiber, currentFiber, newChild)
					);

				default:
					if (__DEV__) {
						console.warn('未实现的reconcile类型1');
					}
					break;
			}
		}
		//TODO 如果出现了多节点的情况

		// HostText
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcileSingTextNode(returnFiber, currentFiber, newChild)
			);
		}
		if (__DEV__) {
			console.warn('未实现的reconcile类型2');
		}
		return null;
	};
}

export const reconcileChildFibers = ChildReconciler(true);
export const mountChildFibers = ChildReconciler(false);
