---
title: Invalidacao de cache
description: Por que cache fica perigoso quando o dado muda e por que velocidade sem estrategia de atualizacao costuma gerar informacao stale.
summary: Invalidacao de cache e o processo de decidir quando o dado cacheado deixou de ser seguro para servir e precisa ser atualizado ou removido.
conceptId: cache-invalidation
domainId: data
groupId: cache
locale: pt-br
status: active
pubDate: 2026-03-19
tags:
  - cache
  - dados
  - consistencia
relatedGuideIds:
  - cache-and-consistency-without-self-deception
---

## O que é

Invalidação de cache é o mecanismo pelo qual o seu sistema percebe que um dado em cache ficou velho demais para ser considerado confiável.

Adicionar um cache é a parte fácil. A parte difícil é garantir que esse cache não comece a mentir para os seus usuários quando a realidade muda.

## Quando importa

Isso importa no exato instante em que um dado original muda no banco de dados, mas a versão antiga continua viva no cache.

Se você não sabe invalidar o cache, seu sistema fica incrivelmente rápido — mas rápido em entregar a informação errada para o usuário final.

## Erro comum

O erro mais comum é achar que colocar um simples TTL (Time-To-Live) de 5 minutos resolve o problema em todos os cenários.

O TTL resolve coisas sem importância crítica. Mas em sistemas sérios, você precisa de invalidação proativa atrelada às suas rotas de escrita ou eventos de domínio, expulsando o dado velho do cache no exato milissegundo em que ele é alterado.

## Exemplo curto

Se o preço de um produto cai no banco principal, uma página em cache pode continuar mostrando o valor antigo e espantando clientes até o cache expirar por tempo.

Se expor o preço errado por alguns minutos não for aceitável para o negócio, sua rota de `PUT /produto` precisa forçar a invalidação ou sobreposição desse cache antes mesmo de devolver o `200 OK`.

## Por que isso ajuda

Entender invalidação obriga você a parar de pensar em velocidade de forma isolada, e começar a equilibrar performance com corretude.

É geralmente aí que a mentalidade de um desenvolvedor sobre cache deixa de ser ingênua e começa a ficar madura.
