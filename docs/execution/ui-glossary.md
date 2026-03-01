# Glossário de UI — B-SSOLA MVP
## USO OBRIGATÓRIO: todo texto visível ao usuário deve seguir este glossário.

### Taxonomia de Prioridade (PT-BR institucional)
| Valor técnico | Exibição na UI         | Significado para o usuário         |
|---------------|------------------------|------------------------------------|
| low           | Atenção                | Situação que merece acompanhamento |
| moderate      | Atenção Elevada        | Requer verificação imediata        |
| high          | Alto Risco             | Ação necessária com urgência       |
| critical      | Crítico — Ação Imediata| Acionar suporte agora              |

### CTAs — Rótulos corretos vs proibidos
| Comportamento real              | Label CORRETO           | Label PROIBIDO        |
|---------------------------------|-------------------------|-----------------------|
| Reinicia o flow do início       | Refazer triagem         | Revisar respostas     |
| Navega para rede sem filtro     | Ver todos os serviços   | —                     |
| Navega para rede com filtro     | Ver serviços indicados  | —                     |
| Aciona rota de emergência       | Acionar emergência      | —                     |
| Finaliza e volta ao início      | Voltar ao início        | Finalizar             |

### Mensagens de Estado (erro/vazio) — PT-BR obrigatório
| Situação                         | Mensagem                                        | CTA obrigatório              |
|----------------------------------|-------------------------------------------------|------------------------------|
| Fluxo não encontrado             | Este protocolo não está disponível no momento.  | Voltar às categorias         |
| Categoria não encontrada         | Categoria não localizada.                       | Ir para o início             |
| Mapa indisponível                | Mapa temporariamente indisponível.              | (lista aparece automaticamente) |
| Nenhum serviço próximo           | Nenhum serviço próximo encontrado. Consulte a coordenação pedagógica. | — |
| Fluxo sem perguntas              | Protocolo em atualização.                       | Escolher outro protocolo     |
| Processando por muito tempo      | Aguarde um momento...                           | Ir para o início             |
