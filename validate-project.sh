#!/bin/bash

# ============================================
# B-SSOLA-MVP — SUPERCOMANDO DE VALIDAÇÃO
# Executa auditoria completa de maturidade
# ============================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Contadores
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNINGS=0

# Funções auxiliares
print_header() {
    echo -e "\n${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}\n"
}

print_section() {
    echo -e "\n${CYAN}>>> $1${NC}\n"
}

check_pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED_CHECKS++))
    ((TOTAL_CHECKS++))
}

check_fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED_CHECKS++))
    ((TOTAL_CHECKS++))
}

check_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
    ((TOTAL_CHECKS++))
}

# ============================================
# SEÇÃO 1: VERIFICAÇÕES CRÍTICAS
# ============================================

print_header "SEÇÃO 1: VERIFICAÇÕES CRÍTICAS (BLOQUEANTES)"

print_section "1.1 — Conflitos Git"
if grep -r "<<<<<<< HEAD" src/ 2>/dev/null; then
    check_fail "Conflitos Git encontrados nos arquivos"
    echo -e "${RED}Arquivos com conflitos:${NC}"
    grep -r "<<<<<<< HEAD" src/ -l 2>/dev/null | sed 's/^/  /'
else
    check_pass "Nenhum conflito Git pendente"
fi

print_section "1.2 — TypeCheck"
TYPECHECK_OUTPUT=$(npm run typecheck 2>&1)
TYPECHECK_ERRORS=$(echo "$TYPECHECK_OUTPUT" | grep -oP "Found \K\d+(?= error)" | tail -1)

if [ -z "$TYPECHECK_ERRORS" ]; then
    TYPECHECK_ERRORS=0
fi

if [ "$TYPECHECK_ERRORS" -eq 0 ]; then
    check_pass "TypeScript: 0 erros"
else
    check_fail "TypeScript: $TYPECHECK_ERRORS erros encontrados"
    echo -e "${RED}Primeiros erros:${NC}"
    echo "$TYPECHECK_OUTPUT" | grep "error TS" | head -5 | sed 's/^/  /'
fi

print_section "1.3 — Build de Produção"
BUILD_OUTPUT=$(npm run build 2>&1)
if echo "$BUILD_OUTPUT" | grep -q "✓.*built in"; then
    BUILD_TIME=$(echo "$BUILD_OUTPUT" | grep -oP "built in \K[\d.]+[ms|s]+")
    check_pass "Build concluído em $BUILD_TIME"
else
    check_fail "Build falhou"
    echo -e "${RED}Erro de build:${NC}"
    echo "$BUILD_OUTPUT" | grep -i "error" | head -3 | sed 's/^/  /'
fi

print_section "1.4 — Testes Unitários"
TEST_OUTPUT=$(npm run test:run 2>&1)
TESTS_PASSED=$(echo "$TEST_OUTPUT" | grep -oP "\d+(?= passed)" | tail -1)
TESTS_FAILED=$(echo "$TEST_OUTPUT" | grep -oP "\d+(?= failed)" | tail -1)
TESTS_TOTAL=$(echo "$TEST_OUTPUT" | grep -oP "Tests.*\d+ passed \(\K\d+(?=\))" | tail -1)

if [ -z "$TESTS_FAILED" ]; then
    TESTS_FAILED=0
fi

TESTS_PASS_RATE=$((TESTS_PASSED * 100 / TESTS_TOTAL))

if [ "$TESTS_PASS_RATE" -ge 95 ]; then
    check_pass "Testes: $TESTS_PASSED/$TESTS_TOTAL passando ($TESTS_PASS_RATE%)"
elif [ "$TESTS_PASS_RATE" -ge 90 ]; then
    check_warn "Testes: $TESTS_PASSED/$TESTS_TOTAL passando ($TESTS_PASS_RATE%)"
else
    check_fail "Testes: $TESTS_PASSED/$TESTS_TOTAL passando ($TESTS_PASS_RATE%)"
fi

if [ "$TESTS_FAILED" -gt 0 ]; then
    echo -e "${YELLOW}Testes falhando:${NC}"
    echo "$TEST_OUTPUT" | grep "FAIL " | head -5 | sed 's/^/  /'
