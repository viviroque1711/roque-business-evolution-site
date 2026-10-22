// Blog da Roque Business Evolution: guias explicativos sobre agentes de IA, GEO/AEO, SEO, automação e transformação digital.
// Conteúdo conceitual e prático, sem estatística, sem cliente e sem resultado inventado. Autoria institucional (Roque Business Evolution).
import { esc, faq, crumbLd, crumbHtml, pageUrl } from './lib.mjs';
import { btn, li, cols, steps, sec, related, p, note, ENGAGEBOT } from './kit.mjs';
import { SITE } from '../../src/data/site.mjs';
import { org, website, webpage, finalCta, hero, ORG_ID } from './schema.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });
const DATE = '2026-10-21';

function article(c) {
  const crumb = [{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: c.crumbName, path: c.path }];
  const f = faq(c.faq, { pagePath: c.path, heading: 'Perguntas frequentes' });
  const body = `<section class="page-hero" aria-labelledby="h1"><div class="wrap">${crumbHtml(crumb)}<h1 id="h1">${esc(c.h1)}</h1><p class="lead">${c.lead}</p><p class="meta">Por Roque Business Evolution · Publicado em ${DATE.split('-').reverse().join('/')}</p></div></section>
<section class="sec white" aria-label="Resumo"><div class="wrap"><aside class="answer"><b>Resposta rápida.</b> ${c.answer}</aside></div></section>
${c.sections.map((s, i) => sec(i % 2 === 0 ? 'mist' : 'white', s.id, s.h2, `<div class="prose">${s.html}</div>`)).join('\n')}
${sec(c.sections.length % 2 === 0 ? 'mist' : 'white', 'continue', 'Continue explorando', related(c.related))}
${f.html.replace('class="sec paper"', `class="sec ${c.sections.length % 2 === 0 ? 'white' : 'mist'}"`)}
${finalCta(c.ctaH2, c.ctaP, c.msg)}`;
  return {
    path: c.path, og: c.og || 'blog', title: c.title, description: c.description, body, lead: c.card,
    get graph() {
      return [org(), website(), webpage(c.path, c.h1, 'WebPage'), crumbLd(crumb),
        { '@type': 'BlogPosting', '@id': pageUrl(c.path) + '#post', mainEntityOfPage: pageUrl(c.path), headline: c.h1, description: c.description, inLanguage: 'pt-BR', datePublished: DATE, dateModified: DATE, author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, image: SITE.url + `/og/${c.og || 'blog'}.jpg`, about: c.about || [] },
        f.ld];
    },
  };
}

