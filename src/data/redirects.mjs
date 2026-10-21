// Rotas do site antigo (Horizons) que não existem mais como página. GitHub Pages não faz 301 de verdade:
// o Astro gera uma página de redirecionamento (meta refresh + canonical para o destino) em cada uma.
export const REDIRECTS = {
  '/about/': '/sobre/',
  '/cases/': '/sobre/',
  '/propositoeimpacto/': '/proposito-e-impacto/',
  '/manifesto/': '/proposito-e-impacto/',
  '/enterprise/': '/para-grandes-empresas/',
  '/pme/': '/para-pequenas-e-medias-empresas/',
  '/solutions/': '/servicos/',
  '/contact/': '/contato/',
  '/products/aurora-premium/': 'https://aurorapremium.com/',
  '/products/lumo/': 'https://engagebot.com.br/',
  '/products/orchestra-agile/': '/desenvolvimento-de-software/',
};
