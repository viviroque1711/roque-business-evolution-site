// Páginas de serviço que completam os 17 serviços do portfólio (5.1 a 5.17) e as aplicações de agentes de IA (5.9).
// Fonte: fontes-originais/portfolio-roque-business-evolution.md. Sem preço, sem cliente, sem resultado inventado.
import { li, cols, steps, p, group, note, aEngage, aAurora } from './kit.mjs';
import { servicePage } from './schema.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });

export const pesquisa = servicePage({
  path: '/pesquisa-de-palavras-chave/', og: 'pesquisa-de-palavras-chave', crumbName: 'Pesquisa de palavras-chave',
  title: 'Pesquisa de Palavras-Chave e Intenção de Busca | Roque',
  description: 'Pesquisa de palavras-chave com análise de concorrência, intenção de busca e mapa por página para evitar canibalização. Roque Business Evolution.',
  h1: 'Pesquisa de palavras-chave que descobre o que o seu público procura e por quê',
  lead: 'A pesquisa de palavras-chave da Roque Business Evolution descobre o que o seu público procura, por que procura e em que etapa da decisão está, e transforma isso em um mapa de páginas para o seu site.',
  msg: 'Olá! Quero uma pesquisa de palavras-chave para o meu negócio.',
  serviceName: 'Pesquisa de palavras-chave, intenção de busca e contexto semântico', serviceType: 'Pesquisa de palavras-chave',
  serviceDescription: 'Pesquisa de mercado e concorrência, classificação de palavras-chave, mapeamento de intenção de busca, contexto semântico e mapa de palavras-chave por página.',
  sections: [
    { id: 'como-funciona', h2: 'Como funciona a pesquisa de palavras-chave', html: `${p('A pesquisa de palavras-chave é a base de uma estratégia de SEO: ela mostra a linguagem do público e orienta o que cada página do site deve responder.')}${steps([
      ['Mercado e concorrência', 'Identificamos os concorrentes orgânicos e comerciais, as páginas que ganham visibilidade e as lacunas de conteúdo.'],
      ['Pesquisa e classificação', 'Listamos palavras-chave principais e secundárias, termos de cauda longa, variações semânticas e perguntas reais.'],
      ['Intenção de busca', 'Associamos cada grupo de termos à intenção predominante de quem pesquisa.'],
      ['Contexto semântico', 'Definimos assuntos centrais, subtemas, entidades e relações entre os conceitos do seu negócio.'],
      ['Mapa por página', 'Cada página recebe uma finalidade, um tema central e uma intenção prioritária.'],
      ['Monitoramento', 'Acompanhamos impressões, cliques, posições e conversões que nascem da busca.'],
    ])}` },
    { id: 'intencao-de-busca', h2: 'Intenção de busca e palavras-chave: informacional, comercial, transacional e navegacional', html: `${p('A intenção de busca é o motivo por trás da pesquisa. Entender essa intenção evita escrever uma página que não responde ao que a pessoa quer.')}${li([
      '<b>Informacional.</b> A pessoa quer aprender ou resolver uma dúvida.',
      '<b>Comercial.</b> Está comparando alternativas e fornecedores.',
      '<b>Transacional.</b> Está pronta para contratar, comprar ou pedir um orçamento.',
      '<b>Navegacional.</b> Procura uma empresa, marca ou produto específico.',
    ])}${p('Também classificamos termos locais, regionais e específicos de cada segmento, e os termos com intenção clara de contratação.')}` },
    { id: 'contexto-semantico', h2: 'Palavras-chave, contexto semântico e topic clusters para o seu SEO', html: `${p('Contexto semântico é a rede de assuntos, conceitos e perguntas que cerca o seu tema. Construí-lo mostra aos buscadores que o seu site cobre o assunto com profundidade.')}${li([
      'Definição dos assuntos centrais e dos subtemas.',
      'Identificação de entidades, conceitos, produtos, serviços e relações relevantes.',
      'Grupos temáticos (topic clusters) e páginas pilares com conteúdos complementares.',
      'Lista das perguntas que precisam ser respondidas.',
      'Alinhamento entre conteúdo, público, oferta e etapa da jornada de compra.',
    ])}` },
    { id: 'mapa-por-pagina', h2: 'Mapa de palavras-chave por página e canibalização', html: `${p('Quando duas páginas do mesmo site disputam a mesma busca, ocorre a canibalização de palavras-chave. O mapa de palavras-chave por página evita isso: cada página tem uma finalidade clara.')}${group('Entregáveis possíveis', cols(['Matriz de palavras-chave.', 'Mapa de intenção de busca.', 'Análise de concorrência.', 'Mapa de conteúdo.', 'Calendário editorial.', 'Plano de otimização por prioridade.']))}` },
  ],
  faq: [
    Q('O que é pesquisa de palavras-chave?', 'É o estudo dos termos e das perguntas que o público usa nas buscas, para orientar o conteúdo e a estrutura do site.'),
    Q('O que é intenção de busca?', 'É o objetivo de quem pesquisa: aprender, comparar, contratar ou encontrar uma marca. Ela define o tipo de página que melhor responde.'),
    Q('O que é canibalização de palavras-chave?', 'É quando duas ou mais páginas do mesmo site disputam a mesma busca e atrapalham uma à outra. O mapa de palavras-chave por página evita esse problema.'),
    Q('Que dados vocês usam na pesquisa?', 'Dados do Google Search Console, ferramentas de pesquisa de palavras-chave, análise das páginas que ocupam as primeiras posições e pesquisa de perguntas reais do público.'),
    Q('A pesquisa garante o primeiro lugar no Google?', 'Não. Ninguém pode garantir posição. A pesquisa orienta o conteúdo e aumenta as chances de aparecer para as buscas certas.'),
  ],
  related: [['/seo/', 'SEO e busca com IA'], ['/geo-aeo/', 'GEO e AEO'], ['/marketing-de-conteudo/', 'Marketing de conteúdo'], ['/criacao-de-sites/', 'Criação de sites']],
  ctaH2: 'Vamos descobrir o que o seu público procura', ctaP: 'Conte o que a sua empresa vende e quem você quer alcançar. A Roque Business Evolution responde pelo WhatsApp.',
});

