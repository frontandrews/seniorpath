---
title: Estado derivado
description: O que e estado derivado, quando ele ajuda e por que copiar valores para state costuma criar bug.
summary: Estado derivado e dado que voce consegue calcular a partir de props ou state existentes, sem guardar uma copia extra.
conceptId: derived-state
domainId: react
groupId: state
locale: pt-br
status: active
pubDate: 2026-03-19
tags:
  - react
  - estado
  - ui
relatedGuideIds:
  - state-ownership-without-confusion
---

## O que é

Estado derivado é qualquer valor que você consegue calcular no meio da renderização, só olhando para outras variáveis que já existem (como props ou outro state).

Se você já tem uma lista de `items` e um termo de `query`, a lista filtrada `visibleItems` é um estado derivado. Você não precisa guardá-la em um novo estado; basta calculá-la na hora.

## Quando importa

Isso importa muito quando um componente começa a copiar valores de `props` para dentro do seu próprio `state`, ou quando tenta manter duas fontes de verdade sincronizadas ao mesmo tempo.

É exatamente aí que a maioria dos bugs silenciosos de interface começa a nascer.

## Erro comum

O erro mais comum é criar um `useEffect` para atualizar uma segunda cópia do estado sempre que a fonte original muda, só porque isso "parece mais seguro" ou otimizado.

Ao fazer isso, você cria um problema de sincronização manual: agora o seu componente tem dois valores que deveriam significar a mesma coisa, mas que podem ficar fora de sintonia durante o ciclo do React.

## Exemplo curto

Se uma tela tem os estados `items` e `query`, criar um terceiro estado `visibleItems` (junto com um `useEffect` para mantê-lo atualizado) é quase sempre um erro.

Em vez disso, `visibleItems` deveria ser apenas uma constante calculada direto no corpo do componente (ou com um `useMemo`, se o cálculo for muito pesado).

## Por que isso ajuda

Quanto menos partes do código tentarem ser as donas da verdade, mais previsível o componente se torna.

Isso elimina o risco de mostrar dados velhos na tela ("stale UI") e evita que o React faça renderizações extras que ninguém pediu.
