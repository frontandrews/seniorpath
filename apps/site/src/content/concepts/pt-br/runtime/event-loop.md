---
title: Event loop
description: O que o event loop coordena e por que JavaScript assincrono costuma rodar numa ordem que surpreende.
summary: Event loop e o mecanismo que decide quando o trabalho enfileirado ganha vez depois que a stack atual termina.
conceptId: event-loop
domainId: javascript
groupId: runtime
locale: pt-br
status: active
pubDate: 2026-03-19
tags:
  - javascript
  - async
  - runtime
relatedGuideIds:
  - javascript-event-loop
---

## O que é

O event loop é o controlador de tráfego do JavaScript. Ele decide quando o trabalho assíncrono que estava na fila finalmentre ganha sua vez de rodar, mas sempre esperando que o código síncrono atual termine primeiro.

É por isso que promises, timers e callbacks não executam como mágica no mesmo milissegundo em que você os escreve.

## Quando importa

Isso importa no momento em que você precisa debugar uma ordem de execução bizarra, lidar com race conditions, ou quando enfrenta aquelas clássicas perguntas de entrevista sobre a saída de cinco `setTimeout`s soltos pelo código.

Sem separar na cabeça o que é a call stack, a fila de callbacks e o loop de eventos, o comportamento do JavaScript simplesmente parece mágica caótica.

## Erro comum

Um erro muito comum é decorar a frase "código assíncrono roda depois" sem entender o que esse "depois" significa na engine.

"Depois" não quer dizer "numa thread paralela em background". Quer dizer "ele vai esperar pacientemente numa fila até que a thread principal esteja completamente vazia e sem nada pra fazer".

## Exemplo curto

Se você faz um `console.log('A')`, agenda o callback de uma promise resolvida, e logo depois faz um `console.log('B')`, o código síncrono sempre termina primeiro. Você verá 'A' e depois 'B'.

Só depois que a stack principal estiver inteiramente limpa é que o event loop olha para a fila de microtasks e diz: "Beleza, agora podemos rodar o callback dessa Promise".

## Por que isso ajuda

Quando você para de apenas olhar para a sintaxe e começa a visualizar o mecanismo de execução por baixo dos panos, vários bugs irritantes ficam dolorosamente óbvios de explicar.

Esse é o verdadeiro poder de entender o conceito: você deixa de chutar o que o código vai fazer e passa a saber exatamente como a engine funciona.
