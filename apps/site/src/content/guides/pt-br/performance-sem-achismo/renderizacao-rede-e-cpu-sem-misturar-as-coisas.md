---
title: Renderizacao, Rede e CPU Sem Misturar as Coisas
description: Como separar tipos diferentes de lentidao para nao chamar tudo de performance e atacar o lugar errado.
summary: Nem toda tela lenta sofre do mesmo problema. As vezes o atraso e rede, as vezes e render, as vezes e CPU.
guideId: rendering-network-and-cpu-without-mixing-them-up
locale: pt-br
status: active
pillarId: performance-that-makes-sense
branchId: rendering-network-and-cpu
pubDate: 2026-02-17
updatedDate: 2026-02-20
category: Performance sem achismo
topic: Renderizacao, rede e CPU
path:
  - Performance sem achismo
  - Renderizacao, rede e CPU
order: 10
relationships:
  - bottleneck-detection-without-guessing
  - measure-before-you-optimize
tags:
  - performance
  - rendering
  - network
topicIds:
  - performance
relatedDeckIds: []
---

## O problema

## O problema

Quando uma página da web começa a se arrastar, a frase mais perigosa que alguém pode dizer na reunião é: "Precisamos otimizar a performance do *front-end*".

"Performance" não é um botão mágico que você aperta. Existem naturezas completamente distintas de atrasos, que se comportam e afetam o sistema de maneira única.

Agrupar falta de internet na rua com processamento matemático de tabelas pesadas gera soluções idênticas para problemas sem nenhuma ligação. O time coloca *loading spinners* modernos na tela e não melhora nem em zero milissegundos o quadro de quem o utiliza.

## Modelo mental

Problemas de desempenho visual no navegador devem ser classificados mecanicamente em três naturezas específicas e separadas:

1. **Rede:** A interface não consegue seguir porque empacou esperando respostas de servidores fora da máquina atual. 
2. **CPU:** O navegador recebeu os pacotes todos em mãos na velocidade ideal, mas as funções complexas locais no cliente sobrecarregam o processamento celular humano em mãos (álgebra, parse, formatação longa).
3. **Renderização:** A camada de dado está toda formatada perfeitamente no cliente, mas os elementos DOM sofrem pra reconstruir as tintas da janela inteira nos pixels em repetições invisíveis exageradas locais do *framework*.

Ao entender o formato original correto, o erro prático perde a força.

## Quebrando o problema

A régua de diagnóstico para qualquer desenvolvedor que se depara com a tela sofrendo lentidão extrema é separar em blocos:

1. **Abra o Network:** Verifique se o pacote na viagem tem um fluxo demorado superior a dezenas de megabytes. Se demorou lá, altere lá na base da API e apague os *hooks* da tela.
2. **Abra o *Profiler* ou Monitor:** A memória subiu ao teto em poucos re-renders ou travou enquanto formata dezenas de matrizes de objetos? A rede está isenta de culpa.
3. **Inspecione Componentes:** Use o *React DevTools* puro. Olhe as faixas vermelhas do rastro local visual. As caixas de *inputs* renderizaram mais quarenta vezes numa única letra sem justificativa cruzada aparente hoje cedo local aqui? 

É simples.

## Exemplo simples

Avalie o carregamento do botão invisível "comprar agora". Ele clica, e 1.5 segundos se passam congelados em tela cinza e morta sem retorno algum.

A culpa recairia no navegador do celular, mas após separar do lado certo da esteira:
A API leva incríveis dois inteiros segundos para confirmar seletivamente as promoções ocultas de estoque local fechado do servidor remoto do cartão do armazém da esquina lateral (Adjectives stopping).

A API leva muito tempo devido à latência com o armazém.

Tentar reduzir os nós do componente de interface com CSS mais leve é não resolver absolutamente nada prático do seu funil original da dor financeira do negócio.

## Erros comuns

- A equipe de *front-end* ignorar que não controla a perda de pacotes na conexão 3G de um usuário no trânsito.
- A equipe carregar quinhentos itens simultâneos do banco de dados na memória do navegador e jogar a culpa da lentidão no framewok de interface.
- Substituir bibliotecas visuais inteiras tentando deixar a tela mais leve, quando a medição real mostraria que o atraso vem 100% da resposta demorada da API.

## Como um sênior pensa

Para a engenharia que gere projetos maduros, essas divisões determinam quem da corporação precisa ser cobrado.

Um engenheiro júnior levanta da mesa reclamando do React, apontando que a re-renderização está pesada demais e travando a tela.

Um engenheiro sênior isola o problema pacientemente e reporta:

> "O fluxo do lado do cliente está desenhando rápido. O tempo original está sendo perdido no servidor remoto do parceiro de pagamentos, que consome inteiro 70% da espera do usuário. Antes desse contrato ser revisto pelo time de *backend*, otimizar imagens da nossa interface não vai adiantar nada hoje."

## O que o entrevistador quer ver

A banca examinadora em testes técnicos simula telas lentas em situações de pressão apenas para testar seus instintos básicos:

- Você vai atirar pedras no código e sugerir *hooks* de otimização no React sem sequer pedir uma métrica do tempo da resposta da API primeiro?
- A banca aprova quem entende que categorias diferentes exigem remédios diferentes. Rede lenta exige cache e compressão. CPU lenta exige mover o cálculo pesado para fora do navegador. Repintura excessiva no DOM exige controle de estado.

> "A grande engenharia técnica corta os problemas nas juntas certas. Se você trata toda lentidão como um problema genérico de interface, você vai receitar o remédio errado para a doença certa."
