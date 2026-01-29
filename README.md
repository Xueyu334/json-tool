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
- **[NEW] 一键压缩 (Minify)**: 在输入框标题栏新增压缩按钮，快速将 JSON 压缩为单行。
- **双击格式化 (Auto-Format)**: 双击输入区域，自动将混乱的代码格式化为标准漂亮的 JSON。
- **实时同步 (Real-time Sync)**: 左侧输入，右侧即时渲染。
- **同步滚动 (Sync Scroll)**: 左右两侧面板支持同步滚动，方便长文本对比。
- **拖拽布局 (Resizable)**: 中间分割线支持拖拽，自由调整输入与展示区域的宽度比例。

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

1. **输入数据**: 在左侧面板粘贴 JSON 数据。如果格式混乱，**双击输入框**即可自动修复缩进。
2. **查看结果**: 右侧面板会自动展示解析结果。
   - **Parser View**: 严格模式的解析结果。
   - **Eval View**: 宽松模式的结果（如果你复制的是 JS 对象字面量，看这里）。
3. **功能设置**: 点击右上角的 **设置 (Settings)** 菜单：
   - `着色`: 开启/关闭彩色高亮。
   - `压缩`: 在输出视图中显示为压缩格式。
   - `数组索引`: 显示数组元素的序号。
   - `显示类型`: 在值后面显示数据类型标记。
4. **调整布局**: 鼠标按住中间的灰色分割条左右拖动，调整可视区域。

## 📄 License

MIT License. 欢迎提交 Issues 和 Pull Requests！
