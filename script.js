// ==============================
// AÇAÍ DA PRAÇA - SITE FUNCIONANDO
// Login + cadastro demonstrativo + carrinho + pagamento + WhatsApp
// ==============================

// Edite aqui o número do WhatsApp com DDI + DDD.
// Exemplo: 5591999999999
const WHATSAPP_NUMBER = "5591993217906";

// Login demonstrativo para portfólio.
// ATENÇÃO: não use isso como login real de cliente, pois JS fica visível no navegador.
const DEMO_LOGIN = {
  email: "cliente@acaidapraca.com",
  senha: "123456",
  nome: "Cliente",
  telefone: "",
  endereco: "",
  cidade: ""
};

// Login demonstrativo do administrador para portfólio.
// ATENÇÃO: em site estático este login não é seguro para uso real.
const ADMIN_LOGIN = {
  email: "admin@acaidapraca.com",
  senha: "admin123"
};

const products = [
  {
    name: "Açaí Premium 500ml",
    desc: "Porção individual cremosa para consumir na hora.",
    price: 13,
    img: "assets/produtos.jpg"
  },
  {
    name: "Açaí Premium 1L",
    desc: "Ideal para almoço, lanche ou para dividir.",
    price: 26,
    img: "assets/produtos.jpg"
  },
  {
    name: "Açaí Premium 2L",
    desc: "Açaí puro para família e dias de jogo.",
    price: 50,
    img: "assets/produtos.jpg"
  },
  {
    name: "Polpa de Açaí congelada 5L",
    desc: "Opção para encomenda, eventos e envio sob consulta.",
    price: 130,
    img: "assets/flyer_copa.jpg"
  },
  {
    name: "Combo Camarão Regional",
    desc: "Açaí com camarão regional para uma refeição completa.",
    price: 25,
    img: "assets/produtos.jpg"
  },
  {
    name: "Combo Peixe Frito",
    desc: "Açaí encorpado com peixe frito crocante.",
    price: 28,
    img: "assets/produtos.jpg"
  },
  {
    name: "Combo Charque Frito",
    desc: "Sabor paraense forte com charque frito e açaí.",
    price: 30,
    img: "assets/produtos.jpg"
  },
  {
    name: "Kit Revenda 10L",
    desc: "Para revendedores, eventos e pedidos maiores.",
    price: 250,
    img: "assets/logo.jpg"
  },
  {
    name: "Polpa de Cupuaçu - 1 unidade",
    desc: "Polpa de cupuaçu natural, ideal para sucos, vitaminas e sobremesas.",
    price: 18,
    img: "assets/polpa_cupuacu.png"
  },
  {
    name: "Promoção 5 Polpas de Cupuaçu",
    desc: "Leve 5 polpas de cupuaçu por um preço especial.",
    price: 80,
    img: "assets/polpa_cupuacu.png"
  },
  {
    name: "Promoção 10 Polpas de Cupuaçu",
    desc: "Leve 10 polpas de cupuaçu e economize ainda mais.",
    price: 150,
    img: "assets/polpa_cupuacu.png"
  }
];

let cart = [];

