# 🎯 Flows Content - V2 Development Guide

## Resumo Executivo

**6 flows críticos a desenvolver** na reorganização model.v2:
- **4 de Saúde e Bem-Estar** (emergências médicas)
- **1 de Saúde Emocional** (isolamento)
- **1 de Emergências e Segurança** (ameaça externa)

**Esforço total:** 14 horas | **Prioridade:** P0, P1, P2 (escalonada)

---

## 🟥 CATEGORIA 1: EMERGÊNCIAS E SEGURANÇA

### 🆕 flow_ameaca_externa
**ID:** `flow_ameaca_externa`  
**Subcategoria:** `ameaca_externa` / "Ameaça Externa à Escola"  
**Prioridade:** P2 (Médio)  
**Esforço:** 3h  
**Base:** `flow_violencia_armada` (adaptar estrutura)  

#### Objetivo
Protocolo para quando a escola recebe informações de ameaça de ataque externo, pessoa perigosa chegando ao local, ou situação de risco coletivo.

#### Decisão de Entrada
**Pergunta-chave:**
> "A escola recebeu informação de ameaça externa? Alguém avisou que há risco de ataque ou pessoa perigosa chegando?"

**Respostas possíveis:**
- ✅ Sim, há ameaça confirmada
- ⚠️ Sim, mas não confirmada ainda
- ❌ Não, era só boato/alarme falso
- ❓ Não sei/Preciso de mais informações

#### Branches de Conteúdo

**Branch 1: Ameaça Confirmada**
```
Etapa 1: CONFIRMAÇÃO
├─ [AÇÃO IMEDIATA] Avisar direção e segurança
├─ [AÇÃO IMEDIATA] Contactar polícia (190)
├─ [DECISÃO] Evacuação necessária?
│  ├─ Sim → Ativar plano de evacuação
│  └─ Não → Abrigar em área segura
├─ [AÇÃO] Comunicar pais/responsáveis
└─ [REGISTRO] Documentar ameaça e resposta

Etapa 2: RESPOSTA
├─ [ISOLAMENTO] Manter estudantes em área segura
├─ [MONITORAMENTO] Acompanhamento policial
├─ [APOIO] Acolhimento emocional durante crise
└─ [COORDENAÇÃO] Comunicação contínua com segurança

Etapa 3: PÓS-CRISE
├─ [INVESTIGAÇÃO] Polícia investiga ameaça
├─ [ACOLHIMENTO] Acompanhamento psicológico
├─ [COMUNICAÇÃO] Informes aos responsáveis
└─ [PLANO] Reforço de segurança se necessário
```

**Branch 2: Ameaça Não Confirmada**
```
├─ [AÇÃO] Investigação preliminar
├─ [CONTATO] Conferir com fonte da informação
├─ [DECISÃO] Há evidência suficiente?
│  ├─ Sim → Protocolo completo (Branch 1)
│  └─ Não → Monitoramento reforçado
└─ [REGISTRO] Documentar para histórico
```

**Branch 3: Alarme Falso**
```
├─ [COMUNICAÇÃO] Informar que foi boato
├─ [ACALMAR] Orientar estudantes
├─ [ANÁLISE] Investigar origem da desinformação
└─ [APRENDIZADO] Usar para treinar resposta
```

#### Microcopy e Diálogos
- **Abertura:** "A escola recebeu uma ameaça externa confirmada? Há risco de ataque ou pessoa perigosa?"
- **Alerta:** "⚠️ Esta é uma situação de emergência. Requer ação imediata."
- **Ação:** "Protocolo ativado: 1) Avisar direção 2) Contactar polícia 3) Preparar plano"
- **Encaminhamento:** "Situação sob controle da polícia. Acompanhamento emocional em andamento."

#### Atores Envolvidos
- Direção/Segurança (decisão central)
- Polícia (resposta e investigação)
- Professores (controle de turma)
- Psicólogo/Acolhimento (suporte emocional)
- Pais/Responsáveis (comunicação)

#### Recursos Relacionados
- Plano de evacuação escolar
- Lista de contatos de segurança
- Comunicado padrão para responsáveis
- Protocolo de acolhimento emocional

