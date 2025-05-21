document.addEventListener("DOMContentLoaded", () => {
  const btnToggleTheme = document.getElementById("btn-toggle-theme");
  const formSection = document.getElementById("formCompra");
  const form = formSection ? formSection.querySelector("form") : null;
  const botoesCompra = document.querySelectorAll("button.comprar");

  // Função para aplicar tema
  function aplicarTema(tema) {
    if (tema === "dark") {
      document.body.classList.add("dark");
      if (btnToggleTheme) btnToggleTheme.textContent = "☀️";
    } else {
      document.body.classList.remove("dark");
      if (btnToggleTheme) btnToggleTheme.textContent = "🌙";
    }
  }

  // Inicializa tema com valor salvo ou light
  aplicarTema(localStorage.getItem("tema") || "light");

  // Evento botão alternar tema
  if (btnToggleTheme) {
    btnToggleTheme.addEventListener("click", () => {
      const novoTema = document.body.classList.contains("dark") ? "light" : "dark";
      aplicarTema(novoTema);
      localStorage.setItem("tema", novoTema);
    });
  }

  // Esconde formulário inicialmente
  if (formSection) formSection.style.display = "none";

  // Adiciona evento para todos botões "Comprar"
  if (botoesCompra.length && formSection) {
    botoesCompra.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // Exibe formulário com fade
        formSection.style.display = "block";
        formSection.style.opacity = 0;
        let op = 0;
        const fade = setInterval(() => {
          if (op >= 1) clearInterval(fade);
          formSection.style.opacity = op;
          op += 0.05;
        }, 15);
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // Validação e envio do formulário
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = form.querySelector("#nome");
      const email = form.querySelector("#email");
      const endereco = form.querySelector("#endereco");
      const quantidade = form.querySelector("#quantidade");

      // Reset bordas
      [nome, email, endereco, quantidade].forEach(field => field.style.borderColor = "#ccc");

      let erro = false;
      if (!nome.value.trim()) { nome.style.borderColor = "red"; erro = true; }
      if (!email.value.trim() || !email.value.includes("@")) { email.style.borderColor = "red"; erro = true; }
      if (!endereco.value.trim()) { endereco.style.borderColor = "red"; erro = true; }
      if (!quantidade.value || parseInt(quantidade.value) <= 0) { quantidade.style.borderColor = "red"; erro = true; }

      if (erro) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
      }

      form.reset();
      formSection.style.display = "none";

      // Remove mensagem anterior se existir
      const msgAntiga = document.getElementById("msgCompra");
      if (msgAntiga) msgAntiga.remove();

      // Cria mensagem de sucesso
      const msg = document.createElement("div");
      msg.id = "msgCompra";
      msg.textContent = "🎉 Obrigado pela compra! Você receberá um e-mail com os detalhes.";
      Object.assign(msg.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#008000",
        color: "white",
        padding: "15px 30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: "9999",
        fontSize: "1.1rem",
        opacity: "1",
        transition: "opacity 0.5s ease"
      });
      document.body.appendChild(msg);

      setTimeout(() => {
        msg.style.opacity = "0";
      }, 3000);

      setTimeout(() => {
        msg.remove();
      }, 3500);
    });
  }
});
