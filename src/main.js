// // main.js
// const section = document.querySelector(".extension-content");

// const replaceBackgroundColor = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: () => {
//         document.body.style.backgroundColor = "black";
//       },
//     });
//   });
// };

// chrome.action.onClicked.addListener((tab) => {
//   replaceBackgroundColor();
// });
