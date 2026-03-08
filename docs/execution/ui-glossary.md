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

### Regra Editorial Institucional (SP2)
- A UI deve priorizar linguagem observável, educacional e acionável.
- Estrutura preferencial de texto: situação observada -> ação imediata -> acionamento da gestão/rede.
- O app não é diagnóstico clínico e não substitui serviços especializados.
- Em caso de dúvida, a UI deve reforçar acolhimento, proteção e limites da atuação escolar.

### Termos a evitar na porta de entrada
- diagnóstico, transtorno, laudo (como pré-condição), investigar causas, interrogatório, veracidade do relato

### Termos preferidos
- situação observada, sinais observáveis, apoio pedagógico, acolhimento inicial, proteção imediata, registro objetivo, acionar gestão, acionar rede

### Regra para "comportamental"
- "Comportamental" não deve ser eixo primário, categoria ampla ou rótulo-lixeira.
- Quando necessário, usar como marcador secundário de apresentação, sempre vinculado a convivência, participação escolar ou aprendizagem.