#### Próximos Passos
→ "Ameaça resolvi. O que fazer agora?" (link para acolhimento pós-crise)

---

## 🟠 CATEGORIA 2: SAÚDE E BEM-ESTAR

### 🆕 flow_crise_respiratoria
**ID:** `flow_crise_respiratoria`  
**Subcategoria:** `crise_respiratoria` / "Crise Respiratória ou Asmática"  
**Prioridade:** P0 (Crítico)  
**Esforço:** 2h  
**Base:** `flow_convulsao` (estrutura de emergência médica)  

#### Objetivo
Protocolo para quando estudante apresenta dificuldade para respirar, chiado no peito, falta de ar ou crise asmática aguda.

#### Decisão de Entrada
**Pergunta-chave:**
> "O estudante está com dificuldade para respirar agora? Sente falta de ar ou chiado no peito?"

**Respostas possíveis:**
- 🔴 Sim, dificuldade SEVERA (quase desfalecendo)
- 🟡 Sim, dificuldade MODERADA (consegue falar mas com esforço)
- 🟢 Não, respira normalmente
- ❓ Não sei se é grave

#### Branches de Conteúdo

**Branch 1: Crise Severa (Emergência)**
```
[AÇÃO IMEDIATA - 0-2 min]
├─ ✅ Chamar SAMU (192) AGORA
├─ ✅ Posicionar sentado/inclinado para frente
├─ ✅ Procurar inalador/bombinha (se escolar tiver)
├─ ✅ Avisar responsável - URGÊNCIA
└─ ✅ Monitora constantemente até SAMU chegar

[APOIO DURANTE CRISE - 2-10 min]
├─ Manter calma (transmitir segurança)
├─ Respiração lenta e profunda (orientar)
├─ Afastar pessoas/barulho
├─ Ter água disponível
└─ Não deixar sozinho

[TRANSFERÊNCIA MÉDICA]
├─ SAMU chega e assume cuidado
├─ Acompanhamento ao hospital
├─ Informar responsável sobre destino
└─ Documentação para hospital

→ **RESULTADO:** Atendimento médico especializado em urgência
```

**Branch 2: Crise Moderada (Atenção)**
```
[AVALIAÇÃO - 0-5 min]
├─ Histórico: Tem asma diagnosticada?
├─ Teste: Consegue falar frases completas?
├─ Sinais: Lábios azulados? Pele pálida?
└─ Decisão: Chamar SAMU ou observar?

[INTERVENÇÃO INICIAL]
├─ ✅ Posicionar confortavelmente
├─ ✅ Inalador se disponível (de uso da escola)
├─ ✅ Respiração controlada
└─ ✅ Repouso absoluto

[MONITORAMENTO - 5-15 min]
├─ Resposta ao inalador/repouso?
│  ├─ Melhora → Encaminhamento para casa + orientação
│  └─ Sem melhora → Chamar SAMU
├─ Avisar responsável em qualquer caso
└─ Não deixar retornar à aula sem alta do adulto

→ **RESULTADO:** Encaminhamento médico/casa com orientações
```

**Branch 3: Respiração Normal**
```
├─ [AVALIAÇÃO] Por que achava que era crise?
├─ [OBSERVAÇÃO] Pode ter sido ansiedade/pânico
├─ [DIFERENCIAL] → Verificar se há crise de ansiedade
└─ [PRÓXIMO PASSO] Se ansiedade confirmada → flow_ansiedade
```

#### Microcopy e Diálogos
- **Abertura:** "Estudante com falta de ar? Qual é o grau de dificuldade para respirar?"
- **Alerta Crítico:** "🔴 CRISE SEVERA detectada. Protocolo de emergência. Chamar SAMU!"
- **Suporte:** "Mantenha calma. Estudante em posição segura. SAMU a caminho."
- **Encaminhamento:** "Crise controlada. Acompanhamento médico recomendado."

#### Atores Envolvidos
- Professora/Educador (detecção e primeiros socorros)
- SAMU/Ambulância (transporte e atendimento)
- Responsável (comunicação e acompanhamento)
- Profissional de Saúde da Escola (se houver)

#### Recursos Relacionados
- Inaladores escolares (se houver)
- Telefone SAMU (192)
- Histórico de asma do estudante
- Medicações prescritas