fi

# ============================================
# SEÇÃO 2: QUALIDADE DE CÓDIGO
# ============================================

print_header "SEÇÃO 2: QUALIDADE DE CÓDIGO"

print_section "2.1 — Linting (ESLint)"
if [ -f ".eslintrc.json" ] || [ -f ".eslintrc.js" ] || [ -f "eslint.config.js" ]; then
    if command -v eslint &> /dev/null; then
        ESLINT_OUTPUT=$(npx eslint src/ --max-warnings=0 2>&1 || true)
        ESLINT_ERRORS=$(echo "$ESLINT_OUTPUT" | grep -oP "\d+(?= error)" | tail -1)
        ESLINT_WARNINGS=$(echo "$ESLINT_OUTPUT" | grep -oP "\d+(?= warning)" | tail -1)
        
        if [ -z "$ESLINT_ERRORS" ]; then ESLINT_ERRORS=0; fi
        if [ -z "$ESLINT_WARNINGS" ]; then ESLINT_WARNINGS=0; fi
        
        if [ "$ESLINT_ERRORS" -eq 0 ] && [ "$ESLINT_WARNINGS" -eq 0 ]; then
            check_pass "ESLint: 0 erros, 0 warnings"
        elif [ "$ESLINT_ERRORS" -eq 0 ]; then
            check_warn "ESLint: 0 erros, $ESLINT_WARNINGS warnings"
        else
            check_fail "ESLint: $ESLINT_ERRORS erros, $ESLINT_WARNINGS warnings"
        fi
    else
        check_warn "ESLint não configurado"
    fi
else
    check_warn "Arquivo de configuração ESLint não encontrado"
fi

print_section "2.2 — Formatação (Prettier)"
if [ -f ".prettierrc" ] || [ -f ".prettierrc.json" ] || [ -f "prettier.config.js" ]; then
    if command -v prettier &> /dev/null; then
        PRETTIER_CHECK=$(npx prettier --check "src/**/*.{ts,tsx}" 2>&1 || true)
        if echo "$PRETTIER_CHECK" | grep -q "All matched files"; then
            check_pass "Prettier: Todos os arquivos formatados"
        else
            UNFORMATTED=$(echo "$PRETTIER_CHECK" | grep -c "src/" || echo "0")
            check_warn "Prettier: $UNFORMATTED arquivos não formatados"
        fi
    else
        check_warn "Prettier não configurado"
    fi
else
    check_warn "Prettier não configurado"
fi

print_section "2.3 — Cobertura de Testes"
if [ -f "vitest.config.ts" ]; then
    COVERAGE_OUTPUT=$(npm run test:coverage 2>&1 || true)
    COVERAGE_PERCENT=$(echo "$COVERAGE_OUTPUT" | grep -oP "All files.*\|\s+\K[\d.]+(?=%)" | tail -1)
    
    if [ ! -z "$COVERAGE_PERCENT" ]; then
        if (( $(echo "$COVERAGE_PERCENT >= 80" | bc -l) )); then
            check_pass "Cobertura: ${COVERAGE_PERCENT}%"
        elif (( $(echo "$COVERAGE_PERCENT >= 70" | bc -l) )); then
            check_warn "Cobertura: ${COVERAGE_PERCENT}% (meta: 80%)"
        else
            check_fail "Cobertura: ${COVERAGE_PERCENT}% (meta: 80%)"
        fi
    else
        check_warn "Cobertura: Não foi possível determinar"
    fi
else
    check_warn "Vitest não configurado para cobertura"
fi

print_section "2.4 — Complexidade Ciclomática"
TS_FILES_COUNT=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
LINES_OF_CODE=$(find src -name "*.ts" -o -name "*.tsx" -exec cat {} \; | wc -l)
AVG_FILE_SIZE=$((LINES_OF_CODE / TS_FILES_COUNT))

if [ "$AVG_FILE_SIZE" -lt 200 ]; then
    check_pass "Tamanho médio de arquivo: $AVG_FILE_SIZE linhas (< 200)"
