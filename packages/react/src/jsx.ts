import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ElementType,
	ReactElementType
} from 'shared/ReactTypes';
// ReactElement
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element: ReactElementType = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'zh'
	};
	return element;
};

// 实现jsx方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength === 1) {
		props.children = maybeChildren[0];
	} else {
		props.children = maybeChildren;
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;