export const geo = servicePage({
  path: '/geo-aeo/', og: 'geo-aeo', crumbName: 'GEO e AEO',
  title: 'GEO e AEO: SEO para Buscas com IA | Roque',
  description: 'GEO e AEO: como organizar o conteúdo do seu site para ser entendido por buscas com inteligência artificial, sem promessa de citação. Roque.',
  h1: 'GEO e AEO: como preparar o seu site para buscas com inteligência artificial',
  lead: 'GEO (Generative Engine Optimization) e AEO (Answer Engine Optimization) organizam as informações da sua empresa para que buscadores e assistentes de IA entendam quem você é, o que oferece e para quem. A Roque Business Evolution aplica as duas sobre a base do SEO e não promete citação em respostas de IA.',
  msg: 'Olá! Quero preparar o meu site para buscas com inteligência artificial (GEO e AEO).',
  serviceName: 'GEO e AEO: otimização para buscas com inteligência artificial', serviceType: 'Otimização para mecanismos de resposta e IA generativa',
  serviceDescription: 'Auditoria da presença digital, páginas que respondem perguntas, perguntas frequentes com dados estruturados e consistência de informações para buscas tradicionais e com IA.',
  sections: [
    { id: 'o-que-sao', h2: 'GEO e AEO: o que são e como complementam o SEO', html: `${p('GEO significa Generative Engine Optimization, a otimização para mecanismos de resposta generativos. AEO significa Answer Engine Optimization, a otimização para mecanismos que respondem perguntas. As duas complementam o SEO tradicional.')}${p('O foco é tornar as informações da empresa úteis, consistentes, verificáveis e fáceis de compreender e relacionar, tanto por pessoas quanto por sistemas de busca e assistentes de IA.')}` },
    { id: 'o-que-fazemos', h2: 'O que fazemos em GEO e AEO para o seu site', html: li([
      '<b>Auditoria</b> da presença digital e das informações institucionais.',
      '<b>Páginas que respondem a perguntas</b> específicas sobre serviços, diferenciais e aplicações.',
      '<b>Perguntas frequentes</b> quando realmente úteis, com dados estruturados iguais ao texto visível.',
      '<b>Consistência</b> entre site, perfis empresariais e fontes relevantes.',
      '<b>Conteúdo original, especializado e fundamentado.</b>',
      '<b>Organização das informações</b> sobre produtos, serviços, áreas de atuação e localização.',
      '<b>Monitoramento</b> de consultas e referências identificáveis em ferramentas disponíveis.',
    ]) },
    { id: 'como-escrever', h2: 'GEO e AEO na prática: a primeira frase já responde', html: `${p('Assistentes de IA costumam usar o trecho que responde de forma direta. Por isso cada seção começa com uma frase que já responde à dúvida, e só depois aprofunda.')}${li(['Títulos que refletem as perguntas reais do público.', 'Definições claras no início de cada tema.', 'Nome da empresa, serviços e localização escritos de forma consistente em todas as páginas.', 'HTML com o conteúdo principal, sem depender de JavaScript para ser lido.', 'Arquivo llms.txt como índice de apoio, sem expectativa de garantia.'])}` },
    { id: 'limites', h2: 'O que ninguém pode prometer em GEO e AEO', html: `${note('Seguimos as orientações oficiais de SEO do Google. Não prometemos inclusão em respostas de IA nem vendemos atalho para obter citações. A elegibilidade, a exibição e a frequência de referências dependem de sistemas externos e não podem ser garantidas por nenhuma agência.')}${p('O que fazemos é reduzir ambiguidades, melhorar a clareza e fortalecer as fontes que descrevem a sua empresa.')}` },
  ],
  faq: [
    Q('Qual é a diferença entre SEO, GEO e AEO?', 'SEO otimiza o site para os resultados de busca tradicionais. AEO organiza respostas diretas para mecanismos que respondem perguntas. GEO prepara o conteúdo para sistemas de IA generativa. Os três se apoiam na mesma base técnica e de conteúdo.'),
    Q('GEO e AEO garantem que a minha empresa apareça no ChatGPT?', 'Não. Nenhuma ação garante citação em respostas de IA. O trabalho torna a informação mais clara e verificável, o que ajuda, mas a exibição depende de sistemas externos.'),
    Q('Dados estruturados são suficientes?', 'Não. Os dados estruturados ajudam a descrever o conteúdo, mas precisam refletir o que está visível na página, e o conteúdo precisa ser útil e original.'),
    Q('Como medir o resultado de GEO e AEO?', 'Acompanhamos referências identificáveis, tráfego vindo de ferramentas de IA e presença observável em respostas, além dos indicadores de SEO como impressões, cliques e conversões.'),
    Q('Posso usar IA para escrever o conteúdo do site?', 'Pode, com revisão editorial e verificação factual. O conteúdo deve ser original, útil e fiel ao que a empresa realmente faz.'),
  ],
  related: [['/seo/', 'SEO e busca com IA'], ['/pesquisa-de-palavras-chave/', 'Pesquisa de palavras-chave'], ['/marketing-de-conteudo/', 'Marketing de conteúdo'], ['/criacao-de-sites/', 'Criação de sites']],
  ctaH2: 'Vamos deixar a sua empresa clara para buscas com IA', ctaP: 'Conte o que o seu site diz hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const conteudo = servicePage({
  path: '/marketing-de-conteudo/', og: 'marketing-de-conteudo', crumbName: 'Marketing de conteúdo',
  title: 'Marketing de Conteúdo e Autoridade Temática | Roque',
  description: 'Marketing de conteúdo com estratégia editorial, artigos, guias e páginas pilares para atrair o público certo e construir autoridade. Roque.',
  h1: 'Marketing de conteúdo que atrai o público certo e constrói autoridade no seu tema',
  lead: 'O marketing de conteúdo da Roque Business Evolution cria artigos, guias e páginas úteis para atrair o público certo, esclarecer dúvidas e apoiar a decisão de compra, com foco em conteúdo original e em autoridade temática.',
  msg: 'Olá! Quero conversar sobre marketing de conteúdo para a minha empresa.',
  serviceName: 'Marketing de conteúdo e autoridade temática', serviceType: 'Marketing de conteúdo',
  serviceDescription: 'Estratégia editorial, calendário de conteúdo, artigos, guias, e-books, roteiros e atualização de conteúdos, com revisão editorial e verificação factual.',
  sections: [
    { id: 'estrategia-editorial', h2: 'Estratégia editorial de marketing de conteúdo', html: `${p('A estratégia editorial define o que publicar, para quem e em que canal, a partir da pesquisa de mercado e das palavras-chave.')}${li(['Estratégia editorial baseada em pesquisa de mercado.', 'Calendário de conteúdo por canal e por objetivo.', 'Clusters de conteúdo e páginas pilares.', 'Estratégias de distribuição e reaproveitamento de conteúdo.'])}` },
    { id: 'formatos', h2: 'Marketing de conteúdo: formatos como artigos, guias, e-books e vídeos', html: cols(['Artigos para blogs e páginas de recursos.', 'Guias e materiais educativos.', 'Estudos de caso, quando houver casos reais autorizados.', 'Conteúdo para páginas de serviços.', 'Conteúdo para redes sociais.', 'Roteiros para vídeos e materiais audiovisuais.', 'E-books e materiais para geração de leads.', 'Atualização de conteúdos existentes.']) },
    { id: 'qualidade', h2: 'Marketing de conteúdo original, revisado e fiel ao seu negócio', html: `${p('O foco é produzir conteúdo original, útil e alinhado às necessidades reais do público, evitando a publicação indiscriminada de páginas automatizadas sem valor adicional.')}${li(['Revisão editorial e verificação factual de conteúdos assistidos por IA.', 'Linguagem do seu público, com termos e perguntas reais.', 'Links internos entre artigos, páginas de serviços e produtos.'])}` },
  ],
  faq: [
    Q('O que é marketing de conteúdo?', 'É criar conteúdo útil, como artigos, guias e vídeos, para atrair e orientar o público que tem interesse no seu negócio, em vez de depender só de anúncios.'),
    Q('O que é autoridade temática?', 'É a percepção de que o seu site cobre um assunto com profundidade e consistência. Ela se constrói com páginas pilares e conteúdos complementares sobre o mesmo tema.'),
    Q('Vocês usam inteligência artificial para escrever?', 'Usamos IA como apoio, sempre com revisão editorial e verificação factual. O objetivo é conteúdo original e útil, e não páginas automatizadas em massa.'),
    Q('Quantos artigos preciso publicar?', 'Depende do mercado e da concorrência. A estratégia editorial define o volume e a prioridade a partir da pesquisa de palavras-chave.'),
    Q('O conteúdo ajuda no SEO?', 'Sim. Conteúdo que responde às perguntas do público, bem estruturado e interligado, é uma das bases do <a href="/seo/">SEO</a>.'),
  ],
  related: [['/seo/', 'SEO e busca com IA'], ['/pesquisa-de-palavras-chave/', 'Pesquisa de palavras-chave'], ['/geo-aeo/', 'GEO e AEO'], ['/blog/', 'Blog da Roque']],
  ctaH2: 'Vamos planejar o conteúdo da sua empresa', ctaP: 'Conte quem você quer alcançar e sobre o que sua empresa pode falar com autoridade. A Roque Business Evolution responde pelo WhatsApp.',
});

