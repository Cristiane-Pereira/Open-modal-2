// main.js
window.onload = function () {
  // Função para discar no telefone
  const buttons = document.querySelectorAll(".phone-keyboard-button");
  const input = document.getElementById("agent-call-number");
  console.log("Main foi injetado!");

  if (!input) {
    console.error("Campo de entrada não encontrado.");
    return;
  }

  if (buttons.length === 0) {
    console.error("Nenhum botão encontrado.");
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const character = button.getAttribute("data-character");
      if (character) {
        input.value += character;
      }
    });
  });
};

// Validação de usuário e aplica a lógica de render
// document.addEventListener("DOMContentLoaded", function () {
//   const sectionPhone = document.getElementById("section-phone");
//   sectionPhone.classList.add("d-none");

//   const sectionLogin = document.getElementById("section-login");
//   const messageError = document.querySelector("#validate-error");
//   const fieldEmail = document.getElementById("email");
//   const fieldPassword = document.getElementById("password");
//   const buttonSubmit = document.querySelector(".button-submit");
//   const authUser = [
//     {
//       email: "jonh.joe@meeta.com.br",
//       password: "12345",
//     },
//   ];

//   buttonSubmit.addEventListener("click", function (event) {
//     event.preventDefault();

//     const enteredEmail = fieldEmail.value;
//     const enteredPassword = fieldPassword.value;

//     if (enteredEmail.trim() === "" || enteredPassword.trim() === "") {
//       messageError.innerHTML =
//         '<ul><li class="text-danger">Por favor, preencha todos os campos.</li></ul>';
//       return;
//     }
//     const authenticatedUser = authUser.find(
//       (user) =>
//         user.email === enteredEmail &&
//         user.password === enteredPassword.toString()
//     );

//     if (authenticatedUser) {
//       sectionLogin.classList.add("d-none");
//       sectionPhone.classList.remove("d-none");
//       // console.log("Login bem-sucedido!");
//     } else {
//       messageError.innerHTML =
//         '<ul><li class="text-danger">Essas credenciais não correspondem com os nossos registros.</li></ul>';
//       // console.log("Usuário não cadastrado.");
//     }
//   });
// });

// Oculta e mostra password
document.addEventListener("DOMContentLoaded", function () {
   const togglePassword = document.getElementById("togglePassword");
   const passwordField = document.getElementById("password");

   // Adiciona um evento de clique ao ícone do olho
   togglePassword.addEventListener("click", function () {
     // Alterna entre tipo de campo de senha e ícone do olho
     const type =
       passwordField.getAttribute("type") === "password" ? "text" : "password";
     passwordField.setAttribute("type", type);

     // Alterna entre os ícones de olho
     const toggleIcon = document.getElementById("toggleIcon");
     toggleIcon.classList.toggle("mdi-eye-outline");
     toggleIcon.classList.toggle("mdi-eye-off-outline");
   });

});
