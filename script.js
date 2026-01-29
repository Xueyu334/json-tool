const jsonInput = document.getElementById('json-input');
const stringResult = document.getElementById('string-parse-result');
const evalResult = document.getElementById('js-eval-result');
const resultHeader = document.getElementById('result-header');

const optColor = document.getElementById('opt-color');
const optCompress = document.getElementById('opt-compress');
const optIndex = document.getElementById('opt-index');
const optType = document.getElementById('opt-type');

// Initialize Web Worker
// Web Worker Code (Inlined for file:// protocol support)
const workerCode = `
self.onmessage = function (e) {
    const { id, type, content, options } = e.data;

    if (!content) {
        self.postMessage({ id, success: false, error: 'Empty content' });
        return;
    }

    try {
        let obj;
        if (type === 'strict') {
            obj = JSON.parse(content);
        } else if (type === 'relaxed') {
            try {
                // Relaxed Eval (supports non-standard JSON)
                obj = new Function('return (' + content + ')')();
            } catch (err) {
                 throw new Error(err.message);
            }
        }

        const html = renderJSON(obj, 0, options);
        self.postMessage({ id, success: true, html });
    } catch (err) {
        self.postMessage({ id, success: false, error: err.message });
    }
};

function renderJSON(obj, depth = 0, options) {
    const { compress, showType, showIndex, color } = options;

    if (compress) {
        return '<span class="json-string">' + JSON.stringify(obj) + '</span>';
    }

    if (obj === null) {
        const value = '<span class="json-null">null</span>';
        return value + (showType ? ' <span class="json-type type-null">null</span>' : '');
    }
    if (typeof obj === 'number') {
        const value = '<span class="json-number">' + obj + '</span>';
        return value + (showType ? ' <span class="json-type type-number">number</span>' : '');
    }
    if (typeof obj === 'boolean') {
        const value = '<span class="json-boolean">' + obj + '</span>';
        return value + (showType ? ' <span class="json-type type-boolean">boolean</span>' : '');
    }
    if (typeof obj === 'string') {
        const value = '<span class="json-string">"' + escapeHtml(obj) + '"</span>';
        return value + (showType ? ' <span class="json-type type-string">string</span>' : '');
    }

    if (Array.isArray(obj)) {
        if (obj.length === 0) return '<span class="json-bracket">[]</span>' + (showType ? ' <span class="json-type type-array">array</span>' : '');
        let html = '<span class="json-toggle" onclick="toggle(this)">-</span><span class="json-bracket">[</span>';
        html += '<span class="json-size-indicator" style="display:none">' + obj.length + '</span>';
        html += '<ul class="json-tree">';
        obj.forEach((item, index) => {
            html += '<li>' + (showIndex ? '<span style="color:#999; margin-right:5px; font-size:12px">' + index + ':</span>' : '') + renderJSON(item, depth + 1, options) + (index < obj.length - 1 ? '<span class="json-bracket">,</span>' : '') + '</li>';
        });
        html += '</ul><span class="json-bracket">]</span>';
        html += showType ? ' <span class="json-type type-array">array</span>' : '';
        return html;
    }

    if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '<span class="json-bracket">{}</span>' + (showType ? ' <span class="json-type type-object">object</span>' : '');
        let html = '<span class="json-toggle" onclick="toggle(this)">-</span><span class="json-bracket">{</span>';
        html += '<span class="json-size-indicator" style="display:none">' + keys.length + '</span>';
        html += '<ul class="json-tree">';
        keys.forEach((key, index) => {
            const colorIdx = (index + depth) % 9;
            const displayKey = color ? '<span class="json-key json-key-' + colorIdx + '">"' + escapeHtml(key) + '"</span>' : '"' + escapeHtml(key) + '"';
            html += '<li>' + displayKey + '<span class="json-bracket">: </span>' + renderJSON(obj[key], depth + 1, options) + (index < keys.length - 1 ? '<span class="json-bracket">,</span>' : '') + '</li>';
        });
        html += '</ul><span class="json-bracket">}</span>';
        html += showType ? ' <span class="json-type type-object">object</span>' : '';
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
`;

// Initialize Web Worker from Blob
const blob = new Blob([workerCode], { type: 'application/javascript' });
const worker = new Worker(URL.createObjectURL(blob));

