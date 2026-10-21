// Configuração única do site. O resto do código (astro.config, sitemap, robots, llms.txt, verificações) lê daqui.
export const SITE = {
  url: 'https://roquebusinessevolution.com',
  repo: 'roque-business-evolution-site',
  name: 'Roque Business Evolution',
  legalName: 'Roque Business Evolution Serviços Ltda.',
  cnpj: '47.308.584/0001-20',
  email: 'contato@roquebusinessevolution.com',
  lang: 'pt-BR',
  themeColor: '#16233A',
  wa: {
    number: '5511973967161',
    label: '+55 11 97396-7161',
    text: 'Olá! Quero falar com a Roque Business Evolution.',
  },
  instagram: 'https://www.instagram.com/roquebusinessevolution/',
  founder: {
    name: 'Viviane Roque',
    site: 'https://viviroque.com.br/',
    linkedin: 'https://www.linkedin.com/in/vivianepereirambas/',
    instagram: 'https://www.instagram.com/viviroqueoficial/',
    id: 'https://viviroque.com.br/#viviane-roque',
  },
  aurora: 'https://aurorapremium.com/',
  auroraId: 'https://aurorapremium.com/#org',
};
export const waHref = (text = SITE.wa.text) => `https://wa.me/${SITE.wa.number}?text=${encodeURIComponent(text)}`;