function formatMoney(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function getEl(id) {
  return document.getElementById(id);
}

function renderProducts() {
  const grid = getEl("productGrid");
  if (!grid) return;

  grid.innerHTML = products.map((p, index) => `
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='assets/acai_placeholder.svg'">
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${formatMoney(p.price)}</div>
        <button type="button" onclick="addToCart(${index})">Adicionar ao pedido</button>
      </div>
    </article>
  `).join("");
}

function addToCart(index) {
  const product = products[index];
  if (!product) return;

  const found = cart.find(item => item.name === product.name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  const cartPanel = getEl("cart");
  if (cartPanel) cartPanel.classList.add("open");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const cartCount = getEl("cartCount");
  const cartTotal = getEl("cartTotal");
  const items = getEl("cartItems");

  if (cartCount) cartCount.textContent = count;
  if (cartTotal) cartTotal.textContent = formatMoney(total);
  if (!items) return;

  if (cart.length === 0) {
    items.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  items.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.qty} × ${formatMoney(item.price)} = ${formatMoney(item.qty * item.price)}</small>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button type="button" onclick="changeQty(${index}, -1)">−</button>
          <button type="button" onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
      <button type="button" onclick="removeFromCart(${index})">×</button>
    </div>
  `).join("");
}

function toggleCart() {
  const cartPanel = getEl("cart");
  if (cartPanel) cartPanel.classList.toggle("open");
}

function toggleMenu() {
  const nav = getEl("nav");
  if (nav) nav.classList.toggle("open");
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

function pegarFormaPagamento() {
  const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked');
  return pagamentoSelecionado ? pagamentoSelecionado.value : "Não informado";
}

function sendOrder() {
  if (cart.length === 0) {
    alert("Adicione pelo menos um produto ao carrinho antes de finalizar.");
    return;
  }

  const formaPagamento = pegarFormaPagamento();
  const cliente = getClienteLogado();

  const lines = cart.map(item => `• ${item.qty}x ${item.name} - ${formatMoney(item.qty * item.price)}`);
  const total = cart.reduce((sum, item) => sum + (item.qty * item.price), 0);

  const dadosCliente = cliente ? [
    `Cliente: ${cliente.nome || "Não informado"}`,
    `WhatsApp do cliente: ${cliente.telefone || "Não informado"}`,
    `E-mail: ${cliente.email || "Não informado"}`,
    `Endereço: ${cliente.endereco || "Não informado"}`,
    `Cidade/Estado: ${cliente.cidade || "Não informado"}`
  ] : ["Cliente: Não cadastrado no site"];

  const message = [
    "Olá! Quero fazer este pedido no Açaí da Praça:",
    "",
    ...lines,
    "",
    `Total estimado: ${formatMoney(total)}`,
    `Forma de pagamento: ${formaPagamento}`,
    "",
    ...dadosCliente,
    "",
    "Pode confirmar disponibilidade e entrega?"
  ].join("\n");

  salvarPedidoRelatorio({
    formaPagamento,
    cliente,
    items: cart,
    total
  });

  openWhatsApp(message);
}

function sendQuote(event) {
  event.preventDefault();
  const name = getEl("quoteName")?.value || "";
  const city = getEl("quoteCity")?.value || "";
  const cep = getEl("quoteCep")?.value || "";
  const qty = getEl("quoteQty")?.value || "";

  const message = [
    "Olá! Quero consultar entrega do Açaí da Praça para todo o Brasil.",
    "",
    `Nome: ${name}`,
    `Cidade/Estado: ${city}`,
    `CEP: ${cep}`,
    `Quantidade: ${qty}`
  ].join("\n");

  openWhatsApp(message);
}

function sendContact(event) {
  event.preventDefault();
  const name = getEl("contactName")?.value || "";
  const phone = getEl("contactPhone")?.value || "";
  const msg = getEl("contactMsg")?.value || "";

  const message = [
    `Olá! Meu nome é ${name}.`,
    `Telefone: ${phone}`,
    "",
    msg
  ].join("\n");

  openWhatsApp(message);
}

// ==============================
// LOGIN E CADASTRO DEMONSTRATIVO
// ==============================
function abrirLogin() {
  const modal = getEl("loginModal");
  if (modal) {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    mostrarAbaCliente("login");
  }
}

function abrirCadastro() {
  const modal = getEl("loginModal");
  if (modal) {
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    mostrarAbaCliente("cadastro");
  }
}

function fecharLogin() {
  const modal = getEl("loginModal");
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function mostrarAbaCliente(aba) {
  const loginArea = getEl("loginArea");
  const cadastroArea = getEl("cadastroArea");
  const tabLogin = getEl("tabLoginBtn");
  const tabCadastro = getEl("tabCadastroBtn");

  if (!loginArea || !cadastroArea || !tabLogin || !tabCadastro) return;

  const cadastroAtivo = aba === "cadastro";
  loginArea.classList.toggle("active", !cadastroAtivo);
  cadastroArea.classList.toggle("active", cadastroAtivo);
  tabLogin.classList.toggle("active", !cadastroAtivo);
  tabCadastro.classList.toggle("active", cadastroAtivo);
}

function getClientesCadastrados() {
  try {
    const clientes = JSON.parse(localStorage.getItem("acaiClientes") || "[]");
    return Array.isArray(clientes) ? clientes : [];
  } catch (error) {
    return [];
  }
}

function salvarClientesCadastrados(clientes) {
  localStorage.setItem("acaiClientes", JSON.stringify(clientes));
}

function setClienteLogado(cliente) {
  localStorage.setItem("acaiClienteLogado", "sim");
  localStorage.setItem("acaiClienteLogadoDados", JSON.stringify(cliente));
  atualizarBotaoLogin();
}

function getClienteLogado() {
  try {
    const cliente = JSON.parse(localStorage.getItem("acaiClienteLogadoDados") || "null");
    return cliente && cliente.email ? cliente : null;
  } catch (error) {
    return null;
  }
}

function fazerLogin() {
  const email = (getEl("emailLogin")?.value || "").trim().toLowerCase();
  const senha = getEl("senhaLogin")?.value || "";

  if (!email || !senha) {
    alert("Informe e-mail e senha para entrar.");
    return;
  }

  if (email === DEMO_LOGIN.email && senha === DEMO_LOGIN.senha) {
    setClienteLogado({ ...DEMO_LOGIN });
    alert("Login realizado com sucesso!");
    fecharLogin();
    return;
  }

  const clientes = getClientesCadastrados();
  const cliente = clientes.find(item => item.email === email && item.senha === senha);

  if (cliente) {
    setClienteLogado(cliente);
    alert(`Bem-vindo(a), ${cliente.nome}!`);
    fecharLogin();
  } else {
    alert("E-mail ou senha incorretos. Você pode entrar com o login teste ou criar um cadastro.");
  }
}

function cadastrarCliente() {
  const nome = (getEl("cadastroNome")?.value || "").trim();
  const telefone = (getEl("cadastroTelefone")?.value || "").trim();
  const email = (getEl("cadastroEmail")?.value || "").trim().toLowerCase();
  const senha = getEl("cadastroSenha")?.value || "";
  const endereco = (getEl("cadastroEndereco")?.value || "").trim();
  const cidade = (getEl("cadastroCidade")?.value || "").trim();

  if (!nome || !telefone || !email || !senha) {
    alert("Preencha nome, WhatsApp, e-mail e senha para cadastrar.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Informe um e-mail válido.");
    return;
  }

  if (senha.length < 6) {
    alert("A senha precisa ter pelo menos 6 caracteres.");
    return;
  }

  const clientes = getClientesCadastrados();
  const emailJaExiste = clientes.some(item => item.email === email) || email === DEMO_LOGIN.email;

  if (emailJaExiste) {
    alert("Este e-mail já está cadastrado. Use outro e-mail ou faça login.");
    mostrarAbaCliente("login");
    return;
  }

  const novoCliente = {
    nome,
    telefone,
    email,
    senha,
    endereco,
    cidade,
    cadastradoEm: new Date().toLocaleString("pt-BR")
  };
  clientes.push(novoCliente);
  salvarClientesCadastrados(clientes);
  setClienteLogado(novoCliente);

  alert("Cadastro realizado com sucesso!");
  fecharLogin();
}

function sairLogin() {
  localStorage.removeItem("acaiClienteLogado");
  localStorage.removeItem("acaiClienteLogadoDados");
  atualizarBotaoLogin();
  alert("Você saiu da área do cliente.");
}

function atualizarBotaoLogin() {
  const btn = document.querySelector(".login-btn");
  if (!btn) return;

  const cliente = getClienteLogado();
  if (cliente) {
    const primeiroNome = (cliente.nome || "Cliente").split(" ")[0];
    btn.innerHTML = `✅ ${primeiroNome}`;
    btn.onclick = sairLogin;
    btn.title = "Clique para sair";
  } else {
    btn.innerHTML = "👤 Entrar";
    btn.onclick = abrirLogin;
    btn.title = "Entrar ou cadastrar cliente";
  }
}

function configurarModalLogin() {
  const modal = getEl("loginModal");
  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) fecharLogin();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharLogin();
  });
}


// ==============================
// PAINEL ADMINISTRATIVO DEMONSTRATIVO
// ==============================
function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPedidosRegistrados() {
  try {
    const pedidos = JSON.parse(localStorage.getItem("acaiPedidos") || "[]");
    return Array.isArray(pedidos) ? pedidos : [];
  } catch (error) {
    return [];
  }
}

function salvarPedidosRegistrados(pedidos) {
  localStorage.setItem("acaiPedidos", JSON.stringify(pedidos));
}

function salvarPedidoRelatorio({ formaPagamento, cliente, items, total }) {
  const pedidos = getPedidosRegistrados();
  const pedido = {
    id: String(Date.now()),
    data: new Date().toLocaleString("pt-BR"),
    clienteNome: cliente?.nome || "Não cadastrado",
    clienteTelefone: cliente?.telefone || "Não informado",
    clienteEmail: cliente?.email || "Não informado",
    clienteEndereco: cliente?.endereco || "Não informado",
    clienteCidade: cliente?.cidade || "Não informado",
    formaPagamento: formaPagamento || "Não informado",
    itens: (items || []).map(item => ({
      nome: item.name,
      quantidade: item.qty,
      preco: item.price,
      subtotal: item.qty * item.price
    })),
    total: Number(total || 0),
    status: "Enviado para WhatsApp"
  };

  pedidos.push(pedido);
  salvarPedidosRegistrados(pedidos);
}

function abrirAdminLogin() {
  const modal = getEl("adminModal");
  if (!modal) return;
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  if (localStorage.getItem("acaiAdminLogado") === "sim") {
    mostrarPainelAdmin();
  } else {
    mostrarLoginAdmin();
  }
}

function fecharAdmin() {
  const modal = getEl("adminModal");
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function mostrarLoginAdmin() {
  const loginArea = getEl("adminLoginArea");
  const panelArea = getEl("adminPanelArea");
  if (loginArea) loginArea.style.display = "block";
  if (panelArea) panelArea.style.display = "none";
}

function mostrarPainelAdmin() {
  const loginArea = getEl("adminLoginArea");
  const panelArea = getEl("adminPanelArea");
  if (loginArea) loginArea.style.display = "none";
  if (panelArea) panelArea.style.display = "block";
  renderAdminReports();
}

function fazerLoginAdmin() {
  const email = (getEl("adminEmail")?.value || "").trim().toLowerCase();
  const senha = getEl("adminSenha")?.value || "";

  if (email === ADMIN_LOGIN.email && senha === ADMIN_LOGIN.senha) {
    localStorage.setItem("acaiAdminLogado", "sim");
    mostrarPainelAdmin();
  } else {
    alert("Login de admin incorreto. Use o login teste informado no painel.");
  }
}

function sairAdmin() {
  localStorage.removeItem("acaiAdminLogado");
  mostrarLoginAdmin();
}

function contarPagamentos(pedidos) {
  return pedidos.reduce((acc, pedido) => {
    const metodo = pedido.formaPagamento || "Não informado";
    acc[metodo] = (acc[metodo] || 0) + 1;
    return acc;
  }, {});
}

function renderAdminReports() {
  const clientes = getClientesCadastrados();
  const pedidos = getPedidosRegistrados();
  const resumo = getEl("adminResumo");
  const clienteBody = getEl("clienteReportBody");
  const pedidoBody = getEl("pedidoReportBody");

  const receita = pedidos.reduce((sum, pedido) => sum + Number(pedido.total || 0), 0);
  const pagamentos = contarPagamentos(pedidos);
  const pagamentosTexto = Object.entries(pagamentos)
    .map(([metodo, qtd]) => `${escapeHTML(metodo)}: ${qtd}`)
    .join("<br>") || "Nenhum pagamento registrado";

  if (resumo) {
    resumo.innerHTML = `
      <div class="summary-card"><strong>${clientes.length}</strong><span>Clientes cadastrados</span></div>
      <div class="summary-card"><strong>${pedidos.length}</strong><span>Pedidos enviados</span></div>
      <div class="summary-card"><strong>${formatMoney(receita)}</strong><span>Total estimado</span></div>
      <div class="summary-card"><strong>Pagamentos</strong><span>${pagamentosTexto}</span></div>
    `;
  }

  if (clienteBody) {
    if (clientes.length === 0) {
      clienteBody.innerHTML = `<tr><td colspan="6">Nenhum cliente cadastrado neste navegador.</td></tr>`;
    } else {
      clienteBody.innerHTML = clientes.map(cliente => `
        <tr>
          <td>${escapeHTML(cliente.nome)}</td>
          <td>${escapeHTML(cliente.telefone)}</td>
          <td>${escapeHTML(cliente.email)}</td>
          <td>${escapeHTML(cliente.endereco || "-")}</td>
          <td>${escapeHTML(cliente.cidade || "-")}</td>
          <td>${escapeHTML(cliente.cadastradoEm || "-")}</td>
        </tr>
      `).join("");
    }
  }

  if (pedidoBody) {
    if (pedidos.length === 0) {
      pedidoBody.innerHTML = `<tr><td colspan="6">Nenhum pedido enviado neste navegador.</td></tr>`;
    } else {
      pedidoBody.innerHTML = pedidos.slice().reverse().map(pedido => {
        const itensTexto = (pedido.itens || [])
          .map(item => `${item.quantidade}x ${item.nome}`)
          .join(", ");

        return `
          <tr>
            <td>${escapeHTML(pedido.data)}</td>
            <td>${escapeHTML(pedido.clienteNome)}</td>
            <td>${escapeHTML(pedido.clienteTelefone)}</td>
            <td>${escapeHTML(pedido.formaPagamento)}</td>
            <td>${escapeHTML(itensTexto)}</td>
            <td>${formatMoney(pedido.total || 0)}</td>
          </tr>
        `;
      }).join("");
    }
  }
}

function csvValue(value) {
  const text = String(value ?? "").replaceAll('"', '""');
  return `"${text}"`;
}

function baixarCSV(nomeArquivo, linhas) {
  const conteudo = "\uFEFF" + linhas.map(linha => linha.map(csvValue).join(";")).join("\n");
  const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function baixarRelatorioClientesCSV() {
  const clientes = getClientesCadastrados();
  const linhas = [["Nome", "WhatsApp", "E-mail", "Endereço", "Cidade/Estado", "Data do cadastro"]];
  clientes.forEach(cliente => {
    linhas.push([
      cliente.nome || "",
      cliente.telefone || "",
      cliente.email || "",
      cliente.endereco || "",
      cliente.cidade || "",
      cliente.cadastradoEm || ""
    ]);
  });
  baixarCSV("relatorio-clientes-acai-da-praca.csv", linhas);
}

function baixarRelatorioPedidosCSV() {
  const pedidos = getPedidosRegistrados();
  const linhas = [["Data", "Cliente", "WhatsApp", "E-mail", "Cidade", "Forma de pagamento", "Itens", "Total", "Status"]];
  pedidos.forEach(pedido => {
    const itensTexto = (pedido.itens || [])
      .map(item => `${item.quantidade}x ${item.nome} = ${formatMoney(item.subtotal || 0)}`)
      .join(" | ");
    linhas.push([
      pedido.data || "",
      pedido.clienteNome || "",
      pedido.clienteTelefone || "",
      pedido.clienteEmail || "",
      pedido.clienteCidade || "",
      pedido.formaPagamento || "",
      itensTexto,
      formatMoney(pedido.total || 0),
      pedido.status || ""
    ]);
  });
  baixarCSV("relatorio-pedidos-pagamentos-acai-da-praca.csv", linhas);
}

function limparRelatoriosPedidos() {
  const confirmar = confirm("Tem certeza que deseja limpar todos os pedidos salvos neste navegador? Os clientes cadastrados não serão apagados.");
  if (!confirmar) return;
  salvarPedidosRegistrados([]);
  renderAdminReports();
}

function configurarModalAdmin() {
  const modal = getEl("adminModal");
  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) fecharAdmin();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") fecharAdmin();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  atualizarBotaoLogin();
  configurarModalLogin();
  configurarModalAdmin();

  const whatsHero = getEl("whatsHero");
  if (whatsHero) {
    whatsHero.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero fazer um pedido no Açaí da Praça.")}`;
  }
});
