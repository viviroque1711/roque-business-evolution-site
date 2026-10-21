// Páginas institucionais e de apoio à decisão: propósito, públicos (PME e grandes empresas), metodologia, como contratar,
// diagnóstico, perguntas frequentes, produtos e glossário. Fonte: portfólio oficial; propósito e públicos também vêm do site antigo
// (só as declarações da empresa, sem depoimentos, cases nem números).
import { esc, faq, crumbLd, crumbHtml, pageUrl } from './lib.mjs';
import { btn, li, cols, steps, sec, related, p, group, note, faqGrouped, ENGAGEBOT, AURORA, aEngage, aAurora } from './kit.mjs';
import { ORG_ID, SITE_ID, org, website, webpage, finalCta, hero } from './schema.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });

/** Molde de página institucional: hero, seções alternadas, FAQ opcional, chamada final. */
function infoPage(c) {
  const crumb = c.crumb || [{ name: 'Início', path: '/' }, { name: c.crumbName, path: c.path }];
  const f = c.faq ? (c.faqGroups ? faqGrouped(c.faq, { pagePath: c.path }) : faq(c.faq, { pagePath: c.path })) : null;
  const n = c.sections.length;
  const body = `${hero(crumb, c.h1, c.lead, c.heroExtra ?? `<div class="btns">${btn('Falar no WhatsApp', c.msg)}</div>`)}
${c.sections.map((s, i) => sec(i % 2 === 0 ? 'white' : 'mist', s.id, s.h2, s.html)).join('\n')}
${c.related ? sec(n % 2 === 0 ? 'white' : 'mist', 'relacionados', c.relatedH2 || 'Continue explorando', related(c.related)) : ''}
${f ? f.html.replace('class="sec paper"', `class="sec ${(n + (c.related ? 1 : 0)) % 2 === 0 ? 'white' : 'mist'}"`) : ''}
${finalCta(c.ctaH2, c.ctaP, c.msg)}`;
  return {
    path: c.path, og: c.og, title: c.title, description: c.description, body,
    get graph() { return [org(), website(), webpage(c.path, c.crumbName || c.h1, c.type || 'WebPage'), crumbLd(crumb), ...(f ? [f.ld] : []), ...(c.extraLd ? c.extraLd() : [])]; },
  };
}