worker.onmessage = function (e) {
    const { id, success, html, error } = e.data;

    if (id === 'strict') {
        if (success) {
            stringResult.innerHTML = html;
            resultHeader.classList.remove('error');
        } else {
            stringResult.innerHTML = `<div style="color:#ff4757; padding:10px; border:1px solid #ff4757; border-radius:4px; background:rgba(255,71,87,0.1)">Error: ${error}</div>`;
            resultHeader.classList.add('error');
        }
    } else if (id === 'relaxed') {
        if (success) {
            evalResult.innerHTML = html;
        } else {
            // Relaxed eval often fails on partial input, just show error
            evalResult.innerHTML = `<div style="color:#ff4757; font-style:italic">Eval error: ${error}</div>`;
        }
    } else if (id === 'compress') {
        // Handle compression result from worker? 
        // Actually compression is usually simple enough for main thread, 
        // but consistently we could do it in worker too. 
        // For now, let's keep the button logic simple or move it to worker if needed.
        // But the previous implementation did it in main thread.
        // Let's stick to using worker for Rendering which is the bottleneck.
    }
};

function getOptions() {
    return {
        compress: optCompress.checked,
        showIndex: optIndex.checked,
        showType: optType.checked,
        color: optColor.checked
    };
}

function update() {
    const val = jsonInput.value.trim();
    if (!val) {
        stringResult.innerHTML = '<span style="color:#666; font-style:italic">Wait for input...</span>';
        evalResult.innerHTML = '<span style="color:#666; font-style:italic">Wait for input...</span>';
        resultHeader.classList.remove('error');
        return;
    }

    const options = getOptions();

    // Post strict parse task
    worker.postMessage({
        id: 'strict',
        type: 'strict',
        content: val,
        options
    });

    // Post relaxed eval task
    worker.postMessage({
        id: 'relaxed',
        type: 'relaxed',
        content: val,
        options
    });
}

// Debounce Utility
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Apply debounce to input event
const debouncedUpdate = debounce(update, 300);

jsonInput.addEventListener('input', debouncedUpdate);

// Toggle logic needs to remain global for onclick events in generated HTML
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

// Double click to format 
jsonInput.addEventListener('dblclick', () => {
    if (!jsonInput.value.trim()) return;
    try {
        const obj = new Function(`return (${jsonInput.value})`)();
        jsonInput.value = JSON.stringify(obj, null, 2);
        // Trigger update immediately or via debounce? 
        // Immediate update feels better for explicit action
        update();
    } catch (e) {
        alert('Format failed: ' + e.message);
    }
});

// Option listeners - can be immediate or debounced? 
// Immediate is usually fine for checkboxes, but if JSON is huge, debounce is safer.
// Let's use debounced for safety on large datasets.
optColor.addEventListener('change', debouncedUpdate);
optCompress.addEventListener('change', debouncedUpdate);
optIndex.addEventListener('change', debouncedUpdate);
optType.addEventListener('change', debouncedUpdate);

// Compress Button
document.getElementById('btn-compress-input').addEventListener('click', () => {
    const val = jsonInput.value.trim();
    if (!val) return;
    try {
        const obj = new Function(`return (${val})`)();
        jsonInput.value = JSON.stringify(obj);
        update();
    } catch (e) {
        alert('Compress failed: ' + e.message);
    }
});

// Sync scrolling
const parseCol = document.getElementById('string-parse-result');
const evalCol = document.getElementById('js-eval-result');

parseCol.onscroll = () => { evalCol.scrollTop = parseCol.scrollTop; };
evalCol.onscroll = () => { parseCol.scrollTop = evalCol.scrollTop; };

// Initial run
update();

// Resizer Logic (Same as before)
const resizer = document.getElementById('resizer');
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');
const container = document.querySelector('.panel-container');

let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    leftPanel.style.userSelect = 'none';
    leftPanel.style.pointerEvents = 'none';
    rightPanel.style.userSelect = 'none';
    rightPanel.style.pointerEvents = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = e.clientX - containerRect.left;
    if (newLeftWidth > 150 && newLeftWidth < containerRect.width - 150) {
        leftPanel.style.flex = `0 0 ${newLeftWidth}px`;
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
