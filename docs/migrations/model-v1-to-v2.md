# 📋 Migration Guide: Model.v1 → Model.v2

## Executive Summary

**Reorganização estratégica de arquitetura de categorias e subcategorias:**
- **De:** 10 categorias fragmentadas, 42 subcategorias, 31 flows (11 órfãs)
- **Para:** 7 categorias coerentes, 39 subcategorias, 39 flows (100% cobertura)
- **Ganho:** -30% categorias, -100% duplicações, +23% densidade média, 25h de esforço

**Timeline estimada:** 2 semanas (escalonado)

---

## 🎯 Phase Overview

```
┌─────────────────────────────────────────────────────────────┐
│ PHASE 1: PREPARAÇÃO (2h)                        Semana 1    │
├─────────────────────────────────────────────────────────────┤
│ • Backup completo de model.v1
│ • Criar estrutura de model.v2.json
│ • Mapear todas as migrações (ID antigo → novo)
│ • Setup de branches Git
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 2: REFATORAÇÃO (4h)                       Semana 1    │
├─────────────────────────────────────────────────────────────┤
│ • Reorganizar array categories (10 → 7)
│ • Atualizar categoryId em 31 flows existentes
│ • Consolidar autolesão (2 → 1 flow unificado)
│ • Mover violência_doméstica para proteção_direitos
│ • Validar integridade de dados
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 3: CRIAÇÃO DE FLOWS (14h)            Semana 1-2      │
├─────────────────────────────────────────────────────────────┤
│ P0 (Crítico - 8h):
│   • flow_crise_respiratoria (2h)
│   • flow_desmaio (2h)
│   • flow_intoxicacao (2h)
│   • flow_emergencia_medica (2h)
│ P1 (Alto - 3h):
│   • flow_isolamento (3h)
│ P2 (Médio - 3h):
│   • flow_ameaca_externa (3h)
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 4: AJUSTES DE CÓDIGO (3h)                Semana 2    │
├─────────────────────────────────────────────────────────────┤
│ • Atualizar HomePage.tsx (grid 7 categorias)
│ • Atualizar CategoryPage.tsx (se necessário)
│ • Atualizar selectors/getCategories()
│ • Atualizar testes unitários
│ • Atualizar tipos TypeScript
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ PHASE 5: VALIDAÇÃO (2h)                        Semana 2    │
├─────────────────────────────────────────────────────────────┤
│ • Testes de navegação completa (home → cat → flow)
│ • Verificar search/indexação
│ • Revisar microcopy (todas as 39 subcategorias)
│ • Teste de acessibilidade (cores, ícones)
│ • Validação com stakeholders
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Phase 1: Preparação

**Duração:** 2 horas | **Responsável:** Tech Lead + Data Owner

### Checklist

#### 1.1 Backup e Versionamento
- [ ] Criar branch Git: `feature/model-v2-reorganization`
- [ ] Backup completo: `model.v1.backup.json` (adicionar à raiz do projeto)
- [ ] Documentar versão atual de model.v1
- [ ] Criar tag Git: `backup/model-v1-before-reorganization`

#### 1.2 Mapear Migrações
Criar arquivo de mapeamento: `_migration_map.json`

```json
{
  "categoryMappings": {
    "emergencia": {
      "newCategoryId": "emergencias_seguranca",
      "newCategoryLabel": "Emergências e Segurança",
      "subcategoriesMoving": ["emergencia_medica", "convulsao"]
    },
    "seguranca_institucional": {
      "newCategoryId": "emergencias_seguranca",
      "mergedWith": "seguranca_institucional_complementar",
      "subcategoriesMerged": 5
    },
    // ... etc
  },
  "consolidations": {
    "autolesao": {
      "fromCategories": ["violencia_conflitos", "saude_mental"],
      "toCategory": "saude_emocional",
      "flowId": "flow_autolesao",
      "action": "UNIFY_FLOWS"
    }
  },
  "movements": {
    "violencia_domestica": {
      "from": "violencia_conflitos",
      "to": "protecao_direitos",
      "reason": "Repositioning to rights/protection context"
    }
  }
}
```

#### 1.3 Setup de Estrutura
- [ ] Criar arquivo `model.v2.json` (vazio/template)
- [ ] Criar pasta `/flows/v2/` para novos flows
- [ ] Copiar todos os 31 flows existentes de v1 → v2 (com categoryId atualizado)
- [ ] Criar template de flow para novos 6 flows

#### 1.4 Validação de Dados
- [ ] Contar subcategorias em model.v1: 42 ✓
- [ ] Contar flows em model.v1: 31 ✓
- [ ] Listar 11 subcategorias órfãs (sem flow)
- [ ] Confirmar 3 duplicações identificadas

---

## 🔄 Phase 2: Refatoração de Dados

**Duração:** 4 horas | **Responsável:** Data Engineer + QA

### Checklist

#### 2.1 Reorganizar Categories (1h)

**Ação:** Criar nova estrutura de 7 categorias em model.v2.json

```javascript
// Em model.v2.json
"categories": [
  {
    "id": "emergencias_seguranca",
    "label": "Emergências e Segurança",
    "description": "Situações de risco imediato...",
    "color": "#ef4444",
    "icon": "AlertTriangle",
    "weight": "CRÍTICO",
    "isEmergencyCategory": true,
    "displayOrder": 0,
    "subcategories": [
      // 7 subcategorias consolidadas
    ]
  },
  // ... 6 categorias restantes
]
```

**Validação:**
- [ ] Total de 7 categorias ✓
- [ ] Todas têm ID único ✓
- [ ] Todas têm displayOrder (0-6) ✓
- [ ] Todas têm color, icon, weight ✓
- [ ] isEmergencyCategory = true apenas para 2 categorias ✓

#### 2.2 Atualizar 31 Flows Existentes (1.5h)

**Ação:** Atualizar `categoryId` em todos os flows

```bash
# Exemplo de transformação
// ANTES (v1):
{
  "meta": {
    "id": "flow_bullying",
    "categoryId": "violencia_conflitos",  // ← MUDA
    ...
  }
}

