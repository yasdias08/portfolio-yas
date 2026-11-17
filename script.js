
// ==============================
// MENU MOBILE
// ==============================

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("aberto");

    const menuAberto = navbar.classList.contains("aberto");

    menuToggle.innerHTML = menuAberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
});

// FECHAR MENU AO CLICAR EM UM LINK

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("aberto");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});

// ==============================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ==============================

const elementosRevelar = document.querySelectorAll(".revelar");

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("aparecer");
                observador.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

elementosRevelar.forEach((elemento) => {
    observador.observe(elemento);
});

// ==============================
// LINK ATIVO DO MENU
// ==============================

const secoes = document.querySelectorAll("main section[id]");

function atualizarMenu() {
    let secaoAtual = "";

    secoes.forEach((secao) => {
        const topo = secao.offsetTop - 150;
        const altura = secao.offsetHeight;

        if (
            window.scrollY >= topo &&
            window.scrollY < topo + altura
        ) {
            secaoAtual = secao.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("ativo");

        if (link.getAttribute("href") === `#${secaoAtual}`) {
            link.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", atualizarMenu);

// ==============================
// ANO AUTOMÁTICO NO RODAPÉ
// ==============================

const ano = document.getElementById("ano");

ano.textContent = new Date().getFullYear();

// ==============================
// ROLAGEM SUAVE
// ==============================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
        const destino = link.getAttribute("href");

        if (!destino || destino === "#") {
            return;
        }

        const secao = document.querySelector(destino);

        if (secao) {
            evento.preventDefault();

            secao.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