#### Próximos Passos
→ "Crise resolvida. Orientações de acompanhamento?" (encaminhamento médico/casa)

---

### 🆕 flow_desmaio
**ID:** `flow_desmaio`  
**Subcategoria:** `desmaio_tontura` / "Desmaio, Tontura ou Fraqueza"  
**Prioridade:** P0 (Crítico)  
**Esforço:** 2h  
**Base:** `flow_convulsao` (estrutura de emergência médica)  

#### Objetivo
Protocolo para quando estudante desfalece, perde consciência ou apresenta tontura/fraqueza extrema que impede movimento.

#### Decisão de Entrada
**Pergunta-chave:**
> "O estudante perdeu consciência? Está desacordado ou muito fraco para se mover?"

**Respostas possíveis:**
- 🔴 Sim, DESACORDADO agora
- 🟡 Sim, MUITO fraco/tonto (quase caindo)
- 🟢 Não, apenas tonto mas consciente
- ❓ Não sei exatamente

#### Branches de Conteúdo

**Branch 1: Desmaio Completo (Emergência)**
```
[AÇÃO IMEDIATA - 0-1 min]
├─ ✅ DEITAR na posição de segurança (lateral)
├─ ✅ Chamar SAMU (192)
├─ ✅ Verificar resposta (fala, movimento dos olhos)
├─ ✅ Avisar responsável
└─ ✅ Não mover de forma brusca

[VERIFICAÇÃO DE SINAIS VITAIS - 1-2 min]
├─ Respirando? SIM/NÃO
├─ Pulso presente? SIM/NÃO
├─ Cor/temperatura: Normal/Pálido/Frio
└─ → Se não respira: RCP se treinado (ligar SAMU primeiro)

[AGUARDAR SAMU - 2-10 min]
├─ Manter posição de segurança
├─ Monitora respiração constantemente
├─ Mantenha aquecido (casaco/cobertor)
├─ Tenha água próxima (não dar)
└─ Tranquilize enquanto espera

[TRANSFERÊNCIA]
├─ SAMU assume cuidado
├─ Transporte para hospital
└─ Acompanhamento responsável

→ **RESULTADO:** Avaliação médica urgente para causa do desmaio
```

**Branch 2: Tontura Extrema (Pré-desmaio)**
```
[INTERVENÇÃO IMEDIATA]
├─ ✅ Deitar ou sentar com cabeça entre joelhos
├─ ✅ Afastar de arestas/objetos perigosos
├─ ✅ Dar espaço para ar circular
├─ ✅ Avisar responsável

[INVESTIGAÇÃO DA CAUSA - 5 min]
├─ Você comeu hoje? (hipoglicemia)
├─ Dormi bem? (cansaço)
├─ Bebeu água? (desidratação)
├─ Sentiu febre? (infecção)
├─ Tomou medicação? (efeito colateral)
└─ Teve susto/emoção forte? (emocional)

[DECISÃO]
├─ Melhorou após 10-15 min?
│  ├─ Sim → Encaminhamento para casa com responsável
│  └─ Não → Chamar SAMU / médico da escola
└─ Em todos os casos: Avisar responsável

→ **RESULTADO:** Investigação de causa + acompanhamento médico
```

**Branch 3: Tontura Leve**
```
├─ Não está em risco imediato
├─ Posicionar sentado/deitado
├─ Observar por 15-30 min
└─ Se persiste → Encaminhamento médico/casa
```

#### Microcopy e Diálogos
- **Abertura:** "Estudante desacordou ou desfaleceu? Ou está muito fraco/tonto?"
- **Ação Crítica:** "🔴 DESMAIO detectado. Posição de segurança. SAMU chamado!"
- **Suporte:** "Estudante inconsciente. Posição segura. Monitora respiração."
- **Encaminhamento:** "Desmaio revertido. Investigar causa com médico."

#### Atores Envolvidos
- Professor/Educador (detecção e posicionamento)
- SAMU/Ambulância (avaliação e transporte)
- Responsável (acompanhamento)
- Médico (investigação de causa)

#### Recursos Relacionados
- Espaço para deitar
- Contato SAMU (192)
- Verificação de sinais vitais básicos
- Informações de medicações do estudante