elif [ "$AVG_FILE_SIZE" -lt 300 ]; then
    check_warn "Tamanho médio de arquivo: $AVG_FILE_SIZE linhas (meta: < 200)"
else
    check_fail "Tamanho médio de arquivo: $AVG_FILE_SIZE linhas (meta: < 200)"
fi

# ============================================
# SEÇÃO 3: ARQUITETURA E ORGANIZAÇÃO
# ============================================

print_header "SEÇÃO 3: ARQUITETURA E ORGANIZAÇÃO"

print_section "3.1 — Estrutura de Diretórios"
REQUIRED_DIRS=("src/domain" "src/features" "src/application" "src/components")
MISSING_DIRS=0

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        ((MISSING_DIRS++))
    fi
done

if [ "$MISSING_DIRS" -eq 0 ]; then
    check_pass "Todos os diretórios principais presentes"
else
    check_warn "$MISSING_DIRS diretórios principais faltando"
fi

print_section "3.2 — Convenção de Nomenclatura"
INVALID_FILENAMES=$(find src -name "*.tsx" -o -name "*.ts" | grep -v "\.test\." | grep -v "node_modules" | grep -E "[A-Z]{2,}|[a-z]+[A-Z][a-z]*[a-z]+" | wc -l)

if [ "$INVALID_FILENAMES" -eq 0 ]; then
    check_pass "Nomenclatura de arquivos consistente"
else
    check_warn "$INVALID_FILENAMES arquivos com nomenclatura não-padrão"
fi

print_section "3.3 — Imports Circulares"
if command -v madge &> /dev/null; then
    CIRCULAR=$(madge --circular --extensions ts,tsx src/ 2>&1)
    if echo "$CIRCULAR" | grep -q "No circular"; then
        check_pass "Nenhuma dependência circular detectada"
    else
        check_fail "Dependências circulares encontradas"
        echo -e "${RED}Ciclos:${NC}"
        echo "$CIRCULAR" | head -5 | sed 's/^/  /'
    fi
else
    check_warn "madge não instalado (npm i -g madge)"
fi

print_section "3.4 — Duplicação de Código"
if command -v jscpd &> /dev/null; then
    DUPLICATION=$(jscpd src/ --min-lines 5 --min-tokens 50 -f json 2>&1 || echo '{}')
    DUP_PERCENT=$(echo "$DUPLICATION" | jq -r '.statistics.total.percentage' 2>/dev/null || echo "0")
    
    if (( $(echo "$DUP_PERCENT < 5" | bc -l) )); then
        check_pass "Duplicação: ${DUP_PERCENT}% (< 5%)"
    elif (( $(echo "$DUP_PERCENT < 10" | bc -l) )); then
        check_warn "Duplicação: ${DUP_PERCENT}% (meta: < 5%)"
    else
        check_fail "Duplicação: ${DUP_PERCENT}% (meta: < 5%)"
    fi
else
    check_warn "jscpd não instalado (npm i -g jscpd)"
fi

# ============================================
# SEÇÃO 4: SEGURANÇA E DEPENDÊNCIAS
# ============================================

print_header "SEÇÃO 4: SEGURANÇA E DEPENDÊNCIAS"

print_section "4.1 — Auditoria de Segurança"
AUDIT_OUTPUT=$(npm audit --json 2>&1)
CRITICAL=$(echo "$AUDIT_OUTPUT" | jq -r '.metadata.vulnerabilities.critical' 2>/dev/null || echo "0")
HIGH=$(echo "$AUDIT_OUTPUT" | jq -r '.metadata.vulnerabilities.high' 2>/dev/null || echo "0")
MODERATE=$(echo "$AUDIT_OUTPUT" | jq -r '.metadata.vulnerabilities.moderate' 2>/dev/null || echo "0")

if [ "$CRITICAL" -eq 0 ] && [ "$HIGH" -eq 0 ]; then
    check_pass "Vulnerabilidades: 0 críticas, 0 altas"
elif [ "$CRITICAL" -eq 0 ]; then
    check_warn "Vulnerabilidades: 0 críticas, $HIGH altas, $MODERATE moderadas"
else
    check_fail "Vulnerabilidades: $CRITICAL críticas, $HIGH altas"
fi