export const ARTIGOS = [
  article({
    path: '/blog/o-que-sao-agentes-de-ia/', og: 'blog', crumbName: 'O que são agentes de IA',
    title: 'O que São Agentes de IA e Quando a Empresa Precisa | Roque',
    description: 'Entenda o que são agentes de IA, a diferença para um chatbot, o que eles fazem numa empresa e quando vale a pena ter um. Guia da Roque.',
    h1: 'O que são agentes de IA e quando a sua empresa precisa de um',
    lead: 'Agentes de IA são assistentes de inteligência artificial que conversam com clientes e executam tarefas nos sistemas da empresa. Este guia explica o que eles fazem, como se diferenciam de um chatbot e quando valem a pena.',
    answer: 'Um agente de IA é um sistema de inteligência artificial que entende uma mensagem, consulta as informações autorizadas da empresa e executa uma tarefa, como responder, agendar ou registrar um pedido, dentro de limites definidos. Vale a pena quando há muitas mensagens repetidas ou tarefas manuais entre sistemas.',
    card: 'O que um agente de IA faz, a diferença para um chatbot e quando ter um.',
    sections: [
      { id: 'o-que-fazem', h2: 'O que os agentes de IA fazem numa empresa', html: `${p('Os agentes de IA assumem tarefas que se repetem e liberam a equipe para os casos que pedem atenção humana. Os usos mais comuns são:')}${li(['<b>Atendimento</b> no WhatsApp e no site, a qualquer hora.', '<b>Vendas</b>: qualificar contatos e acompanhar quem ainda não fechou.', '<b>Suporte e pós-venda</b> com base nos documentos da empresa.', '<b>Agendamento e confirmação</b> de horários.', '<b>Automação</b> de tarefas entre formulários, CRM, agenda e sistemas.'])}` },
      { id: 'agente-ou-chatbot', h2: 'Agente de IA ou chatbot: qual é a diferença', html: `${p('O chatbot tradicional segue um roteiro de botões e respostas prontas. O agente de IA entende a pergunta escrita do jeito do cliente, consulta as informações da empresa e pode executar tarefas em outros sistemas. Os dois funcionam melhor quando passam a conversa para uma pessoa nos casos difíceis.')}` },
      { id: 'quando-ter', h2: 'Quando a sua empresa precisa de um agente de IA', html: `${li(['O atendimento recebe muitas mensagens repetidas, principalmente no WhatsApp.', 'A equipe gasta tempo copiando dados entre sistemas.', 'Clientes esperam resposta fora do horário comercial.', 'Informações importantes estão espalhadas e difíceis de consultar.'])}${p('Se algum desses pontos se reconhece, veja os <a href="/agentes-de-ia/">agentes de IA para empresas</a> da Roque Business Evolution ou comece pelo <a href="/diagnostico/">diagnóstico</a>.')}` },
      { id: 'cuidados', h2: 'Cuidados antes de colocar um agente de IA para trabalhar', html: `${li(['Defina o que o agente pode e o que não pode fazer.', 'Garanta a passagem para uma pessoa quando necessário.', 'Cuide da privacidade dos dados dos clientes, conforme a LGPD.', 'Desconfie de promessas de resultado garantido.', 'Combine como o resultado será medido.'])}` },
    ],
    faq: [Q('Um agente de IA substitui a minha equipe?', 'Não. Ele assume tarefas repetitivas, e as pessoas continuam nos casos que pedem atenção humana.'), Q('Preciso entender de tecnologia para ter um agente de IA?', 'Não. O diagnóstico traduz as possibilidades em linguagem de negócio e propõe um caminho por etapas.'), Q('Agência de IA e agentes de IA são a mesma coisa?', 'Não. Agentes de IA são os assistentes que trabalham na empresa. Agência de IA é o nome dado a empresas que criam esses agentes, como faz a Roque Business Evolution.')],
    related: [['/agentes-de-ia/', 'Agentes de IA para empresas'], ['/agentes-de-ia-para-whatsapp/', 'Agente de IA para WhatsApp'], ['/automacao-de-processos/', 'Automação de processos'], ['/blog/adotar-ia-na-empresa-com-seguranca/', 'Como adotar IA com segurança']],
    ctaH2: 'Vamos ver onde um agente de IA ajuda a sua empresa', ctaP: 'Conte o seu momento. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre agentes de IA e quero conversar.',
    about: [{ '@type': 'Thing', name: 'Agente de IA' }],
  }),
  article({
    path: '/blog/geo-e-aeo-seo-para-buscas-com-ia/', og: 'blog', crumbName: 'GEO e AEO',
    title: 'GEO e AEO: como Preparar o Site para Buscas com IA | Roque',
    description: 'GEO e AEO explicados: o que são, como se relacionam com o SEO e o que fazer para o conteúdo do seu site ser compreendido por buscas com IA.',
    h1: 'GEO e AEO: como preparar o seu site para buscas com inteligência artificial',
    lead: 'GEO e AEO são as práticas que ajudam o conteúdo do seu site a ser compreendido quando as pessoas perguntam a assistentes de IA o que antes pesquisavam no Google, sempre sobre a base do bom SEO.',
    answer: 'GEO (Generative Engine Optimization) e AEO (Answer Engine Optimization) organizam o conteúdo para ser entendido por IA generativa e por mecanismos de resposta: respostas diretas no início de cada seção, informações consistentes e dados estruturados iguais ao texto visível. Nenhuma prática garante citação em respostas de IA.',
    card: 'O que são GEO e AEO, como diferem do SEO e o que fazer no seu site.',
    sections: [
      { id: 'o-que-sao', h2: 'O que são GEO e AEO e como se diferenciam do SEO', html: `${p('O SEO otimiza o site para os resultados de busca tradicionais. O AEO organiza respostas diretas para mecanismos que respondem perguntas. O GEO prepara o conteúdo para sistemas de IA generativa. Os três compartilham a mesma base: conteúdo útil, site rápido e informações claras.')}` },
      { id: 'o-que-fazer', h2: 'O que fazer no site para buscas com IA', html: `${li(['Comece cada seção com a resposta, e só depois aprofunde.', 'Use títulos que correspondam a perguntas reais do público.', 'Mantenha nome, serviços e localização escritos da mesma forma em todo o site e nos perfis da empresa.', 'Publique o conteúdo principal no HTML, sem depender de JavaScript.', 'Use perguntas frequentes e dados estruturados que reflitam exatamente o texto visível.', 'Crie conteúdo original, com experiência real, e não textos genéricos.'])}` },
      { id: 'limites', h2: 'O que ninguém pode prometer em buscas com IA', html: `${note('Não existe atalho para ser citado por um assistente de IA. A exibição depende de sistemas externos. O que a empresa controla é a clareza, a consistência e a qualidade do que publica.')}${p('Veja o trabalho de <a href="/geo-aeo/">GEO e AEO</a> e de <a href="/seo/">SEO</a> da Roque Business Evolution.')}` },
    ],
    faq: [Q('O SEO ainda importa com a IA?', 'Sim. A base técnica e de conteúdo do SEO continua sendo a fundação para ser encontrado e compreendido, inclusive por sistemas de IA.'), Q('Preciso de um arquivo llms.txt?', 'É um apoio opcional que resume o site para assistentes de IA. Não garante citação, mas ajuda a organizar a informação.'), Q('Como saber se estou aparecendo em respostas de IA?', 'Acompanhando referências identificáveis, tráfego vindo de ferramentas de IA e testando perguntas reais que o seu público faria.')],
    related: [['/geo-aeo/', 'GEO e AEO'], ['/seo/', 'SEO e busca com IA'], ['/pesquisa-de-palavras-chave/', 'Pesquisa de palavras-chave'], ['/glossario/', 'Glossário']],
    ctaH2: 'Vamos preparar o seu site para buscas com IA', ctaP: 'Conte o que o seu site diz hoje. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre GEO e AEO e quero conversar.',
    about: [{ '@type': 'Thing', name: 'GEO' }, { '@type': 'Thing', name: 'AEO' }],
  }),
  article({
    path: '/blog/agente-de-ia-no-whatsapp/', og: 'blog', crumbName: 'Agente de IA no WhatsApp',
    title: 'Agente de IA no WhatsApp: como Funciona o Atendimento | Roque',
    description: 'Como funciona um agente de IA no WhatsApp: o que ele faz, de onde aprende, quando passa para uma pessoa e que cuidados tomar com o atendimento.',
    h1: 'Agente de IA no WhatsApp: como funciona o atendimento automático',
    lead: 'Responder mensagens no WhatsApp toma tempo e acontece fora do horário. Um agente de IA atende na hora, com as informações da empresa, e passa para uma pessoa quando necessário. Veja como funciona e quais cuidados tomar.',
    answer: 'Um agente de IA no WhatsApp recebe a mensagem, entende o que o cliente quer, consulta a base de conhecimento da empresa e responde, encaminhando para uma pessoa quando o caso exige. O resultado depende da qualidade das informações, dos limites definidos e do acompanhamento.',
    card: 'Como funciona o atendimento automático com IA no WhatsApp e que cuidados tomar.',
    sections: [
      { id: 'como-funciona', h2: 'Como funciona o atendimento com agente de IA no WhatsApp', html: `${steps([['Mensagem', 'O cliente escreve para o WhatsApp da empresa.'], ['Entendimento', 'O agente identifica a intenção: dúvida, pedido, agendamento ou reclamação.'], ['Resposta', 'Consulta a base de conhecimento da empresa e responde de forma coerente com o negócio.'], ['Encaminhamento', 'Se o caso for sensível ou a informação não existir, passa a conversa para a equipe.']])}` },
      { id: 'base-de-conhecimento', h2: 'De onde o agente de IA tira as respostas', html: `${p('O agente deve responder só com o que a empresa autorizou: site, PDFs, documentos e perguntas frequentes. Quanto mais clara e atualizada a base, melhores as respostas.')}${p('O <a href="' + ENGAGEBOT + '" rel="noopener">EngageBot</a>, da Roque Business Evolution, funciona assim: o agente aprende com o site, PDFs, documentos e o FAQ da empresa.')}` },
      { id: 'cuidados', h2: 'Cuidados com o atendimento automático no WhatsApp', html: `${li(['Defina o que o agente pode e não pode responder.', 'Garanta o encaminhamento para uma pessoa em casos sensíveis.', 'Revise as conversas para melhorar a base de conhecimento.', 'Cuide da privacidade e da adequação à LGPD.', 'Acompanhe indicadores: resolução, encaminhamentos, erros e custo.'])}${p('Veja o <a href="/agentes-de-ia-para-whatsapp/">agente de IA para WhatsApp</a> sob medida.')}` },
    ],
    faq: [Q('O agente de IA atende fora do horário comercial?', 'Sim. Ele responde a qualquer hora, e os casos que pedem uma pessoa ficam registrados para a equipe retomar.'), Q('O cliente percebe que está falando com IA?', 'Recomendamos ser transparente: informar que o atendimento inicial é automático e oferecer a opção de falar com uma pessoa.'), Q('Dá para integrar com agenda e CRM?', 'Sim, conforme as integrações disponíveis. O agente pode consultar e registrar informações nesses sistemas.')],
    related: [['/agentes-de-ia-para-whatsapp/', 'Agentes de IA para WhatsApp'], ['/agentes-de-ia-para-vendas/', 'Agentes de IA para vendas'], ['/agentes-de-ia/', 'Agentes de IA para empresas'], ['/governanca-e-seguranca-de-ia/', 'Governança e segurança de IA']],
    ctaH2: 'Vamos colocar um agente de IA no seu WhatsApp', ctaP: 'Conte como é o atendimento hoje. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre agente de IA no WhatsApp e quero conversar.',
    about: [{ '@type': 'Thing', name: 'Agente de IA' }, { '@type': 'Thing', name: 'WhatsApp' }],
  }),
  article({
    path: '/blog/seo-para-pequenas-empresas/', og: 'blog', crumbName: 'SEO para pequenas empresas',
    title: 'SEO para Pequenas Empresas: por Onde Começar | Roque',
    description: 'SEO para pequenas empresas: um passo a passo simples para ser encontrado no Google, com pesquisa de palavras-chave, site, conteúdo e Perfil da Empresa.',
    h1: 'SEO para pequenas empresas: por onde começar a ser encontrado no Google',
    lead: 'O SEO para pequenas empresas permite ser encontrado no Google sem grandes investimentos, desde que acerte o básico: saber o que o público procura, ter um site claro e rápido e manter as informações da empresa consistentes.',
    answer: 'O SEO para pequenas empresas começa por descobrir o que os clientes pesquisam, criar páginas que respondem a essas buscas, deixar o site rápido e claro no celular e cuidar do Perfil da Empresa no Google. Os resultados levam tempo e dependem da concorrência.',
    card: 'Um passo a passo simples de SEO para pequenas empresas aparecerem no Google.',
    sections: [
      { id: 'pesquisa', h2: 'Passo 1: descubra o que o seu cliente pesquisa', html: `${p('Liste os serviços que você vende e as perguntas que os clientes fazem. A <a href="/pesquisa-de-palavras-chave/">pesquisa de palavras-chave</a> transforma isso em uma lista de páginas para criar.')}` },
      { id: 'site', h2: 'Passo 2: tenha um site claro, rápido e que funcione no celular', html: `${li(['Uma página para cada serviço principal, com título e descrição próprios.', 'Texto que responde à dúvida logo no começo.', 'Carregamento rápido e boa leitura no celular.', 'Botão visível para falar com a empresa no WhatsApp.'])}${p('A <a href="/criacao-de-sites/">criação de sites profissionais</a> já nasce com essa base.')}` },
      { id: 'local', h2: 'Passo 3: cuide do SEO local e do Perfil da Empresa no Google', html: `${li(['Preencha o Perfil da Empresa com nome, endereço, telefone e serviços.', 'Mantenha as informações iguais no site e nos perfis.', 'Peça avaliações de clientes reais, sem oferecer vantagens.', 'Crie páginas por serviço e por região atendida, quando fizer sentido.'])}` },
      { id: 'conteudo', h2: 'Passo 4: publique conteúdo que responde dúvidas reais', html: `${p('Artigos e páginas que respondem a perguntas reais atraem pessoas que ainda estão decidindo. Veja o <a href="/marketing-de-conteudo/">marketing de conteúdo</a>.')}` },
    ],
    faq: [Q('Quanto tempo leva para aparecer no Google?', 'Depende do mercado, da concorrência e do estado atual do site. O SEO é um trabalho contínuo, e os resultados costumam aparecer de forma gradual.'), Q('Preciso pagar anúncios para ser encontrado?', 'Não. O SEO trabalha o resultado orgânico. Os anúncios podem complementar, mas são uma estratégia diferente.'), Q('Posso fazer SEO sozinho?', 'Dá para começar pelo básico. Uma consultoria ajuda a priorizar, a evitar erros técnicos e a acelerar.')],
    related: [['/seo/', 'SEO e busca com IA'], ['/criacao-de-sites/', 'Criação de sites'], ['/pesquisa-de-palavras-chave/', 'Pesquisa de palavras-chave'], ['/para-pequenas-e-medias-empresas/', 'Para pequenas e médias empresas']],
    ctaH2: 'Vamos fazer a sua empresa ser encontrada', ctaP: 'Conte o que a sua empresa vende. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre SEO para pequenas empresas e quero conversar.',
    about: [{ '@type': 'Thing', name: 'SEO' }],
  }),
  article({
    path: '/blog/automacao-de-processos-o-que-automatizar/', og: 'blog', crumbName: 'O que automatizar',
    title: 'Automação de Processos: o que Automatizar Primeiro | Roque',
    description: 'Automação de processos empresariais: como escolher o que automatizar primeiro, exemplos de tarefas e os cuidados para não perder o controle.',
    h1: 'Automação de processos: o que a sua empresa pode automatizar primeiro',
    lead: 'Automatizar tudo de uma vez costuma dar errado. O melhor caminho é começar pelas tarefas repetitivas, frequentes e previsíveis, e crescer a partir dos ganhos. Veja como escolher e quais exemplos funcionam bem.',
    answer: 'Comece automatizando tarefas repetitivas, frequentes e com regras claras, como lembretes, distribuição de solicitações, propostas, relatórios e sincronização de dados entre sistemas. Mantenha uma pessoa na decisão quando houver dinheiro, dados sensíveis ou impacto maior.',
    card: 'Como escolher o que automatizar primeiro e exemplos de tarefas que funcionam bem.',
    sections: [
      { id: 'criterios', h2: 'Como escolher quais processos automatizar', html: `${li(['<b>Repetitivo.</b> A tarefa se repete sempre do mesmo jeito.', '<b>Frequente.</b> Acontece muitas vezes por dia ou por semana.', '<b>Previsível.</b> Tem regras claras, com poucas exceções.', '<b>Mensurável.</b> Dá para medir o tempo e o erro antes e depois.'])}` },
      { id: 'exemplos', h2: 'Exemplos de tarefas para automatizar na sua empresa', html: `${cols(['Lembretes e notificações.', 'Distribuição e classificação de solicitações.', 'Envio de propostas e documentos.', 'Cobrança e acompanhamento, conforme as regras.', 'Atualização de dados entre sistemas.', 'Relatórios periódicos.'])}` },
      { id: 'cuidados', h2: 'Cuidados para automatizar sem perder o controle', html: `${li(['Defina o que acontece quando algo foge do padrão.', 'Registre cada execução, para poder auditar.', 'Mantenha aprovação humana em operações financeiras e dados sensíveis.', 'Meça os resultados e ajuste o fluxo.'])}${p('Veja a <a href="/automacao-de-processos/">automação de processos</a> da Roque Business Evolution.')}` },
    ],
    faq: [Q('Automação é o mesmo que inteligência artificial?', 'Não. A automação segue regras definidas, enquanto a IA interpreta linguagem e toma decisões mais flexíveis. Podem ser combinadas.'), Q('Preciso trocar meus sistemas para automatizar?', 'Normalmente não. Muitas automações conectam os sistemas que a empresa já usa por meio de integrações.'), Q('Como saber se a automação deu certo?', 'Comparando tempo gasto, erros e volume antes e depois, com indicadores combinados no início.')],
    related: [['/automacao-de-processos/', 'Automação de processos'], ['/agentes-de-ia/', 'Agentes de IA para empresas'], ['/crm-e-vendas/', 'CRM e vendas'], ['/dados-e-business-intelligence/', 'Dados e business intelligence']],
    ctaH2: 'Vamos descobrir o que automatizar na sua empresa', ctaP: 'Conte quais tarefas se repetem. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre automação de processos e quero conversar.',
    about: [{ '@type': 'Thing', name: 'Automação de processos' }],
  }),
  article({
    path: '/blog/adotar-ia-na-empresa-com-seguranca/', og: 'blog', crumbName: 'Adotar IA com segurança',
    title: 'Como Adotar IA na Empresa com Governança e Segurança | Roque',
    description: 'Como adotar inteligência artificial na empresa com segurança: diagnóstico, permissões, privacidade, políticas de uso e aprovação humana.',
    h1: 'Como adotar inteligência artificial na empresa com governança e segurança',
    lead: 'Usar IA sem regras é arriscado: dados sensíveis podem vazar e respostas incorretas podem chegar ao cliente. A adoção responsável combina diagnóstico, permissões, políticas de uso, testes e supervisão humana.',
    answer: 'Para adotar IA com segurança, comece pelo diagnóstico dos casos de uso, defina permissões e limites, crie uma política interna de uso, proteja dados e credenciais, teste as respostas e mantenha aprovação humana nas decisões de maior impacto.',
    card: 'Um roteiro de governança e segurança para adotar IA na sua empresa.',
    sections: [
      { id: 'diagnostico', h2: 'Passo 1: faça um diagnóstico de casos de uso e de riscos', html: `${p('Liste onde a IA pode ajudar e qual o impacto de um erro em cada caso. Atendimento a clientes e decisões financeiras têm riscos diferentes de rascunhos internos.')}` },
      { id: 'regras', h2: 'Passo 2: defina permissões, limites e política de uso de IA', html: `${li(['O que a IA pode acessar e o que pode executar sozinha.', 'Que dados não podem ser enviados a ferramentas externas.', 'Quem aprova o quê.', 'Como proteger credenciais e segredos.'])}` },
      { id: 'testes', h2: 'Passo 3: teste, monitore e mantenha uma pessoa na decisão', html: `${li(['Teste a qualidade e o comportamento antes de publicar.', 'Avalie respostas incorretas e alucinações.', 'Registre as operações para auditoria.', 'Mantenha aprovação humana em decisões de maior impacto.'])}${p('Veja a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a> e a <a href="/capacitacao-em-ia/">capacitação em IA</a> para as equipes.')}` },
    ],
    faq: [Q('A IA pode vazar dados da minha empresa?', 'Pode, se for usada sem regras. Por isso definimos que dados podem ser usados, em quais ferramentas e com que controles.'), Q('Preciso de uma política de uso de IA?', 'Recomendamos. Ela deixa claro para a equipe o que é permitido, o que é proibido e quem decide.'), Q('Governança de IA substitui o jurídico?', 'Não. Ela apoia o uso responsável, mas não substitui assessoria jurídica nem auditoria independente quando exigidas.')],
    related: [['/governanca-e-seguranca-de-ia/', 'Governança e segurança de IA'], ['/capacitacao-em-ia/', 'Capacitação em IA'], ['/transformacao-digital/', 'Transformação digital'], ['/agentes-de-ia/', 'Agentes de IA para empresas']],
    ctaH2: 'Vamos adotar IA com segurança na sua empresa', ctaP: 'Conte onde a IA já é usada ou será usada. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre adotar IA com segurança e quero conversar.',
    about: [{ '@type': 'Thing', name: 'Governança de IA' }],
  }),
  article({
    path: '/blog/como-criar-um-site-profissional/', og: 'blog', crumbName: 'Como criar um site profissional',
    title: 'Como Criar um Site Profissional que Aparece no Google | Roque',
    description: 'Como criar um site profissional para a sua empresa: planejamento, estrutura, conteúdo, SEO, velocidade e integração com WhatsApp.',
    h1: 'Como criar um site profissional que aparece no Google e traz clientes',
    lead: 'Um site profissional não é só um cartão de visitas. Ele precisa ser encontrado, passar confiança e levar o visitante a entrar em contato. Veja as etapas para criar um site assim.',
    answer: 'Para criar um site profissional, defina o objetivo e o público, planeje as páginas a partir do que as pessoas pesquisam, escreva textos que respondem às dúvidas, garanta velocidade e boa leitura no celular, aplique SEO técnico e conecte o site ao WhatsApp e às suas ferramentas.',
    card: 'As etapas para criar um site profissional com SEO e foco em conversão.',
    sections: [
      { id: 'planejamento', h2: 'Planejamento: objetivo, público e páginas do site', html: `${li(['Qual ação o visitante deve tomar: ligar, chamar no WhatsApp, pedir orçamento.', 'Quem é o público e o que ele pesquisa.', 'Quais páginas o site precisa: início, serviços, sobre, contato e conteúdos.'])}` },
      { id: 'conteudo', h2: 'Conteúdo e SEO: textos que respondem e páginas que se encontram', html: `${p('Cada página deve responder a uma dúvida de forma direta, com título e descrição próprios. Veja o <a href="/seo/">SEO</a> e a <a href="/pesquisa-de-palavras-chave/">pesquisa de palavras-chave</a>.')}` },
      { id: 'tecnica', h2: 'Parte técnica: velocidade, celular, acessibilidade e HTML com conteúdo', html: `${li(['Carregamento rápido e design responsivo.', 'Texto principal no HTML, sem depender de JavaScript para aparecer.', 'Acessibilidade: contraste, foco visível e navegação por teclado.', 'Sitemap, robots.txt e dados estruturados.'])}` },
      { id: 'integracoes', h2: 'Integrações: WhatsApp, CRM, agenda e análise de conversões', html: `${p('O site deve levar o visitante a uma conversa. Conecte o botão de WhatsApp, os formulários, o CRM e a mensuração de conversões. Veja a <a href="/criacao-de-sites/">criação de sites</a>.')}` },
    ],
    faq: [Q('Quanto custa um site profissional?', 'Depende do escopo: número de páginas, integrações e conteúdo. A proposta discrimina cada item.'), Q('Preciso de blog no site?', 'Não é obrigatório, mas conteúdos que respondem dúvidas ajudam a ser encontrado e a gerar confiança.'), Q('Site em Instagram substitui um site próprio?', 'Não. Redes sociais complementam, mas o site é o seu ativo próprio, que você controla e que os buscadores indexam.')],
    related: [['/criacao-de-sites/', 'Criação de sites'], ['/seo/', 'SEO e busca com IA'], ['/blog/seo-para-pequenas-empresas/', 'SEO para pequenas empresas'], ['/suporte-e-evolucao-continua/', 'Suporte e evolução contínua']],
    ctaH2: 'Vamos criar o site profissional da sua empresa', ctaP: 'Conte o que a sua empresa faz. A Roque Business Evolution responde pelo WhatsApp.', msg: 'Olá! Li o artigo sobre criar um site profissional e quero conversar.',
    about: [{ '@type': 'Thing', name: 'Criação de sites' }],
  }),
];