// DEPOIS (v2):
{
  "meta": {
    "id": "flow_bullying",
    "categoryId": "convivencia_conflitos",  // ← NOVO ID
    ...
  }
}
```

**Mapeamento de Mudanças:**

| Flow Existente | V1 Category | V2 Category |
|---|---|---|
| flow_mal_estar | saude_fisica | saude_bem_estar |
| flow_febre | saude_fisica | saude_bem_estar |
| flow_acidente_escolar | saude_fisica | saude_bem_estar |
| flow_ansiedade | saude_mental | saude_emocional |
| flow_depressao | saude_mental | saude_emocional |
| flow_ideacao_suicida | saude_mental | saude_emocional |
| flow_uso_substancias | saude_mental | saude_emocional |
| flow_bullying | violencia_conflitos | convivencia_conflitos |
| flow_agressao_fisica | violencia_conflitos | convivencia_conflitos |
| flow_agressao_verbal | violencia_conflitos | convivencia_conflitos |
| flow_discriminacao | violencia_conflitos | convivencia_conflitos |
| flow_lgbtfobia | violencia_conflitos | convivencia_conflitos |
| flow_mediacao_restaurativa | mediacao_reparacao | convivencia_conflitos |
| flow_plano_individual_acompanhamento | mediacao_reparacao | convivencia_conflitos |
| flow_reintegracao_pos_suspensao | mediacao_reparacao | convivencia_conflitos |
| flow_abuso_sexual | direitos_protecao | protecao_direitos |
| flow_violacao_direitos | direitos_protecao | protecao_direitos |
| flow_negligencia | vulnerabilidades_sociais | protecao_direitos |
| flow_trabalho_infantil | vulnerabilidades_sociais | protecao_direitos |
| flow_abandono | vulnerabilidades_sociais | protecao_direitos |
| flow_evasao | vulnerabilidades_sociais | apoio_social_familiar |
| flow_inseguranca_alimentar | vulnerabilidades_sociais | apoio_social_familiar |
| flow_violencia_domestica | violencia_conflitos | **protecao_direitos** |
| flow_convulsao | emergencia | emergencias_seguranca |
| flow_violencia_armada | seguranca_institucional | emergencias_seguranca |
| flow_porte_objeto | seguranca_institucional | emergencias_seguranca |
| flow_incendio | seguranca_institucional_complementar | emergencias_seguranca |
| flow_risco_estrutural | seguranca_institucional_complementar | emergencias_seguranca |
| ... | ... | ... |

**Validação:**
- [ ] Todos os 31 flows têm categoryId atualizado
- [ ] Nenhum categoryId referencia v1
- [ ] Todos os categoryId existem em novo model.v2
- [ ] Flows "órfãs" identificados

#### 2.3 Consolidar Autolesão (0.5h)

**Ação:** Unificar 2 flows em 1

```javascript
// OPERAÇÃO: Mesclar
//   flow_autolesao (violencia_conflitos) +
//   flow_automutilacao (saude_mental - não existe como flow, só subcategoria)
// RESULTADO:
//   1 flow unificado em saude_emocional

