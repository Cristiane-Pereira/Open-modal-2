chrome.action.onClicked.addListener(() => {
    console.log('Extensão clicada');
    chrome.tabs.query({url: "https://meetaone.com.br/*"}, (tabs) => {
        console.log('Tabs encontradas:', tabs.length);
        tabs.forEach(tab => {
            console.log('Injetando HTML na guia:', tab.id);
            fetch(chrome.runtime.getURL("src/pages/index.html"))
                .then(response => response.text())
                .then(html => {
                    chrome.tabs.executeScript(tab.id, {
                        code: `const injectedHTML = ${JSON.stringify(html)};`
                    }, () => {
                        chrome.tabs.executeScript(tab.id, {
                            file: "src/injectIndexHTML.js"
                        });
                    });
                });
        });
    });
});

fetch(chrome.runtime.getURL("src/pages/index.html"))
    .then(response => response.text())
    .then(html => {
        console.log('HTML carregado:', html);
        const body = document.querySelector('body');
        body.insertAdjacentHTML('beforeend', injectedHTML);

    });
