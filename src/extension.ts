import * as vscode from 'vscode';
import * as babel from '@babel/core';
import type { NodePath, types } from '@babel/core';

function transform(code: string): string{
	function autoOptionalPlugin(){
		return {
			visitor:{
				MemberExpression(path:NodePath<types.MemberExpression>){
					const text = path.toString();
					path.replaceWithSourceString(text.replace(/\./g,'?.'));
				}
			}
		};
	}
	const res = babel.transformSync(code,{
		plugins:[autoOptionalPlugin]
	});
	return res?.code || '';
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "option-chain-vscode-plugin-sample" is now active!');

	const transformCommand = vscode.commands.registerCommand('transformToOptionalChain', () => {
		const editor = vscode.window.activeTextEditor;
		if(editor){
			const selectedText = editor.document.getText(editor.selection);
			if(!selectedText){
				return;
			}
			// 拿到选中区域的文本，并执行替换
			editor.edit(builder => {
				editor.edit(builder => {
					builder.replace(editor.selection,transform(selectedText));
				});
				vscode.window.showInformationMessage('转换成功！');
			});
		}
	});

	context.subscriptions.push(transformCommand);
}
