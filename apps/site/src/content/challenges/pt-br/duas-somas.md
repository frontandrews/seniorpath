---
title: Two Sum sem decorar truque
description: Como resolver um classico de entrevista explicando o caminho, o trade-off e a decisao final.
summary: Um desafio de arrays e hash map para praticar leitura do problema, complemento e explicacao da solucao.
challengeId: two-sum
locale: pt-br
status: active
type: arrays-hash-map
typeLabel: Arrays e Hash Map
level: beginner
estimatedMinutes: 15
solutionLanguage: typescript
order: 10
pubDate: 2026-03-20
tags:
  - interviews
  - arrays
  - hash map
relatedGuideIds:
  - thinking-before-you-code-in-interviews
  - recognizing-patterns-without-memorizing-tricks
  - explaining-your-solution-without-losing-the-thread
relatedChallengeIds: []
whatToNotice:
  - A pergunta pede resposta rapida para cada numero enquanto voce percorre a lista.
  - O ponto central nao e somar tudo. E descobrir qual complemento falta para chegar ao alvo.
  - Se voce guardar o que ja viu, consegue decidir em uma passada.
commonMistakes:
  - tentar ordenar primeiro e perder os indices originais sem perceber
  - usar dois loops cedo demais e nao explicar por que a versao simples custa O(n²)
  - guardar o numero atual antes de verificar o complemento e acabar usando o mesmo indice duas vezes
complexity:
  time: O(n)
  space: O(n)
---

## O problema

Dado um array de inteiros `nums` e um inteiro `target`, retorne os **indices** de dois numeros cuja soma seja igual a `target`.

Voce pode assumir que existe exatamente uma resposta valida e que nao pode usar o mesmo elemento duas vezes.

## Exemplo rapido

```txt
Entrada: nums = [2, 7, 11, 15], target = 9
Saida: [0, 1]
Explicacao: nums[0] + nums[1] = 2 + 7 = 9
```

## Como pensar antes de codar

A primeira versao correta compara cada numero com todos os seguintes.

Ela prova entendimento, mas custa `O(n²)`.

O proximo passo e perguntar:

> Enquanto eu olho para o numero atual, o que eu gostaria de saber imediatamente?

A resposta e: eu gostaria de saber se o **complemento** dele ja apareceu.

Se o alvo e `9` e o numero atual e `7`, eu preciso saber se ja vi `2`.

Isso transforma o problema em:

1. percorra o array uma vez
2. calcule o complemento `target - atual`
3. veja se esse complemento ja foi armazenado
4. se sim, encontrou a resposta
5. se nao, guarde o numero atual com seu indice

## Passo a passo da solucao

1. Crie um `Map<number, number>` para guardar `numero -> indice`.
2. Para cada posicao `index`, leia `value`.
3. Calcule `complement = target - value`.
4. Se `seen.has(complement)`, retorne `[seen.get(complement), index]`.
5. Caso contrario, salve `seen.set(value, index)`.

O detalhe importante esta na ordem:

- primeiro voce verifica se o complemento ja existe
- depois salva o valor atual

Isso evita reutilizar o mesmo elemento.

## Solucao em TypeScript

```ts
export function twoSum(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>()

  for (let index = 0; index < nums.length; index += 1) {
    const value = nums[index]
    const complement = target - value

    if (seen.has(complement)) {
      return [seen.get(complement)!, index]
    }

    seen.set(value, index)
  }

  return null
}
```

## O que dizer na entrevista

Uma explicacao boa e curta seria:

> A versao mais simples compara cada par e custa O(n²). Como eu so preciso saber se o complemento ja apareceu, posso usar um hash map para consultar em O(1) medio e resolver em uma passada.

Com isso, voce mostra tres sinais bons:

- entendeu a versao ingenua
- justificou a otimização
- conectou estrutura de dados com necessidade do problema

## Quando esse padrao reaparece

Essa mesma ideia volta quando o problema pede alguma forma de:

- lembrar o que ja apareceu
- detectar repeticao
- responder se existe um complemento
- agrupar ou consultar rapido durante a iteracao

Por isso este challenge nao e so sobre `Two Sum`.

Ele e sobre reconhecer quando memoria de acesso rapido simplifica a decisao.

> O truque nao e decorar hash map.

> O sinal correto e perceber que o problema pede memoria para responder durante a passagem.