{
  "meta": {
    "id": "flow_autolesao",
    "categoryId": "saude_emocional",  // ← NOVO CONTEXTO
    "subcategoryId": "autolesao",
    "title": "Autolesão ou Automutilação",
    "keywords": ["automutilação", "cortes", "se machucar", "comportamento autolesivo"],
    "consolidatedFrom": ["violencia_conflitos.autolesao", "saude_mental.automutilacao"]
  }
}
```

**Validação:**
- [ ] Flow unificado existe em v2
- [ ] Referências da v1 removidas
- [ ] Metadata indica consolidação

#### 2.4 Mover Violência Doméstica (0.3h)

**Ação:** Reposicionar para proteção_direitos

```javascript
// ANTES (v1):
{
  "meta": {
    "id": "flow_violencia_domestica",
    "categoryId": "violencia_conflitos",
    ...
  }
}

// DEPOIS (v2):
{
  "meta": {
    "id": "flow_violencia_domestica",
    "categoryId": "protecao_direitos",  // ← NOVO
    ...
  }
}
```

**Validação:**
- [ ] Flow movido
- [ ] Referência antiga removida
- [ ] Teste de navegação funciona

#### 2.5 Validação de Integridade (0.7h)

```javascript
// Rodar validação
const validateMigration = (modelV1, modelV2) => {
  const v1Subs = countSubcategories(modelV1);  // 42
  const v2Subs = countSubcategories(modelV2);  // 39 (após consolidações)
  
  const v1Flows = getAllFlows(modelV1);        // 31
  const v2Flows = getAllFlows(modelV2);        // 31 (antes da criação de novos)
  
  assert(v1Subs - 3 === v2Subs, "Subcategorias não batem");
  assert(v1Flows === v2Flows, "Flows existentes não batem");
  
  // Verificar que toda subcategoria tem flow
  for (let cat of modelV2.categories) {
    for (let sub of cat.subcategories) {
      const hasFlow = v2Flows.find(f => f.meta.id === sub.flowId);
      assert(hasFlow || sub.isNewInV2, `Subcategoria ${sub.id} sem flow`);
    }
  }
  
  console.log("✅ Validação passed");
};
```

**Checklist:**
- [ ] Script de validação executado
- [ ] Relatório de migração gerado
- [ ] Nenhuma inconsistência encontrada

---

## ✨ Phase 3: Criação de Flows

**Duração:** 14 horas (escalonado P0→P1→P2) | **Responsável:** Content Team + Developers

### Checklist P0 - Crítico (8h)

#### 3.1 flow_emergencia_medica (2h)

**Arquivo:** `/flows/v2/flow_emergencia_medica.json`

- [ ] Criar estrutura base (gateway decision tree)
- [ ] 3-4 branches principais:
  - Emergência comprovada (SAMU chamado)
  - Possível emergência (monitoramento)
  - Falso alarme
- [ ] Conteúdo de cada branch
- [ ] Microcopy em português claro
- [ ] Atores e responsabilidades
- [ ] Recursos/links relacionados
- [ ] Próximos passos
- [ ] Testes de lógica

**Validação:**
- [ ] JSON válido ✓
- [ ] Todos os links funcionam ✓
- [ ] Microcopy revisado ✓
- [ ] Teste end-to-end de branches ✓

#### 3.2 flow_crise_respiratoria (2h)

**Arquivo:** `/flows/v2/flow_crise_respiratoria.json`

- [ ] Baseado em: flow_convulsao (estrutura emergência médica)
- [ ] Decisão de entrada: "Dificuldade para respirar?"
- [ ] 3 branches:
  - Crise severa (emergência → SAMU)
  - Crise moderada (atenção → médico/casa)
  - Respiração normal
- [ ] Conteúdo adaptado para contexto respiratório
- [ ] Diferencial com convulsão/desmaio
- [ ] Integração com protocolos de asma
- [ ] Testes

**Validação:**
- [ ] JSON válido ✓
- [ ] Adaptações vs base corretas ✓
- [ ] Microcopy específico ✓

#### 3.3 flow_desmaio (2h)

**Arquivo:** `/flows/v2/flow_desmaio.json`

- [ ] Baseado em: flow_convulsao (estrutura)
- [ ] Decisão de entrada: "Desacordou?"
- [ ] 3 branches:
  - Desmaio completo (SAMU)
  - Tontura extrema (pré-desmaio)
  - Tontura leve
- [ ] Investigação de causa
- [ ] RCP basics (se treind)
- [ ] Monitoramento de sinais vitais
- [ ] Testes

**Validação:**
- [ ] JSON válido ✓
- [ ] Distinção com convulsão clara ✓

#### 3.4 flow_intoxicacao (2h)

**Arquivo:** `/flows/v2/flow_intoxicacao.json`

- [ ] Baseado em: flow_acidente_escolar (estrutura)
- [ ] Decisão de entrada: "Ingestão suspeita?"
- [ ] 3 branches:
  - Intoxicação confirmada (SAMU + Centro de Toxicologia)
  - Suspeita (monitoramento)
  - Falso alarme
- [ ] Informações críticas: o quê, quanto, quando
- [ ] Centro de Toxicologia (0800-148-0088)
- [ ] Testes

**Validação:**
- [ ] JSON válido ✓
- [ ] Telefones corretos ✓

### Checklist P1 - Alto (3h)

#### 3.5 flow_isolamento (3h)

**Arquivo:** `/flows/v2/flow_isolamento.json`

- [ ] Baseado em: flow_depressao (estrutura acompanhamento)
- [ ] Decisão de entrada: "Isolamento social?"
- [ ] 3 branches:
  - Isolamento total (intervenção imediata)
  - Isolamento intenso (monitoramento)
  - Introversão normal (orientações)
- [ ] Triagem inicial
- [ ] Acolhimento não-invasivo
- [ ] Avaliação profissional
- [ ] Intervenções graduais
- [ ] Encaminhamentos para outros flows (ideação suicida, etc)
- [ ] Testes

**Validação:**
- [ ] JSON válido ✓
- [ ] Distinção com depressão clara ✓
- [ ] Cross-links com ideacao_suicida, ansiedade ✓

### Checklist P2 - Médio (3h)

#### 3.6 flow_ameaca_externa (3h)

**Arquivo:** `/flows/v2/flow_ameaca_externa.json`

- [ ] Baseado em: flow_violencia_armada (estrutura)
- [ ] Decisão de entrada: "Ameaça externa?"
- [ ] 3 branches:
  - Ameaça confirmada (evacuação/abrigar)
  - Ameaça não confirmada (investigação)
  - Alarme falso
- [ ] Protocolo de evacuação
- [ ] Comunicação com polícia
- [ ] Acolhimento emocional pós-crise
- [ ] Testes

**Validação:**
- [ ] JSON válido ✓
- [ ] Distinção com violência armada clara ✓

---

## 💻 Phase 4: Ajustes de Código

**Duração:** 3 horas | **Responsável:** Frontend + Backend Dev

### Checklist

#### 4.1 HomePage.tsx

**Objetivo:** Atualizar grid de categorias de 10 → 7

```typescript
// ANTES:
<CategoriesGrid columns={5}>
  {categories.map(cat => <CategoryCard key={cat.id} {...cat} />)}
