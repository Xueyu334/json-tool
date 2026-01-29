const jsonInput = document.getElementById('json-input');
const stringResult = document.getElementById('string-parse-result');
const evalResult = document.getElementById('js-eval-result');
const resultHeader = document.getElementById('result-header');

const optColor = document.getElementById('opt-color');
const optCompress = document.getElementById('opt-compress');
const optIndex = document.getElementById('opt-index');
const optType = document.getElementById('opt-type');

function update() {
    const val = jsonInput.value.trim();
    if (!val) {
        stringResult.innerHTML = '<span style="color:#666; font-style:italic">Wait for input...</span>';
        evalResult.innerHTML = '<span style="color:#666; font-style:italic">Wait for input...</span>';
        resultHeader.classList.remove('error');
        return;
    }

    // String Parse (Strict)
    try {
        const parsed = JSON.parse(val);
        stringResult.innerHTML = renderJSON(parsed);
        resultHeader.classList.remove('error');
    } catch (e) {
        stringResult.innerHTML = `<div style="color:#ff4757; padding:10px; border:1px solid #ff4757; border-radius:4px; background:rgba(255,71,87,0.1)">Error: ${e.message}</div>`;
        resultHeader.classList.add('error');
    }

    // JS Eval (Relaxed)
    try {
        const evaluated = new Function(`return (${val})`)();
        evalResult.innerHTML = renderJSON(evaluated);
    } catch (e) {
        evalResult.innerHTML = `<div style="color:#ff4757; font-style:italic">Eval error: ${e.message}</div>`;
    }
}

function renderJSON(obj, depth = 0) {
    if (optCompress.checked) {
        return `<span class="json-string">${JSON.stringify(obj)}</span>`;
    }

    if (obj === null) {
        const value = '<span class="json-null">null</span>';
        return value + (optType.checked ? ' <span class="json-type type-null">null</span>' : '');
    }
    if (typeof obj === 'number') {
        const value = `<span class="json-number">${obj}</span>`;
        return value + (optType.checked ? ' <span class="json-type type-number">number</span>' : '');
    }
    if (typeof obj === 'boolean') {
        const value = `<span class="json-boolean">${obj}</span>`;
        return value + (optType.checked ? ' <span class="json-type type-boolean">boolean</span>' : '');
    }
    if (typeof obj === 'string') {
        const value = `<span class="json-string">"${escapeHtml(obj)}"</span>`;
        return value + (optType.checked ? ' <span class="json-type type-string">string</span>' : '');
    }

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '<span class="json-bracket">[]</span>' + (optType.checked ? ' <span class="json-type type-array">array</span>' : '');
        let html = '<span class="json-toggle" onclick="toggle(this)">-</span><span class="json-bracket">[</span>';
        html += `<span class="json-size-indicator" style="display:none">${obj.length}</span>`;
        html += '<ul class="json-tree">';
        obj.forEach((item, index) => {
            html += `<li>${optIndex.checked ? `<span style="color:#999; margin-right:5px; font-size:12px">${index}:</span>` : ''}${renderJSON(item, depth + 1)}${index < obj.length - 1 ? '<span class="json-bracket">,</span>' : ''}</li>`;
        });
        html += '</ul><span class="json-bracket">]</span>';
        html += optType.checked ? ' <span class="json-type type-array">array</span>' : '';
        return html;
    }

    if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '<span class="json-bracket">{}</span>' + (optType.checked ? ' <span class="json-type type-object">object</span>' : '');
        let html = '<span class="json-toggle" onclick="toggle(this)">-</span><span class="json-bracket">{</span>';
        html += `<span class="json-size-indicator" style="display:none">${keys.length}</span>`;
        html += '<ul class="json-tree">';
        keys.forEach((key, index) => {
            // Rainbow logic: cycle through 9 colors based on index and depth
            const colorIdx = (index + depth) % 9;
            const displayKey = optColor.checked ? `<span class="json-key json-key-${colorIdx}">"${escapeHtml(key)}"</span>` : `"${escapeHtml(key)}"`;
            html += `<li>${displayKey}<span class="json-bracket">: </span>${renderJSON(obj[key], depth + 1)}${index < keys.length - 1 ? '<span class="json-bracket">,</span>' : ''}</li>`;
        });
        html += '</ul><span class="json-bracket">}</span>';
        html += optType.checked ? ' <span class="json-type type-object">object</span>' : '';
        return html;
    }

    return String(obj);
}

