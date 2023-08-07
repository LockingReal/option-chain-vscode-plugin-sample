# Note

* vscode 插件可以在package.json 的 contributes 里配置 commands、menus、keybindings。相当于 注册了一个命令，配置了编辑器右键菜单，并且绑定了快捷键。
* 当执行这个命令的时候，拿到选中的文本内容，通过babel插件来做转换。
* "when": "(resourceLangId == javascript || resourceLangId == typescript) && editorHasSelection"。表示 仅在 js与ts 文件中，注册的命令菜单快捷键生效，类似.txt就不生效。