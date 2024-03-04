import { FiberNode } from 'react-reconciler/src/fiber';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HostComponent, HostText } from 'react-reconciler/src/workTags';
import { DOMElement, updateFiberProps } from './SyntheticEvent';
import { Props } from 'shared/ReactTypes';

export type Container = Element;
export type Instance = Element;
export type TextInstace = Text;

// export const createInstance = (type: string, props: any): Instance => {
export const createInstance = (type: string, props: Props): Instance => {
	// 还有props要处理
	const element = document.createElement(type) as unknown;
	updateFiberProps(element as DOMElement, props);
	return element as DOMElement;
};

export const appendInitialChild = (
	parent: Instance | Container,
	child: Instance
) => {
	parent.appendChild(child);
};

export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};

export function commitUpdate(fiber: FiberNode) {
	switch (fiber.tag) {
		case HostText:
			const text = fiber.memoizedProps.content;
			return commitTextUpdate(fiber.stateNode, text);

		default:
			if (__DEV__) {
				console.warn('未实现的Update类型', fiber);
			}
			break;
	}
}
export function commitTextUpdate(textInstance: TextInstace, content: string) {
	textInstance.textContent = content;
}
export function removeChild(
	child: Instance | TextInstace,
	container: Container
) {
	container.removeChild(child);
}
export const appendChildToContainer = appendInitialChild;
