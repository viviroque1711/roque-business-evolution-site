// Página principal da agência de IA (AgencyAI): reúne todas as aplicações de agentes de IA e de automação do portfólio (5.9 e 5.10).
import { li, cols, steps, p, group, note, ENGAGEBOT, aEngage } from './kit.mjs';
import { servicePage } from './schema.mjs';

const Q = (q, a) => ({ q, a: `<p>${a}</p>` });

export const ia = servicePage({
  path: '/agencia-de-ia/', og: 'agencia-de-ia', crumbName: 'Agência de IA',
  title: 'Agência de IA: Agentes de IA e Automação | Roque',
  description: 'Agência de IA da Roque Business Evolution: agentes de inteligência artificial, atendimento no WhatsApp e automação de processos para a sua empresa.',
  h1: 'Agência de IA que coloca agentes de inteligência artificial para trabalhar na sua empresa',
  lead: 'Uma agência de IA projeta, implanta e acompanha agentes de inteligência artificial que atendem clientes e executam tarefas dentro das regras que a sua empresa define. A Roque Business Evolution (AgencyAI) faz isso com atendimento no WhatsApp, automação de processos e integração com os seus sistemas.',
  msg: 'Olá! Quero conversar com a agência de IA da Roque Business Evolution.',
  serviceName: 'Agência de IA: agentes de inteligência artificial e automação', serviceType: 'Agência de inteligência artificial',
  serviceDescription: 'Projeto, implantação e acompanhamento de agentes de inteligência artificial, atendimento automatizado e automação de processos empresariais.',
  sections: [
    { id: 'o-que-entrega', h2: 'O que uma agência de IA entrega para a sua empresa', html: `${p('Uma agência de IA entrega agentes e automações que trabalham dentro dos sistemas e das regras da sua empresa, com limites e permissões definidos. Cada projeto é desenhado a partir dos canais disponíveis, da infraestrutura, da qualidade dos dados, das permissões de integração e dos requisitos de privacidade.')}` },
    { id: 'aplicacoes', h2: 'Aplicações da agência de IA: agentes para atendimento, vendas, suporte e operação', html: `${p('Estas são as aplicações de agentes de inteligência artificial que a Roque Business Evolution projeta. As principais têm página própria.')}
${group('Atendimento automatizado via WhatsApp e webchat', `${p('Agentes que atendem clientes, respondem dúvidas e encaminham para pessoas. <a href="/agentes-de-ia-para-whatsapp/">Veja o agente de IA para WhatsApp</a>.')}`)}
${group('Vendas: leads, assistentes comerciais e recuperação de contatos', `${p('Qualificação e classificação de leads, assistentes comerciais, recuperação de contatos e acompanhamento comercial. <a href="/agentes-de-ia-para-vendas/">Veja o agente de IA para vendas</a>.')}`)}
${group('Suporte, pós-venda, onboarding e bases de conhecimento', `${p('Agentes de suporte e pós-venda, agentes de onboarding e assistentes para consulta a bases de conhecimento. <a href="/agentes-de-ia-para-suporte/">Veja o agente de IA para suporte</a>.')}`)}
${group('Operação interna e agendamento', `${li(['<b>Agentes internos</b> para apoiar equipes com procedimentos, políticas e documentos.', '<b>Agentes de agendamento e confirmação</b> de compromissos.', '<b>Sistemas multiagentes</b> com funções especializadas, quando o projeto pede.'])}`)}` },
    { id: 'como-funcionam', h2: 'Como a agência de IA constrói agentes: memória, integrações e supervisão', html: `${p('Um agente útil se apoia em quatro pilares: lembrar do contexto da conversa, conversar com os sistemas da empresa, ter limites claros e ser acompanhado.')}${cols([
      '<b>Memória de conversa</b> e recuperação de informações do contexto.',
      '<b>Integração</b> com CRMs, agendas, bancos de dados e APIs.',
      '<b>Encaminhamento</b> para atendentes humanos.',
      '<b>Monitoramento</b> de qualidade, erros, custos e desempenho.',
      '<b>Avaliação de segurança</b>, limites operacionais e escalonamento humano.',
      '<b>Governança</b> de acessos e registro das operações. Veja a <a href="/governanca-e-seguranca-de-ia/">governança e segurança de IA</a>.',
    ])}` },
    { id: 'automacao', h2: 'Agência de IA e automação de processos: menos tarefa repetitiva', html: `${p('A automação de processos com IA conecta formulários, CRM, agenda e sistemas administrativos para reduzir tarefas repetitivas e dar mais velocidade à operação. <a href="/automacao-de-processos/">Veja a automação de processos</a>.')}${cols(['Mapeamento de processos automatizáveis.', 'Fluxos de trabalho entre áreas e ferramentas.', 'Notificações, alertas e lembretes.', 'Propostas e documentos automáticos.', 'Relatórios periódicos automáticos.', 'Filas, tratamento de falhas e registro de execução.'])}${note('Toda automação prevê tratamento de exceções e a participação de uma pessoa quando necessário, principalmente em operações financeiras, dados sensíveis ou decisões de maior impacto.')}` },
    { id: 'como-trabalha', h2: 'Como a agência de IA conduz um projeto de agente de IA', html: `${p('Cada projeto começa pelo diagnóstico do negócio e segue etapas curtas, com testes antes de entrar em produção.')}${steps([
      ['Diagnóstico', 'Entendemos o negócio, os canais de atendimento, os sistemas e os principais gargalos.'],
      ['Arquitetura da solução', 'Definimos escopo, integrações, permissões, indicadores e critérios de aceite.'],
      ['Implementação e testes', 'Construímos o agente ou a automação e testamos qualidade, segurança e comportamento.'],
      ['Publicação e operação', 'Colocamos em produção, acompanhamos o início e capacitamos a equipe.'],
      ['Mensuração e evolução', 'Acompanhamos taxa de resolução, encaminhamento para pessoas, erros, latência e custo por interação.'],
    ])}` },
    { id: 'engagebot', h2: 'EngageBot: o agente de IA da agência para atendimento no WhatsApp e no site', html: `${p('Para quem quer começar com um produto pronto, a Roque Business Evolution criou o ' + aEngage() + ', atendimento com inteligência artificial no WhatsApp e no site, que aprende com o conteúdo da empresa e organiza as conversas em uma caixa única.')}${p('Para projetos sob medida, com integrações específicas, o trabalho é feito pela agência de IA.')}` },
  ],
  faq: [
    Q('O que faz uma agência de IA?', 'Uma agência de IA projeta, implanta e acompanha agentes de inteligência artificial e automações que executam tarefas de atendimento, vendas e operação dentro das regras da empresa.'),
    Q('O que é um agente de IA?', 'É um sistema de inteligência artificial que entende uma solicitação, usa informações e ferramentas autorizadas e executa tarefas, como responder um cliente ou agendar um horário, dentro de limites definidos.'),
    Q('Um agente de IA substitui a minha equipe?', 'Não. O agente cuida das tarefas repetitivas e das dúvidas frequentes, e a conversa é encaminhada para uma pessoa quando o caso pede atenção humana.'),
    Q('A agência de IA atende pelo WhatsApp?', 'Sim. O atendimento automatizado pode funcionar no WhatsApp e no webchat. Conheça o <a href="' + ENGAGEBOT + '" rel="noopener">EngageBot</a>, atendimento com IA da Roque Business Evolution.'),
    Q('É seguro usar IA com os dados dos meus clientes?', 'Depende de como o projeto é desenhado. Definimos permissões, limites de execução, controle de acesso e regras de aprovação humana, e orientamos sobre proteção de dados e LGPD conforme o escopo.'),
    Q('Quanto custa contratar uma agência de IA?', 'Depende do escopo. A proposta separa implantação, mensalidade, ferramentas de terceiros e suporte. Fale pelo WhatsApp para receber um diagnóstico do seu caso.'),
  ],
  related: [['/agentes-de-ia-para-whatsapp/', 'Agentes de IA para WhatsApp'], ['/automacao-de-processos/', 'Automação de processos'], ['/desenvolvimento-de-software/', 'Desenvolvimento de software'], ['/transformacao-digital/', 'Transformação digital']],
  ctaH2: 'Vamos conversar sobre a agência de IA para a sua empresa', ctaP: 'Conte o que você quer automatizar ou melhorar no atendimento. A Roque Business Evolution responde pelo WhatsApp.',
});