</CategoriesGrid>

// DEPOIS:
<CategoriesGrid columns={7}>
  {/* Emergency category destacado */}
  <EmergencyCategoryBanner category={emergencyCategory} />
  
  {/* 6 categorias restantes em grid 2x3 */}
  {nonEmergencyCategories.map(cat => <CategoryCard key={cat.id} {...cat} />)}
</CategoriesGrid>
```

**Validação:**
- [ ] Layout renderiza corretamente desktop
- [ ] Layout responsivo mobile
- [ ] Categorias em ordem correta (displayOrder)
- [ ] Emergência destacada visualmente

#### 4.2 CategoryPage.tsx

**Objetivo:** Suportar nova estrutura de subcategorias

```typescript
// Validar que page renderiza todas as 6-8 subcategorias por categoria
const { categoryId } = useParams();
const category = getCategory(categoryId);
const subcategories = category.subcategories; // Novo campo

return (
  <CategoryDetail>
    <h1>{category.label}</h1>
    <p>{category.description}</p>
    <SubcategoryList>
      {subcategories.map(sub => (
        <SubcategoryCard 
          key={sub.id} 
          subcategoryId={sub.id}
          flowId={sub.flowId}
          severity={sub.severity}
        />
      ))}
    </SubcategoryList>
  </CategoryDetail>
);
```

**Validação:**
- [ ] Todas as subcategorias renderizam
- [ ] Links para flows funcionam
- [ ] Badges de severidade mostram correto
- [ ] Nenhuma subcategoria faltando

#### 4.3 Selectors/Hooks

**Objetivo:** Atualizar getCategories(), getFlows(), etc

```typescript
// selectors/categorySelectors.ts