// ------------------------------------------------------------------ PROPÓSITO E IMPACTO
export const proposito = infoPage({
  path: '/proposito-e-impacto/', og: 'proposito', crumbName: 'Propósito e impacto', type: 'AboutPage',
  title: 'Propósito e Impacto | Roque Business Evolution',
  description: 'O propósito da Roque Business Evolution: fortalecer empresas, democratizar a gestão de alto nível para pequenas e médias empresas e gerar prosperidade.',
  h1: 'Propósito e impacto da Roque Business Evolution',
  lead: 'O propósito da Roque Business Evolution é fortalecer empresas, porque empresas fortes constroem comunidades fortes. Isso significa levar tecnologia, inteligência artificial e métodos de gestão que antes eram de grandes corporações ao dia a dia de pequenas e médias empresas.',
  msg: 'Olá! Quero conversar com a Roque Business Evolution.',
  sections: [
    { id: 'proposito', h2: 'O propósito da Roque Business Evolution: fortalecer empresas e comunidades', html: `${p('A Roque Business Evolution nasceu da percepção de que existe um abismo entre o potencial de uma empresa e a sua performance real. O propósito é construir pontes sólidas sobre esse abismo, com método, tecnologia e gestão aplicada com rigor.')}${p('Fortalecer negócios é uma forma de fortalecer a sociedade: empresas estruturadas mantêm empregos, movimentam a economia local e dão estabilidade a quem trabalha nelas.')}` },
    { id: 'missao-visao', h2: 'Missão e visão do propósito: evolução com inteligência artificial, tecnologia e gestão', html: `<div class="cols"><div><h3>Missão</h3><p>Acelerar a evolução de empresas por meio da aplicação estratégica de inteligência artificial, tecnologia e métodos de gestão, tornando processos mais eficientes, operações mais inteligentes e negócios mais competitivos.</p></div><div><h3>Visão</h3><p>Ser uma referência em soluções integradas de inteligência artificial e transformação digital para empresas que buscam crescer de forma estruturada, sustentável e orientada por dados.</p></div></div>` },
    { id: 'pme', h2: 'Propósito: compromisso com pequenos e médios empreendedores', html: `${p('Pequenas e médias empresas movem a economia e, muitas vezes, constroem o negócio sem o suporte estratégico que as grandes corporações têm.')}${p('O compromisso da Roque Business Evolution é democratizar o acesso à gestão de alto nível: levar ferramentas, processos e inteligência antes restritos a grandes empresas para empresas em crescimento, sem tornar o dia a dia mais complicado. Veja como em <a href="/para-pequenas-e-medias-empresas/">soluções para pequenas e médias empresas</a>.')}` },
    { id: 'prosperidade', h2: 'Propósito em ação: como a Roque Business Evolution potencializa a prosperidade', html: `${p('A abordagem integra três pilares: estratégia (onde ir), processos (como ir) e tecnologia (com que velocidade ir). Ao alinhar os três, a empresa elimina desperdícios, otimiza recursos e cria uma cultura de alta performance.')}${p('Acreditamos que organização traz dignidade: processos claros e gestão eficiente reduzem o caos, o estresse desnecessário e devolvem qualidade de vida ao empreendedor e às equipes.')}` },
    { id: 'quatro-pilares', h2: 'Os quatro pilares do propósito: estratégia, tecnologia, operações e execução', html: cols(['<b>Estratégia.</b> Clareza sobre onde ir, com roteiros que ligam a visão de futuro às ações de hoje.', '<b>Tecnologia.</b> Meio, e não fim: automatizar o trivial e dar mais capacidade às pessoas.', '<b>Operações.</b> Fluxos de trabalho sem gargalos, desperdícios e atrito.', '<b>Execução.</b> Transformar planos em realidade, com disciplina e responsabilidade.']) },
  ],
  related: [['/sobre/', 'Sobre a Roque Business Evolution'], ['/metodologia/', 'Metodologia de trabalho'], ['/servicos/', 'Todos os serviços'], ['/para-pequenas-e-medias-empresas/', 'Para pequenas e médias empresas']],
  ctaH2: 'Vamos conversar sobre a evolução da sua empresa', ctaP: 'Conte o seu momento. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ PME
export const pme = infoPage({
  path: '/para-pequenas-e-medias-empresas/', og: 'pme', crumbName: 'Para pequenas e médias empresas',
  title: 'Soluções para Pequenas e Médias Empresas (PME) | Roque',
  description: 'Tecnologia, IA e gestão para pequenas e médias empresas: organizar processos, automatizar tarefas, atender melhor e acompanhar indicadores. Roque.',
  h1: 'Tecnologia e inteligência artificial para pequenas e médias empresas crescerem com organização',
  lead: 'A Roque Business Evolution ajuda pequenas e médias empresas (PME) a organizar processos, automatizar tarefas repetitivas, atender melhor e acompanhar os números do negócio, com soluções práticas e no tamanho de cada operação.',
  msg: 'Olá! Quero conversar sobre soluções para a minha pequena ou média empresa.',
  sections: [
    { id: 'desafios', h2: 'Desafios comuns das pequenas e médias empresas', html: `${p('Estes são os problemas que mais travam o crescimento de uma PME. Se você se reconhece em algum deles, existe caminho.')}${li([
      '<b>Falta de processos.</b> A operação depende de improviso e de quem “sabe como fazer”.',
      '<b>Agenda e prazos desorganizados.</b> Compromissos perdidos e falta de controle.',
      '<b>Equipes desalinhadas.</b> Comunicação falha e retrabalho.',
      '<b>Ferramentas desconectadas.</b> Dados duplicados em sistemas que não conversam.',
      '<b>Falta de indicadores.</b> Decisões tomadas sem dados confiáveis.',
      '<b>Atendimento lento.</b> Mensagens acumuladas no WhatsApp e clientes esperando.',
    ])}` },
    { id: 'solucoes', h2: 'Como a Roque Business Evolution resolve cada desafio da PME', html: li([
      '<b>Processos.</b> <a href="/transformacao-digital/">Consultoria de transformação digital</a> para mapear, documentar e estruturar a operação.',
      '<b>Automação.</b> <a href="/automacao-de-processos/">Automação de processos</a> para eliminar tarefas manuais e integrar ferramentas.',
      '<b>Atendimento.</b> <a href="/agentes-de-ia-para-whatsapp/">Agente de IA para WhatsApp</a> e o <a href="' + ENGAGEBOT + '" rel="noopener">EngageBot</a>.',
      '<b>Presença digital.</b> <a href="/criacao-de-sites/">Criação de sites</a> com <a href="/seo/">SEO</a> para ser encontrado por novos clientes.',
      '<b>Vendas.</b> <a href="/crm-e-vendas/">CRM e funil de vendas</a> para não perder oportunidades.',
      '<b>Indicadores.</b> <a href="/dados-e-business-intelligence/">Dashboards simples e práticos</a> para decidir com dados.',
    ]) },
    { id: 'servico', h2: 'Para pequenas e médias empresas de serviço: o Aurora Premium', html: `${p('Para salões, barbearias, clínicas, spas e pet shops, a Roque Business Evolution criou o ' + aAurora() + ', sistema de agendamento e gestão com agenda online, clientes, financeiro e estoque na mesma plataforma.')}` },
    { id: 'preparar', h2: 'Preparar pequenas e médias empresas para crescer de forma sustentável', html: `${p('Crescer sem estrutura costuma gerar mais problemas do que resultados. O objetivo é construir uma base: processos escaláveis, tecnologia adequada ao tamanho da empresa e governança básica.')}${p('O primeiro passo é o <a href="/diagnostico/">diagnóstico</a>, que identifica os principais gargalos e as prioridades.')}` },
  ],
  related: [['/diagnostico/', 'Diagnóstico digital e de IA'], ['/como-contratar/', 'Como contratar'], ['/metodologia/', 'Metodologia de trabalho'], ['/servicos/', 'Todos os serviços']],
  faq: [
    Q('Minha empresa é pequena. A Roque Business Evolution atende?', 'Sim. O compromisso da Roque é levar tecnologia e gestão de alto nível para pequenas e médias empresas, com soluções no tamanho de cada operação.'),
    Q('Por onde uma PME deve começar a se organizar?', 'Pelo diagnóstico: entender os processos, os gargalos e as prioridades. Depois vêm as ações de maior impacto, como organizar processos, automatizar tarefas repetitivas e acompanhar indicadores.'),
    Q('Preciso de muita tecnologia para começar?', 'Não. Começamos pelo que traz mais ganho com menos complexidade, e a tecnologia cresce junto com a empresa.'),
    Q('A Roque Business Evolution tem solução de agendamento?', 'Sim, para negócios de serviço: o <a href="https://aurorapremium.com/" rel="noopener">Aurora Premium</a>, sistema de agendamento e gestão.'),
  ],
  ctaH2: 'Vamos organizar e fazer a sua empresa crescer', ctaP: 'Conte os desafios do seu dia a dia. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ GRANDES EMPRESAS
export const enterprise = infoPage({
  path: '/para-grandes-empresas/', og: 'enterprise', crumbName: 'Para grandes empresas',
  title: 'Transformação Digital e Governança para Grandes Empresas | Roque',
  description: 'Transformação digital, PMO, governança, integração de sistemas e IA para grandes empresas, com agilidade e robustez. Roque Business Evolution.',
  h1: 'Transformação digital, governança e inteligência artificial para grandes empresas',
  lead: 'A Roque Business Evolution apoia grandes empresas em transformação digital, governança de portfólio e projetos (PMO), integração de sistemas e adoção responsável de IA, com agilidade sem perder a robustez de uma operação complexa.',
  msg: 'Olá! Quero conversar sobre transformação digital e governança para a minha empresa.',
  sections: [
    { id: 'governanca', h2: 'Governança, PMO e gestão de portfólio para grandes empresas', html: `${p('Em organizações complexas, a governança dá visibilidade e prioridade ao que gera valor. É uma área que a fundadora, <a href="https://viviroque.com.br/">Viviane Roque</a>, conhece de perto: atuou no PMO de projetos de grande porte.')}${li(['Estruturas de PMO e de PMO ágil.', 'Visibilidade do portfólio e priorização baseada em valor.', 'Gestão de riscos e de dependências.', 'Dashboards executivos de projetos e iniciativas.'])}` },
    { id: 'transformacao', h2: 'Transformação digital e integração de sistemas para grandes empresas', html: `${li(['Digitalização de processos e modernização de sistemas legados.', 'Arquitetura de soluções escaláveis e integrações por APIs.', 'Integração entre sistemas corporativos, como ERP, CRM e BI, para eliminar silos e duplicidades.', 'Automação de ponta a ponta, com <a href="/automacao-de-processos/">automação de processos</a> e <a href="/agencia-de-ia/">agentes de IA</a>.'])}${p('Veja a <a href="/transformacao-digital/">consultoria de transformação digital</a> e o <a href="/desenvolvimento-de-software/">desenvolvimento de software</a>.')}` },
    { id: 'eficiencia', h2: 'Eficiência operacional e agilidade em escala para grandes empresas', html: `${li(['Mapeamento de processos atuais e futuros, identificação de desperdícios e de gargalos.', 'Frameworks ágeis em escala, como SAFe e Scrum, com treinamento e acompanhamento.', 'KPIs, <a href="/dados-e-business-intelligence/">dashboards e analytics</a> para decisões baseadas em dados.', 'Governança e segurança para adoção de IA. Veja a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a>.'])}` },
    { id: 'abordagem', h2: 'Abordagem em fases para a transformação em grandes empresas', html: `${p('Toda iniciativa segue a <a href="/metodologia/">metodologia de sete fases</a> da Roque Business Evolution, do diagnóstico à evolução contínua, com critérios de aceite, indicadores e responsabilidades definidos desde o início.')}` },
  ],
  related: [['/diagnostico/', 'Diagnóstico digital e de IA'], ['/metodologia/', 'Metodologia de trabalho'], ['/como-contratar/', 'Como contratar'], ['/servicos/', 'Todos os serviços']],
  faq: [
    Q('A Roque Business Evolution atende grandes empresas?', 'Sim. A fundadora tem experiência em operações de grande porte, incluindo PMO de projetos de arenas da Copa de 2014, e a empresa atua com governança, transformação digital e integração de sistemas.'),
    Q('O que é PMO?', 'PMO (Project Management Office) é o escritório que padroniza e acompanha a gestão de projetos e do portfólio de uma organização, dando visibilidade, priorização e controle.'),
    Q('Vocês trabalham com metodologias ágeis?', 'Sim, incluindo frameworks ágeis em escala como SAFe e Scrum, com treinamento, rituais estruturados e métricas de agilidade.'),
    Q('Como começa um projeto em uma grande empresa?', 'Pelo <a href="/diagnostico/">diagnóstico</a>: entrevistas, análise de processos e sistemas e identificação de ganhos rápidos, seguido de arquitetura, plano e roteiro de implementação.'),
  ],
  ctaH2: 'Vamos conversar sobre a transformação da sua organização', ctaP: 'Conte o escopo e os desafios. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ METODOLOGIA
const FASES = [
  ['Diagnóstico', 'Entendimento do negócio, dos objetivos, do público, dos processos, dos sistemas e dos principais problemas.'],
  ['Pesquisa e estratégia', 'Análise de mercado, de concorrência, de palavras-chave, de intenção de busca, de oportunidades de automação e de prioridades comerciais.'],
  ['Arquitetura da solução', 'Definição de escopo, tecnologias, integrações, requisitos, indicadores, responsabilidades e critérios de aceite.'],
  ['Implementação', 'Desenvolvimento, configuração, produção de conteúdo, integração de ferramentas e execução das atividades contratadas.'],
  ['Testes e validação', 'Testes técnicos e funcionais, revisão de conteúdo, validação de dados, segurança e aprovação do cliente.'],
  ['Publicação e operação', 'Entrada em produção, monitoramento inicial, documentação e capacitação dos usuários, conforme o projeto.'],
  ['Mensuração e evolução', 'Acompanhamento dos indicadores, identificação de desvios e execução de melhorias priorizadas.'],
];
export const metodologia = infoPage({
  path: '/metodologia/', og: 'metodologia', crumbName: 'Metodologia',
  title: 'Metodologia de Trabalho em 7 Fases | Roque Business Evolution',
  description: 'A metodologia da Roque Business Evolution em sete fases, do diagnóstico à evolução contínua, com indicadores por serviço e critérios de aceite.',
  h1: 'Metodologia da Roque Business Evolution: sete fases do diagnóstico à evolução contínua',
  lead: 'A metodologia de trabalho da Roque Business Evolution organiza cada projeto em sete fases, do diagnóstico à mensuração e evolução, para reduzir riscos, organizar investimentos e medir o que muda.',
  msg: 'Olá! Quero conhecer a metodologia da Roque Business Evolution.',
  sections: [
    { id: 'fases', h2: 'As sete fases da metodologia de trabalho', html: `${p('Cada fase tem entregas e critérios próprios, e o projeto só avança quando a fase anterior foi validada com você.')}${steps(FASES)}` },
    { id: 'indicadores', h2: 'Indicadores da metodologia: como medimos cada tipo de serviço', html: `${p('Os indicadores são escolhidos conforme os serviços contratados e os objetivos do negócio.')}${li([
      '<b>Sites e conversão.</b> Taxa de conversão, leads, formulários concluídos e desempenho técnico.',
      '<b>SEO.</b> Impressões, cliques, consultas orgânicas, páginas indexadas e conversões orgânicas.',
      '<b>GEO e AEO.</b> Referências identificáveis, tráfego originado de ferramentas de IA e presença observável em respostas.',
      '<b>Marketing.</b> Custo por lead, custo de aquisição, conversões e retorno sobre investimento.',
      '<b>Agentes de IA.</b> Taxa de resolução, encaminhamento para pessoas, latência, erros e custo por interação.',
      '<b>Automação.</b> Tempo de execução, tarefas automatizadas, falhas e horas economizadas.',
      '<b>Vendas e CRM.</b> Leads qualificados, conversão por etapa, tempo de resposta e ciclo comercial.',
      '<b>BI e analytics.</b> Qualidade dos dados, atualização dos painéis e acompanhamento de metas.',
    ])}${note('Os resultados dependem de mercado, concorrência, investimento, dados disponíveis e execução do cliente. Não garantimos posições específicas no Google, citações por ferramentas de IA nem resultados financeiros sem condições objetivas definidas em contrato.')}` },
    { id: 'diferenciais', h2: 'Diferenciais da metodologia da Roque Business Evolution', html: li([
      'Estratégia empresarial conectada à implementação tecnológica.',
      'Sites desenvolvidos com foco em visibilidade, experiência e conversão.',
      'SEO baseado em pesquisa, intenção de busca e contexto semântico.',
      'IA aplicada a processos reais, e não só como recurso de comunicação.',
      'Automação integrada a sistemas e fluxos empresariais.',
      'Decisões orientadas por indicadores e critérios mensuráveis.',
      'Soluções modulares, com evolução progressiva.',
      'Governança, segurança e supervisão humana proporcionais ao risco.',
    ]) },
  ],
  related: [['/diagnostico/', 'Diagnóstico'], ['/como-contratar/', 'Como contratar'], ['/servicos/', 'Todos os serviços'], ['/proposito-e-impacto/', 'Propósito e impacto']],
  faq: [
    Q('Quanto tempo dura cada fase da metodologia?', 'Depende do projeto. O prazo de cada fase é definido na proposta, a partir do escopo, das integrações e das validações necessárias.'),
    Q('O que acontece depois da publicação?', 'Entram a operação e a evolução: monitoramento, acompanhamento de indicadores e melhorias priorizadas. Veja o <a href="/suporte-e-evolucao-continua/">suporte e evolução contínua</a>.'),
    Q('Posso contratar só uma das fases?', 'Sim. Diagnóstico e planejamento, por exemplo, podem ser contratados sozinhos, como consultoria especializada.'),
  ],
  ctaH2: 'Vamos começar pelo diagnóstico', ctaP: 'Conte o seu momento e o que você quer melhorar. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ COMO CONTRATAR
export const contratar = infoPage({
  path: '/como-contratar/', og: 'como-contratar', crumbName: 'Como contratar',
  title: 'Como Contratar: Modelos de Contratação | Roque Business Evolution',
  description: 'Modelos de contratação da Roque Business Evolution: projetos fechados, serviços recorrentes, consultoria especializada e projetos híbridos.',
  h1: 'Como contratar a Roque Business Evolution: projetos, serviços recorrentes e consultoria',
  lead: 'Para contratar a Roque Business Evolution há quatro modalidades de contratação: projetos fechados, serviços recorrentes, consultoria especializada e projetos híbridos de tecnologia e operação. A proposta é sempre escrita para o seu caso, com escopo, prazos e responsabilidades claros.',
  msg: 'Olá! Quero entender como contratar a Roque Business Evolution.',
  sections: [
    { id: 'modalidades', h2: 'As quatro modalidades de contratação', html: `${group('Projetos fechados', p('Indicados para sites, landing pages, auditorias, integrações, MVPs e implantações com escopo e prazo definidos.'))}${group('Serviços recorrentes', p('Indicados para SEO, conteúdo, suporte, manutenção, monitoramento, gestão de campanhas e evolução de automações.'))}${group('Consultoria especializada', p('Indicada para diagnóstico, planejamento estratégico, arquitetura de soluções, governança e orientação executiva.'))}${group('Projetos híbridos de tecnologia e operação', p('Combinam implantação inicial, uso de software, integrações e acompanhamento contínuo, conforme o contrato.'))}` },
    { id: 'proposta', h2: 'O que a proposta de contratação detalha', html: `${p('A proposta comercial discrimina tudo o que influencia o investimento, para que não haja surpresa.')}${cols(['Implantação e mensalidade.', 'Limites de utilização.', 'Ferramentas de terceiros e infraestrutura.', 'Mídia paga, quando houver.', 'Suporte e níveis de serviço.', 'Entregáveis e critérios de aceite.', 'Condições para alterações de escopo.', 'Propriedade intelectual e responsabilidades.'])}${note('Verbas de mídia, licenças e custos de terceiros são especificados separadamente dos honorários da agência.')}` },
    { id: 'passos', h2: 'Como contratar: do primeiro contato à proposta', html: steps([['Primeiro contato', 'Você fala com a Roque Business Evolution pelo WhatsApp e conta o seu momento.'], ['Diagnóstico', 'Entendemos negócio, objetivos e prioridades. Veja o <a href="/diagnostico/">diagnóstico</a>.'.replace(/<[^>]+>/g, '')], ['Proposta', 'Você recebe a proposta com escopo, prazos, entregáveis e condições.'], ['Início do projeto', 'Com a proposta aprovada, o trabalho começa pela fase de arquitetura da solução ou pela implementação, conforme o caso.']]) },
  ],
  related: [['/diagnostico/', 'Diagnóstico digital e de IA'], ['/metodologia/', 'Metodologia de trabalho'], ['/servicos/', 'Todos os serviços'], ['/perguntas-frequentes/', 'Perguntas frequentes']],
  faq: [
    Q('A Roque Business Evolution publica os preços dos serviços?', 'Não. Cada projeto tem escopo próprio, e a proposta é escrita para o seu caso, com todos os itens de investimento discriminados.'),
    Q('Existe contrato mínimo?', 'Depende da modalidade. Projetos fechados têm escopo e prazo definidos. Serviços recorrentes seguem as condições combinadas na proposta.'),
    Q('Posso começar com um projeto pequeno?', 'Sim. As soluções são modulares e podem evoluir de forma progressiva, a partir de um primeiro projeto de menor escopo.'),
  ],
  ctaH2: 'Vamos montar a proposta para o seu caso', ctaP: 'Conte o que você precisa. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ DIAGNÓSTICO
export const diagnostico = infoPage({
  path: '/diagnostico/', og: 'diagnostico', crumbName: 'Diagnóstico',
  title: 'Diagnóstico Digital e de IA para Empresas | Roque',
  description: 'Diagnóstico de maturidade digital e de IA: mapeamento de processos, gargalos, oportunidades de automação e plano de ação. Roque Business Evolution.',
  h1: 'Diagnóstico digital e de IA: o primeiro passo para modernizar a sua empresa',
  lead: 'O diagnóstico digital e de IA da Roque Business Evolution mostra onde a sua empresa está, onde há ganho possível e por onde começar: mapeia processos, gargalos e oportunidades de automação e entrega um plano de ação com prioridades.',
  msg: 'Olá! Quero pedir um diagnóstico digital e de IA para a minha empresa.',
  sections: [
    { id: 'o-que-cobre', h2: 'O que o diagnóstico de maturidade digital e de IA cobre', html: li(['Diagnóstico de maturidade digital e de IA.', 'Mapeamento de processos empresariais.', 'Identificação de gargalos operacionais e de oportunidades de automação.', 'Avaliação de viabilidade técnica, operacional e financeira.', 'Definição de prioridades, indicadores e metas.', 'Seleção de tecnologias e ferramentas.']) },
    { id: 'entregaveis', h2: 'O que você recebe no diagnóstico', html: `${p('Os entregáveis variam conforme o escopo contratado. Os principais são:')}${cols(['Diagnóstico da situação atual.', 'Mapa de oportunidades.', 'Plano de ação priorizado.', 'Arquitetura de referência.', 'Indicadores de acompanhamento.', 'Roadmap de implementação e de evolução tecnológica.'])}` },
    { id: 'como-pedir', h2: 'Como pedir um diagnóstico para a sua empresa', html: steps([['Chame a Roque Business Evolution', 'Pelo WhatsApp +55 11 97396-7161 ou por e-mail.'], ['Conte o seu momento', 'Fale sobre o negócio, o time e o que está travando.'], ['Receba a proposta do diagnóstico', 'Com escopo, etapas e entregáveis.']]) },
  ],
  related: [['/metodologia/', 'Metodologia de trabalho'], ['/transformacao-digital/', 'Consultoria de transformação digital'], ['/como-contratar/', 'Como contratar'], ['/servicos/', 'Todos os serviços']],
  faq: [
    Q('O que é um diagnóstico digital?', 'É uma análise estruturada de como a empresa usa tecnologia hoje, quais processos e sistemas funcionam, onde estão os gargalos e quais melhorias trariam mais resultado.'),
    Q('O diagnóstico serve para quem ainda não usa IA?', 'Sim. Ele identifica onde a IA e a automação fazem sentido, e onde ainda não fazem, antes de qualquer investimento.'),
    Q('O diagnóstico obriga a contratar outros serviços?', 'Não. O diagnóstico é um serviço de consultoria que pode ser contratado sozinho. Se fizer sentido, ele orienta os próximos passos.'),
  ],
  ctaH2: 'Vamos fazer o diagnóstico da sua empresa', ctaP: 'Conte o seu momento. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ PRODUTOS
export const produtos = infoPage({
  path: '/produtos/', og: 'produtos', crumbName: 'Produtos',
  title: 'Produtos da Roque: Aurora Premium e EngageBot',
  description: 'Produtos da Roque Business Evolution: Aurora Premium, sistema de agendamento e gestão, e EngageBot, atendimento com IA no WhatsApp e no site.',
  h1: 'Produtos da Roque Business Evolution: Aurora Premium e EngageBot',
  lead: 'Além de serviços, a Roque Business Evolution desenvolve e opera dois produtos próprios: o Aurora Premium, sistema de agendamento e gestão para negócios de serviço, e o EngageBot, atendimento com inteligência artificial no WhatsApp e no site.',
  msg: 'Olá! Quero conhecer os produtos da Roque Business Evolution.',
  sections: [
    { id: 'aurora', h2: 'Aurora Premium: sistema de agendamento e gestão para negócios de serviço', html: `${p('O Aurora Premium é um sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025 e desenvolvido pela Roque Business Evolution. Reúne agenda online, clientes, financeiro e estoque na mesma plataforma.')}<div class="btns"><a class="btn" href="${AURORA}" rel="noopener">Conhecer o Aurora Premium</a></div>` },
    { id: 'engagebot', h2: 'EngageBot: atendimento com inteligência artificial no WhatsApp e no site', html: `${p('O EngageBot responde clientes no WhatsApp e no site, aprende com o conteúdo da empresa e organiza as conversas em uma caixa única. É o produto de atendimento com IA da Roque Business Evolution.')}<div class="btns"><a class="btn" href="${ENGAGEBOT}" rel="noopener">Conhecer o EngageBot</a></div>${p('Entenda <a href="/engagebot/">como o EngageBot funciona</a> e veja o <a href="/agentes-de-ia-para-whatsapp/">agente de IA para WhatsApp</a> sob medida.')}` },
    { id: 'saas', h2: 'Produtos SaaS: Aurora Premium e EngageBot, criados e operados pela Roque Business Evolution', html: `${p('Os dois produtos são plataformas SaaS multiempresa: várias empresas usam o mesmo sistema, com os dados separados. Essa experiência de criar e operar plataformas está disponível para projetos de clientes. Veja o <a href="/saas/">desenvolvimento de SaaS</a>.')}` },
  ],
  related: [['/saas/', 'Desenvolvimento de SaaS'], ['/agencia-de-ia/', 'Agência de IA'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/sobre/', 'Sobre a Roque Business Evolution']],
  faq: [
    Q('A Roque Business Evolution tem produtos próprios?', 'Sim. O Aurora Premium, sistema de agendamento e gestão, e o EngageBot, atendimento com IA no WhatsApp e no site.'),
    Q('O lembrete de agendamento do Aurora Premium é cobrado à parte?', 'Não. O lembrete de agendamento já vem incluído no Aurora Premium, e o EngageBot é o atendimento com IA para conversar com o cliente.'),
    Q('Posso contratar a Roque para criar uma plataforma SaaS minha?', 'Sim. A Roque Business Evolution faz o <a href="/saas/">desenvolvimento de SaaS</a> e de plataformas multiempresa sob medida.'),
  ],
  ctaH2: 'Vamos conversar sobre qual produto serve para você', ctaP: 'Conte o que você precisa. A Roque Business Evolution responde pelo WhatsApp.',
});

// ------------------------------------------------------------------ PERGUNTAS FREQUENTES (grupos, um FAQPage)
const GF = [
  { id: 'empresa', h2: 'Sobre a Roque Business Evolution', items: [
    Q('O que é a Roque Business Evolution?', 'É uma agência de IA, de criação de sites e de desenvolvimento de software que ajuda empresas a modernizar processos, conquistar clientes e decidir com mais inteligência. A razão social é Roque Business Evolution Serviços Ltda.'),
    Q('Quem fundou a Roque Business Evolution?', 'A fundadora é <a href="https://viviroque.com.br/" rel="noopener">Viviane Roque</a>, que trabalha com tecnologia e gestão de operações desde 1998.'),
    Q('Que tipo de empresa a Roque Business Evolution atende?', 'Pequenas e médias empresas e grandes organizações. Veja as páginas <a href="/para-pequenas-e-medias-empresas/">para pequenas e médias empresas</a> e <a href="/para-grandes-empresas/">para grandes empresas</a>.'),
    Q('A Roque Business Evolution tem cases e depoimentos?', 'Não publicamos cases nem depoimentos enquanto não houver casos reais autorizados pelos clientes. Preferimos não apresentar o que não podemos comprovar.'),
  ] },
  { id: 'ia', h2: 'Agência de IA e automação', items: [
    Q('O que faz uma agência de IA?', 'Projeta, implanta e acompanha agentes de inteligência artificial e automações dentro das regras da empresa. Veja a <a href="/agencia-de-ia/">agência de IA</a>.'),
    Q('Posso ter um atendimento automático no WhatsApp?', 'Sim, com o <a href="https://engagebot.com.br/" rel="noopener">EngageBot</a> ou com um <a href="/agentes-de-ia-para-whatsapp/">agente de IA sob medida</a>.'),
    Q('É seguro usar IA na minha empresa?', 'Depende dos controles. Trabalhamos com permissões, limites, registro das operações e aprovação humana. Veja a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a>.'),
  ] },
  { id: 'sites-seo', h2: 'Sites, SEO e buscas com IA', items: [
    Q('A Roque Business Evolution cria sites?', 'Sim. A <a href="/criacao-de-sites/">criação de sites profissionais</a> já nasce com SEO técnico, conteúdo no HTML e design responsivo.'),
    Q('Vocês garantem o primeiro lugar no Google?', 'Não. Ninguém pode garantir posição. O trabalho aumenta as chances com base técnica, conteúdo e autoridade, e acompanha os resultados.'),
    Q('O que são GEO e AEO?', 'São formas de organizar a informação para buscas com IA e mecanismos de resposta. Veja <a href="/geo-aeo/">GEO e AEO</a>.'),
    Q('Vocês prometem que a minha empresa aparece no ChatGPT?', 'Não. A exibição em respostas de IA depende de sistemas externos. O trabalho torna as informações mais claras e verificáveis.'),
  ] },
  { id: 'contratacao', h2: 'Contratação, preços e prazos', items: [
    Q('Como contratar?', 'Pelo primeiro contato no WhatsApp, seguido de diagnóstico e proposta. Veja <a href="/como-contratar/">como contratar</a>.'),
    Q('Os serviços têm preço fixo?', 'Não. Cada projeto tem escopo próprio, e a proposta discrimina implantação, mensalidade, ferramentas de terceiros, mídia paga e suporte.'),
    Q('Quanto tempo leva um projeto?', 'Depende do escopo e das integrações. Os prazos são definidos na proposta, fase a fase. Veja a <a href="/metodologia/">metodologia</a>.'),
    Q('Como falar com a Roque Business Evolution?', 'Pelo WhatsApp +55 11 97396-7161 ou pelo e-mail contato@roquebusinessevolution.com.'),
  ] },
  { id: 'produtos', h2: 'Produtos: Aurora Premium e EngageBot', items: [
    Q('O que é o Aurora Premium?', 'Um sistema de agendamento e gestão para salões, barbearias, clínicas, spas e pet shops, lançado em 2025. Site: <a href="https://aurorapremium.com/" rel="noopener">aurorapremium.com</a>.'),
    Q('O que é o EngageBot?', 'O atendimento com inteligência artificial no WhatsApp e no site. Site: <a href="https://engagebot.com.br/" rel="noopener">engagebot.com.br</a>.'),
  ] },
];
const faqPageData = faqGrouped(GF, { pagePath: '/perguntas-frequentes/' });
export const faqGeral = {
  path: '/perguntas-frequentes/', og: 'faq',
  title: 'Perguntas Frequentes | Roque Business Evolution',
  description: 'Perguntas frequentes sobre a Roque Business Evolution: agência de IA, sites e SEO, GEO e AEO, contratação, prazos e produtos.',
  body: `${hero([{ name: 'Início', path: '/' }, { name: 'Perguntas frequentes', path: '/perguntas-frequentes/' }], 'Perguntas frequentes sobre a Roque Business Evolution', 'As perguntas frequentes reúnem as dúvidas mais comuns sobre a Roque Business Evolution, a agência de IA, a criação de sites, SEO, GEO e AEO, a contratação e os produtos.', `<div class="btns">${btn('Falar no WhatsApp', 'Olá! Tenho uma dúvida sobre a Roque Business Evolution.')}</div>`)}
${faqPageData.html}
${finalCta('Não achou a sua dúvida?', 'Pergunte pelo WhatsApp. A Roque Business Evolution responde.', 'Olá! Tenho uma dúvida sobre a Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/perguntas-frequentes/', 'Perguntas frequentes', 'WebPage'), crumbLd([{ name: 'Início', path: '/' }, { name: 'Perguntas frequentes', path: '/perguntas-frequentes/' }]), faqPageData.ld]; },
};

// ------------------------------------------------------------------ GLOSSÁRIO
const TERMOS = [
  ['Agência de IA', 'Empresa que projeta, implanta e acompanha agentes de inteligência artificial e automações para outras empresas.'],
  ['Agente de IA', 'Sistema de inteligência artificial que entende uma solicitação e executa tarefas, usando informações e ferramentas autorizadas, dentro de limites definidos.'],
  ['AEO (Answer Engine Optimization)', 'Otimização de conteúdo para mecanismos que respondem perguntas diretamente, com respostas claras e verificáveis.'],
  ['Alucinação (em IA)', 'Resposta gerada por IA que parece correta, mas contém informação inventada ou errada.'],
  ['API', 'Interface que permite que dois sistemas troquem informações de forma automática.'],
  ['Automação de processos', 'Uso de sistemas para executar tarefas repetitivas e fluxos de trabalho seguindo regras definidas.'],
  ['Canibalização de palavras-chave', 'Situação em que duas páginas do mesmo site disputam a mesma busca e uma atrapalha a outra.'],
  ['CRM', 'Sistema de gestão de relacionamento com clientes, que organiza contatos, conversas e oportunidades de venda.'],
  ['Core Web Vitals', 'Métricas do Google sobre carregamento, interatividade e estabilidade visual de uma página.'],
  ['Dados estruturados', 'Marcação no código da página que descreve o conteúdo (como perguntas e respostas, produtos ou organização) para os buscadores.'],
  ['Dashboard', 'Painel visual que reúne os principais indicadores de um negócio em um só lugar.'],
  ['Funil de vendas', 'Representação das etapas que uma oportunidade percorre, do primeiro contato ao fechamento.'],
  ['GEO (Generative Engine Optimization)', 'Otimização do conteúdo para ser compreendido e utilizado por mecanismos de IA generativa.'],
  ['Governança de IA', 'Regras, responsabilidades e controles que definem como a IA pode ser usada e como o uso é acompanhado.'],
  ['Intenção de busca', 'Objetivo por trás de uma pesquisa: aprender, comparar opções, contratar ou encontrar uma marca específica.'],
  ['KPI', 'Indicador-chave de desempenho: número que mostra se uma meta está sendo atingida.'],
  ['Landing page', 'Página criada para uma campanha ou oferta, com foco em levar o visitante a uma ação.'],
  ['LGPD', 'Lei Geral de Proteção de Dados (Lei 13.709/2018), que regula o tratamento de dados pessoais no Brasil.'],
  ['llms.txt', 'Arquivo de texto na raiz do site que resume a empresa e as páginas principais para assistentes de IA. É um apoio, e não garante citação.'],
  ['MVP', 'Produto mínimo viável: a menor versão de um produto que já permite validar a ideia com usuários reais.'],
  ['Multiempresa (multitenant)', 'Plataforma única usada por várias empresas, com os dados de cada uma separados e protegidos.'],
  ['Onboarding', 'Processo de receber e orientar um novo cliente ou colaborador nos primeiros passos.'],
  ['Palavra-chave de cauda longa', 'Termo de busca mais específico e longo, normalmente com menos volume e intenção mais clara.'],
  ['PMO', 'Escritório de gestão de projetos: padroniza e acompanha projetos e portfólio de uma organização.'],
  ['SaaS', 'Software como serviço: sistema usado pela internet, normalmente por assinatura, sem instalação.'],
  ['SEO', 'Conjunto de ações para que um site seja encontrado nos mecanismos de busca por pessoas com intenção relevante.'],
  ['SEO local', 'Otimização para buscas geográficas e por proximidade, com o Perfil da Empresa no Google e páginas por região.'],
  ['Sitemap', 'Arquivo que lista as páginas de um site para os buscadores.'],
  ['Topic cluster', 'Grupo de conteúdos sobre um mesmo tema, ligado a uma página pilar, que constrói autoridade temática.'],
  ['Webchat', 'Chat de atendimento incorporado ao site da empresa.'],
];
const glossCrumb = [{ name: 'Início', path: '/' }, { name: 'Glossário', path: '/glossario/' }];
export const glossario = {
  path: '/glossario/', og: 'glossario',
  title: 'Glossário de IA, SEO e Transformação Digital | Roque',
  description: 'Glossário com os principais termos de inteligência artificial, SEO, GEO, AEO, automação, CRM, SaaS e transformação digital, explicados de forma simples.',
  body: `${hero(glossCrumb, 'Glossário de inteligência artificial, SEO e transformação digital', 'Este glossário explica de forma simples os termos mais usados em inteligência artificial, SEO, automação e transformação digital, para você decidir com mais segurança.')}
<section class="sec white" id="termos" aria-labelledby="termos-h"><div class="wrap"><h2 id="termos-h">Termos de agência de IA, SEO, GEO, AEO e transformação digital</h2>
<dl class="gloss">
${TERMOS.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('\n')}
</dl>
</div></section>
${sec('mist', 'continue', 'Continue explorando', related([['/servicos/', 'Todos os serviços'], ['/agencia-de-ia/', 'Agência de IA'], ['/seo/', 'SEO'], ['/geo-aeo/', 'GEO e AEO'], ['/blog/', 'Blog']]))}
${finalCta('Ficou com alguma dúvida?', 'Pergunte pelo WhatsApp. A Roque Business Evolution responde.', 'Olá! Tenho uma dúvida sobre os serviços da Roque Business Evolution.')}`,
  get graph() { return [org(), website(), webpage('/glossario/', 'Glossário', 'WebPage'), crumbLd(glossCrumb), { '@type': 'DefinedTermSet', '@id': pageUrl('/glossario/') + '#termos', name: 'Glossário de inteligência artificial, SEO e transformação digital', inLanguage: 'pt-BR', hasDefinedTerm: TERMOS.map(([t, d]) => ({ '@type': 'DefinedTerm', name: t, description: d })) }]; },
};

export const INSTITUTIONAL = [proposito, pme, enterprise, metodologia, contratar, diagnostico, produtos, faqGeral, glossario];
