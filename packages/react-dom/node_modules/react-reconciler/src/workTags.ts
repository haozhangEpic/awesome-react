export type WorkTag =
	| typeof FunctionComponet
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponet = 0;
export const HostRoot = 3;
// <div>
export const HostComponent = 5;
// 文本
export const HostText = 6;
