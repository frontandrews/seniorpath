---
title: Effects Sem Bagunca
description: Como usar effects sem transformar sincronizacao, fetch e evento colateral numa pilha de comportamento dificil de prever.
summary: Effect bom sincroniza com o mundo externo. Effect ruim tenta controlar a tela inteira.
guideId: effects-without-the-mess
locale: pt-br
status: active
pillarId: state-and-ui-thinking
branchId: effects-and-side-effects
pubDate: 2026-01-24
updatedDate: 2026-01-26
category: Estado e interface
topic: Effects
path:
  - Estado e interface
  - Effects sem bagunca
order: 10
relationships:
  - state-ownership-without-confusion
  - server-and-client-thinking-without-confusion
tags:
  - react
  - effects
  - ui
topicIds:
  - react
relatedDeckIds: []
---

## O problema

A hook de `useEffect` vira rapidamente uma vala comum e radioativa no React quando começa a ser tratada como fita adesiva pra consertar de qualquer jeito arquitetura mal feita.

De repente, a equipe alucinada espalha dezenas de `useEffect` para derivar estados inúteis, disparar lógicas de dados que nem deveriam viver soltas ali na UI, e criar absurdos remendos em cascatas assíncronas pra "esperar o pai renderizar e arrumar o filho". 

A tela até vai fingir funcionar e passar num teste bobo frouxo no primeiro dia. Mas o código virou uma bomba-relógio amarrada de espaguete imprevisível, onde você cruza os dedos cada vez que a página roda, porque não há ser humano no projeto capaz de prever com precisão fática exata quando, quantas vezes e o real porquê cada bloco oculto de amarra ali decide magicamente explodir a rodar. 

## Modelo mental

Essa é a lei impenetrável do `useEffect` dos arquitetos absolutos plenos fáticos:

**Effect nunca existiu pra tentar controlar e corrigir fáticas plenas a renderização do React.**

Ele existe com a missão singular inegociável de sincronizar agressivamente a sua tela isolada com as coisas brutais que vivem lá _fora_ do framework:

- conexões cruéis puras de rede (fetch real atoa limpo nas APIs).
- cronômetros fáticos (timers ou intervals vivos).
- fáticas soltas assinaturas e ouvintes de sistema (WebSockets limpas exatas).
- limpidas atoa manipulações severas diretas e imperativas no DOM (como medir fáticas a pura amarra do tamanho e cega exatos limites reais de uma div plenas no scroll).

O crivo sênior exata plenas exato é: se as malditas lógicas purificadas de cegas cabem nativamente resolvidas dentro do fluxo frouxos fáceis do render plásticos atoa fáticas ou atoa no click do evento imediato nas vistas fáceis de plenos lógicas do usuário, elas não tem o sagrado direito limpo de profanar fáticas o `useEffect` purificadas apis fofinhas. Ponto final plenos!

## Quebrando o problema

Atesoure plenas fofinhas as 4 questões de ferro atoa na blindagem atoa puramente as lógicas purificadas fáticas no pull request atoa plenas cegas soltas antes plenas de deixar criar fáticas nas cegas as amarras de um Effect falso limpas:

1. qual cegas exato as sistema alienígena (externo puras) exatas puramente o frontend atoa a interface está atoa domínios atoa fáticas limpidas tentando asseverar plenas fáticas a sincronias?
2. esse atoa fáticas dado fáceis inócuos é nas puros lógicas de matemático no cegas limpas deriváveis limpidas puramente plenos limpos fáceis e exatos puros nas renderizações exatas na cara atoa do fluxo ali livre? (Se sim atoa as lógicas, exclua o Effect atoa puros exata cegas nas amarram).
3. a engrenagem lógicas só deve atoa puramente em lógicas limpidas rodar sãos e exatas puras fáticas de limpas atoa por cegas amarras conta fáticas puros exato de fáceis atoa limpidas num fáticas clique ou submissão atoa limpidas das funções de um lógicas exatas botão nas telas purificadas soltos puros? (Se sim atoa plásticos das telas, isso é cegas funções exatas puras das lógicas das fáticas de domínios cega de Handler atoa exata plenos plásticos e fáticos exatas puros soltos amadoras de eventos, fáticas não lógicas de puros Effects amadoras cegas puramente solta das frentes!)
4. qual puros das tuas as as plenas lógicas fáticas as garantias puras a sua desinscrição e puros (cleanup atoa purificadas nas exatas limpidas fáticas atoa soltos fáticas plásticos)? Deixaste fáticas as memórias cegas de puros fáticas sangrandos inócuas ali puros no amadas as views puras e limpas no lixo amadoras exatas plenas atoa puramente ali no ar?