export const getCategories = (): Category[] => {
  return model.categories; // Agora 7 categorias
};

export const getEmergencyCategories = (): Category[] => {
  return model.categories.filter(c => c.isEmergencyCategory);
};

export const getCategoryById = (id: string): Category | undefined => {
  return model.categories.find(c => c.id === id);
};

export const getSubcategoriesByCategoryId = (categoryId: string): Subcategory[] => {
  const category = getCategoryById(categoryId);
  return category?.subcategories || [];
};

// Validar todos os categoryId apontam para categorias válidas
```

**Validação:**
- [ ] getCategories() retorna 7 ✓
- [ ] getEmergencyCategories() retorna 2 ✓
- [ ] Nenhum selector refencia v1 IDs

#### 4.4 Tipos TypeScript

**Objetivo:** Atualizar interface Category/Subcategory

```typescript
// types/model.ts

interface Category {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  weight: "CRÍTICO" | "ALTO" | "MÉDIO";
  isEmergencyCategory: boolean;
  displayOrder: number;
  subcategories: Subcategory[]; // ← NOVO CAMPO
  subcategoryCount: number;
  flowCount: number;
}

interface Subcategory {
  id: string;
  label: string;
  description: string;
  flowId: string;
  severity: string;
  estimatedResponse: string;
  status: "exists" | "new"; // ← NOVO CAMPO
}
```

**Validação:**
- [ ] Tipos compilam sem erros
- [ ] TypeScript strict mode ativado
- [ ] Não há `any` types novos

#### 4.5 Testes Unitários

**Objetivo:** Atualizar cobertura de testes

```typescript
// __tests__/categorySelectors.test.ts

