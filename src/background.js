// Função para injetar o conteúdo do HTML interno na página da web ativa
const injectHTML = (tabId, htmlPath) => {
  fetch(chrome.runtime.getURL(htmlPath))
    .then(response => response.text())
    .then(html => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (htmlContent) => {
          const div = document.createElement('div');
          div.innerHTML = htmlContent;
          document.body.appendChild(div);
        },
        args: [html], // Passando o conteúdo HTML como argumento
      });
    })
    .catch(error => {
      console.error('Erro ao carregar o HTML interno:', error);
    });
};

// Adicionando um ouvinte de evento para o clique na extensão
chrome.action.onClicked.addListener((tab) => {
  injectHTML(tab.id, "src/pages/index.html", "src/main.js");
});
