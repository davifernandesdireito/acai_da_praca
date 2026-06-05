// Edite aqui o número do WhatsApp com DDI + DDD.
// Exemplo: 5591999999999
const WHATSAPP_NUMBER = "5591993217906";

const products = [
  {
    name: "Açaí Premium 500ml",
    desc: "Porção individual cremosa para consumir na hora.",
    price: 13,
    img: "assets/produtos.jp"
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
    img: "assets/produtos.jp"
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
    img: "assets/polpa_cupuaçu.png"
  },
  {
    name: "Promoção 5 Polpas de Cupuaçu",
    desc: "Leve 5 polpas de cupuaçu por um preço especial.",
    price: 80,
    img: "assets/polpa_cupuaçu.png"
  },
  {
    name: "Promoção 10 Polpas de Cupuaçu",
    desc: "Leve 10 polpas de cupuaçu e economize ainda mais.",
    price: 150,
    img: "assets/polpa_cupuaçu.png"
  }
];

let cart = [];

function formatMoney(value){
  return value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map((p, index) => `
    <article class="product">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${formatMoney(p.price)}</div>
        <button onclick="addToCart(${index})">Adicionar ao pedido</button>
      </div>
    </article>
  `).join("");
}

function addToCart(index){
  const product = products[index];
  const found = cart.find(item => item.name === product.name);
  if(found){
    found.qty += 1;
  }else{
    cart.push({...product, qty:1});
  }
  renderCart();
  document.getElementById("cart").classList.add("open");
}

function removeFromCart(index){
  cart.splice(index,1);
  renderCart();
}

function changeQty(index, delta){
  cart[index].qty += delta;
  if(cart[index].qty <= 0) cart.splice(index,1);
  renderCart();
}

function renderCart(){
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  const total = cart.reduce((sum,item)=>sum+(item.qty*item.price),0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = formatMoney(total);
  const items = document.getElementById("cartItems");

  if(cart.length === 0){
    items.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  items.innerHTML = cart.map((item,index)=>`
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <small>${item.qty} × ${formatMoney(item.price)} = ${formatMoney(item.qty*item.price)}</small>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button onclick="changeQty(${index},-1)">−</button>
          <button onclick="changeQty(${index},1)">+</button>
        </div>
      </div>
      <button onclick="removeFromCart(${index})">×</button>
    </div>
  `).join("");
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("open");
}

function toggleMenu(){
  document.getElementById("nav").classList.toggle("open");
}

function openWhatsApp(message){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

function sendOrder(){
  if(cart.length === 0){
    openWhatsApp("Olá! Quero fazer um pedido no Açaí da Praça.");
    return;
  }

  const lines = cart.map(item => `• ${item.qty}x ${item.name} - ${formatMoney(item.qty*item.price)}`);
  const total = cart.reduce((sum,item)=>sum+(item.qty*item.price),0);
  const message = `Olá! Quero fazer este pedido no Açaí da Praça:%0A%0A${lines.join("%0A")}%0A%0ATotal estimado: ${formatMoney(total)}%0A%0APode confirmar disponibilidade, forma de pagamento e entrega?`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener");
}

function sendQuote(event){
  event.preventDefault();
  const name = document.getElementById("quoteName").value;
  const city = document.getElementById("quoteCity").value;
  const cep = document.getElementById("quoteCep").value;
  const qty = document.getElementById("quoteQty").value;
  const message = `Olá! Quero consultar entrega do Açaí da Praça para todo o Brasil.%0A%0ANome: ${name}%0ACidade/Estado: ${city}%0ACEP: ${cep}%0AQuantidade: ${qty}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener");
}

function sendContact(event){
  event.preventDefault();
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  const msg = document.getElementById("contactMsg").value;
  const message = `Olá! Meu nome é ${name}.%0ATelefone: ${phone}%0A%0A${msg}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank", "noopener");
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  document.getElementById("whatsHero").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero fazer um pedido no Açaí da Praça.")}`;
});