export const midia = servicePage({
  path: '/marketing-digital-e-midia-paga/', og: 'marketing-digital', crumbName: 'Marketing digital e mídia paga',
  title: 'Marketing Digital e Mídia Paga (Google e Meta Ads) | Roque',
  description: 'Marketing digital e mídia paga: campanhas no Google Ads e na Meta Ads, funis, landing pages e mensuração de conversões. Roque Business Evolution.',
  h1: 'Marketing digital e mídia paga para gerar oportunidades e acompanhar o custo de cada uma',
  lead: 'O marketing digital e a mídia paga da Roque Business Evolution planejam e gerenciam campanhas no Google Ads e na Meta Ads, estruturam o funil e a landing page e medem as conversões para melhorar o custo por oportunidade.',
  msg: 'Olá! Quero conversar sobre marketing digital e mídia paga.',
  serviceName: 'Marketing digital, mídia paga e aquisição de clientes', serviceType: 'Marketing digital e gestão de tráfego pago',
  serviceDescription: 'Planejamento de campanhas, gestão de Google Ads e Meta Ads, funis de aquisição, landing pages, mensuração de conversões e integração com CRM.',
  sections: [
    { id: 'campanhas', h2: 'Mídia paga: gestão de campanhas no Google Ads e na Meta Ads', html: `${p('A gestão de campanhas cuida da estratégia, da execução e da otimização dos anúncios para atrair pessoas com intenção de contratar.')}${li(['Planejamento de campanhas digitais.', 'Campanhas de pesquisa, remarketing e geração de leads no Google Ads.', 'Campanhas na Meta Ads.', 'Segmentação de públicos e análise de desempenho.', 'Testes de mensagens, criativos e ofertas.'])}` },
    { id: 'funil', h2: 'Marketing digital: funil de aquisição, landing pages e conversão', html: `${p('Anúncio bom precisa levar a uma página que converte. Estruturamos o caminho completo, do clique ao contato.')}${li(['Funis de aquisição e de conversão.', 'Landing pages para campanhas, com a <a href="/criacao-de-sites/">criação de sites</a> da Roque.', 'Integração entre anúncios, CRM e atendimento comercial.', 'Mensuração de conversões e do custo por oportunidade.'])}` },
    { id: 'otimizacao', h2: 'Mídia paga otimizada com apoio de IA e dados', html: `${p('Usamos dados e IA para identificar o que funciona, ajustar lances e criativos e reduzir desperdício, com acompanhamento periódico.')}${note('Verbas de mídia, licenças e custos de terceiros são especificados separadamente dos honorários da agência.')}` },
  ],
  faq: [
    Q('O que é mídia paga?', 'É a compra de espaço de anúncio em plataformas como Google e Meta para alcançar pessoas segmentadas, com pagamento pela exibição ou pelo clique.'),
    Q('Quanto devo investir em anúncios?', 'Depende do mercado, da concorrência e do objetivo. A verba de mídia é definida junto com você e fica separada dos honorários da agência.'),
    Q('Como vocês medem o resultado das campanhas?', 'Pela mensuração de conversões, custo por oportunidade, taxa de conversão por etapa e integração com o CRM, conforme os dados disponíveis.'),
    Q('Vocês garantem um número de clientes?', 'Não. Os resultados dependem de mercado, concorrência, oferta, investimento e execução. Acompanhamos indicadores e otimizamos de forma contínua.'),
    Q('Preciso de site para anunciar?', 'Precisa de uma página de destino. A Roque cria <a href="/criacao-de-sites/">sites</a> e landing pages para campanhas.'),
  ],
  related: [['/crm-e-vendas/', 'CRM e vendas'], ['/criacao-de-sites/', 'Criação de sites'], ['/seo/', 'SEO e busca com IA'], ['/dados-e-business-intelligence/', 'Dados e business intelligence']],
  ctaH2: 'Vamos planejar as campanhas da sua empresa', ctaP: 'Conte o que você vende e quem quer alcançar. A Roque Business Evolution responde pelo WhatsApp.',
});

