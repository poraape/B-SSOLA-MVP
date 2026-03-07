#!/bin/bash

# ============================================
# B-SSOLA-MVP — VALIDAÇÃO WINDOWS (Git Bash)
# ============================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

TOTAL=0
PASSED=0
FAILED=0
WARNINGS=0

check_pass() { echo -e "${GREEN}✓${NC} $1"; ((PASSED++)); ((TOTAL++)); }
check_fail() { echo -e "${RED}✗${NC} $1"; ((FAILED++)); ((TOTAL++)); }
check_warn() { echo -e "${YELLOW}⚠${NC} $1"; ((WARNINGS++)); ((TOTAL++)); }

echo -e "\n${PURPLE}==================================${NC}"
echo -e "${PURPLE}VALIDAÇÃO B-SSOLA-MVP (Windows)${NC}"
echo -e "${PURPLE}==================================${NC}\n"

# ==== SEÇÃO 1: CRÍTICO ====
echo -e "${CYAN}>>> 1.1 — Conflitos Git${NC}\n"
if grep -r "<<<<<<< HEAD" src/ 2>/dev/null; then
    check_fail "Conflitos Git encontrados"
else
    check_pass "Nenhum conflito Git"
fi

echo -e "\n${CYAN}>>> 1.2 — TypeCheck${NC}\n"
if npm run typecheck 2>&1 | grep -q "Found 0 errors"; then
    check_pass "TypeScript: 0 erros"
else
    check_fail "TypeScript com erros"
fi

echo -e "\n${CYAN}>>> 1.3 — Build${NC}\n"
if npm run build 2>&1 | grep -q "built in"; then
    check_pass "Build concluído"
else
    check_fail "Build falhou"
fi

echo -e "\n${CYAN}>>> 1.4 — Testes${NC}\n"
TEST_OUTPUT=$(npm run test:run 2>&1)
if echo "$TEST_OUTPUT" | grep -q "127 passed"; then
    check_pass "Testes: 127/127 (100%)"
elif echo "$TEST_OUTPUT" | grep -q "passed"; then
    PASSED_COUNT=$(echo "$TEST_OUTPUT" | grep -o "[0-9]* passed" | head -1 | grep -o "[0-9]*")
    check_warn "Testes: $PASSED_COUNT/127 passando"
else
    check_fail "Testes falharam"
fi

# ==== SEÇÃO 2: QUALIDADE ====
echo -e "\n${CYAN}>>> 2.1 — ESLint${NC}\n"
if [ -f ".eslintrc.json" ] && [ -f "node_modules/.bin/eslint.cmd" ]; then
    check_pass "ESLint configurado"
elif [ -f ".eslintrc.json" ]; then
    check_warn "ESLint config presente mas não instalado"
else
    check_warn "ESLint não configurado"
fi

echo -e "\n${CYAN}>>> 2.2 — Prettier${NC}\n"
if [ -f ".prettierrc.json" ]; then
    check_pass "Prettier configurado"
else
    check_warn "Prettier não configurado"
fi

echo -e "\n${CYAN}>>> 2.3 — Bundle Size${NC}\n"
if [ -f "dist/assets/index-*.js" ]; then
    INITIAL_KB=$(du -k dist/assets/index-*.js dist/assets/vendor-core-*.js 2>/dev/null | awk '{sum+=$1} END {print sum}')
    if [ "$INITIAL_KB" -lt 500 ]; then
        check_pass "Bundle inicial: ${INITIAL_KB} KB (<500KB)"
    else
        check_warn "Bundle inicial: ${INITIAL_KB} KB (meta <500KB)"
    fi
else
    check_warn "Bundle não encontrado"
fi

# ==== SEÇÃO 3: ARQUITETURA ====
echo -e "\n${CYAN}>>> 3.1 — Estrutura${NC}\n"
if [ -d "src/domain" ] && [ -d "src/features" ]; then
    check_pass "Estrutura de pastas OK"
else
    check_fail "Estrutura de pastas incompleta"
fi

# ==== SEÇÃO 4: SEGURANÇA ====
echo -e "\n${CYAN}>>> 4.1 — Vulnerabilidades${NC}\n"
AUDIT=$(npm audit --json 2>&1 | grep -o '"critical":[0-9]*' | grep -o '[0-9]*')
if [ -z "$AUDIT" ] || [ "$AUDIT" -eq 0 ]; then
    check_pass "0 vulnerabilidades críticas"
else
    check_fail "$AUDIT vulnerabilidades críticas"
fi

# ==== RELATÓRIO ====
echo -e "\n${PURPLE}==================================${NC}"
echo -e "${PURPLE}RELATÓRIO DE MATURIDADE${NC}"
echo -e "${PURPLE}==================================${NC}\n"

echo -e "Checks: $TOTAL | Aprovados: ${GREEN}$PASSED${NC} | Falhados: ${RED}$FAILED${NC} | Avisos: ${YELLOW}$WARNINGS${NC}"

if [ "$TOTAL" -gt 0 ]; then
    RATE=$(( PASSED * 100 / TOTAL ))
    echo -e "\nTaxa de Aprovação: ${RATE}%"
    
    if [ "$RATE" -ge 80 ] && [ "$FAILED" -eq 0 ]; then
        echo -e "\n${GREEN}Nível: 🥈 PRATA (Quase Pronto)${NC}"
    elif [ "$RATE" -ge 60 ]; then
        echo -e "\n${YELLOW}Nível: 🥉 BRONZE (Em Desenvolvimento)${NC}"
    else
        echo -e "\n${RED}Nível: 🔴 VERMELHO (Crítico)${NC}"
    fi
fi

echo -e "\n${PURPLE}==================================${NC}"
