---
title: Limites de confianca
description: Como pensar onde a confianca comeca e termina num sistema, em vez de assumir que dado interno e seguro por definicao.
summary: Limite de confianca e a linha onde dado, identidade ou controle passa de um nivel de confianca para outro.
conceptId: trust-boundaries
domainId: security
groupId: trust
locale: pt-br
status: active
pubDate: 2026-03-19
tags:
  - seguranca
  - auth
  - api
relatedGuideIds:
  - trust-boundaries-without-hand-waving
  - safer-input-and-api-design
---

## O que é

Um limite de confiança é a linha invisível na sua arquitetura onde você deve parar imediatamente de assumir que um dado, requisição ou identidade é seguro.

É o exato ponto onde o controle passa de um ambiente menos confiável (como a internet ou um webhook de terceiros) para um ambiente mais confiável (como o seu backend).

## Quando importa

Isso importa sempre que uma informação cruza de um sistema para outro, quando contextos de permissão mudam, ou quando qualquer dado chega de fora.

Se você não sabe onde fica sua fronteira de confiança, você invariavelmente vai esquecer de fazer as validações e verificações de autorização que deveriam estar lá.

## Erro comum

O erro mais perigoso é tratar tudo que tem a etiqueta de "interno" como automaticamente confiável e bem-intencionado.

Sistemas internos também sofrem bugs, ficam com configurações desatualizadas ou acabam repassando lixo. Confiar cegamente numa requisição só porque ela veio da sua própria rede local é arquitetura baseada em otimismo.

## Exemplo curto

Se o serviço de Autenticação avisa que um usuário tem a role "admin", o seu serviço de Pagamentos ainda precisa validar e decidir ativamente se esse "admin" tem o direito de estornar uma compra.

Se Pagamentos simplesmente engolir a string do outro serviço sem validar na fronteira, um errinho bobo no código de Autenticação vira uma falha crítica de segurança no dinheiro da empresa.

## Por que isso ajuda

Esse conceito pega o medo abstrato de "segurança" e transforma em algo tangível de engenharia.

Em vez de tentar ser paranoico em todas as linhas de código, você faz uma pergunta muito melhor: "Onde o nível de confiança muda nesse fluxo, e quais checagens eu sou obrigado a fazer nessa exata borda?"
