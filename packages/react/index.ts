/*
 * @Author: zhanghao
 * @Date: 2024-01-16 15:31:48
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-26 15:11:05
 * @Description:
 * @FilePath: \awsome-react\packages\react\index.ts
 */
import { Dispatcher, resolveDispatcher } from './src/currentDispatcher';
import currentDispatcher from './src/currentDispatcher';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isValidElement as Fn, jsx, jsxDEV } from './src/jsx';

export const useState: Dispatcher['useState'] = (initialState) => {
	const dispatcher = resolveDispatcher();
	return dispatcher.useState(initialState);
};
// 内部数据共享层
export const _SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
	currentDispatcher
};

export const version = '0.0.0';
// TODO:  根据环境区分使用jsx/jsxDEV
export const createElement = jsx;
export const isValidElement = Fn;
