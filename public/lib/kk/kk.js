class kkSidebarElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let sidebar = this;

        let topbar = $("<div></div>");
        topbar.addClass("kk-topbar");
        
        let title = $("<span></span>");
        title.addClass("kk-topbar-title");

        title.html("Oldalsáv");
        topbar.append(title);

        let elem = $("<button></button>");
        elem.addClass("kk-sidebar-toggle");

        elem.click(function() {
            sidebar.setAttribute("hidden", sidebar.getAttribute("hidden") === "true" ? false : true);
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
        let button = this;
        button.setAttribute("tabindex", "0");

        button.addEventListener("click", function() {
            window.location.href = button.getAttribute("href");
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
    // script blocks
        coloredCode = coloredCode.replace(/&lt;script&gt;(.*?)&lt;\/script&gt;/gs, '<span style="color:yellow;">&lt;script&gt;</span><span style="color:white;"><code headerless js content="$1"></code></span>    \n<span style="color:yellow;">&lt;/script&gt;</span>');

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
        coloredCode = coloredCode.replace(/([\(\)\{\}\[\]\+\-\*]){1}/gm, '<span style="color:yellow;">$1</span>');   
        coloredCode = coloredCode.replace(/(\/\/.*$)/gm, '<span style="color:darkseagreen;">$1</span>');
        coloredCode = coloredCode.replace(/(var|let|const|function|return|if|else|for|while|switch|case|break|default)\b/gm, '<span style="color:cornflowerblue;">$1</span>');
        coloredCode = coloredCode.replace(/(document|console)\b/gm, '<span style="color:lightsalmon;">$1</span>');
        coloredCode = coloredCode.replace(/(true|false|null|undefined)\b/gm, '<span style="color:darkorange;">$1</span>');
        coloredCode = coloredCode.replace(/(\/\*[\s\S]*?\*\/)/gm, '<span style="color:gray;">$1</span>');
        coloredCode = coloredCode.replace(/(\$)/gm, '<span style="color:hotpink;">$1</span>');
        coloredCode = coloredCode.replace(/( = )/gm, '<span style="color:yellow;">$1</span>');

    cb.html(coloredCode);

    if (cb.attr("headerless") === "")
        return;

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("JavaScript");

    cb.before(header);
});

Array.from(document.querySelectorAll("code[other]")).forEach((codeBlock) => {
    let cb = $(codeBlock);

    if (cb.attr("headerless") === "")
        return;

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("Egyéb");

    cb.before(header);
});

Array.from(document.querySelectorAll("code[json]")).forEach((codeBlock) => {
    let cb = $(codeBlock);
    let code = cb.text();

    let coloredCode = code.replace(/("[^"]*")(\s*:\s*)(("[^"]*")|(\d+)|(\d+\.\d+)|(\w+)|(\[.*?\])|(\{.*?\}))/gi, '<span style="color:#ffaaff;">$1</span><span style="color:#aaffaa;">$2</span><span style="color:lightblue;">$3</span>');
        coloredCode = coloredCode.replace(/(\{|\}|\[|\])/gi, '<span style="color:yellow;">$1</span>');

    cb.html(coloredCode);

    if (cb.attr("headerless") === "")
        return;

    let header = $("<div></div>");
    header.addClass("code-header");
    header.html("JSON");

    cb.before(header);
});

async function fetchJson(url) {
    let response = await fetch(url);
    let content = await response.json();

    return content;
}

async function fetchPageContent() {
    //let content = await fetchJson("content.json");

    $.getJSON("content.json", function(content) {
        $("*[kk-content='header']").html(content.header);
        $("*[kk-content='footer']").html(content.footer);

        if ($("*[kk-content='sidebar']").length < 1)
            return;

        let sidebar = $("kk-sidebar");
        let sidebarContent = content.sidebar;

        Array.from(sidebarContent).forEach((item) => {
            let sidebarItem = $("<kk-sidebar-item></kk-sidebar-item>");
            sidebarItem.html(item.title);
            sidebarItem.attr("href", item.href);

            sidebarItem.click(function() {
                window.location.href = item.href;
            });

            sidebar.append(sidebarItem);
        });
    });
}
fetchPageContent();

$(".kk-nav-toggle#nav-toggle").click(function() {
    let nav = document.querySelector("nav");
    nav.setAttribute("hidden", nav.getAttribute("hidden") === "true" ? false : true);
});

let sidebar = document.querySelector("kk-sidebar");
let nav = document.querySelector("nav");

sidebar.setAttribute("hidden", localStorage.getItem("sidebar") ?? false);
nav.setAttribute("hidden", localStorage.getItem("nav") ?? false);

window.onbeforeunload = function() {
    localStorage.setItem("sidebar", sidebar.getAttribute("hidden"));
    localStorage.setItem("nav", nav.getAttribute("hidden"));
};