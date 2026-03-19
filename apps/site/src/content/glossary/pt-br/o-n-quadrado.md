---
title: O(n²)
description: O que O(n²) quer dizer, por que loops aninhados costumam cair nisso e quando isso realmente importa.
summary: O(n²) costuma aparecer quando o trabalho cresce a cada comparacao em pares ou a cada nova varredura completa.
termId: o-n-squared
locale: pt-br
status: active
aliases:
  - tempo-quadratico
tags:
  - coding-interview
  - javascript
pubDate: 2026-03-18
---

## O que significa

`O(n²)` significa que a quantidade de trabalho cresce mais ou menos com o quadrado do tamanho da entrada.

Se a entrada dobra, o trabalho pode ficar perto de quatro vezes maior.

Por isso exemplos pequenos parecem tranquilos, mas entradas maiores ficam lentas de repente.

## Forma comum

O caso classico e um loop dentro de outro em que cada item e comparado com muitos outros itens.

```ts
for (let i = 0; i < items.length; i += 1) {
  for (let j = 0; j < items.length; j += 1) {
    compare(items[i], items[j])
  }
}
```

Esse nao e o unico jeito de chegar em `O(n²)`, mas e o formato mais comum para reconhecer rapido.

## Quando importa

`O(n²)` nao e automaticamente errado.

Vira problema quando:

- `n` pode crescer bastante
- a operacao dentro do loop e cara
- o codigo roda com frequencia suficiente para afetar experiencia ou custo

Se `n` for pequeno e fixo, uma solucao quadratica ainda pode ser aceitavel.

## Pergunta melhor

Nao pergunte so "isso e O(n²)?"

Pergunte:

1. qual tamanho `n` realmente pode atingir?
2. com que frequencia isso roda?
3. da para usar hash map, set, sort ou preprocessamento para evitar varreduras repetidas?

Esse enquadramento quase sempre ajuda mais do que teatro de complexidade sozinho.
