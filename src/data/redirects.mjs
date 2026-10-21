// Rotas do site antigo (Horizons) que não existem mais como página. GitHub Pages não faz 301 de verdade:
// o Astro gera uma página de redirecionamento (meta refresh + canonical para o destino) em cada uma.
// Destinos conforme a direção de marketing/SEO. Em /blog: o site antigo tinha só uma lista de cartões, sem posts com URL própria.
export const REDIRECTS = {
  '/about/': '/sobre/',
  '/cases/': '/sobre/',
  '/propositoeimpacto/': '/sobre/',
  '/manifesto/': '/sobre/',
  '/enterprise/': '/transformacao-digital/',
  '/pme/': '/servicos/',
  '/solutions/': '/servicos/',
  '/contact/': '/contato/',
  '/products/aurora-premium/': 'https://aurorapremium.com/',
  '/products/lumo/': '/engagebot/',
  '/products/orchestra-agile/': '/desenvolvimento-de-software/',
  '/blog/': '/',
};
