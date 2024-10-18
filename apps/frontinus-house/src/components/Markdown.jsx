"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = Markdown;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var heroicons_outline_1 = require("@iconify-json/heroicons-outline");
var core_1 = require("highlight.js/lib/core");
var javascript_1 = require("highlight.js/lib/languages/javascript");
var json_1 = require("highlight.js/lib/languages/json");
var python_1 = require("highlight.js/lib/languages/python");
var rust_1 = require("highlight.js/lib/languages/rust");
var highlightjs_solidity_1 = require("highlightjs-solidity");
var remarkable_1 = require("remarkable");
var linkify_1 = require("remarkable/linkify");
core_1.default.registerLanguage("javascript", javascript_1.default);
core_1.default.registerLanguage("json", json_1.default);
core_1.default.registerLanguage("rust", rust_1.default);
core_1.default.registerLanguage("python", python_1.default);
core_1.default.registerLanguage("solidity", highlightjs_solidity_1.solidity);
function Markdown(_a) {
    //const { copy } = useClipboard();
    var body = _a.body;
    var remarkable = new remarkable_1.Remarkable({
        html: false,
        breaks: true,
        typographer: false,
        linkTarget: "_blank",
        highlight: function (str, lang) {
            if (lang && core_1.default.getLanguage(lang)) {
                try {
                    return core_1.default.highlight(str, { language: lang }).value;
                }
                catch (e) { }
            }
            try {
                return core_1.default.highlightAuto(str).value;
            }
            catch (e) { }
            return "";
        },
    }).use(linkify_1.linkify);
    remarkable.core.ruler.disable([
        "abbr",
        "abbr2",
        "footnote_tail",
        "replacements",
        "smartquotes",
    ]);
    remarkable.block.ruler.disable([
        "code",
        "deflist",
        "footnote",
        "htmlblock",
        "lheading",
    ]);
    remarkable.inline.ruler.disable([
        "autolink",
        "del",
        "entity",
        "escape",
        "footnote_inline",
        "footnote_ref",
        "htmltag",
        "ins",
        "mark",
        "sub",
        "sup",
        "text",
    ]);
    var parsed = function () {
        var formattedBody = body.replace(/ipfs:\/\/(\w+)/g, function (value) { return (0, utils_1.getUrl)(value) || "#"; });
        return remarkable.render(formattedBody);
    };
    (0, react_1.useEffect)(function () {
        var body = document.querySelector(".markdown-body");
        if (!body)
            return;
        body.querySelectorAll("pre>code").forEach(function (code) {
            var _a, _b;
            var parent = code.parentElement;
            var copyButton = document.createElement("button");
            var copySvg = "<svg viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\">".concat((_a = heroicons_outline_1.icons.icons.duplicate) === null || _a === void 0 ? void 0 : _a.body, "</svg>");
            copyButton.classList.add("text-skin-text");
            copyButton.setAttribute("type", "button");
            copyButton.innerHTML = copySvg;
            copyButton.addEventListener("click", function () {
                var _a;
                if (parent !== null) {
                    //copy(code.textContent!);
                    copyButton.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"20px\" height=\"20px\">".concat((_a = heroicons_outline_1.icons.icons.check) === null || _a === void 0 ? void 0 : _a.body, "</svg>");
                    copyButton.classList.add("!text-skin-success");
                    setTimeout(function () {
                        copyButton.innerHTML = copySvg;
                        copyButton.classList.remove("!text-skin-success");
                    }, 1e3);
                }
            });
            var titleBar = document.createElement("div");
            titleBar.classList.add("title-bar");
            var language = document.createElement("div");
            language.innerHTML =
                ((_b = code.getAttribute("class")) === null || _b === void 0 ? void 0 : _b.split("language-")[1]) || "";
            titleBar.append(language);
            titleBar.append(copyButton);
            parent.prepend(titleBar);
        });
    });
    return (<div className="markdown-body break-words" dangerouslySetInnerHTML={{ __html: parsed() }}/>);
}
