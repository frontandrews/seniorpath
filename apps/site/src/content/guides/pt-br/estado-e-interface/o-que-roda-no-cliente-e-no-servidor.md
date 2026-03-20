---
title: O Que Roda no Cliente e no Servidor
description: Como decidir onde cada parte do trabalho deveria acontecer sem transformar a arquitetura numa mistura confusa.
summary: Quando voce nao separa bem cliente e servidor, a UI fica mais lenta, mais frágil e mais dificil de manter.
guideId: server-and-client-thinking-without-confusion
locale: pt-br
status: active
pillarId: state-and-ui-thinking
branchId: server-and-client-thinking
pubDate: 2026-03-01
updatedDate: 2026-03-03
category: Estado e interface
topic: Cliente e servidor
path:
  - Estado e interface
  - O que roda no cliente e no servidor
order: 10
relationships:
  - effects-without-the-mess
tags:
  - react
  - server
  - client
topicIds:
  - react
relatedDeckIds: []
---

## O problema

Arquiteturas de frontend costumam falhar quando a equipe mistura o trabalho do cliente e o do servidor no mesmo lugar. 

O resultado não demora a aparecer. Componentes de tela começam a carregar regras de negócio. O navegador passa a acessar bancos de dados. A interface fica pesada. Ninguém sabe onde o erro começou.

A lentidão é a consequência direta dessa confusão.

## Modelo mental

Dividir o projeto não é apenas organizar pastas. O servidor e o cliente possuem funções distintas.

- **O servidor resolve problemas pesados.** Ele acessa os dados, conecta com as APIs, oculta a regra de negócio e envia a resposta pronta.
- **O cliente gerencia a interação.** Ele foca no visual, cuida dos eventos do mouse e responde rápido ao usuário.

Manter essa fronteira elimina metade dos bugs difíceis do projeto.

## Quebrando o problema

Ao criar uma funcionalidade nova, avalie o escopo antes de programar:

1. A tarefa exige cálculo pesado ou acesso ao banco de dados? A lógica pertence ao servidor.
2. A funcionalidade cuida apenas do clique do usuário e da mudança de cor de um botão? O cliente cuida disso sozinho.
3. Se o dado chegar limpo e formatado, o celular do usuário vai trabalhar menos? Se sim, prepare tudo no backend.

Isso barra a sobrecarga do navegador.

## Exemplo simples

Avalie uma tela que exibe uma lista de compras e permite filtrar os pedidos por mês.

A abordagem inexperiente carrega a lista inteira do banco de dados e joga no cliente. A partir daí, o navegador do usuário tenta filtrar os dados usando JavaScript na hora. A tela congela.

A abordagem madura separa as funções:

- O servidor aplica a pesquisa e filtra os pedidos. Ele processa a tabela e envia apenas as vinte linhas solicitadas.
- O componente da tela apenas recebe essa encomenda. Ele foca unicamente em exibir os dados.

A complexidade desaparece. A tela não trava.

## Erros comuns

- Repassar o processamento de matemática pesada para a máquina do usuário.
- Deixar a regra financeira da empresa acessível no JavaScript final do frontend.
- Usar tags focadas no cliente apenas para simplificar o trabalho da equipe de desenvolvimento.

## Como um sênior pensa

Para a engenharia que domina a construção de componentes, a regra principal é economizar recursos.

Nas revisões de código, o questionamento padrão foca na economia da rede:

> "O servidor deveria preparar esse dado antes de enviar. O cliente não precisa baixar o texto inteiro apenas para calcular o filtro em tempo real. Mova o processamento para a rota da API."

A transferência de sobrecarga sempre ocorre em prol do cliente. 

## O que o entrevistador quer ver

Em dinâmicas de engenharia focadas no frontend, as bancas testam como você protege o navegador:

- Você consegue identificar quando o processamento deve ser alterado de lado para preservar o tempo de execução do navegador?
- Você avalia fatores de proteção para não expor regras do seu sistema na máquina do cliente?

> "A grande engenharia técnica sabe que a interface reage à temperatura do clique, mas o servidor governa à distância nas sombras."