#### Próximos Passos
→ "Desmaio resolvido. Investigar causa e acompanhamento médico"

---

### 🆕 flow_intoxicacao
**ID:** `flow_intoxicacao`  
**Subcategoria:** `intoxicacao` / "Intoxicação ou Ingestão Suspeita"  
**Prioridade:** P0 (Crítico)  
**Esforço:** 2h  
**Base:** `flow_acidente_escolar` (estrutura de emergência)  

#### Objetivo
Protocolo para quando há suspeita de intoxicação (medicamento em excesso, substância tóxica ingerida, envenenamento).

#### Decisão de Entrada
**Pergunta-chave:**
> "Há suspeita de que o estudante ingeriu algo tóxico? Medicamento em excesso, veneno, produto químico?"

**Respostas possíveis:**
- 🔴 Sim, intoxicação CONFIRMADA (ingestão presenciada)
- 🟡 Sim, SUSPEITA (sintomas compatíveis)
- 🟢 Não, é apenas desinformação
- ❓ Não sei exatamente o que ingeriu

#### Branches de Conteúdo

**Branch 1: Intoxicação Confirmada/Grave**
```
[AÇÃO IMEDIATA - 0-2 min]
├─ ✅ Chamar SAMU (192) + Fornecer informações:
│  ├─ O quê foi ingerido? (medicamento, veneno, produto)
│  ├─ Quanto? (aproximadamente)
│  ├─ Quando? (há quanto tempo)
│  └─ Sintomas observados?
├─ ✅ Se disponível: Contactar Centro de Intoxicação (0800-148-0088)
├─ ✅ Avisar responsável - URGÊNCIA
├─ ✅ Se consciente: Posicionar lateralmente
└─ ✅ Guardar a substância/embalagem para médico

[MONITORAMENTO DURANTE ESPERA]
├─ Observa sinais vitais: respiração, consciência, cor
├─ NÃO induzir vômito sem orientação médica
├─ NÃO dar comida/bebida sem autorização
├─ Mantenha calmaria/ambiente seguro
└─ Registra evolução para informar SAMU

[TRANSFERÊNCIA]
├─ SAMU chega e assume cuidado
├─ Leve a substância ingerida se disponível
├─ Informar hospital sobre toxina suspeita
└─ Acompanhamento responsável

→ **RESULTADO:** Atendimento em centro de toxicologia
```

**Branch 2: Suspeita de Intoxicação**
```
[AVALIAÇÃO - 2-5 min]
├─ Quais são os sintomas observados?
│  ├─ Náusea/vômito
│  ├─ Tontura/confusão
│  ├─ Tremores/convulsões
│  ├─ Dor abdominal
│  └─ Respiração alterada
├─ Quando começaram os sintomas?
└─ Confirma que ingeriu substância?

[DECISÃO]
├─ Sintomas graves ou progredindo?
│  ├─ SIM → Protocolo Emergência (Branch 1)
│  └─ NÃO → Protocolo Observação (abaixo)

[PROTOCOLO DE OBSERVAÇÃO - 15-30 min]
├─ Posicionar em local seguro
├─ Monitorar sinais vitais
├─ Contato contínuo com responsável
├─ Se sintomas pioram → Chamar SAMU
└─ Após 30 min sem piora → Encaminhamento para avaliação médica

→ **RESULTADO:** Avaliação médica + monitoramento
```

**Branch 3: Falso Alarme**
```
├─ Confirmou que foi desinformação
├─ Tranquilizar estudante
├─ Comunicar responsável
└─ Orientar sobre cuidado com substâncias
```

#### Microcopy e Diálogos
- **Abertura:** "Há suspeita de que algo tóxico foi ingerido? Qual substância?"
- **Ação Crítica:** "🔴 INTOXICAÇÃO suspeita. SAMU chamado + Centro de Toxicologia!"
- **Informação:** "Crucial: Qual substância? Quanto? Quando ingeriu?"
- **Suporte:** "Estudante sob monitoramento. SAMU a caminho."
- **Encaminhamento:** "Avaliação médica urgente. Acompanhamento hospitalar."