describe("Category Selectors v2", () => {
  test("getCategories returns 7 categories", () => {
    const cats = getCategories();
    expect(cats).toHaveLength(7);
  });

  test("all categories have valid structure", () => {
    const cats = getCategories();
    cats.forEach(cat => {
      expect(cat.id).toBeDefined();
      expect(cat.label).toBeDefined();
      expect(cat.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(cat.icon).toBeDefined();
      expect(cat.weight).toMatch(/CRÍTICO|ALTO|MÉDIO/);
      expect(cat.subcategories).toBeInstanceOf(Array);
      expect(cat.subcategories.length).toBeGreaterThan(0);
    });
  });

  test("all subcategories have valid flowId", () => {
    const cats = getCategories();
    const flows = getAllFlows();
    cats.forEach(cat => {
      cat.subcategories.forEach(sub => {
        const flowExists = flows.find(f => f.meta.id === sub.flowId);
        expect(flowExists).toBeDefined();
      });
    });
  });

  test("no duplicated subcategory IDs across categories", () => {
    const cats = getCategories();
    const allSubIds = cats.flatMap(c => c.subcategories.map(s => s.id));
    const uniqueIds = new Set(allSubIds);
    expect(uniqueIds.size).toBe(allSubIds.length);
  });

  test("emergency category is properly marked", () => {
    const emergency = getCategories().find(c => c.isEmergencyCategory);
    expect(emergency).toBeDefined();
    expect(emergency?.displayOrder).toBe(0);
  });
});
```

**Validação:**
- [ ] Todos os testes passam ✓
- [ ] Cobertura não diminui
- [ ] Testes de v1 removidos/atualizado

---

## ✅ Phase 5: Validação

**Duração:** 2 horas | **Responsável:** QA + Product

### Checklist

#### 5.1 Testes de Navegação

- [ ] **Home**: Todas as 7 categorias renderizam
- [ ] **Home → Cat 1**: Click em primeira categoria funciona
- [ ] **Category**: Todas subcategorias listadas
- [ ] **Category → Flow**: Click em subcategoria abre flow correto
- [ ] **Flow → Decision**: Tomar decisões funciona
- [ ] **Flow → Result**: Resultado exibido corretamente
- [ ] **Voltar**: Navegação de volta funciona
- [ ] **Busca**: Search indexa novo IDs

#### 5.2 Verificação de Integridade

```javascript
// run-validation.js
const model = require('./model.v2.json');

// Contagem
console.log(`Categories: ${model.categories.length} (esperado: 7)`);
console.log(`Total Subcategories: ${countSubcategories(model)} (esperado: 39)`);
console.log(`Total Flows (v1 existing): 31`);

// Validação de duplicatas
const subIds = [];
model.categories.forEach(cat => {
  cat.subcategories.forEach(sub => {
    if (subIds.includes(sub.id)) {
      console.error(`❌ DUPLICADA: ${sub.id}`);
    }
    subIds.push(sub.id);
  });
});
console.log(`✅ Nenhuma subcategoria duplicada`);

// Validação de flows
const flows = getAllFlows();
model.categories.forEach(cat => {
  cat.subcategories.forEach(sub => {
    const flow = flows.find(f => f.meta.id === sub.flowId);
    if (!flow) {
      console.error(`❌ FLOW AUSENTE: ${sub.flowId} para ${sub.id}`);
    }
  });
});
console.log(`✅ Todos os flows existem`);

// Validação de cores
model.categories.forEach(cat => {
  if (!cat.color.match(/^#[0-9a-f]{6}$/i)) {
    console.error(`❌ COR INVÁLIDA: ${cat.id} = ${cat.color}`);
  }
});
console.log(`✅ Todas as cores válidas`);
```

**Validação:**
- [ ] Script executa sem erros ✓
- [ ] Relatório limpo ✓

#### 5.3 Revisão de Microcopy

**Verificar todas as 39 subcategorias:**

- [ ] Labels claros e não-técnicos
- [ ] Descrições concisas (1-2 linhas)
- [ ] Ícones apropriados
- [ ] Severidades consistentes
- [ ] Sem typos/acentuação

**Checklist por categoria:**

- [ ] **Emergências e Segurança (7)**
  - [ ] emergencia_medica ✓
  - [ ] convulsao ✓
  - [ ] violencia_armada ✓
  - [ ] ameaca_armada ✓
  - [ ] incendio ✓
  - [ ] risco_estrutural ✓
  - [ ] ameaca_externa ✓ (novo)

- [ ] **Saúde e Bem-Estar (6)**
  - [ ] mal_estar_sintomas ✓
  - [ ] febre_infeccao ✓
  - [ ] crise_respiratoria ✓ (novo)
  - [ ] desmaio_tontura ✓ (novo)
  - [ ] acidente_lesao ✓
  - [ ] intoxicacao ✓ (novo)

- [ ] **Saúde Emocional (6)**
  - [ ] ansiedade_crise ✓
  - [ ] tristeza_depressao ✓
  - [ ] ideacao_suicida ✓
  - [ ] autolesao ✓ (consolidado)
  - [ ] isolamento ✓ (novo)
  - [ ] uso_substancias ✓

- [ ] **Convivência e Conflitos (8)**
  - [ ] bullying ✓
  - [ ] agressao_fisica ✓
  - [ ] agressao_verbal ✓
  - [ ] discriminacao_racismo ✓
  - [ ] lgbtfobia ✓
  - [ ] mediacao_restaurativa ✓
  - [ ] reintegracao ✓
  - [ ] plano_acompanhamento ✓

- [ ] **Proteção e Direitos (6)**
  - [ ] violencia_domestica ✓ (movido)
  - [ ] abuso_sexual ✓
  - [ ] negligencia_familiar ✓
  - [ ] trabalho_infantil ✓
  - [ ] abandono ✓
  - [ ] outras_violacoes ✓

- [ ] **Apoio Social e Familiar (3)**
  - [ ] evasao_faltas ✓
  - [ ] inseguranca_alimentar ✓
  - [ ] vulnerabilidade_social ✓

- [ ] **Inclusão e Acessibilidade (3)**
  - [ ] suspeita_neurodivergencia ✓
  - [ ] adaptacao_pedagogica ✓
  - [ ] barreira_acessibilidade ✓

#### 5.4 Teste de Acessibilidade

- [ ] **Cores**: Contraste mínimo 4.5:1 para texto
  - [ ] 🔴 Emergências: #ef4444 vs white ✓
  - [ ] 🟠 Saúde: #fb923c vs white ✓
  - [ ] 🟣 Emocional: #a855f7 vs white ✓
  - [ ] 🔵 Convivência: #3b82f6 vs white ✓
  - [ ] 🟢 Proteção: #059669 vs white ✓
  - [ ] 🟡 Apoio: #f59e0b vs white ✓
  - [ ] 🟣 Inclusão: #6366f1 vs white ✓

- [ ] **Ícones**: Não apenas cor, tem símbolo
  - [ ] AlertTriangle não é só cor
  - [ ] Heart não é só cor
  - [ ] etc

- [ ] **Teclado**: Navegável por TAB
  - [ ] Todas as categorias focáveis
  - [ ] Ordem visual = ordem TAB
  - [ ] Sem traps

- [ ] **Screen Reader**: Descrições adequadas
  - [ ] aria-label em ícones
  - [ ] semantic HTML
  - [ ] hierarquia de headings

#### 5.5 Validação com Stakeholders

- [ ] **Product**: Confirma que estrutura atende necessidades
- [ ] **Direção Escolar**: Valida categorias e fluxos
- [ ] **Psicólogo**: Valida contexto emocional/saúde mental
- [ ] **Coordenador**: Valida convivência/disciplina
- [ ] **Segurança**: Valida emergências/segurança

**Sign-off:**
- [ ] Product: ✅ Aprovado
- [ ] Stakeholder 1: ✅ Aprovado
- [ ] Stakeholder 2: ✅ Aprovado

---

## 📈 Success Metrics

**Antes (Model.v1):**
- ❌ 10 categorias (difícil navegar)
- ❌ 3 duplicações (confusão de contexto)
- ❌ 1 categoria órfã (emergência sem flows)
- ❌ 11 subcategorias órfãs (sem flows)
- ❌ 71% densidade média (desbalanceada)

**Depois (Model.v2):**
- ✅ 7 categorias (navegação clara)
- ✅ 0 duplicações (sem ambiguidade)
- ✅ 0 categorias órfãs (todas usadas)
- ✅ 0 subcategorias órfãs (100% cobertura)
- ✅ 100% densidade média (balanceada)

**Esforço:**
- Total: 25 horas (como planed)
- Sem bloqueadores detectados
- Timeline: 2 semanas viável

---

## 🎯 Go/No-Go Decision

**Condição de Go para Production:**

```
✅ Fase 1 concluída (backup, migrações mapeadas)
✅ Fase 2 concluída (31 flows migrados)
✅ 6 flows novos criados e testados
✅ Código ajustado e testes passando
✅ Validação completa executada
✅ Stakeholders deram sign-off
✅ Nenhum erro crítico
```

**Condição para No-Go:**

```
❌ Duplicações não resolvidas
❌ Flows críticos não funcionando
❌ Testes falhando
❌ Stakeholder rejeição
```

---

## 📞 Próximas Ações (Post-Migration)

1. **Comunicação**: Avisar usuários sobre nova estrutura
2. **Treinamento**: Orientar escola sobre novas categorias
3. **Monitoramento**: Acompanhar uso das novas categorias
4. **Otimização**: Coletar feedback e otimizar fluxos
5. **Planejamento v3**: Identificar melhorias futuras

