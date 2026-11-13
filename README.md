# inv-multi-lang

“150W Car Power Inverter Instruction Manual”多语言网页。

页面标题固定为英文 “150W Car Power Inverter Instruction Manual”。语言选项默认英语，可在英语、简体中文、繁体中文、德语和西班牙语之间切换，说明书图片预留位会随语言更新。

## 本地预览

需要 Node.js 20 或更高版本：

```bash
npm start
```

打开 `http://localhost:4173`。

## 替换说明书图片

将最终图片放入 `public/assets/manuals/`，文件名如下：

| 语言 | 文件名 |
| --- | --- |
| 英语 | `150w-en.jpg` |
| 简体中文 | `150w-zh-CN.jpg` |
| 繁体中文 | `150w-zh-TW.jpg` |
| 德语 | `150w-de.jpg` |
| 西班牙语 | `150w-es.jpg` |

图片加载成功后会替代预设占位区域；尚未提供图片时，页面会继续显示对应语言的占位提示。

## 页面文案与图片路径

在 `public/app.js` 的 `manuals` 配置中修改各语言标题、说明和图片路径。

本项目是纯静态网页，可直接由 GitHub Pages 发布。
