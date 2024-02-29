/*
 * @Author: zhanghao
 * @Date: 2024-02-01 16:05:18
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-26 15:12:33
 * @Description:
 * @FilePath: \awsome-react\packages\react-dom\test-utils.ts
 */
import { ReactElementType } from 'shared/ReactTypes';
//@ts-ignore
import { createRoot } from 'react-dom';

export function renderIntoDocument(element: ReactElementType) {
	const div = document.createElement('div');
	return createRoot(div).render(element);
}