print_section "4.2 — Dependências Desatualizadas"
OUTDATED=$(npm outdated --json 2>&1 || echo '{}')
OUTDATED_COUNT=$(echo "$OUTDATED" | jq 'length' 2>/dev/null || echo "0")

if [ "$OUTDATED_COUNT" -eq 0 ]; then
    check_pass "Todas as dependências atualizadas"
elif [ "$OUTDATED_COUNT" -lt 5 ]; then
    check_warn "$OUTDATED_COUNT dependências desatualizadas"
else
    check_fail "$OUTDATED_COUNT dependências desatualizadas"
fi

print_section "4.3 — Tamanho do Bundle"
if [ -d "dist" ]; then
    BUNDLE_SIZE=$(du -sh dist/ 2>/dev/null | awk '{print $1}')
    BUNDLE_SIZE_KB=$(du -sk dist/ 2>/dev/null | awk '{print $1}')
    
    if [ "$BUNDLE_SIZE_KB" -lt 500 ]; then
        check_pass "Bundle: $BUNDLE_SIZE (< 500KB)"
    elif [ "$BUNDLE_SIZE_KB" -lt 1000 ]; then
        check_warn "Bundle: $BUNDLE_SIZE (meta: < 500KB)"
    else
        check_fail "Bundle: $BUNDLE_SIZE (meta: < 500KB)"
    fi
else
    check_warn "Bundle não encontrado (execute npm run build)"
fi

# ============================================
# SEÇÃO 5: DOCUMENTAÇÃO
# ============================================

print_header "SEÇÃO 5: DOCUMENTAÇÃO"

print_section "5.1 — README.md"
if [ -f "README.md" ]; then
    README_LINES=$(wc -l < README.md)
    if [ "$README_LINES" -gt 50 ]; then
        check_pass "README.md presente e completo ($README_LINES linhas)"
    else
        check_warn "README.md presente mas curto ($README_LINES linhas)"
    fi
else
    check_fail "README.md não encontrado"
fi

print_section "5.2 — Comentários JSDoc"
JSDOC_COUNT=$(grep -r "\/\*\*" src/ --include="*.ts" --include="*.tsx" | wc -l)
TOTAL_FUNCTIONS=$(grep -r "^export function\|^export const.*=.*(" src/ --include="*.ts" --include="*.tsx" | wc -l)

if [ "$TOTAL_FUNCTIONS" -gt 0 ]; then
    JSDOC_RATIO=$((JSDOC_COUNT * 100 / TOTAL_FUNCTIONS))
    
    if [ "$JSDOC_RATIO" -ge 50 ]; then
        check_pass "JSDoc: $JSDOC_RATIO% das funções documentadas"
    elif [ "$JSDOC_RATIO" -ge 30 ]; then
        check_warn "JSDoc: $JSDOC_RATIO% das funções documentadas (meta: 50%)"
    else
        check_fail "JSDoc: $JSDOC_RATIO% das funções documentadas (meta: 50%)"
    fi
fi

print_section "5.3 — Changelog"
if [ -f "CHANGELOG.md" ]; then
    check_pass "CHANGELOG.md presente"
else
    check_warn "CHANGELOG.md não encontrado"
fi

# ============================================
# SEÇÃO 6: PERFORMANCE
# ============================================

print_header "SEÇÃO 6: PERFORMANCE"

print_section "6.1 — Tempo de Build"
BUILD_TIME_OUTPUT=$(npm run build 2>&1)
BUILD_TIME_MS=$(echo "$BUILD_TIME_OUTPUT" | grep -oP "built in \K[\d.]+(?=ms)")
BUILD_TIME_S=$(echo "$BUILD_TIME_OUTPUT" | grep -oP "built in \K[\d.]+(?=s)")

if [ ! -z "$BUILD_TIME_MS" ]; then
    if [ "$BUILD_TIME_MS" -lt 5000 ]; then
        check_pass "Build rápido: ${BUILD_TIME_MS}ms"
    else
        check_warn "Build: ${BUILD_TIME_MS}ms (meta: < 5s)"
    fi