// ------------------------------------------------------------------ índice do blog
const idxCrumb = [{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog/' }];
export const blogIndex = {
  path: '/blog/', og: 'blog',
  title: 'Blog da Roque: IA, SEO, Automação e Transformação Digital',
  description: 'Guias práticos da Roque Business Evolution sobre criação de sites, SEO, GEO e AEO, agentes de IA, automação de processos e transformação digital.',
  body: `${hero(idxCrumb, 'Blog da Roque Business Evolution', 'Guias práticos sobre inteligência artificial, SEO, GEO e AEO, automação de processos, criação de sites e transformação digital, escritos para quem decide em uma empresa.')}
<section class="sec white" id="artigos" aria-labelledby="art-h"><div class="wrap"><h2 id="art-h">Artigos sobre sites, SEO, GEO e inteligência artificial</h2>
<ul class="posts">
${ARTIGOS.map((a) => `<li><h3><a href="${a.path}">${esc(a.title.replace(/ \| Roque$/, ''))}</a></h3><p>${esc(a.lead)}</p></li>`).join('\n')}
</ul></div></section>
${finalCta('Quer um tema novo no blog?', 'Sugira pelo WhatsApp. A Roque Business Evolution responde.', 'Olá! Tenho uma sugestão de tema para o blog da Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/blog/', 'Blog da Roque Business Evolution', 'CollectionPage'), crumbLd(idxCrumb), { '@type': 'Blog', '@id': pageUrl('/blog/') + '#blog', name: 'Blog da Roque Business Evolution', url: pageUrl('/blog/'), inLanguage: 'pt-BR', publisher: { '@id': ORG_ID }, blogPost: ARTIGOS.map((a) => ({ '@type': 'BlogPosting', headline: a.title.replace(/ \| Roque$/, ''), url: pageUrl(a.path) })) }]; },
};
export const BLOG = [blogIndex, ...ARTIGOS];
