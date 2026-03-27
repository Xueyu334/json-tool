# JSON Parser Pro (JSON 在线解析器)

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

**JSON Parser Pro** 是一个轻量、现代且高性能的 JSON 可视化工具。它专为开发者设计，提供严格模式与宽松模式的双重解析引擎，支持实时语法高亮、自动格式化及类型推断。

**JSON Parser Pro** is a lightweight, modern, and high-performance JSON visualization tool. Designed for developers, it features dual parsing engines (Strict & Relaxed), real-time syntax highlighting, automatic formatting, and type inference.

---

## ✨ 核心特性 (Key Features)

### 1. 双核解析引擎 (Dual Parsing Engines)
- **严格模式 (Strict Parse)**: 基于 `JSON.parse`，严格遵循 JSON 标准，快速校验格式正确性。
- **宽松模式 (Relaxed Eval)**: 基于 JavaScript `Function` 构造器，支持非标准 JSON（如无引号键名 `key: "value"`、单引号 `'str'`、尾随逗号等），让调试更灵活。

### 2. 交互式可视化 (Interactive Visualization)
- **语法高亮 (Syntax Highlighting)**: 为不同层级的键名分配彩虹色，清晰区分 String, Number, Boolean, Null 等类型。
- **智能折叠 (Smart Fold)**: 支持点击 `-` / `+` 按钮折叠或展开对象与数组，轻松应对深度嵌套数据。
- **类型标记 (Type Labels)**: 可选显示字段的数据类型（如 `STRING`, `NUMBER`, `OBJECT`），并采用低对比度设计以免分散注意力。
- **数组索引 (Array Indices)**: 在数组元素前显示下标 `0:`, `1:`，方便定位数据。

### 3. 便捷输入与操作 (Input & Actions)
- **多功能操作栏 (Action Toolbar)**: 顶部提供快捷工具栏，包含 **格式化**、**压缩**、**转义** 与 **去转义** 按钮，覆盖多种日常 JSON 处理需求。
- **快捷键与动作 (Shortcuts & Actions)**: 依然支持在输入区域双击快速格式化。
- **实时同步 (Real-time Sync)**: 左侧输入，右侧即时渲染。
- **同步滚动 (Sync Scroll)**: 左右两侧面板支持同步滚动，方便长文本对比。
- **拖拽布局 (Resizable)**: 中间分割线支持拖拽，自由调整左右区域的宽度比例。

## 🚀 快速开始 (Quick Start)

本项目完全基于原生技术栈构建（Vanilla JS + CSS Variables），**零依赖**，**无需构建**。

### 获取代码
```bash
git clone https://github.com/Xueyu334/json-tool.git
cd json-tool
```

### 运行
直接使用浏览器（Chrome, Edge, Firefox, Safari）打开 `index.html` 文件即可立即使用。

## 🛠️ 技术栈 (Tech Stack)

- **Structure**: Semantic HTML5
- **Style**: Modern CSS3 (CSS Variables, Flexbox, Custom Interactions) - *No Frameworks*
- **Logic**: Vanilla JavaScript ES6+
- **Font**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)

## � 项目结构 (Structure)

```text
json-tool/
├── index.html      # 主页面结构
├── style.css       # 核心样式表 (包含 Dark/Light 调色板及响应式设计)
├── script.js       # 核心逻辑 (解析引擎、DOM 操作、事件处理)
├── .gitignore      # Git 忽略配置
└── README.md       # 项目文档
```

## 📝 使用指南 (Usage Guide)

1. **输入数据**: 在左侧面板粘贴 JSON 数据。如果格式混乱，点击顶部的 **格式化** 按钮或者直接 **双击输入框** 即可自动修复。
2. **快捷处理**: 输入区顶部工具栏支持一键对文本进行 **压缩 (Minify)**、**转义 (Escape)** 或 **去转义 (Unescape)**。
3. **查看结果**: 右侧面板会自动展示解析结果。
   - **String Parse (Strict)**: 严格模式的解析结果，校验标准 JSON 格式。
   - **JS Eval (Relaxed)**: 宽松模式的结果（如果你复制的是 JS 对象字面量，看这里）。
4. **功能设置**: 点击页面右上方的 **设置 (Settings)** 悬浮菜单：
   - `着色`: 开启/关闭彩色语法高亮。
   - `压缩`: 输出视图中显示极简压缩层级。
   - `数组索引`: 在数组元素旁显示数字角标。
   - `显示类型`: 自动在对象和数值后标明数据类型。
5. **布局控制**: 鼠标按住中部的灰色分割小横格条拖拽，自由伸展可视视图。

## 📄 License

MIT License. 欢迎提交 Issues 和 Pull Requests！
