# Site Açaí da Praça

Site estático pronto para divulgar produtos, receber pedidos pelo WhatsApp e apresentar entrega sob consulta para todo o Brasil.

## Arquivos
- `index.html`: página principal do site
- `styles.css`: visual e responsividade
- `script.js`: carrinho, produtos e botão do WhatsApp
- `assets/`: imagens usadas no site

## Como editar o WhatsApp
Abra o arquivo `script.js` e altere:

```js
const WHATSAPP_NUMBER = "5591900000000";
```

Coloque o número real com DDI e DDD. Exemplo:
```js
const WHATSAPP_NUMBER = "5591999999999";
```

## Como editar produtos e preços
No arquivo `script.js`, altere a lista `products`.

Exemplo:
```js
{
  name: "Açaí Premium 1L",
  desc: "Açaí puro e cremoso.",
  price: 18,
  img: "assets/produtos.jpg"
}
```

## Como publicar
Você pode enviar a pasta para:
- Hostinger
- Registro.br + hospedagem
- Netlify
- Vercel
- GitHub Pages

Para testar no computador, abra o arquivo `index.html` no navegador.
