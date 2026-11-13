# inv-multi-lang

“150W Car Power Inverter Instruction Manual”多语言网页。

页面默认显示英语，标题、标题说明和说明书图片会随语言选项同步切换。除英语图片尚待提供外，其余语言图片来自 `public/assets/`。

## 本地预览

需要 Node.js 20 或更高版本：

```bash
npm start
```

打开 `http://localhost:4173`。

## 替换说明书图片

将最终图片放入 `docs/assets/manuals/`，文件名如下：

| 语言 | 文件名 |
| --- | --- |
| 英语 | `150w-en.jpg`（待提供） |
| 德语 | `150w-de.jpg` |
| 意大利语 | `150w-it.jpg` |
| 日语 | `150w-ja.jpg` |
| 法语 | `150w-fr.jpg` |
| 西班牙语 | `150w-es.jpg` |
| 葡萄牙语 | `150w-pt.jpg` |
| 印地语 | `150w-hi.jpg` |

图片加载成功后会替代预设占位区域；尚未提供图片时，页面会继续显示对应语言的占位提示。

## 页面文案与图片路径

在 `docs/app.mobile.js` 的 `manuals` 配置中修改各语言说明和图片路径。

本项目是纯静态网页，可直接由 GitHub Pages 发布。
