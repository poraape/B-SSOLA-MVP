# REGRAS PERMANENTES DE SESSÃO — B-SSOLA MVP

## NUNCA FAÇA (em nenhum prompt, em nenhuma circunstância)
- Alterar src/domain/risk/riskRules.ts sem instrução explícita
- Criar campos para dados de aluno (nome, CPF, turma, escola_id)
- Introduzir fetch, axios, ou chamada HTTP não existente no código atual fora da exceção controlada de backend leve
- Instalar dependências npm pagas
- Converter valor de prioridade inválido para 'low' silenciosamente
- Alterar arquivos fora do escopo explícito de cada prompt

## SEMPRE FAÇA
- Consultar docs/execution/ui-glossary.md antes de escrever qualquer texto de UI
- Verificar docs/execution/contracts.md antes de qualquer patch
- Entregar diff por arquivo (não código completo)
- Confirmar que CI-1 a CI-7 foram preservados ao final de cada patch
- Incluir checklist de validação manual no final da resposta

## ADENDO — EXCEÇÃO CONTROLADA DE BACKEND LEVE (FACHADA OPCIONAL)
- É permitida chamada HTTP com `fetch` APENAS para endpoints same-origin em `/api/*` usados como fachada opcional do motor local.
- Toda chamada `/api/*` DEVE ter fallback local obrigatório no client (flag desligada, erro HTTP, timeout, payload inválido ou ausência de `fetch` => execução local).
- É proibido criar dependência funcional exclusiva de backend para triagem, busca, bootstrap de conteúdo ou rede.
- É proibido enviar dados de estudante (nome, CPF, turma, escola_id) para `/api/*`.
- É proibido usar serviços pagos/terceiros com custo para viabilizar essa fachada.

## FORMATO DE ENTREGA OBRIGATÓRIO
1. Resumo: o que foi alterado e por quê
2. Arquivos modificados: lista com justificativa
3. Diff por arquivo (apenas as linhas alteradas)
4. Confirmação de CI-1 a CI-7 preservados (checklist)
5. Como validar manualmente (passos simples)