export const branding = servicePage({
  path: '/branding-e-identidade-digital/', og: 'branding', crumbName: 'Branding e identidade digital',
  title: 'Branding e Identidade Digital para Empresas | Roque',
  description: 'Branding e identidade digital: posicionamento, proposta de valor, identidade visual, tom de voz e comunicação padronizada. Roque Business Evolution.',
  h1: 'Branding e identidade digital para a sua empresa comunicar com clareza e consistência',
  lead: 'O branding e a identidade digital da Roque Business Evolution definem o posicionamento, a proposta de valor e a comunicação da sua empresa, e aplicam essa identidade em site, redes, apresentações e campanhas.',
  msg: 'Olá! Quero conversar sobre branding e identidade digital.',
  serviceName: 'Branding, identidade digital e comunicação', serviceType: 'Branding e identidade digital',
  serviceDescription: 'Estratégia de posicionamento, proposta de valor, identidade visual e aplicações digitais, tom de voz e padronização da comunicação.',
  sections: [
    { id: 'posicionamento', h2: 'Branding: posicionamento de marca e proposta de valor', html: `${p('O posicionamento define o que a sua empresa quer ser lembrada por fazer e para quem. A proposta de valor traduz isso em uma promessa clara e verdadeira.')}${li(['Estratégia de posicionamento de marca.', 'Definição de proposta de valor e diferenciais.', 'Diretrizes de comunicação e tom de voz.'])}` },
    { id: 'identidade', h2: 'Identidade digital: identidade visual e aplicações digitais', html: li(['Identidade visual e suas aplicações digitais.', 'Apresentações comerciais e materiais institucionais.', 'Peças gráficas e criativos, com apoio de IA quando faz sentido.', 'Conteúdo para redes sociais.']) },
    { id: 'comunicacao', h2: 'Branding e comunicação padronizada entre site, redes e campanhas', html: `${p('Uma marca consistente é reconhecida mais rápido e passa mais confiança. Padronizamos mensagens, imagens e linguagem entre todos os canais.')}${li(['Copywriting para campanhas, sites e propostas.', 'Desenvolvimento de campanhas e conceitos criativos.', 'Padronização da comunicação entre canais.'])}` },
  ],
  faq: [
    Q('O que é branding?', 'É o conjunto de decisões que definem como a empresa se apresenta e é percebida: posicionamento, identidade visual, linguagem e experiência.'),
    Q('O que é identidade digital?', 'É a aplicação da marca nos canais digitais, como site, redes sociais, e-mail e anúncios, com o mesmo estilo e a mesma mensagem.'),
    Q('Vocês refazem logo e identidade visual?', 'Sim, conforme o escopo: a identidade visual e suas aplicações digitais fazem parte do serviço.'),
    Q('Branding ajuda no SEO?', 'Indiretamente. Uma marca clara facilita buscas pelo nome da empresa e deixa o conteúdo mais consistente, o que ajuda <a href="/geo-aeo/">buscas com IA</a> e buscadores a entender quem você é.'),
  ],
  related: [['/criacao-de-sites/', 'Criação de sites'], ['/marketing-de-conteudo/', 'Marketing de conteúdo'], ['/marketing-digital-e-midia-paga/', 'Marketing digital e mídia paga'], ['/servicos/', 'Todos os serviços']],
  ctaH2: 'Vamos dar clareza à marca da sua empresa', ctaP: 'Conte como a sua empresa se apresenta hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const crm = servicePage({
  path: '/crm-e-vendas/', og: 'crm-e-vendas', crumbName: 'CRM e vendas',
  title: 'CRM e Inteligência Comercial: Funil de Vendas | Roque',
  description: 'CRM e inteligência comercial: desenho de funil de vendas, implantação de CRM, qualificação de leads e automação de follow-ups. Roque Business Evolution.',
  h1: 'CRM e vendas: organize o funil comercial e reduza oportunidades perdidas',
  lead: 'O trabalho de CRM e vendas da Roque Business Evolution estrutura o processo comercial: desenha o funil, implanta ou configura o CRM, qualifica leads e automatiza o acompanhamento para que nenhuma oportunidade fique parada.',
  msg: 'Olá! Quero conversar sobre CRM e processo comercial.',
  serviceName: 'CRM, vendas e inteligência comercial', serviceType: 'Consultoria comercial e CRM',
  serviceDescription: 'Diagnóstico do processo comercial, desenho de funil, implantação de CRM, qualificação de leads, automação de follow-ups e relatórios de desempenho.',
  sections: [
    { id: 'funil', h2: 'Funil de vendas: etapas, critérios e responsabilidades', html: `${p('Um funil de vendas descreve por onde passa cada oportunidade, do primeiro contato ao fechamento. Sem etapas e critérios claros, o time perde o que está parado.')}${li(['Diagnóstico do processo comercial.', 'Desenho do funil de vendas.', 'Definição de etapas, critérios e responsabilidades.', 'Modelos de propostas e fluxos de acompanhamento.'])}` },
    { id: 'crm', h2: 'Implantação e configuração de CRM', html: `${p('O CRM concentra contatos, conversas e oportunidades. Implantamos ou configuramos a ferramenta de acordo com o processo da sua empresa.')}${li(['Implantação ou configuração de CRM.', 'Qualificação e segmentação de leads e clientes.', 'Integração entre formulários, campanhas, WhatsApp e CRM.'])}` },
    { id: 'automacao', h2: 'CRM: automação de follow-ups e análise de conversão', html: `${p('A automação cuida dos lembretes e do acompanhamento, e a análise mostra onde as oportunidades se perdem.')}${li(['Automação de follow-ups.', 'Análise de conversão por etapa.', 'Identificação de oportunidades paradas.', 'Relatórios de produtividade e de desempenho comercial.'])}${p('Para atendimento e qualificação automáticos, veja os <a href="/agentes-de-ia-para-vendas/">agentes de IA para vendas</a>.')}` },
  ],
  faq: [
    Q('O que é um CRM?', 'CRM (Customer Relationship Management) é o sistema que organiza contatos, conversas e oportunidades de venda em um só lugar.'),
    Q('O que é um funil de vendas?', 'É o caminho que a oportunidade percorre, do primeiro contato ao fechamento, dividido em etapas com critérios claros.'),
    Q('Vocês integram o CRM com WhatsApp e formulários?', 'Sim. A integração entre formulários, campanhas, WhatsApp e CRM faz parte do serviço, conforme as ferramentas disponíveis.'),
    Q('Como evitar perder oportunidades?', 'Com etapas definidas, responsáveis claros, automação de follow-ups e relatórios que mostram oportunidades paradas.'),
  ],
  related: [['/agentes-de-ia-para-vendas/', 'Agentes de IA para vendas'], ['/marketing-digital-e-midia-paga/', 'Marketing digital e mídia paga'], ['/automacao-de-processos/', 'Automação de processos'], ['/dados-e-business-intelligence/', 'Dados e business intelligence']],
  ctaH2: 'Vamos organizar o processo comercial da sua empresa', ctaP: 'Conte como as vendas acontecem hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const reputacao = servicePage({
  path: '/reputacao-digital/', og: 'reputacao-digital', crumbName: 'Reputação digital',
  title: 'Reputação Digital e Relacionamento com Clientes | Roque',
  description: 'Reputação digital: coleta legítima de avaliações, feedback, fidelização e campanhas de reativação de clientes. Roque Business Evolution.',
  h1: 'Reputação digital e relacionamento com clientes para fortalecer a confiança na sua empresa',
  lead: 'O trabalho de reputação digital da Roque Business Evolution fortalece a confiança no seu negócio: organiza a coleta legítima de avaliações, acompanha o que dizem sobre a empresa e cria fluxos de relacionamento e fidelização.',
  msg: 'Olá! Quero conversar sobre reputação digital e relacionamento com clientes.',
  serviceName: 'Reputação digital e relacionamento com clientes', serviceType: 'Gestão de reputação digital',
  serviceDescription: 'Auditoria de reputação, coleta legítima de avaliações, fluxos de feedback, monitoramento de menções, programas de fidelização e campanhas de reativação.',
  sections: [
    { id: 'avaliacoes', h2: 'Avaliações e reputação digital da sua empresa', html: `${p('A reputação digital é o que as pessoas encontram sobre a sua empresa antes de decidir. Ela se constrói com avaliações reais e com respostas cuidadosas.')}${li(['Auditoria da reputação digital.', 'Estratégia de coleta legítima de avaliações.', 'Fluxos de solicitação de feedback.', 'Monitoramento de menções e avaliações.'])}` },
    { id: 'analise', h2: 'Reputação digital: análise de feedback e de motivos de insatisfação', html: li(['Classificação assistida de comentários e de sentimentos.', 'Identificação dos motivos de insatisfação.', 'Automação de respostas iniciais, com supervisão adequada.', 'Indicadores de satisfação e de experiência.']) },
    { id: 'fidelizacao', h2: 'Reputação digital, relacionamento e fidelização de clientes', html: `${p('Manter um cliente costuma ser mais simples do que conquistar um novo. Criamos programas que mantêm o relacionamento ativo.')}${li(['Programas de relacionamento e fidelização.', 'Campanhas de reativação e recuperação de clientes.'])}` },
  ],
  faq: [
    Q('O que é reputação digital?', 'É a imagem da empresa na internet, formada por avaliações, comentários, menções e pelo conteúdo que ela publica.'),
    Q('Como conseguir mais avaliações de forma legítima?', 'Pedindo feedback no momento certo da jornada, de forma simples e sem oferecer vantagens por avaliações positivas. O fluxo de solicitação é desenhado junto com você.'),
    Q('Vocês respondem avaliações por nós?', 'Podemos automatizar respostas iniciais, sempre com supervisão, e orientar o tom das respostas.'),
    Q('Reputação digital ajuda nas buscas locais?', 'Sim. Avaliações e informações consistentes ajudam a presença local, que faz parte do trabalho de <a href="/seo/">SEO</a>.'),
  ],
  related: [['/seo/', 'SEO e busca com IA'], ['/crm-e-vendas/', 'CRM e vendas'], ['/agentes-de-ia-para-suporte/', 'Agentes de IA para suporte'], ['/branding-e-identidade-digital/', 'Branding e identidade digital']],
  ctaH2: 'Vamos fortalecer a reputação da sua empresa', ctaP: 'Conte como os clientes avaliam você hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const automacao = servicePage({
  path: '/automacao-de-processos/', og: 'automacao-de-processos', crumbName: 'Automação de processos',
  title: 'Automação de Processos Empresariais com IA | Roque',
  description: 'Automação de processos empresariais: fluxos de trabalho, integração entre sistemas, alertas e relatórios automáticos, com IA e controle humano. Roque.',
  h1: 'Automação de processos empresariais para reduzir tarefas repetitivas e ganhar velocidade',
  lead: 'A automação de processos da Roque Business Evolution mapeia o que a sua empresa faz de forma repetitiva, integra ferramentas e sistemas e cria fluxos que trabalham sozinhos, com tratamento de exceções e participação humana quando necessário.',
  msg: 'Olá! Quero conversar sobre automação de processos na minha empresa.',
  serviceName: 'Automação de processos empresariais', serviceType: 'Automação de processos',
  serviceDescription: 'Mapeamento de processos automatizáveis, automação de fluxos de trabalho, integração de sistemas, alertas, propostas, relatórios e monitoramento.',
  sections: [
    { id: 'mapeamento', h2: 'Como escolher quais processos entram na automação de processos', html: `${p('Nem tudo deve ser automatizado. O mapeamento mostra o que é repetitivo, frequente e previsível, e onde a automação traz mais ganho.')}${li(['Mapeamento de processos automatizáveis.', 'Distribuição e classificação de solicitações.', 'Aprovação de tarefas com etapas e responsáveis definidos.'])}` },
    { id: 'fluxos', h2: 'Automação de processos: fluxos de trabalho e integração entre sistemas', html: `${cols(['Integração entre formulários, CRM, agenda e sistemas administrativos.', 'Notificações, alertas e lembretes.', 'Automação de propostas e documentos.', 'Fluxos de cobrança e acompanhamento, conforme as regras do cliente.', 'Sincronização de dados entre plataformas.', 'Automação de relatórios periódicos.'])}` },
    { id: 'controle', h2: 'Automação de processos com tratamento de exceções e controle humano', html: `${p('Uma automação precisa prever o que fazer quando algo foge do padrão. Implementamos filas, tratamento de falhas e registro de execução.')}${note('A automação deve prever intervenção humana quando necessária, especialmente em operações financeiras, dados sensíveis ou decisões de maior impacto.')}${li(['Filas, tratamento de falhas e registro de execução.', 'Monitoramento e melhoria contínua dos fluxos.'])}` },
  ],
  faq: [
    Q('O que é automação de processos?', 'É fazer sistemas executarem sozinhos tarefas repetitivas e fluxos de trabalho, seguindo regras definidas, com registro do que foi feito.'),
    Q('Quais processos vale automatizar?', 'Os repetitivos, frequentes e previsíveis, como lembretes, distribuição de solicitações, propostas, relatórios e sincronização de dados.'),
    Q('Automação e inteligência artificial são a mesma coisa?', 'Não. A automação segue regras definidas. A IA acrescenta interpretação de linguagem e decisões mais flexíveis. Os dois podem trabalhar juntos, e a <a href="/agencia-de-ia/">agência de IA</a> da Roque faz essa combinação.'),
    Q('E se a automação errar?', 'Os fluxos têm tratamento de exceções, filas, registro de execução e aprovação humana em casos sensíveis.'),
  ],
  related: [['/agencia-de-ia/', 'Agência de IA'], ['/crm-e-vendas/', 'CRM e vendas'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/dados-e-business-intelligence/', 'Dados e business intelligence']],
  ctaH2: 'Vamos automatizar o que trava a sua operação', ctaP: 'Conte quais tarefas se repetem na sua empresa. A Roque Business Evolution responde pelo WhatsApp.',
});

export const dados = servicePage({
  path: '/dados-e-business-intelligence/', og: 'dados-e-bi', crumbName: 'Dados e business intelligence',
  title: 'Dados, Analytics e Business Intelligence | Roque',
  description: 'Dados, analytics e business intelligence: dashboards gerenciais, indicadores de vendas e operação, relatórios automáticos e insights. Roque.',
  h1: 'Dados, analytics e business intelligence para decidir com informação confiável',
  lead: 'O serviço de dados e business intelligence da Roque Business Evolution transforma dados operacionais e comerciais em dashboards, indicadores e relatórios que ajudam a sua empresa a tomar decisões com mais clareza.',
  msg: 'Olá! Quero conversar sobre dados e dashboards para a minha empresa.',
  serviceName: 'Dados, analytics e inteligência de negócios', serviceType: 'Business intelligence e analytics',
  serviceDescription: 'Diagnóstico de indicadores, integração e preparação de dados, dashboards gerenciais, análises de funil, retenção e custos, relatórios automáticos e acompanhamento de metas.',
  sections: [
    { id: 'diagnostico', h2: 'Diagnóstico de indicadores e fontes de dados', html: `${p('Antes de montar painéis, entendemos quais decisões a sua empresa precisa tomar e de onde vêm os dados.')}${li(['Diagnóstico de indicadores e de fontes de dados.', 'Integração e preparação de dados.', 'Definição dos indicadores conforme objetivos, disponibilidade de dados e critérios de mensuração acordados.'])}` },
    { id: 'dashboards', h2: 'Business intelligence: dashboards gerenciais e indicadores de vendas, marketing e operação', html: `${cols(['Dashboards gerenciais.', 'Indicadores de vendas, marketing e operação.', 'Análise de funis e taxas de conversão.', 'Análise de retenção, recorrência e comportamento de clientes.', 'Análise de custos e de desempenho.', 'Acompanhamento de metas e de indicadores de desempenho.'])}` },
    { id: 'insights', h2: 'Business intelligence com relatórios automáticos e insights assistidos por IA', html: `${p('Relatórios periódicos chegam sem esforço manual, e a IA ajuda a identificar padrões, desvios e oportunidades.')}${li(['Relatórios automatizados.', 'Identificação de padrões, desvios e oportunidades.', 'Geração assistida de insights e recomendações.'])}${p('Um exemplo de aplicação própria é o ' + `<a href="https://aurorapremium.com/" rel="noopener">Aurora Premium</a>` + ', que reúne relatórios com IA sobre agenda, financeiro e clientes de negócios de serviço.')}` },
  ],
  faq: [
    Q('O que é business intelligence?', 'É o conjunto de práticas e ferramentas que transformam dados em informação útil para decisões, normalmente por meio de dashboards e relatórios.'),
    Q('O que é um dashboard gerencial?', 'É um painel visual que reúne os principais indicadores da empresa em um só lugar, atualizado com os dados das suas ferramentas.'),
    Q('Preciso ter muitos dados para começar?', 'Não. Começamos pelas decisões mais importantes e pelos dados que já existem, e evoluímos conforme a coleta melhora.'),
    Q('A IA analisa os dados sozinha?', 'A IA ajuda a identificar padrões e a sugerir recomendações, mas as decisões continuam com as pessoas, e as conclusões dependem da qualidade dos dados.'),
  ],
  related: [['/crm-e-vendas/', 'CRM e vendas'], ['/automacao-de-processos/', 'Automação de processos'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/transformacao-digital/', 'Transformação digital']],
  ctaH2: 'Vamos transformar os seus dados em decisões', ctaP: 'Conte que decisões você precisa tomar com mais segurança. A Roque Business Evolution responde pelo WhatsApp.',
});

export const capacitacao = servicePage({
  path: '/capacitacao-em-ia/', og: 'capacitacao-em-ia', crumbName: 'Capacitação em IA',
  title: 'Capacitação em IA para Empresas e Equipes | Roque',
  description: 'Capacitação em IA: treinamento prático em ferramentas, engenharia de prompts, casos de uso por área e políticas de uso responsável. Roque.',
  h1: 'Capacitação em IA para a sua equipe usar inteligência artificial com produtividade e responsabilidade',
  lead: 'A capacitação em IA da Roque Business Evolution prepara as equipes para usar inteligência artificial no dia a dia: treinamento prático em ferramentas, casos de uso por departamento e políticas de uso responsável.',
  msg: 'Olá! Quero conversar sobre capacitação em IA para a minha equipe.',
  serviceName: 'Capacitação, treinamento e adoção de IA', serviceType: 'Treinamento em inteligência artificial',
  serviceDescription: 'Diagnóstico de competências, treinamento prático em ferramentas de IA, engenharia de prompts, casos de uso por departamento, oficinas de automação e políticas internas.',
  sections: [
    { id: 'treinamento', h2: 'Treinamento prático em ferramentas de IA', html: `${p('O treinamento parte do trabalho real da equipe: o que cada área faz e onde a IA pode ajudar.')}${li(['Diagnóstico de competências e de necessidades.', 'Treinamento prático em ferramentas de IA.', 'Capacitação em engenharia de prompts.', 'Oficinas de automação de tarefas.'])}` },
    { id: 'casos-de-uso', h2: 'Casos de uso de IA por departamento', html: `${p('Cada área tem tarefas diferentes. Mapeamos casos de uso para comercial, atendimento, marketing, financeiro, administrativo e outras áreas da empresa.')}${li(['Mapeamento de casos de uso por departamento.', 'Desenvolvimento de procedimentos operacionais.', 'Avaliação de produtividade e de adoção.', 'Acompanhamento da implementação.'])}` },
    { id: 'politicas', h2: 'Políticas de uso de IA, privacidade e segurança', html: `${p('Usar IA com responsabilidade exige regras claras sobre o que pode e o que não pode ser compartilhado com as ferramentas.')}${li(['Orientações de privacidade e de segurança.', 'Políticas internas de uso de IA.'])}${p('Veja também a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a>.')}` },
  ],
  faq: [
    Q('O que é engenharia de prompts?', 'É a técnica de escrever instruções claras para ferramentas de IA, para obter respostas úteis, consistentes e adequadas ao contexto.'),
    Q('A capacitação serve para qualquer área da empresa?', 'Sim. Os casos de uso são mapeados por departamento, e o treinamento usa tarefas reais de cada equipe.'),
    Q('Como evitar que a equipe compartilhe dados sensíveis com a IA?', 'Com política interna de uso de IA, orientações de privacidade e segurança e treinamento sobre o que pode ser usado em cada ferramenta.'),
    Q('Como saber se a equipe está usando bem a IA?', 'Acompanhando adoção e produtividade com indicadores combinados no início do projeto.'),
  ],
  related: [['/governanca-e-seguranca-de-ia/', 'Governança e segurança de IA'], ['/transformacao-digital/', 'Transformação digital'], ['/agencia-de-ia/', 'Agência de IA'], ['/automacao-de-processos/', 'Automação de processos']],
  ctaH2: 'Vamos preparar a sua equipe para usar IA', ctaP: 'Conte quais áreas querem começar. A Roque Business Evolution responde pelo WhatsApp.',
});

export const governanca = servicePage({
  path: '/governanca-e-seguranca-de-ia/', og: 'governanca-de-ia', crumbName: 'Governança e segurança de IA',
  title: 'Governança e Segurança de IA para Empresas | Roque',
  description: 'Governança e segurança de IA: avaliação de riscos, permissões, controle de acesso, trilhas de auditoria, testes e aprovação humana. Roque.',
  h1: 'Governança e segurança de IA para operar com controles, rastreabilidade e confiança',
  lead: 'A governança e a segurança de IA da Roque Business Evolution ajudam a sua empresa a implementar soluções de inteligência artificial com controles, rastreabilidade e critérios de qualidade definidos.',
  msg: 'Olá! Quero conversar sobre governança e segurança de IA.',
  serviceName: 'Segurança, governança e confiabilidade de IA', serviceType: 'Governança de inteligência artificial',
  serviceDescription: 'Avaliação de riscos, permissões e limites de execução, controles de acesso, proteção de credenciais, trilhas de auditoria, testes de qualidade e regras de aprovação humana.',
  sections: [
    { id: 'riscos', h2: 'Governança de IA: avaliação de riscos de aplicações', html: `${p('Antes de colocar um agente ou uma automação em produção, avaliamos o que pode dar errado e qual seria o impacto.')}${li(['Governança de IA: avaliação de riscos de aplicações.', 'Definição de permissões e de limites de execução.', 'Controles para ferramentas e integrações externas.'])}` },
    { id: 'acesso', h2: 'Governança de IA: controle de acesso, segregação de dados e proteção de credenciais', html: li(['Controles de acesso e segregação de dados.', 'Proteção de credenciais e de segredos.', 'Registro de operações e trilhas de auditoria.']) },
    { id: 'qualidade', h2: 'Governança de IA: testes de qualidade, respostas incorretas e aprovação humana', html: `${p('Sistemas de IA podem gerar respostas incorretas. Testamos o comportamento antes e depois da publicação e definimos quando uma pessoa precisa aprovar.')}${li(['Testes de qualidade, robustez e comportamento.', 'Avaliação de respostas incorretas e de alucinações.', 'Regras para aprovação humana.', 'Procedimentos de tratamento de incidentes.', 'Orientações de proteção de dados e de adequação à LGPD, conforme o escopo.'])}${note('Os serviços não substituem auditoria independente, assessoria jurídica ou certificações especializadas quando essas atividades forem exigidas.')}` },
  ],
  faq: [
    Q('O que é governança de IA?', 'É o conjunto de regras, responsabilidades e controles que definem como a IA pode ser usada na empresa e como o seu uso é acompanhado.'),
    Q('O que é uma alucinação em IA?', 'É quando o sistema gera uma resposta que parece correta, mas contém informação inventada ou errada. Testes e aprovação humana reduzem esse risco.'),
    Q('A governança garante conformidade com a LGPD?', 'Ela apoia a proteção de dados com controles e orientações, mas não substitui assessoria jurídica nem auditoria independente.'),
    Q('Que controles um agente de IA deve ter?', 'Permissões e limites de execução, controle de acesso, registro das operações, testes e regras de aprovação humana para decisões de maior impacto.'),
  ],
  related: [['/capacitacao-em-ia/', 'Capacitação em IA'], ['/agencia-de-ia/', 'Agência de IA'], ['/transformacao-digital/', 'Transformação digital'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software']],
  ctaH2: 'Vamos colocar controles na IA da sua empresa', ctaP: 'Conte onde a IA já é usada ou será usada. A Roque Business Evolution responde pelo WhatsApp.',
});

export const suporte = servicePage({
  path: '/suporte-e-evolucao-continua/', og: 'suporte-e-evolucao', crumbName: 'Suporte e evolução contínua',
  title: 'Suporte e Evolução Contínua de Sites e Sistemas | Roque',
  description: 'Suporte e evolução contínua: monitoramento, ajustes em automações e agentes de IA, atualização de SEO e relatórios de desempenho. Roque.',
  h1: 'Suporte e evolução contínua para as soluções da sua empresa seguirem úteis e estáveis',
  lead: 'O suporte e a evolução contínua da Roque Business Evolution acompanham o que foi implementado, como sites, automações, agentes de IA e sistemas, para que continuem úteis, estáveis e alinhados aos objetivos da empresa.',
  msg: 'Olá! Quero conversar sobre suporte e evolução contínua.',
  serviceName: 'Consultoria, suporte e evolução contínua', serviceType: 'Suporte técnico e evolução de soluções digitais',
  serviceDescription: 'Monitoramento de aplicações e integrações, suporte técnico e funcional, revisão de indicadores, otimização de campanhas e páginas, ajustes em automações e agentes de IA e relatórios periódicos.',
  sections: [
    { id: 'monitoramento', h2: 'Monitoramento e suporte técnico das soluções contratadas', html: li(['Monitoramento de aplicações e de integrações contratadas.', 'Suporte técnico e funcional, conforme o plano.', 'Revisão de custos operacionais.']) },
    { id: 'otimizacao', h2: 'Suporte com otimização contínua de páginas, SEO, campanhas e agentes de IA', html: li(['Otimização de campanhas e de páginas.', 'Atualização de conteúdo e de estratégias de SEO.', 'Ajustes em automações e em agentes de IA.']) },
    { id: 'acompanhamento', h2: 'Suporte e evolução contínua: relatórios periódicos e reuniões', html: `${p('Uma solução digital precisa de revisão regular. Reunimos os números, discutimos o que mudou e priorizamos as próximas melhorias.')}${li(['Revisão periódica de indicadores.', 'Relatórios periódicos de desempenho.', 'Planejamento de melhorias e de novas funcionalidades.', 'Reuniões de acompanhamento e revisão de prioridades.'])}` },
  ],
  faq: [
    Q('O que inclui o suporte e a evolução contínua?', 'Monitoramento, suporte técnico e funcional, ajustes, otimização e relatórios, conforme o plano contratado para cada solução.'),
    Q('Preciso contratar suporte para o site criado pela Roque?', 'É uma opção. Sites, automações e agentes de IA precisam de manutenção e evolução, e o suporte contínuo cuida disso.'),
    Q('Com que frequência recebo relatórios?', 'A periodicidade é combinada na contratação, junto com os indicadores acompanhados.'),
    Q('O suporte cobre sistemas que a Roque não desenvolveu?', 'Depende do caso. Avaliamos a viabilidade técnica e o escopo antes de assumir o suporte.'),
  ],
  related: [['/criacao-de-sites/', 'Criação de sites'], ['/agencia-de-ia/', 'Agência de IA'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/seo/', 'SEO e busca com IA']],
  ctaH2: 'Vamos cuidar para que as suas soluções sigam evoluindo', ctaP: 'Conte o que já está no ar e precisa de acompanhamento. A Roque Business Evolution responde pelo WhatsApp.',
});

// -------------------------------------------------------------- aplicações de agentes de IA (portfólio 5.9)
export const iaWhats = servicePage({
  path: '/agentes-de-ia-para-whatsapp/', og: 'agentes-de-ia-whatsapp', crumbName: 'Agentes de IA para WhatsApp',
  title: 'Agente de IA para WhatsApp: Atendimento Automático | Roque',
  description: 'Agente de IA para WhatsApp: atendimento automático com inteligência artificial, caixa de conversas e encaminhamento para pessoas. Roque.',
  h1: 'Agente de IA para WhatsApp: atendimento automático com inteligência artificial',
  lead: 'Um agente de IA para WhatsApp atende os seus clientes na hora, entende o que cada pessoa pergunta e responde com as informações da sua empresa, encaminhando a conversa para uma pessoa quando necessário. A Roque Business Evolution cria esse atendimento e também oferece o EngageBot.',
  msg: 'Olá! Quero um agente de IA para atender no WhatsApp da minha empresa.',
  serviceName: 'Agentes de IA para atendimento no WhatsApp', serviceType: 'Atendimento automatizado com inteligência artificial',
  serviceDescription: 'Projeto e implantação de agentes de IA para atendimento por WhatsApp e webchat, com bases de conhecimento da empresa, integrações e encaminhamento para atendentes humanos.',
  sections: [
    { id: 'como-funciona', h2: 'Como funciona o atendimento automático com agente de IA no WhatsApp', html: `${p('O agente recebe a mensagem, identifica a intenção, busca a informação certa na base de conhecimento da empresa e responde. Se o caso pede uma pessoa, a conversa é encaminhada.')}${steps([['Mensagem do cliente', 'O cliente escreve no WhatsApp da empresa, como faria com uma pessoa.'], ['Entendimento', 'O agente identifica o que a pessoa quer.'], ['Resposta com o seu conteúdo', 'Responde com base no site, em documentos e no FAQ da empresa.'], ['Encaminhamento', 'Quando necessário, passa a conversa para a equipe.']])}` },
    { id: 'o-que-pode-fazer', h2: 'O que um agente de IA pode fazer no WhatsApp e no webchat', html: li(['Responder dúvidas frequentes sobre serviços, horários e processos.', 'Qualificar e classificar contatos.', 'Agendar e confirmar compromissos, conforme as integrações disponíveis.', 'Recuperar contatos e acompanhar oportunidades.', 'Encaminhar para atendentes humanos.', 'Registrar as conversas para consulta da equipe.']) },
    { id: 'engagebot', h2: 'EngageBot: agente de IA para WhatsApp e site, pronto para usar', html: `${p('Para quem quer começar com um produto pronto, a Roque Business Evolution criou o ' + aEngage() + ': atendimento com inteligência artificial por WhatsApp e webchat, com caixa de conversas, resposta automática com detecção de intenção e agente que aprende com o site, PDFs, documentos e FAQ da empresa.')}${p('Para projetos sob medida, com integrações específicas, o trabalho é feito pela <a href="/agencia-de-ia/">agência de IA</a>.')}` },
    { id: 'cuidados', h2: 'Cuidados com o agente de IA para WhatsApp: limites, privacidade e qualidade', html: `${li(['Limites claros do que o agente pode responder e executar.', 'Encaminhamento para uma pessoa em casos sensíveis.', 'Proteção de dados e adequação à LGPD, conforme o escopo.', 'Monitoramento de qualidade, erros, custos e desempenho.'])}` },
  ],
  faq: [
    Q('Como funciona um agente de IA no WhatsApp?', 'Ele recebe a mensagem, entende a intenção, consulta a base de conhecimento da empresa e responde. Quando preciso, passa a conversa para uma pessoa.'),
    Q('O agente substitui meus atendentes?', 'Não. Ele cuida das perguntas frequentes e do primeiro atendimento, e a equipe assume os casos que pedem atenção humana.'),
    Q('Preciso de uma conta do WhatsApp Business?', 'O atendimento automatizado usa canais oficiais de mensagem, e os requisitos dependem da solução escolhida. Explicamos o que é necessário no diagnóstico.'),
    Q('Qual a diferença entre o EngageBot e um agente sob medida?', 'O EngageBot é um produto pronto de atendimento com IA. O agente sob medida é um projeto desenhado para os sistemas e processos específicos da empresa.'),
    Q('O agente aprende com o meu site?', 'Sim. O agente pode aprender com o site, PDFs, documentos e o FAQ da empresa, para responder de forma coerente com o seu negócio.'),
  ],
  related: [['/agencia-de-ia/', 'Agência de IA'], ['/agentes-de-ia-para-vendas/', 'Agentes de IA para vendas'], ['/agentes-de-ia-para-suporte/', 'Agentes de IA para suporte'], ['/automacao-de-processos/', 'Automação de processos']],
  ctaH2: 'Vamos colocar um agente de IA para atender no seu WhatsApp', ctaP: 'Conte como é o atendimento hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const iaVendas = servicePage({
  path: '/agentes-de-ia-para-vendas/', og: 'agentes-de-ia-vendas', crumbName: 'Agentes de IA para vendas',
  title: 'Agente de IA para Vendas e Qualificação de Leads | Roque',
  description: 'Agente de IA para vendas: qualificação de leads, assistente comercial, follow-up e recuperação de contatos integrados ao CRM. Roque.',
  h1: 'Agente de IA para vendas: qualifique leads e acompanhe oportunidades sem deixar nenhuma parada',
  lead: 'Um agente de IA para vendas conversa com os contatos que chegam à sua empresa, qualifica leads, responde dúvidas comerciais e acompanha oportunidades, integrado ao CRM e à agenda. A Roque Business Evolution projeta e implanta esses agentes dentro das regras do seu processo comercial.',
  msg: 'Olá! Quero um agente de IA para qualificar leads e apoiar as vendas.',
  serviceName: 'Agentes de IA para vendas e qualificação de leads', serviceType: 'Automação comercial com inteligência artificial',
  serviceDescription: 'Qualificação e classificação de leads, assistentes comerciais, recuperação de contatos, acompanhamento comercial e integração com CRMs, agendas e APIs.',
  sections: [
    { id: 'o-que-faz', h2: 'O que um agente de IA de vendas faz pela equipe comercial', html: li(['<b>Qualificação e classificação de leads</b> a partir da conversa.', '<b>Assistente comercial</b> que responde dúvidas sobre oferta e processo.', '<b>Recuperação de contatos</b> e acompanhamento comercial.', '<b>Agendamento</b> de reuniões e confirmação de compromissos.', '<b>Encaminhamento</b> para o vendedor certo, com o resumo da conversa.']) },
    { id: 'integracao', h2: 'Integração do agente de IA com CRM, agenda e WhatsApp', html: `${p('O agente só ajuda de verdade quando conversa com os sistemas da empresa. Integramos o agente com o CRM, a agenda e os canais de atendimento.')}${li(['Integração com CRMs, agendas, bancos de dados e APIs.', 'Memória de conversa e recuperação de informações do contexto.', 'Monitoramento de qualidade, erros, custos e desempenho.'])}${p('Veja também o trabalho de <a href="/crm-e-vendas/">CRM e vendas</a>.')}` },
    { id: 'limites', h2: 'Limites e supervisão do agente de IA comercial', html: `${p('Definimos o que o agente pode prometer, quando ele deve parar e quando uma pessoa precisa assumir.')}${li(['Regras sobre o que pode ser informado e prometido.', 'Escalonamento humano em negociações sensíveis.', 'Registro das conversas para auditoria e melhoria.'])}` },
  ],
  faq: [
    Q('O que é qualificação de leads?', 'É identificar, pela conversa, quais contatos têm perfil e interesse para avançar na venda, para que a equipe priorize os melhores.'),
    Q('O agente de IA fecha vendas sozinho?', 'Ele apoia o processo, qualifica e acompanha. O fechamento e as negociações sensíveis ficam com a equipe comercial.'),
    Q('Dá para integrar o agente com o meu CRM?', 'Sim, conforme as integrações disponíveis na ferramenta. Fazemos a integração com CRMs, agendas e APIs.'),
    Q('Como o agente evita prometer o que a empresa não oferece?', 'Com uma base de conhecimento oficial, regras sobre o que pode ser dito e encaminhamento para uma pessoa em casos de dúvida.'),
  ],
  related: [['/crm-e-vendas/', 'CRM e vendas'], ['/agentes-de-ia-para-whatsapp/', 'Agentes de IA para WhatsApp'], ['/agencia-de-ia/', 'Agência de IA'], ['/marketing-digital-e-midia-paga/', 'Marketing digital e mídia paga']],
  ctaH2: 'Vamos colocar um agente de IA para apoiar as suas vendas', ctaP: 'Conte como os leads chegam hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const iaSuporte = servicePage({
  path: '/agentes-de-ia-para-suporte/', og: 'agentes-de-ia-suporte', crumbName: 'Agentes de IA para suporte',
  title: 'Agente de IA para Suporte, Pós-Venda e Onboarding | Roque',
  description: 'Agente de IA para suporte e pós-venda: respostas com a base de conhecimento da empresa, onboarding de clientes e equipes, e escalonamento humano.',
  h1: 'Agente de IA para suporte, pós-venda e onboarding com a base de conhecimento da sua empresa',
  lead: 'Um agente de IA para suporte responde dúvidas dos clientes e das equipes com base nos documentos da própria empresa, acompanha o pós-venda e apoia o onboarding, escalando para uma pessoa quando o caso exige. A Roque Business Evolution projeta esses agentes com limites e permissões definidos.',
  msg: 'Olá! Quero um agente de IA para suporte e pós-venda.',
  serviceName: 'Agentes de IA para suporte, pós-venda e onboarding', serviceType: 'Suporte automatizado com inteligência artificial',
  serviceDescription: 'Agentes de suporte e pós-venda, agentes de onboarding, consulta a bases de conhecimento, agentes internos para equipes e encaminhamento para atendentes humanos.',
  sections: [
    { id: 'suporte', h2: 'Agente de IA para suporte: respostas baseadas nos documentos da empresa', html: `${p('O agente consulta manuais, FAQs e documentos que a empresa autoriza e responde com base neles, em vez de inventar.')}${li(['Assistentes para consulta a bases de conhecimento.', 'Agentes de suporte e pós-venda.', 'Encaminhamento para atendentes humanos.'])}` },
    { id: 'onboarding', h2: 'Onboarding de clientes e de colaboradores com agente de IA', html: `${p('Um agente de onboarding guia a pessoa pelos primeiros passos, responde dúvidas comuns e reduz o esforço da equipe.')}${li(['Agentes de onboarding para clientes.', 'Agentes internos para apoiar as equipes.', 'Digitalização do onboarding de novos colaboradores, com a automação de processos.'])}` },
    { id: 'qualidade', h2: 'Agente de IA para suporte: qualidade, segurança e escalonamento', html: `${li(['Avaliação de segurança e limites operacionais.', 'Escalonamento humano nos casos sensíveis.', 'Monitoramento de qualidade, erros e custos.', 'Sistemas multiagentes com funções especializadas, quando o projeto exige.'])}${p('Veja a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a>.')}` },
  ],
  faq: [
    Q('O agente de suporte responde só com o que a empresa autorizou?', 'Sim. Ele usa a base de conhecimento definida e segue regras sobre o que pode responder, encaminhando para uma pessoa quando não souber.'),
    Q('O que é onboarding?', 'É o processo de receber e orientar um novo cliente ou colaborador nos primeiros passos, para que ele comece a usar o serviço ou a rotina com segurança.'),
    Q('O agente funciona para a equipe interna também?', 'Sim. Agentes internos apoiam as equipes com consultas a procedimentos, políticas e documentos da empresa.'),
    Q('Como a empresa acompanha a qualidade das respostas?', 'Pelo registro das conversas e por indicadores como taxa de resolução, encaminhamentos para pessoas, erros e custo por interação.'),
  ],
  related: [['/agentes-de-ia-para-whatsapp/', 'Agentes de IA para WhatsApp'], ['/governanca-e-seguranca-de-ia/', 'Governança e segurança de IA'], ['/agencia-de-ia/', 'Agência de IA'], ['/reputacao-digital/', 'Reputação digital']],
  ctaH2: 'Vamos colocar um agente de IA para apoiar o seu suporte', ctaP: 'Conte onde o suporte demora mais hoje. A Roque Business Evolution responde pelo WhatsApp.',
});

export const SERVICE_PAGES = [pesquisa, geo, conteudo, midia, branding, crm, reputacao, automacao, dados, capacitacao, governanca, suporte, iaWhats, iaVendas, iaSuporte];
