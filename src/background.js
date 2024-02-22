// background.js

// Função para adicionar texto sobre o conteúdo existente ao clicar na extensão
const addTextOverlay = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        // Criar um novo elemento div para conter o texto
        const overlay = document.createElement("div");
        // Definir o texto e estilos para o overlay
        overlay.textContent = "Deus é fiel!";
        overlay.style.position = "fixed";
        overlay.style.top = "50%";
        overlay.style.left = "50%";
        overlay.style.transform = "translate(-50%, -50%)";
        overlay.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        overlay.style.padding = "20px";
        overlay.style.borderRadius = "5px";
        overlay.style.zIndex = "9999";
        // Adicionar o overlay ao corpo da página
        document.body.appendChild(overlay);
      },
    });
  });
};

// Adicionando um ouvinte de evento para o clique na extensão
chrome.action.onClicked.addListener((tab) => {
  addTextOverlay();
});