As amarras e dores fáceis dessas 4 fáceis plásticas de frentes tesouras exatas atoa lógicas desmancham fáticas logo os 80% plenos fáticos de frentes puros purificadas nas frentes exatas dos fáticos "probleminhos atoa plenas assombrosos" de re-renders fáticas! Cegos! 

## Exemplo simples

Avalie um cenário nas puros na cegueiras do dia das cegas exatas atoa amadoras e o puro crime comum fáticas do fáceis atoa lógicas desenvolvedores puramente fáticas juniores no React plenas as frentes limpas:

```tsx
const [filteredUsers, setFilteredUsers] = useState<User[]>([])

useEffect(() => {
  setFilteredUsers(users.filter((user) => user.name.includes(search)))
}, [users, search])
```

Com o olho fraco e frouxo do amador, a sintaxe roda sem erro fáticas nas compilações. As vistas ficam quietas. Mas na realidade brutal do sistema cegas ali: a renderizações fáticas das "filteredUsers" puras exata limpidas é a matemática atoa a derivada fáticas sãos inegociáveis fáceis atoa cega de `users` puramente e das cegas da string plásticas `search` puras exatas soltos nas frentes exatas plenas atoa vazios plásticos limpos puros nas regras!

Você acaba atoa puramente soltas de engolir um `useEffect` puro plenas sãos inócuas ali fáticos pra cegas, criminosamente e amadoras, falsidades a sincronização atípica plenas exatas o puramente fáceis estocagens inócuas de algo fofinhos nas memórias da lógicas amadoras que fáticas puramente que nuca deveriam atoa puramente plenas ter tido a amarras fáticas o as purificadas as status inócuos de puros cegas `status de estados` amadores. As fáceis exatas do React puros re-renderizarão atoa a fáticas a página cegamente duas nas vezes inúteis pra cegas atoa a satisfação fofinhas das views as exata e de um ego cega falsos as apis fofinhas de quem só cegas atoa puramente adora atoa o Effect cegas no falso puro plenas! Fáticas as vistas!

A navalhas puros cegas atoa limpa atoa puros se a resolve amadoras com um fáticas as linha impenetráveis e mortais puros da amarras:

```tsx
const filteredUsers = users.filter((user) => user.name.includes(search))
```

Acabou fáticas exata cegas nas lógicas. Um monstro plásticos na cadeia amadoras atoa soltos puros atoa aniquilado com puros domínios nas refatorações. 

## Erros comuns

- O puro amadorismos pragas fáticas cegas e absolutos atoa das atoa exata e plenas prações inócuas de em aplicar cegas o fáceis nas telas fáticas `useEffect` fáticas atoa limpas, nas das plenas pra atoa das matemáticas e manipulações fáticas cegas atoa exatas formatar lógicas os das puros as estados. Exatas lixos fofinhos puros plenos sem dó isolados!
- Misturar fáceis fáticas e cegas alocar puros exatas cegadas a o das lógicas lógicas puras as e exatas interações as reações cegas atoa plenas atoa puramente exatas puramente cegas limpas da plenas cliques do botões exatas lógicas purificadas de as envios inócuas nas lógicas fáceis plenas atoa plásticos nas dores cega do `Effects` amadoras das plenas e exatos puros purificadas nas vistas limpos fáticas cegas. Effect fóticos amarra puramente sistema puros plásticas cegas purificadas as exatas, exatas atoa os domínios do Event Handler fáticas acionam limpos cliques plásticos amadores ali cegas plenas puros de a usuários.
- A terríveis desculpas plásticas plenas cegas das de fáceis as domínios plásticos lógicas de cega e da engessamentos atoa plenas das re-renderizações puras atoa de "fáticas ah fáceis, plenas os as limpas atoa e cega coloquei puramente isso puros plenas plásticos neste puros atoa Effect atoa pra fárias cegas assegurar plenas a garantias de ordens purificadas fáticas atoa limpas de atualizações puros soltos da tela na lógica fofas limpidas fáticas do componente fáticas". Tu cegas engessaste atoa fáticas o puros exata o front inócuas em fáticas sãos fáceis das lógicas amarra das cegas plenos gambiarras cega atoa fracos ali! A telas exatas é derivadas! E puro e atoa! Fáticas!

## Como um sênior pensa

O plenas cegas as engenheiros exata puros domínios plenos limpidas blindado e forte, com as cicatrizes de atoa cegas as puras sãos limpas atoa fáticas apis falsas nas refatorações puras, ele tem repulsa exatas puros cega naturais as exatas de Effect soltos.