elif [ ! -z "$BUILD_TIME_S" ]; then
    if (( $(echo "$BUILD_TIME_S < 10" | bc -l) )); then
        check_pass "Build: ${BUILD_TIME_S}s"
    else
        check_warn "Build: ${BUILD_TIME_S}s (meta: < 10s)"
    fi
fi

print_section "6.2 — Tempo de Testes"
TEST_DURATION=$(echo "$TEST_OUTPUT" | grep -oP "Duration \K[\d.]+s")
if [ ! -z "$TEST_DURATION" ]; then
    TEST_DURATION_NUM=$(echo "$TEST_DURATION" | sed 's/s//')
    if (( $(echo "$TEST_DURATION_NUM < 30" | bc -l) )); then
        check_pass "Testes executados em ${TEST_DURATION}"
    else
        check_warn "Testes executados em ${TEST_DURATION} (meta: < 30s)"
    fi
fi

# ============================================
# RELATÓRIO FINAL
# ============================================

print_header "RELATÓRIO DE MATURIDADE"

echo -e "${CYAN}Checks Totais:${NC} $TOTAL_CHECKS"
echo -e "${GREEN}Aprovados:${NC} $PASSED_CHECKS"
echo -e "${RED}Falhados:${NC} $FAILED_CHECKS"
echo -e "${YELLOW}Avisos:${NC} $WARNINGS"

PASS_RATE=$((PASSED_CHECKS * 100 / TOTAL_CHECKS))
echo -e "\n${CYAN}Taxa de Aprovação:${NC} ${PASS_RATE}%"

# Nível de Maturidade
if [ "$PASS_RATE" -ge 90 ] && [ "$FAILED_CHECKS" -eq 0 ]; then
    MATURITY="🏆 OURO (Production Ready)"
    COLOR=$GREEN
elif [ "$PASS_RATE" -ge 75 ] && [ "$FAILED_CHECKS" -le 2 ]; then
    MATURITY="🥈 PRATA (Quase Pronto)"
    COLOR=$CYAN
elif [ "$PASS_RATE" -ge 60 ]; then
    MATURITY="🥉 BRONZE (Em Desenvolvimento)"
    COLOR=$YELLOW
else
    MATURITY="🔴 VERMELHO (Crítico)"
    COLOR=$RED
fi

echo -e "\n${COLOR}Nível de Maturidade: $MATURITY${NC}"

# Score detalhado
echo -e "\n${PURPLE}Score Detalhado:${NC}"
echo -e "  Crítico (TypeCheck, Build, Tests): $([ "$TYPECHECK_ERRORS" -eq 0 ] && [ "$TESTS_PASS_RATE" -ge 90 ] && echo "${GREEN}PASS${NC}" || echo "${RED}FAIL${NC}")"
echo -e "  Qualidade de Código: $([ "$ESLINT_ERRORS" -eq 0 ] && echo "${GREEN}PASS${NC}" || echo "${YELLOW}OK${NC}")"
echo -e "  Arquitetura: $([ "$MISSING_DIRS" -eq 0 ] && echo "${GREEN}PASS${NC}" || echo "${YELLOW}OK${NC}")"
echo -e "  Segurança: $([ "$CRITICAL" -eq 0 ] && echo "${GREEN}PASS${NC}" || echo "${RED}FAIL${NC}")"
echo -e "  Documentação: $([ -f "README.md" ] && echo "${GREEN}PASS${NC}" || echo "${YELLOW}OK${NC}")"

# Próximos passos
if [ "$FAILED_CHECKS" -gt 0 ]; then
    echo -e "\n${RED}⚠ AÇÕES NECESSÁRIAS:${NC}"
    [ "$TYPECHECK_ERRORS" -gt 0 ] && echo "  1. Corrigir $TYPECHECK_ERRORS erros TypeScript"
    [ "$TESTS_FAILED" -gt 0 ] && echo "  2. Corrigir $TESTS_FAILED testes falhando"
    [ "$CRITICAL" -gt 0 ] && echo "  3. Resolver $CRITICAL vulnerabilidades críticas"
fi

echo -e "\n${PURPLE}================================${NC}"
echo -e "${PURPLE}Validação Concluída!${NC}"
echo -e "${PURPLE}================================${NC}\n"
