# JSON Online Parser (JSON在线解析工具)

一个现代、美观且功能强大的 JSON 实时解析与格式化工具。支持标准 JSON 解析及宽松的 JavaScript 对象评估。

A modern, beautiful, and powerful tool for real-time JSON parsing and formatting. Supports both standard JSON strict parsing and relaxed JavaScript object evaluation.
## ✨ 特性 (Features)

- **双模式解析 (Dual Mode Parsing)**:
  - **String Parse (Strict)**: 严格遵循 JSON 语法的解析。
  - **JS Eval (Relaxed)**: 宽松模式，支持非标准 JSON（如键名无引号、单引号字符串等）。
- **可视化视图 (Visualizer)**:
  - **语法高亮 (Syntax Highlighting)**: 彩虹色键名，区分字符串、数字、布尔值和 Null。
  - **折叠/展开 (Fold/Expand)**: 支持对象和数组的层级折叠。
  - **辅助信息**: 可选显示数组索引、数据类型 (String, Number, Boolean, etc.)、集合大小。
- **自定义选项 (Customization)**:
  - **着色 (Color)**: 开关语法高亮。
  - **压缩 (Compress)**: 一键压缩 JSON 为单行。
  - **数组索引 (Indices)**: 显示数组下标。
  - **显示类型 (Show Types)**: 显示字段的数据类型（淡色标签）。
- **交互体验 (User Experience)**:
  - **双击格式化**: 在输入框双击即可自动格式化输入的 JSON。
  - **拖拽调整 (Resizable)**: 左右面板宽度可自由拖拽调整。
  - **同步滚动 (Sync Scroll)**: 对比视图支持同步滚动。

## 🛠️ 技术栈 (Tech Stack)

- **Core**: 原生 HTML5, CSS3 (Variables), JavaScript (ES6+).
- **Styling**: 自定义设计系统，未使用任何第三方 CSS 框架。
- **Fonts**: Plus Jakarta Sans & IBM Plex Mono.

## 🚀 快速开始 (Getting Started)

本项目为纯静态页面，无需后端服务器支持。

1. 克隆仓库或下载源码：
   ```bash
   git clone https://github.com/yourusername/json-tool.git
   ```
2. 直接在浏览器中打开 `index.html` 文件即可使用。

## 📝 使用说明 (Usage)

1. 在左侧 **Raw Input** 区域粘贴您的 JSON 字符串。
2. 右侧面板将自动实时解析并渲染结果。
3. 点击顶部的 **设置** 按钮，可以切换显示选项（如开启/关闭类型显示、压缩模式等）。
4. 遇到格式化错误时，左侧输入框双击尝试自动修复缩进（仅限有效对象）。

## 📄 License

MIT License. Free to use for personal and commercial projects.
