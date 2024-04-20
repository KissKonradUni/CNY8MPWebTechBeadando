class kkSidebarElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let sidebar = $(this);

        let topbar = $("<div></div>");
        topbar.addClass("kk-topbar");
        
        let title = $("<span></span>");
        title.addClass("kk-topbar-title");

        title.html("Oldalsáv");
        topbar.append(title);

        let elem = $("<button></button>");
        elem.addClass("kk-sidebar-toggle");

        elem.click(function() {
            sidebar.toggle();
        });
        elem.html("<span class='material-symbols-outlined'>menu</span>");

        topbar.append(elem);

        $(this).prepend(topbar);
    }
}

class kkSidebarItemElement extends HTMLButtonElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let button = $(this);
        button.attr("tabindex", "0");

        button.click(function() {
            window.location.href = button.attr("href");
        });
    }
}

customElements.define('kk-sidebar', kkSidebarElement);
customElements.define('kk-sidebar-item', kkSidebarItemElement, { extends: 'button' });

Array.from(document.querySelectorAll("code[html]")).forEach((codeBlock) => {
    let cb = $(codeBlock);
    let code = cb.attr("content");

    let htmlCode = code.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/&zwnj;/gi, "").replace(/&zwnj;/gi, "");
    let coloredCode = htmlCode.replace(/(\s*?)(\w+)(\s*=\s*)(".*?")/gi, '$1<span style="color:#ffaaff">$2</span><span style="color:#aaffaa">$3</span><span style="color:lightblue;">$4</span>');
        coloredCode = coloredCode.replace(/(&lt;!DOCTYPE html&gt;|&lt;\/?[a-z][a-z0-9]*(\s(.*)=(.*))*&gt;)/gi, '<span style="color:yellow;">$1</span>');

    // style blocks
        coloredCode = coloredCode.replace(/&lt;style&gt;(.*?)&lt;\/style&gt;/gs, '<span style="color:yellow;">&lt;style&gt;</span><code headerless css content="$1"></code>    <span style="color:yellow;">&lt;/style&gt;</span>');

    cb.html(coloredCode);

    if (cb.attr("headerless") === "")
        return;

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("HTML");

    cb.before(header);
});

Array.from(document.querySelectorAll("code[css]")).forEach((codeBlock) => {
    let cb = $(codeBlock);
    let code = cb.attr("content");

    let coloredCode = code.replace(/(^.*)(\{)$/gm, '<span style="color:pink;">$1</span><span style="color:yellow;">$2</span>');
        coloredCode = coloredCode.replace(/(.*)(:)(.*)(;)$/gm, '<span style="color:lightblue;">$1</span>:<span style="color:lightgreen;">$3</span>;');
        coloredCode = coloredCode.replace(/(\})$/gm, '<span style="color:yellow;">$1</span>');
        coloredCode = coloredCode.replace(/\/\*(.*?)\*\//gm, '<span style="color:gray;">/*$1*/</span>');

    cb.html(coloredCode);

    if (cb.attr("headerless") === "")
        return;

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("CSS");

    cb.before(header);
});

Array.from(document.querySelectorAll("code[js]")).forEach((codeBlock) => {
    let cb = $(codeBlock);
    let code = cb.attr("content");

    let coloredCode = code.replace(/('.*?'|".*?"|`.*?`)/gm, '<span style="color:orange;">$1</span>');
        coloredCode = coloredCode.replace(/([\(\)\{\}\[\]]){1}/gm, '<span style="color:yellow;">$1</span>');   
        coloredCode = coloredCode.replace(/(\/\/.*$)/gm, '<span style="color:darkseagreen;">$1</span>');
        coloredCode = coloredCode.replace(/(var|let|const|function|return|if|else|for|while|switch|case|break|default)(?=\s|$)/gm, '<span style="color:cornflowerblue;">$1</span>');
        coloredCode = coloredCode.replace(/(\d+)/gm, '<span style="color:purple;">$1</span>');
        coloredCode = coloredCode.replace(/(\/\*[\s\S]*?\*\/)/gm, '<span style="color:gray;">$1</span>');

    cb.html(coloredCode);

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("JavaScript");

    cb.before(header);
});