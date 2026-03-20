---
title: Idempotencia
description: O que idempotencia significa em APIs e jobs, e por que repetir a mesma request nao deveria repetir o mesmo efeito.
summary: Idempotencia e a propriedade de repetir a mesma operacao sem continuar criando novos efeitos depois do primeiro resultado util.
conceptId: idempotency
domainId: backend
groupId: apis
locale: pt-br
status: active
pubDate: 2026-03-19
tags:
  - api
  - backend
  - confiabilidade
relatedGuideIds:
  - api-and-service-design-with-clear-boundaries
  - failure-and-recovery-scenarios-with-clarity
---

## O que é

Idempotência significa que você pode repetir a mesma operação várias vezes, mas o efeito principal só acontece uma vez.

Isso salva o seu sistema quando um cliente clica no botão duas vezes sem querer, um worker reinicia no meio do trabalho, ou uma integração externa reenvia a mesma mensagem porque achou que a primeira falhou.

## Quando importa

Importa em sistemas de pagamento, webhooks e jobs em background. Basicamente, em qualquer fluxo onde tentar de novo (retry) é parte normal da vida em produção.

Sem idempotência, a internet seria um caos. Um simples retry criaria cobranças duplicadas, emails repetidos e estados corrompidos no banco de dados.

## Erro comum

O erro comum é ignorar o conceito e tratar toda requisição como uma intenção completamente nova.

Isso funciona perfeitamente até o dia em que um timeout de rede acontece. Como o cliente não teve certeza se a requisição original terminou, ele tenta de novo. Se o backend não reconhece os dois pedidos como a mesma intenção, o sistema duplica a operação.

## Exemplo curto

Quando um `POST /orders` chega, o cliente envia junto uma chave de idempotência (como um UUID único para aquela tentativa de compra).

Se a conectividade cair e o cliente enviar a mesmíssima request de novo, o backend vê a chave repetida. Ele entende que o pedido já foi processado na primeira tentativa e apenas devolve o sucesso de antes, sem cobrar o cartão de novo.

## Por que isso ajuda

Idempotência deixa o tratamento de falha muito mais calmo em sistemas distribuídos.

Quando você sabe que pode repetir operações com segurança, o retry deixa de ser um "chute no escuro perigoso" e passa a ser uma estratégia confiável e previsível.