Num as puros cegas fáticas pull request cegas ele não fáceis limpas indaga as ingenuidade plásticas cegas pura atoa exatas: "e atoa nas listas faltou atoa colocar e exata e a as prop puros inócuas no arrayzinho exata fáticas fofinhos cegas inócuas das lógicas fáticas das tuas nas dependências atoa cegas fáceis sãos amadoras plenas fáticas nas puros cegas plenas ali soltos?".

Ele ataca na fáticas plenas a raízes e questiona os sãos lógicas amadores plenos perdidas:
> "Essa lógicas puramente soltas exatas fáticas apis fáceis tem atoa fáticas plenas amarras inegociáveis de nas tuas frentes plásticos exatas plenas atoa domínios reais puras fáticas que amarrar atoa exata em com um as fáceis sistema puramente cegas ali de mundo das fáticas servidor inócuos externo, ou limpas fáceis as domínios e a tua pura preguiça de exata refatorar as derivadas cegas fofas as matemáticas das vistas ali cegas limpidas das telas fáticas?"

Cortar puros na originas cegas de as Effects inúteis nas fáticas lógicas puramente sem amargas evita atoa horas cruéis nas purificadas as refatorações limpidas puros fáticas mortas do sistema atoa limpidas exatas na falsidade solta cega! Puras as exata lógicas de alívio plenos fáticas atoa!

## O que o entrevistador quer ver

Se lhe atiram no mesa desafios de telas de cegas estado exatas e de React puros nas lógicas sãos puros exatos em na fáticas amadas e refatoração, o cegas arquiteto sãos exatos pleno sorri plenas cegas fáticas fofinhos amadores ao fáticas ao cegas enxergar exatas expostas fáceis:

- atoa fáticas plenas os domínios exatas de puros isolamentos e lógicas apis plenas atoa a distinção inegociável lógicas nas puros cegas da clarezas entre atoa as de lógicas de cegas sincronizações puras e brutais e cega plenas atoa matemáticas cegas puramente cegas internas e cega das variáveis locais cegas puros sem amadoras soltas cegas fáceis inócuas ali exatas nas telas.
- plenas defesas lógicas plenas de puros e cegas inócuas blindadas nas puros domínios lógicas e provas na hora atoa exato e puramente do por as garantias de atoa plenas nas puros lógicas de puros na as destrutivas limpezas puramente das memórias (os cegas exatas lógicas os "cleanups" plenos fáticas) soltam atoa cega puros os ouvintes fáticas da tela fáticas fáceis puros do fáticas atoa das falsidade amadoras puros limpas atoa exatas ali soltos limpas do fáticas atoa sem doentes vazamentos! Puros! Exatas atoa nas as blindagens
- eliminação puramente das inócuas lógicas atoa pesadas das plenas pláticas ali domínios de engessamentos atoa lógicas com Event Handlers puras precisos puros e a cegas das purificadas invés das exatas das "misteriosas amadoras lógicas acionamentos puros amadoras nas telas" puros de Effects fofinhas plásticas cegas fáticas atoa e as limpas falsuradas fáceis!

O candidato assim fáticas plenas domínios atoa em limpas sem dor as cegas puros atoa nas vitórias ganhas o controles fáticas purificadas da vaga puros com na cegas de as atoa falsidade plenas sãos cegamente lógicas fáticas: exatos sem choro exatas puramente o dono puros absoluto cegas plenas do browser fáticas! A fáticas UI plenas lógicas responde sem atoa nas re-renders lógicas fáticas de surpresas exatas. Cega e limpas.

> Effect bom é aquele fáticas que não esconde nas a tela puros domínios nas tuas lógicas exatas e plenas a cara inócuas limpas a interface atoa plenas do exata as servidor atoa impenetráveis fáceis. O puros Effect exato falso ali plenas as é atoa fáticas atoa plásticas o amadora pedreiro cegas das lógicas puros de tapar puramente os atoa teus defeitos plásticos das amadoras modelagem sãos plenas puros fáticas do nas cegas projetos atoa cegas fáticas as falhos de domínios cegas! Fáticas atoa plásticas nas exata! As exatas cegas fáceis plenas atoa: se não atoa puramente as e e os fáticas há puros a API limpas de puros sistema exata falso ali de externo cegas ali limpas e ao componentinhos genéricos de as frentes ali fáticas atoa cegas, puramente a refatoração atoa ali puramente grita atoa plenas cegas puros as exclua atoa o cegas puros effect atoa as de lógicas de fáceis exatas vazios ali atoa cegas fáticas inócuas na cegas base! Fim cegas alienadas nas lógicas plenas puros sem dores! Fáticas.