function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

window.toggle = function (el) {
    const parent = el.parentElement;
    const list = parent.querySelector('.json-tree');
    const indicator = parent.querySelector('.json-size-indicator');

    if (list.classList.contains('folded')) {
        list.classList.remove('folded');
        if (indicator) indicator.style.display = 'none';
        el.innerText = '-';
    } else {
        list.classList.add('folded');
        if (indicator) indicator.style.display = 'inline';
        el.innerText = '+';
    }
};

jsonInput.addEventListener('input', update);
jsonInput.addEventListener('dblclick', () => {
    if (!jsonInput.value.trim()) return;
    try {
        const obj = new Function(`return (${jsonInput.value})`)();
        jsonInput.value = JSON.stringify(obj, null, 2);
        update();
    } catch (e) {
        alert('Format failed: ' + e.message);
    }
});

optColor.addEventListener('change', update);
optCompress.addEventListener('change', update);
optIndex.addEventListener('change', update);
optType.addEventListener('change', update);

document.getElementById('btn-compress-input').addEventListener('click', () => {
    const val = jsonInput.value.trim();
    if (!val) return;
    try {
        // Use the same relaxed evaluation as the tool supports
        const obj = new Function(`return (${val})`)();
        jsonInput.value = JSON.stringify(obj);
        update();
    } catch (e) {
        alert('Compress failed: ' + e.message);
    }
});

// Sync scrolling (Optional but nice)
const parseCol = document.getElementById('string-parse-result');
const evalCol = document.getElementById('js-eval-result');

parseCol.onscroll = () => { evalCol.scrollTop = parseCol.scrollTop; };
evalCol.onscroll = () => { parseCol.scrollTop = evalCol.scrollTop; };

// Initial run
update();

// Resizer Logic
const resizer = document.getElementById('resizer');
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const container = document.querySelector('.panel-container');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Disable text selection
    leftPanel.style.userSelect = 'none';
    leftPanel.style.pointerEvents = 'none'; // Prevent iframe interference if any
    rightPanel.style.userSelect = 'none';
    rightPanel.style.pointerEvents = 'none';

    // Calculate initial widths/percentages if needed, or just start tracking
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    // Calculate new width for left panel
    // We use the container's offset to determine the relative mouse position
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = e.clientX - containerRect.left;

    // Minimal constraints (e.g. 100px min width)
    if (newLeftWidth > 150 && newLeftWidth < containerRect.width - 150) {
        // Set flex-basis or width. 
        // Setting flex-grow: 0 and flex-basis: pixels allows fixed width
        leftPanel.style.flex = `0 0 ${newLeftWidth}px`;
        // Right section automatically takes remaining space due to flex: 1.5 (or we reset it to flex: 1)
        // To ensure it fills, we can force right panel to flex: 1
        rightPanel.style.flex = '1';
    }
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = '';
        leftPanel.style.userSelect = '';
        leftPanel.style.pointerEvents = '';
        rightPanel.style.userSelect = '';
        rightPanel.style.pointerEvents = '';
    }
});

// Options Dropdown Click Toggle
const optionsDropdown = document.querySelector('.options-dropdown');
const optionsContent = document.querySelector('.options-content');
let isOptionsOpen = false;

optionsDropdown.addEventListener('click', (e) => {
    // If clicking inside the content panel (e.g. blank space, padding, text, inputs), ignore toggle
    if (optionsContent.contains(e.target)) {
        return;
    }

    e.stopPropagation();
    isOptionsOpen = !isOptionsOpen;
    if (isOptionsOpen) {
        optionsContent.style.display = 'block';
        optionsDropdown.classList.add('active');
    } else {
        optionsContent.style.display = 'none';
        optionsDropdown.classList.remove('active');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (isOptionsOpen && !optionsDropdown.contains(e.target)) {
        isOptionsOpen = false;
        optionsContent.style.display = 'none';
        optionsDropdown.classList.remove('active');
    }
});