#### Atores Envolvidos
- Professor/Educador (detecção)
- SAMU/Ambulância (emergência)
- Centro de Toxicologia (orientação)
- Responsável (comunicação)
- Hospital/Urgência (avaliação)

#### Recursos Relacionados
- Telefone SAMU (192)
- Telefone Centro de Toxicologia (0800-148-0088)
- Informações sobre medicações presentes na escola
- Lista de substâncias perigosas presentes

#### Próximos Passos
→ "Situação controlada. Acompanhamento em hospital/clínica"

---

## 🟣 CATEGORIA 3: SAÚDE EMOCIONAL

### 🆕 flow_isolamento
**ID:** `flow_isolamento`  
**Subcategoria:** `isolamento` / "Isolamento Social Intenso"  
**Prioridade:** P1 (Alto)  
**Esforço:** 3h  
**Base:** `flow_depressao` (estrutura de acompanhamento contínuo)  

#### Objetivo
Protocolo para quando estudante apresenta padrão de isolamento social intenso - não participa de aulas, grupos, recreio; recusa interações, comunicação extremamente reduzida.

#### Decisão de Entrada
**Pergunta-chave:**
> "O estudante está isolado socialmente? Não interage com colegas, participa pouco ou evita convivência?"

**Respostas possíveis:**
- 🔴 Sim, isolamento TOTAL (não fala com ninguém)
- 🟡 Sim, isolamento INTENSO (muito retraído)
- 🟢 Não, participa normalmente
- ❓ Não consigo avaliar bem

#### Branches de Conteúdo

**Branch 1: Isolamento Total (Intervenção Imediata)**
```
[TRIAGEM INICIAL - DIA 1]
├─ Há quanto tempo está assim?
│  ├─ < 1 semana: pode ser reação aguda
│  └─ > 1 semana: padrão estabelecido
├─ Algo aconteceu? (bullying, luto, mudança, etc)
├─ Fala quando solicitado ou completamente silencioso?
└─ Está seguro? (não há risco iminente?)

[ACOLHIMENTO INICIAL]
├─ ✅ Acolhimento não-invasivo (respeita silêncio)
├─ ✅ Criar espaço seguro sem pressão
├─ ✅ Oferecer contato gradual
└─ ✅ Não forçar interação

[AVALIAÇÃO PROFISSIONAL - 24-48h]
├─ Conversa com psicólogo/orientador
├─ Entrevista com responsável sobre mudanças
├─ Histórico: há sinais de depressão? ansiedade?
├─ Presença de ideação suicida? (avaliação de risco)
└─ Decisão: precisa de atendimento especializado?

[ENCAMINHAMENTOS]
├─ Se ideação suicida detectada → flow_ideacao_suicida
├─ Se trauma/bullying → Investigação + mediação
├─ Se depressão → Encaminhamento CAPS/psicólogo
└─ Se ansiedade → Protocolo de ansiedade

→ **RESULTADO:** Avaliação de causa + intervenção apropriada
```

**Branch 2: Isolamento Intenso (Monitoramento)**
```
[OBSERVAÇÃO - 1-2 semanas]
├─ Monitora padrão de comportamento
├─ Registra tentativas de interação
├─ Observa se há melhora ou piora
└─ Contato regular com responsável

[INTERVENÇÕES GRADUAIS]
├─ Atividades estruturadas (pequeno grupo)
├─ Apoio de colega empático (buddy system)
├─ Tarefas colaborativas com interesse do estudante
├─ Espaço seguro para expressar sentimentos
└─ Reforço positivo a qualquer interação

[AVALIAÇÃO PROFISSIONAL - 1-2 semanas]
├─ Melhora observada?
│  ├─ Sim → Continuar intervenções + monitoramento
│  └─ Não → Encaminhamento para avaliação profissional
├─ Conversa com psicólogo/orientador
└─ Decisão sobre necessidade de atendimento externo

→ **RESULTADO:** Monitoramento contínuo + intervenções escolares
```

**Branch 3: Introversão Normal**
```
├─ Estudante naturalmente introvertido
├─ Mas tem relacionamentos (alguns amigos)
├─ Participa quando estimulado
└─ Não é isolamento patológico
   └─ → Orientações para apoiar introvertidos
```

