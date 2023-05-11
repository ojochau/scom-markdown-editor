var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-markdown-editor/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    const typingAnim = components_1.Styles.keyframes({
        '0%': { "transform": "translate(0, -7px)" },
        '25%': { "transform": "translate(0, 0)" },
        '50%': { "transform": "translate(0, 0)" },
        '75%': { "transform": "translate(0, 0)" },
        '100%': { "transform": "translate(0, 7px)" }
    });
    components_1.Styles.cssRule('#pnlMarkdownEditor', {
        $nest: {
            'i-panel.container': {
                width: Theme.layout.container.width,
                maxWidth: Theme.layout.container.maxWidth,
                overflow: Theme.layout.container.overflow,
                textAlign: Theme.layout.container.textAlign,
                margin: '0 auto'
            },
            // '#inputAIPrompt': {
            //     width: '90% !important'
            // },   
            // '#inputAIPrompt > input': {
            //     width: '100% !important'
            // },
            '.typing': {
                transition: 'all 0.5s linear',
                $nest: {
                    'i-icon:nth-last-child(1)': {
                        animation: `${typingAnim} 1s 0.3s linear infinite`
                    },
                    'i-icon:nth-last-child(2)': {
                        animation: `${typingAnim} 1s 0.2s linear infinite`
                    },
                    'i-icon:nth-last-child(3)': {
                        animation: `${typingAnim} 1s 0.2s linear infinite`
                    }
                }
            },
        }
    });
});
define("@scom/scom-markdown-editor/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-markdown-editor/store.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAIAPIKey = exports.getAIAPIUrl = exports.setDataFromSCConfig = void 0;
    ///<amd-module name='@scom/scom-markdown-editor/store.ts'/> 
    const state = {
        aiAPIUrl: '',
        aiAPIKey: '' //FIXME: for demo only, to be removed later
    };
    const setDataFromSCConfig = (options) => {
        if (options.aiAPIUrl) {
            state.aiAPIUrl = options.aiAPIUrl;
        }
        if (options.aiAPIUrl) {
            state.aiAPIKey = options.aiAPIKey;
        }
    };
    exports.setDataFromSCConfig = setDataFromSCConfig;
    const getAIAPIUrl = () => {
        return state.aiAPIUrl;
    };
    exports.getAIAPIUrl = getAIAPIUrl;
    const getAIAPIKey = () => {
        return state.aiAPIKey;
    };
    exports.getAIAPIKey = getAIAPIKey;
});
define("@scom/scom-markdown-editor/API.ts", ["require", "exports", "@scom/scom-markdown-editor/store.ts"], function (require, exports, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fetchAIGeneratedText = void 0;
    async function fetchAIGeneratedText(prompt) {
        const APIUrl = store_1.getAIAPIUrl();
        const APIKey = store_1.getAIAPIKey();
        const response = await fetch(APIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'OpenAI/NodeJS/3.1.0',
                Authorization: `Bearer ${APIKey}`
            },
            body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": prompt,
                "temperature": 0.7,
                "max_tokens": 3000,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "stream": true
            })
        });
        // const result = await response.json();
        // const answer: string = result.choices[0]?.text?.replaceAll('\n', '');
        return response.body;
    }
    exports.fetchAIGeneratedText = fetchAIGeneratedText;
});
define("@scom/scom-markdown-editor/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-markdown-editor/data.json.ts'/> 
    exports.default = {
        "aiAPIUrl": "https://api.openai.com/v1/completions",
        "aiAPIKey": "",
        "defaultBuilderData": {
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac est sit amet urna consectetur semper. Curabitur posuere justo et nibh gravida, non tristique urna fringilla. Vestibulum id velit sed nisl tincidunt aliquet. Morbi viverra sapien eu purus venenatis, vitae vestibulum odio bibendum. Fusce volutpat gravida velit, id efficitur erat luctus id. Nullam malesuada hendrerit orci, a pretium tortor facilisis non. Sed euismod euismod felis. Nunc rhoncus diam in mi placerat efficitur. Aenean pulvinar neque ac nisl consequat, non lacinia lectus dapibus. Phasellus sagittis sagittis massa a luctus. Etiam auctor semper ullamcorper. Suspendisse potenti."
        }
    };
});
define("@scom/scom-markdown-editor", ["require", "exports", "@ijstech/components", "@scom/scom-markdown-editor/API.ts", "@scom/scom-markdown-editor/store.ts", "@scom/scom-markdown-editor/data.json.ts", "@scom/scom-markdown-editor/index.css.ts"], function (require, exports, components_2, API_1, store_2, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let ScomMarkdownEditor = class ScomMarkdownEditor extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.oldTag = {};
            this.tag = {};
            this.defaultEdit = true;
            this.isEditing = false;
            this.isStopped = false;
            this.oldContent = '';
            this._editMode = false;
            this._theme = 'light';
            if (data_json_1.default)
                store_2.setDataFromSCConfig(data_json_1.default);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
            this.setData({ content: value });
        }
        get editMode() {
            return this._editMode;
        }
        set editMode(value) {
            this._editMode = value;
            this.isEditing = value;
            if (this.pnlEditor) {
                this.pnlEditor.visible = this.pnlAIPrompt.visible = this.isEditing;
                if (!this.mdEditor)
                    this.renderEditor();
            }
            if (this.pnlViewer)
                this.pnlViewer.visible = !this.isEditing;
        }
        get theme() {
            return this._theme;
        }
        set theme(value) {
            this._theme = value;
            if (this.mdEditor)
                this.mdEditor.theme = value;
            if (this.mdViewer)
                this.mdViewer.theme = value;
        }
        init() {
            super.init();
            const width = this.getAttribute('width', true);
            const height = this.getAttribute('height', true);
            if (width || height) {
                const finalWidth = width ? (typeof this.width === 'string' ? width : `${width}px`) : '100%';
                const finalHeight = height ? (typeof this.height === 'string' ? height : `${height}px`) : 'auto';
                this.setTag({ width: finalWidth, height: finalHeight });
            }
            const themeAttr = this.getAttribute('theme', true);
            if (themeAttr)
                this.theme = themeAttr;
            this.editMode = this.getAttribute('editMode', true, false);
            const data = this.getAttribute('data', true, '');
            (!data) && this.renderEmptyPnl();
            this.data = data;
        }
        // getConfigSchema() {
        //     return configSchema;
        // }
        preventDrag(builder, value) {
            if (!builder)
                return;
            const section = builder.closest('ide-section');
            section && (section.style.height = 'auto');
            if (value)
                builder.classList.add('is-editing');
            else
                builder.classList.remove('is-editing');
        }
        _getActions(themeSchema) {
            const actions = [
                {
                    name: 'Edit',
                    icon: 'edit',
                    visible: () => !this.isEditing,
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                this.edit();
                                this.preventDrag(builder, true);
                            },
                            undo: () => {
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: {}
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    visible: () => !this.isEditing && themeSchema != null && themeSchema != undefined,
                    command: (builder, userInputData) => {
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                this.oldTag = Object.assign({}, this.tag);
                                this.setTag(userInputData);
                                if (builder)
                                    builder.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                this.setTag(this.oldTag);
                                if (builder)
                                    builder.setTag(this.oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                },
                {
                    name: 'Confirm',
                    icon: 'check',
                    visible: () => this.isEditing,
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                var _a;
                                const isChanged = ((_a = this.mdEditor) === null || _a === void 0 ? void 0 : _a.getMarkdownValue()) !== this.data;
                                if (this.oldContent && !isChanged && this.mdEditor)
                                    this.mdEditor.value = this.oldContent;
                                this.oldData = this.data;
                                this.confirm();
                                if (this.mdViewer)
                                    this.mdViewer.value = this.data;
                                this.preventDrag(builder, false);
                            },
                            undo: () => {
                                var _a;
                                const currentData = this.data;
                                this.edit();
                                this.oldContent = (((_a = this.mdEditor) === null || _a === void 0 ? void 0 : _a.getMarkdownValue()) || '');
                                if (this.mdEditor)
                                    this.mdEditor.value = this.oldData;
                                this.setData({ content: this.oldData });
                                this.oldData = currentData;
                                this.preventDrag(builder, true);
                                builder && builder.setData({ content: this.data });
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: {}
                },
                {
                    name: 'Discard',
                    icon: 'times',
                    visible: () => this.isEditing,
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                var _a;
                                this.oldData = ((_a = this.mdEditor) === null || _a === void 0 ? void 0 : _a.getMarkdownValue()) || '';
                                this.discard();
                                this.preventDrag(builder, false);
                            },
                            undo: () => {
                                this.edit();
                                if (this.mdEditor)
                                    this.mdEditor.value = this.oldData;
                                this.preventDrag(builder, true);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: {}
                }
            ];
            return actions;
        }
        // async onConfigSave(config: IConfigData) {
        //     this.tag = config;
        //     this.updateMarkdown(config);
        // }
        updateMarkdown(config) {
            if (!config)
                return;
            const { width, height, background } = config;
            if (this.pnlMarkdownEditor) {
                this.pnlMarkdownEditor.background.color = background;
            }
            if (this.mdEditor) {
                if (width)
                    this.mdEditor.width = width;
                if (height)
                    this.mdEditor.height = height;
            }
            if (this.mdViewer) {
                if (width)
                    this.mdViewer.width = width;
                // Using style because mode view doesnt have height attribute
                if (height)
                    this.mdViewer.style.height = height;
            }
        }
        getData() {
            return {
                content: this.data
            };
        }
        renderEmptyPnl() {
            this.pnlViewer.clearInnerHTML();
            if (this.pnlViewer.visible)
                this.pnlViewer.appendChild(this.$render("i-label", { caption: "Click to edit text", opacity: 0.5, display: "block", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' } }));
        }
        async setData(value) {
            this._data = value.content || '';
            // this.setTag({width: value.width, height: value.height});
            this.pnlEditor.visible = this.pnlAIPrompt.visible = this.isEditing;
            this.pnlViewer.visible = !this.isEditing;
            if (!this.data) {
                this.renderEmptyPnl();
                return;
            }
            ;
            const { width = '100%', height = "auto" } = this.tag || {};
            if (!this.mdViewer) {
                this.mdViewer = await components_2.MarkdownEditor.create({
                    viewer: true,
                    value: this.data,
                    width,
                    height,
                    theme: this.theme
                });
                this.mdViewer.display = 'block';
                if (height)
                    this.mdViewer.style.height = height;
                this.pnlViewer.clearInnerHTML();
                this.pnlViewer.appendChild(this.mdViewer);
            }
            else {
                this.pnlViewer.clearInnerHTML();
                this.pnlViewer.appendChild(this.mdViewer);
                this.mdViewer.value = this.data;
            }
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            let { width, height, background, textAlign } = value;
            width = typeof width === 'string' ? width : `${width}px`;
            height = typeof height === 'string' ? height : `${height}px`;
            if (height !== 'auto')
                this.height = 'auto';
            this.tag = { width, height, background, textAlign };
            this.pnlViewer.style.textAlign = textAlign || "left";
            this.updateMarkdown(value);
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const themeSchema = {
                            type: 'object',
                            properties: {
                                textAlign: {
                                    type: 'string',
                                    enum: [
                                        'left',
                                        'center',
                                        'right'
                                    ]
                                }
                            }
                        };
                        return this._getActions(themeSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        async edit() {
            // this.pnlEditor.visible = true;
            // this.pnlViewer.visible = false;
            this.isEditing = true;
            this.renderEditor();
        }
        async confirm() {
            var _a, _b;
            // this.pnlEditor.visible = false;
            // this.pnlViewer.visible = true;
            this.isEditing = false;
            await this.setData({
                content: ((_a = this.mdEditor) === null || _a === void 0 ? void 0 : _a.getMarkdownValue()) || ''
            });
            const builder = (_b = this.parent) === null || _b === void 0 ? void 0 : _b.closest('ide-toolbar');
            builder && builder.setData({ content: this.data });
        }
        async discard() {
            var _a;
            // this.pnlEditor.visible = false;
            // this.pnlViewer.visible = true;
            this.isEditing = false;
            await this.setData({
                content: this.data
            });
            const builder = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.closest('ide-toolbar');
            builder && builder.setData({ content: this.data });
        }
        // private validate() {
        //     if (this.mdEditor && this.mdEditor.getMarkdownValue()) {
        //         return true;
        //     }
        //     return false;
        // }
        async renderEditor() {
            const { width = '100%', height = "auto" } = this.tag;
            if (!this.mdEditor) {
                this.mdEditor = await components_2.MarkdownEditor.create({
                    value: this.data,
                    mode: 'wysiwyg',
                    width,
                    height,
                    theme: this.theme
                });
                this.mdEditor.display = 'block';
                this.pnlEditor.clearInnerHTML();
                this.pnlEditor.appendChild(this.mdEditor);
            }
            this.mdEditor.value = this.data;
            this.pnlEditor.visible = this.pnlAIPrompt.visible = this.isEditing;
            this.pnlViewer.visible = !this.isEditing;
        }
        toggleStopBtn(value) {
            this.btnStop.visible = value;
            this.btnSend.visible = !value;
            this.pnlWaiting.visible = value;
            this.inputAIPrompt.visible = !value;
        }
        async readAllChunks(readableStream) {
            var _a;
            const reader = readableStream.getReader();
            let done;
            let value;
            while (!done) {
                ({ value, done } = await reader.read());
                const valueString = new TextDecoder().decode(value);
                const lines = valueString.split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                    if (this.isStopped)
                        break;
                    const message = line.replace(/^data: /, '');
                    if (message === '[DONE]')
                        return;
                    try {
                        const parsedMessage = JSON.parse(message);
                        const text = parsedMessage.choices[0].text;
                        this.mdEditor.value = (((_a = this.mdEditor) === null || _a === void 0 ? void 0 : _a.getMarkdownValue()) || '') + text;
                    }
                    catch (error) {
                        console.error('Could not JSON parse stream message', message, error);
                    }
                }
            }
        }
        async sendAIPrompt() {
            this.isStopped = false;
            if (!this.inputAIPrompt.value)
                return;
            this.toggleStopBtn(true);
            try {
                const result = await API_1.fetchAIGeneratedText(this.inputAIPrompt.value);
                // console.log('answer', answer);
                if (!this.isStopped)
                    await this.readAllChunks(result);
            }
            catch (_a) {
            }
            this.inputAIPrompt.value = '';
            this.toggleStopBtn(false);
        }
        async stopAPIPrompt() {
            this.isStopped = true;
            this.inputAIPrompt.value = '';
            this.toggleStopBtn(false);
        }
        render() {
            return (this.$render("i-vstack", { id: "pnlMarkdownEditor" },
                this.$render("i-panel", { id: 'pnlEditor', padding: { top: "0.5rem", bottom: "0.5rem", left: "1rem", right: "1rem" } }),
                this.$render("i-hstack", { id: 'pnlAIPrompt', width: "100%", horizontalAlignment: "space-between", verticalAlignment: "center", padding: { top: "0.5rem", bottom: "0.5rem", left: "1rem", right: "1rem" } },
                    this.$render("i-vstack", { width: "90%" },
                        this.$render("i-hstack", { id: "pnlWaiting", gap: 4, verticalAlignment: "center", minHeight: 32, width: "100%", height: "auto", border: { width: '0.5px', style: 'solid', color: Theme.divider }, background: { color: Theme.input.background }, padding: { left: '10px' }, visible: false },
                            this.$render("i-label", { font: { size: '1.5rem', color: Theme.input.fontColor }, caption: "AI is writing" }),
                            this.$render("i-hstack", { gap: 4, verticalAlignment: "center", class: "typing" },
                                this.$render("i-icon", { name: "circle", width: 4, height: 4, fill: Theme.input.fontColor }),
                                this.$render("i-icon", { name: "circle", width: 4, height: 4, fill: Theme.input.fontColor }),
                                this.$render("i-icon", { name: "circle", width: 4, height: 4, fill: Theme.input.fontColor }))),
                        this.$render("i-input", { id: "inputAIPrompt", placeholder: "Ask AI to edit or generate...", font: { size: '1.5rem' }, height: "auto", width: "100%" })),
                    this.$render("i-button", { id: "btnStop", caption: "Stop", width: "10%", visible: false, font: { color: 'rgba(255,255,255)' }, padding: { top: "0.5rem", bottom: "0.5rem", left: "1rem", right: "1rem" }, onClick: this.stopAPIPrompt }),
                    this.$render("i-button", { id: "btnSend", caption: "Send", width: "10%", font: { color: 'rgba(255,255,255)' }, padding: { top: "0.5rem", bottom: "0.5rem", left: "1rem", right: "1rem" }, onClick: this.sendAIPrompt })),
                this.$render("i-panel", { id: 'pnlViewer', minHeight: 20 })));
        }
    };
    ScomMarkdownEditor = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-markdown-editor')
    ], ScomMarkdownEditor);
    exports.default = ScomMarkdownEditor;
});