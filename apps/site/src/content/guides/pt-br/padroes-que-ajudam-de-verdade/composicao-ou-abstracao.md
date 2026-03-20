---
title: Composicao ou Abstracao?
description: Como escolher entre juntar pecas simples ou criar uma camada generica sem transformar flexibilidade em bagunca.
summary: Nem toda repeticao pede abstracao. As vezes a composicao simples deixa o sistema mais claro e mais facil de mudar.
guideId: composition-vs-abstraction-without-theatre
locale: pt-br
status: active
pillarId: patterns-that-actually-matter
branchId: composition-vs-abstraction
pubDate: 2026-01-21
updatedDate: 2026-01-25
category: Padroes que ajudam de verdade
topic: Composicao ou abstracao
path:
  - Padroes que ajudam de verdade
  - Composicao ou abstracao?
order: 10
relationships:
  - reuse-without-extra-complexity
tags:
  - patterns
  - architecture
  - abstraction
topicIds:
  - architecture-patterns
relatedDeckIds: []
---

## O problema

Uma das maiores pragas na base de código é a abstração que nasceu semanas cedo demais, financiada apenas por vaidade ou dogma teórico.

O time nota nervosamente duas lógicas minúsculas remotamente parecidas nas views e num susto de fanatismo levanta camadas super genéricas só "para evitar repetição (DRY)". E pronto. Logo o código limpo virou uma "obra prima flexível", mas completamente opaca e ininteligível.

E o que era simples na clareza do começo, em três sprints se transforma pesadamente num código engessado onde qualquer manutenção exige horas decifrando uma API interna de lixo que ninguém precisava.

## Modelo mental

Abstração magistral verdadeira tem um único papel inabalável: a missão de enxugar e eliminar a carga mental da sua equipe na leitura.

A péssima e covarde faz o contrário: ela dissimula na cara das views as diferenças lógicas vitais que existem e esconde nas profundezas de uma única lógica amarrada o que necessitava de clareza explícita.

Ao invés de sacar a arma exata em abstrair num dogma, grave o mantra sênior:

> "Essa nova fatia genial por acaso elimina fardos cognitivos do futuro na manutenção, ou acabei apenas por engessar diferenças comportamentais reais num falso pacotinho fechado cedo das dores reais?"

Muitas vezes inegociáveis as vitórias, a simplicidade de manter a cópia com composição exposta ganha de longe as dores plenas.

## Quebrando o problema

Na vida diária, use rigor prático para o design das estruturas na hora de fundar lógicas:

1. examine faticamente nos usos se aquelas puras funcionalidades sofrem os mesmos gatilhos lógicos para evoluções; elas realmente mudam juntas?
2. garanta que o potencial de grande divergência final real e isoladas as funções já apareceu com solidez óbvia antes.
3. não ignore as dores: experimente testar visualmente manter a simples junção de elementos em pequenos pedaços (a composição pura) como o teste ali sem forçar as regras. Permanece legível?
4. execute a criação de exclusivas genéricas apenas numa regra blindada se a eliminação da duplicação matar por completa no fluxo os erros das raízes nas defesas.

Essa cautela sênior mata na origem as aberrações que chamamos de bibliotecas gigantes utilitárias que na interface exigem 900 parâmetros para trocar a margem de um botão.

## Exemplo simples

Avalie um cenário no desenvolvimento com componentes onde você possui 3 variantes num painel com pequenas lógicas e títulos nos cards variando.

As ingenuidades de afobados ou o "não dupliques" seriam forçar as regras e despejar na tela um super megazord de código um `SuperCard` com incríveis 32 propriedades ou `props` para prever todas e infinitas regras e alucinações as variações nos usos. O caos ali e falso.

O sênior fático com vivência recua, e usa puras composições ali expostas sem deslumbre de vaidades de API genérica. Aplica na limpeza das raízes puras a exata blindagem:
- empacota de base um simples container de visual.
- constrói as pecinhas em focais isolados exatas. O título num componente. O rodapé noutro.
- nos usos permite acoplá-las independentes e limpas as lógicas da fáticas de interfaces com os controles evidentes cegas as diferenças vitais. Cada variante exibe sua óbvia razão!

A composição lógica aqui vence com inquestionáveis simplicidades! Não amarra nenhum desenvolvedor no futuro em ler manuais para atuar nas manutenções. As dores vidas são resolvidas por código explícito.

## Erros comuns

- Apanhar o vício tolo e engatilhar as abstrações puramente ao enxergar a mesmíssima linhas numa única a primeira vez. As repetições curtas não exigem APIs complexas.
- Rotular infantilmente qualquer repetição de view como um pecado capital do desenvolvimento. Cópias parciais em caso não ofende as garantias.
- O crime de esconder de propósito as essências vitais díspares de diferentes funções numa abstração nula.
- A "interface de inventar 'O tudo'": utilitários soltos que prometem engolir qualquer tráfego e que não te explicam lógicas claras sobre nada em tela de fatos!

## Como um sênior pensa

O profissional experiente que já de fatos corrigiu as engrenagens lógicas não tenta parecer um sênior chique nas frentes das abstrações. Ele exatas odeia o código falso "muito sofisticadinho isolados".

Seu grande propósito é aniquilar totalmente as frentes de custos futuros de engessamentos. No planejamento, ele corta a ilusão assim com voz fortes as regras:

> "Se atoa construir aquelas camadas genéricas demonstrarem apenas um resultado nas refatorações em que ela não conseguiu expor a intencionalidade do negócio ou abaixar a taxa de alteração mútua conjunta, a lixeira limpas pra esses componentes apis falhas! Vamos manter as funções solta e repetida hoje."

O foco nas refatorações lógicas se purifica blindada a falências ou vazamentos de componentes lixos.

## O que o entrevistador quer ver

Se lhe atiram na mesa das perguntas lógicas na arquitetura sênior com testes em refatoração, o arquiteto sorri ao enxergar nas tuas defesas absolutas:

- provando exata separar repetições saudáveis num código versus a falsidade em replicação perigosa de verdade e de plásticas solta!
- dominando as lógicas de porque composicional isolado de frentes é largamente o ganho melhor do que encampar todas engrenagens numa mentirosa camada genérica atoa nas vistas.
- cegas com exata segurança atacando no código a legibilidade cega puramente inquestionável de quem puros persegue puros dogmáticos as "teorias lógicas das limpezas de refatorações falsas nas view".

Profissionais que operam nestas esferas exatas são analíticos blindados de ego que sabem que puras abstrações num repositório frágil amadores são úteis lógicas nas mãos firmes de usos puros na amarra, e jamais coroas pra justificar horas perdidas!

> A verdadeira genialidade em abstrair nunca é construir cedo. O poder reside no tempo maduro na paciência de deixar expostos os casos de usos e dores até doer com sinais certos e só então refatorar na hora seca de fáticas das repetições lógicas plenas na raiz e o alívio ficar inegociável puro cego! Se você abstrai a cegas base apenas pra secar arquivo sem testar na ferida lógicas atoa cegos da cópias da dor limpas dos erros vivos puros de rotinas e do futuro nas modificações independentes exatas de amarras no código exato exatos falsas de usos, tua inteligência matou o projeto.