#### Microcopy e Diálogos
- **Abertura:** "Estudante isolado socialmente? Há quanto tempo? O que mudou?"
- **Acolhimento:** "Entendemos que está difícil. Estamos aqui para ajudar no seu tempo."
- **Investigação:** "Vamos descobrir o que está acontecendo. Pode ser algo passageiro ou precisar de apoio."
- **Intervenção:** "Vamos criar pequenos espaços para você se sentir mais confortável."
- **Encaminhamento:** "Precisamos de ajuda profissional. Vamos conversar com especialista."

#### Atores Envolvidos
- Professora/Educador (detecção)
- Psicólogo/Orientador (avaliação)
- Responsável (contexto familiar)
- Colegas/Buddies (apoio graduado)
- Profissional de Saúde Mental (se necessário)

#### Recursos Relacionados
- Protocolo de triagem de isolamento
- Lista de atividades estruturadas
- Sistema de buddy/apoio entre pares
- Encaminhamento para CAPS/psicólogo

#### Próximos Passos
→ "Isolamento identificado. Plano de intervenção em andamento"
→ Ou "Precisa de avaliação profissional especializada"

---

## 📋 QUADRO RESUMIDO DE CRIAÇÃO

| Flow | Categoria | Subcategoria | Prioridade | Esforço | Base | Status |
|------|-----------|--------------|-----------|---------|------|--------|
| flow_ameaca_externa | Emergências e Segurança | ameaca_externa | P2 | 3h | flow_violencia_armada | 🆕 |
| flow_crise_respiratoria | Saúde e Bem-Estar | crise_respiratoria | P0 | 2h | flow_convulsao | 🆕 |
| flow_desmaio | Saúde e Bem-Estar | desmaio_tontura | P0 | 2h | flow_convulsao | 🆕 |
| flow_intoxicacao | Saúde e Bem-Estar | intoxicacao | P0 | 2h | flow_acidente_escolar | 🆕 |
| flow_isolamento | Saúde Emocional | isolamento | P1 | 3h | flow_depressao | 🆕 |

**Total Estimado:** 14 horas de desenvolvimento
**Total com Testes:** ~18 horas

---

## 🔗 Dependências Entre Flows

```
flow_convulsao
├─ → flow_crise_respiratoria (estrutura emergência)
└─ → flow_desmaio (estrutura emergência)

flow_violencia_armada
└─ → flow_ameaca_externa (estrutura segurança)

flow_acidente_escolar
└─ → flow_intoxicacao (estrutura emergência)

flow_depressao
├─ → flow_isolamento (estrutura acompanhamento)
└─ → flow_ideacao_suicida (risco associado)

flow_ideacao_suicida
├─ → flow_isolamento (possível co-ocorrência)
└─ → flow_autolesao (possível co-ocorrência)
```

---

## 🎯 Checklist de Desenvolvimento

### Fase 1: Templates Base (1h)
- [ ] Revisar estrutura de flows existentes similares
- [ ] Definir campos comuns de cada tipo
- [ ] Criar template de branch/decision tree

### Fase 2: Desenvolvimento P0 (8h)
- [ ] Desenvolver flow_crise_respiratoria (2h)
- [ ] Desenvolver flow_desmaio (2h)
- [ ] Desenvolver flow_intoxicacao (2h)
- [ ] Review e testes (2h)

### Fase 3: Desenvolvimento P1 (3h)
- [ ] Desenvolver flow_isolamento (3h)

### Fase 4: Desenvolvimento P2 (3h)
- [ ] Desenvolver flow_ameaca_externa (3h)

### Fase 5: Testes e Refinamento (2h)
- [ ] Testes de usabilidade
- [ ] Refinement de microcopy
- [ ] Validação com stakeholders

---

## 📞 Próximas Ações

1. **Aprovação de prioridades:** Confirmar sequência P0 → P1 → P2
2. **Alocação de esforço:** Distribuir 14h entre sprint
3. **Review de estruturas base:** Validar como adaptar flows existentes
4. **Desenvolvimento paralelo:** Iniciar P0 enquanto prepara templates
5. **Teste incremental:** Cada flow é testado antes de ir para o próximo

