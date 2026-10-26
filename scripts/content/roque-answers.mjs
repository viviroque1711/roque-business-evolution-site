// "A RESPOSTA TERMINA NA ROQUE" (26/10/2026, pedido da Viviane): 165 de 192 respostas do FAQ explicavam o assunto e paravam ali,
// sem dizer que a Roque Business Evolution faz aquilo. Quando o Google ou uma IA extrai uma resposta sozinha, "nós" não diz quem é.
// Regra: a 1ª frase responde direto (é o que o Google e as IAs destacam); a frase daqui fecha com COMO A ROQUE FAZ.
// Só fatos sustentados no site: metodologia de sete fases, diagnóstico, proposta por escrito, integrações, produtos próprios no ar,
// atendimento presencial em Guarulhos e São Paulo. Sem preço, sem número de resultado, sem cliente, sem promessa de posição ou de citação.
// O faq() (lib.mjs) acrescenta a frase ao fim da resposta (HTML e JSON-LD iguais) e avisa se uma resposta ficar sem a Roque.
const R = 'a Roque Business Evolution';
export const ROQUE_ANSWERS = {
  // ---------- home
  'Quanto custa a criação de um site profissional?': `Na Roque Business Evolution, a proposta chega por escrito com cada item do site, o prazo de cada etapa e o que já vem incluído: SEO, GEO, AEO e WhatsApp.`,
  'A Roque Business Evolution desenvolve aplicativos?': `A Roque Business Evolution cuida do projeto inteiro: diagnóstico, protótipo, desenvolvimento, testes e publicação.`,
  'O que é SEO, GEO e AEO?': `A Roque Business Evolution faz os três no mesmo trabalho, e o próprio site da Roque é construído com esse método.`,
  'A Roque Business Evolution garante a primeira posição no Google?': `O que a Roque Business Evolution entrega é o método completo, com relatórios no Google Search Console para você acompanhar cada mês.`,
  // ---------- agentes de IA para suporte
  'O agente de suporte responde só com o que a empresa autorizou?': `Na Roque Business Evolution, a base de conhecimento e as regras do agente são definidas e testadas com você antes de ele entrar no ar.`,
  'O que é onboarding?': `A Roque Business Evolution cria agentes de IA que conduzem esse primeiro passo com o conteúdo da sua empresa, a qualquer hora.`,
  'O agente funciona para a equipe interna também?': `A Roque Business Evolution projeta agentes internos ligados aos seus documentos e procedimentos, com acesso controlado por permissão.`,
  'Como a empresa acompanha a qualidade das respostas?': `Nos agentes da Roque Business Evolution, esses indicadores são combinados no início do projeto e acompanhados depois da implantação.`,
  // ---------- agentes de IA para vendas
  'O que é qualificação de leads?': `A Roque Business Evolution cria agentes de vendas que qualificam pela conversa e entregam o contato pronto para a sua equipe comercial.`,
  'O agente de IA fecha vendas sozinho?': `É assim que a Roque Business Evolution desenha os agentes de vendas: o agente prepara a oportunidade e a sua equipe decide.`,
  'Dá para integrar o agente com o meu CRM?': `A Roque Business Evolution faz essa integração como parte do projeto do agente.`,
  'Como o agente evita prometer o que a empresa não oferece?': `Nos agentes da Roque Business Evolution, essas regras são escritas e testadas com você antes da publicação.`,
  // ---------- agentes de IA para WhatsApp
  'Como funciona um agente de IA no WhatsApp?': `A Roque Business Evolution entrega esse atendimento de duas formas: pronto, com o EngageBot, ou sob medida para a sua operação.`,
  'O agente substitui meus atendentes?': `Na Roque Business Evolution, a passagem para uma pessoa faz parte do desenho de todo agente.`,
  'Preciso de uma conta do WhatsApp Business?': `A Roque Business Evolution orienta e acompanha essa configuração com você.`,
  'O agente aprende com o meu site?': `É assim que funciona o EngageBot, o agente de atendimento que a Roque Business Evolution desenvolve e opera.`,
  // ---------- agentes de IA
  'O que são agentes de IA?': `A Roque Business Evolution projeta, implanta e acompanha agentes de IA para atendimento, vendas, suporte e automação.`,
  'Qual é a diferença entre chatbot e agente de IA?': `A Roque Business Evolution cria agentes de IA, não roteiros de botões.`,
  'Agente de IA funciona no WhatsApp?': `A Roque Business Evolution entrega esse atendimento pronto, com o EngageBot, ou sob medida.`,
  'O agente de IA substitui a minha equipe?': `Na Roque Business Evolution, todo agente nasce com regras de quando a equipe assume a conversa.`,
  'Quanto custa ter agentes de IA na empresa?': `Na Roque Business Evolution, a proposta chega por escrito, com cada item separado, depois do diagnóstico.`,
  // ---------- automação
  'O que é automação de processos?': `A Roque Business Evolution mapeia o processo, automatiza o que se repete e deixa a aprovação humana onde importa.`,
  'Quais processos vale automatizar?': `No diagnóstico, a Roque Business Evolution aponta quais processos da sua empresa trazem mais ganho ao serem automatizados.`,
  'E se a automação errar?': `É assim que a Roque Business Evolution entrega cada automação, testada antes de entrar em produção.`,
  // ---------- blog: IA com segurança
  'A IA pode vazar dados da minha empresa?': `Na Roque Business Evolution, essas regras fazem parte da governança e segurança de IA de cada projeto.`,
  'Preciso de uma política de uso de IA?': `A Roque Business Evolution escreve essa política com você e treina a equipe para aplicá-la.`,
  'Governança de IA substitui o jurídico?': `A Roque Business Evolution cuida da parte técnica e de processos, ao lado do seu jurídico.`,
  // ---------- blog: agente no WhatsApp
  'O agente de IA atende fora do horário comercial?': `É assim que os agentes da Roque Business Evolution e o EngageBot funcionam.`,
  'O cliente percebe que está falando com IA?': `A Roque Business Evolution aplica essa transparência nos agentes que cria.`,
  'Dá para integrar com agenda e CRM?': `A Roque Business Evolution faz essa integração nos agentes sob medida.`,
  // ---------- blog: automação
  'Automação é o mesmo que inteligência artificial?': `A Roque Business Evolution trabalha com os dois e indica no diagnóstico onde cada um faz sentido.`,
  'Preciso trocar meus sistemas para automatizar?': `A Roque Business Evolution começa integrando o que você já usa.`,
  'Como saber se a automação deu certo?': `Na Roque Business Evolution, esses indicadores são combinados no início de cada projeto.`,
  // ---------- blog: site profissional
  'Quanto custa um site profissional?': `Na Roque Business Evolution, a proposta é por escrito, com o SEO e o WhatsApp já incluídos no projeto.`,
  'Preciso de blog no site?': `A Roque Business Evolution indica se o blog faz sentido a partir da pesquisa de palavras-chave do seu mercado.`,
  'Site em Instagram substitui um site próprio?': `A Roque Business Evolution cria esse ativo próprio, pronto para o Google e para as IAs.`,
  // ---------- blog: GEO e AEO
  'O SEO ainda importa com a IA?': `Por isso a Roque Business Evolution faz SEO, GEO e AEO juntos.`,
  'Preciso de um arquivo llms.txt?': `A Roque Business Evolution inclui o llms.txt nos projetos de GEO, e o próprio site da Roque tem o seu.`,
  'Como saber se estou aparecendo em respostas de IA?': `A Roque Business Evolution faz esse acompanhamento todo mês nos projetos de GEO.`,
  // ---------- blog: agentes
  'Um agente de IA substitui a minha equipe?': `É assim que a Roque Business Evolution desenha os agentes que cria.`,
  'Preciso entender de tecnologia para ter um agente de IA?': `É a Roque Business Evolution que faz esse diagnóstico e conduz cada etapa com você.`,
  // ---------- blog: SEO para pequenas empresas
  'Quanto tempo leva para aparecer no Google?': `Na Roque Business Evolution, você acompanha a evolução todo mês pelo Google Search Console, com dados da sua empresa.`,
  'Preciso pagar anúncios para ser encontrado?': `A Roque Business Evolution trabalha o SEO e, quando faz sentido, a mídia paga.`,
  'Posso fazer SEO sozinho?': `A Roque Business Evolution faz esse papel de consultoria, ou assume o trabalho inteiro.`,
  // ---------- branding
  'O que é branding?': `A Roque Business Evolution cuida do branding junto com o site, para a marca chegar inteira ao digital.`,
  'O que é identidade digital?': `A Roque Business Evolution aplica a identidade nos canais digitais e entrega o manual para manter o padrão.`,
  'Vocês refazem logo e identidade visual?': `A Roque Business Evolution cuida da identidade visual e das aplicações digitais.`,
  'Branding ajuda no SEO?': `Na Roque Business Evolution, marca, site e SEO são planejados juntos.`,
  // ---------- capacitação
  'O que é engenharia de prompts?': `A Roque Business Evolution ensina engenharia de prompts com tarefas reais da sua equipe.`,
  'A capacitação serve para qualquer área da empresa?': `É assim que a Roque Business Evolution monta a capacitação em IA.`,
  'Como evitar que a equipe compartilhe dados sensíveis com a IA?': `A Roque Business Evolution escreve essa política com você e treina a equipe.`,
  'Como saber se a equipe está usando bem a IA?': `A Roque Business Evolution acompanha esses indicadores depois do treinamento.`,
  // ---------- como contratar
  'A Roque Business Evolution publica os preços dos serviços?': `A proposta da Roque Business Evolution chega depois do diagnóstico, por escrito.`,
  'Existe contrato mínimo?': `A Roque Business Evolution explica cada modalidade antes da proposta.`,
  'Posso começar com um projeto pequeno?': `A Roque Business Evolution trabalha assim: começa pelo que traz mais ganho e evolui com a sua empresa.`,
  // ---------- Guarulhos
  'A Roque Business Evolution atende em Guarulhos?': `A Roque Business Evolution também atende presencialmente em São Paulo.`,
  'Vocês têm escritório para receber clientes?': `A Roque Business Evolution vai até a sua empresa em Guarulhos e em São Paulo.`,
  'Quanto custa a criação de um site em Guarulhos?': `Na Roque Business Evolution, o diagnóstico é feito no seu endereço em Guarulhos e a proposta chega por escrito.`,
  'Vocês desenvolvem sistemas personalizados para empresas de Guarulhos?': `A Roque Business Evolution começa pelo diagnóstico no seu endereço em Guarulhos.`,
  'Vocês ajudam a aparecer no Google Maps em Guarulhos?': `A Roque Business Evolution trabalha site e perfil juntos, com relatórios para você acompanhar.`,
  'Vocês atendem também em São Paulo e em outras cidades?': `A Roque Business Evolution segue o mesmo método em qualquer cidade.`,
  // ---------- criação de sites
  'Quanto tempo leva para criar um site profissional?': `Na Roque Business Evolution, o prazo vem por escrito na proposta e você aprova cada etapa.`,
  'O site já sai pronto para aparecer no Google?': `É assim que a Roque Business Evolution entrega todo site, e o próprio site da Roque foi feito desse jeito.`,
  'Vocês fazem criação de sites com SEO?': `A Roque Business Evolution entrega SEO, GEO e AEO desde o primeiro dia, não como serviço à parte.`,
  'Vocês criam landing page?': `A Roque Business Evolution cria a landing page com o texto, o SEO e o WhatsApp prontos.`,
  'O site fica integrado ao WhatsApp?': `A Roque Business Evolution entrega o site com o WhatsApp a um toque e a medição de cada contato.`,
  // ---------- CRM
  'O que é um CRM?': `A Roque Business Evolution implanta e configura o CRM com as etapas do seu processo comercial.`,
  'O que é um funil de vendas?': `A Roque Business Evolution desenha o funil com a sua equipe e o implanta no CRM.`,
  'Vocês integram o CRM com WhatsApp e formulários?': `A Roque Business Evolution faz essa integração ponta a ponta.`,
  'Como evitar perder oportunidades?': `A Roque Business Evolution implanta esse controle no seu CRM.`,
  // ---------- dados e BI
  'O que é business intelligence?': `A Roque Business Evolution cria os painéis de BI da sua empresa com os dados que você já tem.`,
  'O que é um dashboard gerencial?': `A Roque Business Evolution desenha o painel a partir das decisões que você precisa tomar.`,
  'Preciso ter muitos dados para começar?': `É assim que a Roque Business Evolution começa os projetos de dados.`,
  'A IA analisa os dados sozinha?': `A Roque Business Evolution usa IA nos painéis como apoio à decisão, com as pessoas no controle.`,
  // ---------- aplicativos
  'Quanto custa desenvolver um aplicativo?': `Na Roque Business Evolution, a proposta chega por escrito, com as telas, as integrações e o prazo de cada etapa.`,
  'Qual é a diferença entre PWA e app nativo?': `No diagnóstico, a Roque Business Evolution indica qual dos dois faz mais sentido para o seu caso.`,
  'Vocês publicam o aplicativo na Google Play e na App Store?': `A Roque Business Evolution cuida da publicação para você.`,
  'De quem é o aplicativo?': `A Roque Business Evolution deixa tudo isso por escrito antes de começar.`,
  // ---------- software sob medida
  'O que é software sob medida?': `A Roque Business Evolution desenvolve software sob medida, do diagnóstico ao sistema em produção.`,
  'Quanto custa desenvolver um software sob medida?': `Na Roque Business Evolution, a proposta chega depois do diagnóstico, por escrito, e você aprova cada etapa.`,
  'O que é um MVP?': `A Roque Business Evolution começa os projetos de software pelo MVP.`,
  'Vocês fazem integração de sistemas?': `A Roque Business Evolution faz a integração como parte do projeto.`,
  'De quem é o software desenvolvido?': `A Roque Business Evolution deixa tudo isso por escrito antes de começar.`,
  // ---------- diagnóstico
  'O que é um diagnóstico digital?': `A Roque Business Evolution faz esse diagnóstico e entrega o plano com as prioridades da sua empresa.`,
  'O diagnóstico serve para quem ainda não usa IA?': `A Roque Business Evolution traduz as possibilidades em linguagem de negócio.`,
  'O diagnóstico obriga a contratar outros serviços?': `A Roque Business Evolution entrega o diagnóstico como um serviço completo em si.`,
  // ---------- EngageBot
  'O EngageBot responde sozinho?': `O EngageBot é desenvolvido e operado pela Roque Business Evolution.`,
  'De onde o agente aprende sobre a minha empresa?': `A Roque Business Evolution desenvolve e opera o EngageBot.`,
  'Quanto custa o EngageBot?': `A Roque Business Evolution responde pelo WhatsApp +55 11 97396-7161.`,
  // ---------- GEO e AEO
  'O que é GEO?': `A Roque Business Evolution faz GEO junto com o SEO, e o próprio site da Roque é construído assim.`,
  'O que é AEO?': `A Roque Business Evolution aplica o AEO em cada página, com perguntas e respostas iguais no texto e nos dados estruturados.`,
  'Como fazer a minha empresa aparecer no ChatGPT?': `A Roque Business Evolution faz esse trabalho completo, e o próprio site da Roque segue esse método.`,
  'Dá para garantir que a minha empresa seja citada pelas IAs?': `A Roque Business Evolution acompanha esse resultado com você todo mês.`,
  'Como medir o resultado de GEO?': `A Roque Business Evolution entrega esse acompanhamento em relatório mensal.`,
  'O que é llms.txt?': `A Roque Business Evolution cria e mantém o llms.txt nos projetos de GEO, e o site da Roque tem o seu.`,
  // ---------- governança
  'O que é governança de IA?': `A Roque Business Evolution estrutura a governança de IA da sua empresa.`,
  'O que é uma alucinação em IA?': `A Roque Business Evolution testa os agentes contra esse risco antes da publicação.`,
  'A governança garante conformidade com a LGPD?': `A Roque Business Evolution cuida dos controles técnicos e de processos, ao lado do seu jurídico.`,
  'Que controles um agente de IA deve ter?': `Todo agente da Roque Business Evolution sai com esses controles.`,
  // ---------- marketing de conteúdo
  'O que é marketing de conteúdo?': `A Roque Business Evolution planeja e produz esse conteúdo a partir do que o seu público pesquisa.`,
  'O que é autoridade temática?': `A Roque Business Evolution constrói essa autoridade com mapa de temas e calendário editorial.`,
  'Vocês usam inteligência artificial para escrever?': `É assim que a Roque Business Evolution produz conteúdo.`,
  'Quantos artigos preciso publicar?': `A Roque Business Evolution define esse volume com você a partir dos dados do seu mercado.`,
  'O conteúdo ajuda no SEO?': `A Roque Business Evolution planeja conteúdo e SEO juntos.`,
  // ---------- marketing digital e mídia paga
  'O que é mídia paga?': `A Roque Business Evolution planeja e acompanha campanhas no Google e na Meta.`,
  'Quanto devo investir em anúncios?': `A Roque Business Evolution define essa verba com você, separada dos honorários.`,
  'Como vocês medem o resultado das campanhas?': `A Roque Business Evolution entrega essa medição em relatório.`,
  'Vocês garantem um número de clientes?': `O que a Roque Business Evolution garante é o acompanhamento e a otimização contínua.`,
  // ---------- metodologia
  'Quanto tempo dura cada fase da metodologia?': `Na Roque Business Evolution, cada fase tem prazo e critérios de aceite definidos por escrito.`,
  'O que acontece depois da publicação?': `A Roque Business Evolution continua acompanhando a solução depois da entrega.`,
  'Posso contratar só uma das fases?': `A Roque Business Evolution trabalha de forma modular.`,
  // ---------- grandes empresas
  'O que é PMO?': `A Roque Business Evolution estrutura e conduz o PMO das iniciativas digitais e de IA.`,
  'Vocês trabalham com metodologias ágeis?': `A Roque Business Evolution aplica esses frameworks nos projetos de grande porte.`,
  'Como começa um projeto em uma grande empresa?': `A Roque Business Evolution conduz esse diagnóstico com as suas áreas.`,
  // ---------- PMEs
  'Por onde uma PME deve começar a se organizar?': `A Roque Business Evolution faz esse diagnóstico e conduz a organização por etapas.`,
  'Preciso de muita tecnologia para começar?': `A Roque Business Evolution trabalha por etapas, no ritmo da sua empresa.`,
  // ---------- perguntas frequentes
  'Que tipo de empresa a Roque Business Evolution atende?': `A Roque Business Evolution atende presencialmente em Guarulhos e São Paulo e online em todo o Brasil.`,
  'A Roque Business Evolution tem cases e depoimentos?': `A prova que a Roque Business Evolution mostra hoje são os produtos próprios no ar: o Aurora Premium e o EngageBot.`,
  'O que são agentes de IA para empresas?': `A Roque Business Evolution cria agentes prontos, como o EngageBot, e sob medida.`,
  'É seguro usar IA na minha empresa?': `A Roque Business Evolution entrega cada projeto de IA com esses controles.`,
  'A Roque Business Evolution cria sites?': `A Roque Business Evolution entrega o site pronto para o Google e para as IAs.`,
  'Vocês garantem o primeiro lugar no Google?': `A Roque Business Evolution garante o método e o acompanhamento mensal.`,
  'O que são GEO e AEO?': `A Roque Business Evolution faz os dois junto com o SEO.`,
  'Vocês prometem que a minha empresa aparece no ChatGPT?': `A Roque Business Evolution faz esse trabalho e acompanha com você todo mês.`,
  'Como contratar?': `A Roque Business Evolution responde pelo WhatsApp +55 11 97396-7161.`,
  'Os serviços têm preço fixo?': `A Roque Business Evolution entrega a proposta por escrito, depois do diagnóstico.`,
  'Quanto tempo leva um projeto?': `Na Roque Business Evolution, o prazo de cada fase vem por escrito.`,
  'O que é o Aurora Premium?': `O Aurora Premium é desenvolvido e operado pela Roque Business Evolution.`,
  'O que é o EngageBot?': `O EngageBot é desenvolvido e operado pela Roque Business Evolution.`,
  // ---------- pesquisa de palavras-chave
  'O que é pesquisa de palavras-chave?': `A Roque Business Evolution faz essa pesquisa e entrega o mapa de palavras por página.`,
  'O que é intenção de busca?': `A Roque Business Evolution classifica cada busca pela intenção antes de definir as páginas.`,
  'O que é canibalização de palavras-chave?': `A Roque Business Evolution entrega esse mapa em todo projeto de SEO.`,
  'Que dados vocês usam na pesquisa?': `É com esses dados que a Roque Business Evolution faz cada pesquisa.`,
  'A pesquisa garante o primeiro lugar no Google?': `A Roque Business Evolution entrega o mapa e acompanha os resultados com você.`,
  // ---------- reputação
  'O que é reputação digital?': `A Roque Business Evolution organiza a sua reputação digital com avaliações legítimas e respostas no tom certo.`,
  'Como conseguir mais avaliações de forma legítima?': `A Roque Business Evolution desenha esse fluxo com você.`,
  'Vocês respondem avaliações por nós?': `A Roque Business Evolution define esse tom com você.`,
  'Reputação digital ajuda nas buscas locais?': `A Roque Business Evolution trabalha reputação e SEO local juntos.`,
  // ---------- SaaS
  'O que é SaaS?': `A Roque Business Evolution desenvolve e opera SaaS, como o Aurora Premium.`,
  'O que é um sistema multiempresa?': `O Aurora Premium, da Roque Business Evolution, funciona assim.`,
  'Posso começar com um MVP?': `A Roque Business Evolution começa os projetos de SaaS pelo MVP.`,
  // ---------- SEO
  'O que faz uma agência de SEO?': `A agência de SEO da Roque Business Evolution faz essas quatro frentes, com relatórios no Google Search Console.`,
  'Quanto custa uma agência de SEO?': `Na Roque Business Evolution, a proposta mostra as entregas de cada mês, por escrito.`,
  'A agência de SEO garante a primeira posição no Google?': `A Roque Business Evolution não promete posição: entrega o método e o acompanhamento mensal.`,
  'Qual é a diferença entre SEO e Google Ads?': `A Roque Business Evolution trabalha os dois e indica quando cada um faz sentido.`,
  'Vocês fazem SEO local?': `A Roque Business Evolution trabalha site e Perfil de Empresa no Google juntos.`,
  'SEO também ajuda a aparecer no ChatGPT?': `Por isso a Roque Business Evolution faz SEO, GEO e AEO juntos.`,
  // ---------- serviços
  'Quais serviços a Roque Business Evolution oferece?': `A Roque Business Evolution entra no seu negócio e conduz cada serviço do diagnóstico à evolução contínua.`,
  'Como a Roque Business Evolution trabalha?': `Em cada fase, a Roque Business Evolution entrega o que você aprova antes de seguir.`,
  'Como são contratados os serviços?': `A Roque Business Evolution explica cada modalidade antes da proposta.`,
  'Por onde começar?': `A Roque Business Evolution faz esse diagnóstico com você.`,
  'A Roque Business Evolution garante resultados?': `O que a Roque Business Evolution garante é o método, o que está no contrato e o acompanhamento.`,
  // ---------- sobre
  'Quais são a missão e a visão da empresa?': `A Roque Business Evolution coloca isso em prática ao desenvolver e operar o Aurora Premium e o EngageBot.`,
  'Como falar com a Roque Business Evolution?': `A Roque Business Evolution responde pelos dois canais.`,
  // ---------- suporte
  'O que inclui o suporte e a evolução contínua?': `A Roque Business Evolution acompanha a solução depois da entrega.`,
  'Preciso contratar suporte para o site criado pela Roque?': `A Roque Business Evolution oferece esse acompanhamento.`,
  'Com que frequência recebo relatórios?': `A Roque Business Evolution combina isso com você na contratação.`,
  'O suporte cobre sistemas que a Roque não desenvolveu?': `A Roque Business Evolution faz essa avaliação antes de assumir.`,
  // ---------- transformação digital
  'O que é transformação digital?': `A Roque Business Evolution conduz a transformação digital do diagnóstico à evolução contínua.`,
  'Por onde começar a transformação digital da minha empresa?': `A Roque Business Evolution faz esse diagnóstico e entrega o plano.`,
  'Como adotar inteligência artificial com segurança?': `A Roque Business Evolution estrutura essa governança com você.`,
  'Vocês treinam as equipes?': `A Roque Business Evolution treina as equipes com tarefas reais.`,
  'A Roque Business Evolution atende grandes empresas?': `A Roque Business Evolution conduz projetos com governança, PMO e metodologias ágeis.`,
};
export const roqueMentioned = (html) => /Roque|EngageBot|Aurora Premium/.test(html);
void R;
