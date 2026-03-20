---
title: Medir Antes de Otimizar
description: Como evitar otimização por reflexo e tomar decisão com evidência, não com sensação.
summary: Otimização sem medida costuma gastar energia no lugar errado e ainda deixa a equipe confiante demais numa melhora que talvez nem exista.
guideId: measure-before-you-optimize
locale: pt-br
status: active
pillarId: performance-that-makes-sense
branchId: measurement-before-optimization
pubDate: 2026-02-04
updatedDate: 2026-02-08
category: Performance sem achismo
topic: Medir antes de otimizar
path:
  - Performance sem achismo
  - Medir antes de otimizar
order: 10
relationships:
  - rendering-network-and-cpu-without-mixing-them-up
tags:
  - performance
  - measurement
  - optimization
topicIds:
  - performance
relatedDeckIds: []
---

## O problema

Muita otimização nasce de um incômodo visual, não de uma evidência real.

A tela parece lenta, a API parece demorar, o componente parece pesado. Sem medir primeiro, a equipe confia na intuição e reage alterando o código cegamente.

O resultado comum é adicionar complexidade no lugar errado, criando um código mais difícil de manter para resolver um problema que talvez nem fosse o gargalo verdadeiro.

## Modelo mental

Otimização profissional não é reflexo. É investigação.

Melhorar a performance significa provar onde o custo está, qual o tamanho dele e se a alteração de fato gera um ganho prático para o usuário. 

A regra mecânica é simples:

> "O que eu consigo provar com números sobre essa lentidão antes de alterar a primeira linha de código?"

Se você não tem o número, toda mudança é apenas um chute.

## Quebrando o problema

A abordagem de quem atua com maturidade exige passos de medição antes da ação:

1. **Isole o fluxo principal:** Escolha exatamente qual ação do usuário está sendo avaliada.
2. **Defina a métrica de sucesso:** O que importa aqui é o tempo de resposta da API, a renderização inicial ou o consumo de memória?
3. **Capture o cenário atual:** Registre o tempo exato que o sistema leva antes de você mexer em qualquer coisa.
4. **Aplique e compare:** Faça a alteração arquitetural e meça de novo. 

Se a métrica não melhorou substancialmente, você reverte a mudança. Complexidade sem ganho de performance é prejuízo.

## Exemplo simples

Imagine um componente de lista de clientes que demora para aparecer na tela.

A atitude precipitada de um desenvolvedor júnior seria sair adicionando `useMemo` e `useCallback` em todos os filtros e listas filhas do componente.

A atitude investigativa de um engenheiro sênior seria:

- Medir no *Profiler* o tempo real de renderização da lista.
- Descobrir quantas vezes o componente de fato renderizou de novo.
- Identificar se a espera maior era do banco de dados trazendo a lista pesada ou do navegador tentando desenhar.

Se a lentidão vinha do banco, poluir o código React com *hooks* de otimização foi um esforço completamente inútil.

## Erros comuns

- Otimizar partes do sistema apenas porque ouviu falar que "isso deixa mais rápido", sem ter uma linha de base documentada.
- Confiar exclusivamente na própria percepção de velocidade na máquina de desenvolvimento local (ignorando o celular 3G do usuário real).
- Comemorar ganhos de 5 milissegundos que não afetam em nada a experiência humana na ponta, mas que custaram a clareza do código inteiro.

## Como um sênior pensa

Um desenvolvedor maduro encara a otimização de performance como um laboratório fechado. 

Ele não sai criando soluções da própria cabeça. O diálogo natural dele antes de agir soa como:

> "Antes de mudar a estrutura desse estado, preciso medir o tempo atual da resposta. Só assim poderemos justificar no *pull request* se a nova complexidade do código se pagou."

Essa atitude metódica protege o time inteiro de trabalhar atoa no código alheio.

## O que o entrevistador quer ver

Na mesa de entrevista, o avaliador joga uma arquitetura lenta na sua frente. Ele quer avaliar seus instintos primários e a sua paciência.

- Você vai sair disparando técnicas decoradas e dicas de otimização genéricas antes de pedir mais dados?
- Ou você vai frear o ímpeto e pedir informações de rastreamento de tempo para focar apenas no que mais está doendo?

> "O que não foi devidamente medido vira apenas argumento de intuição. Se você aplicou uma técnica, mas não soube comparar numericamente o antes e o depois da aplicação, você ainda não sabe se consertou algo."
