# ✅ CHECKLIST DE TESTES - Gestão de Tarefas Mobile

## 🔧 Ambiente

- [ ] Node.js instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Expo CLI instalado (`expo --version`)
- [ ] Android Studio com emulador OU
- [ ] Celular com Expo Go instalado

---

## 📦 Instalação

- [ ] `npm install` rodou com sucesso
- [ ] `npm install @react-native-async-storage/async-storage` instalado
- [ ] Sem erros na instalação
- [ ] `node_modules` foi criada

---

## 🔐 Configuração Básica

- [ ] URL da API atualizada em `src/services/api.js`
- [ ] Backend está rodando em `http://seu-ip:3333`
- [ ] Firewall permite conexão local
- [ ] Em rede WiFi/LAN (não loopback)

---

## 🚀 Inicialização

- [ ] `npm start` executa sem erros
- [ ] Ou `expo start --android` funciona
- [ ] App abre e mostra tela de Login
- [ ] Sem erros críticos no console

---

## 🔐 Teste 1: Login

### Credenciais Válidas

- [ ] Insira login válido (ex: admin)
- [ ] Insira senha válida (ex: admin)
- [ ] Clique em "Acessar sistema"
- [ ] **Esperado:** Navega para Home
- [ ] **Não esperado:** Fica em Login

### Token Armazenado

- [ ] Após login, token foi armazenado
- [ ] Teste: `await AsyncStorage.getItem("authToken")`
- [ ] **Esperado:** Token não é null/undefined
- [ ] Token começa com eyJ... (formato JWT)

### Credenciais Inválidas

- [ ] Insira login inválido
- [ ] Insira senha errada
- [ ] Clique em "Acessar sistema"
- [ ] **Esperado:** Toast com "Usuário ou senha incorretos"
- [ ] **Não esperado:** Navega para Home

### Campos Vazios

- [ ] Deixe login vazio
- [ ] Clique em "Acessar sistema"
- [ ] **Esperado:** Toast com "Preencha usuário e senha"
- [ ] **Não esperado:** Requisição à API

### Loading State

- [ ] Durante login, veja o botão
- [ ] **Esperado:** Spinner girando
- [ ] **Não esperado:** Texto "Acessar sistema" visível

---

## 📋 Teste 2: Home - Carregar Tarefas

### Primeira Carga

- [ ] Home carrega automaticamente
- [ ] Vê "Carregando tarefas..." inicialmente
- [ ] Após 2-3 segundos, tarefas aparecem
- [ ] **Não esperado:** Tela vazia

### Tarefas Visíveis

- [ ] Tarefas aparecem em cards
- [ ] Cada card tem título, descrição, prioridade
- [ ] Prioridade mostra "Alta", "Média" ou "Baixa"
- [ ] Cores: Alta=Vermelho, Média=Laranja, Baixa=Verde
- [ ] Tempo estimado mostra "X min"

### Filtros Funcionam

- [ ] Filtro por prioridade funciona
- [ ] Busca por texto funciona
- [ ] Ordenação por data funciona
- [ ] Botão "Limpar" reseta tudo

### Authorization Bearer

- [ ] Abra DevTools (React Native Debugger)
- [ ] Veja network requests
- [ ] GET /tarefas tem header: `Authorization: Bearer TOKEN`
- [ ] **Não esperado:** GET /tarefas sem Authorization

---

## ✅ Teste 3: Aceitar Tarefa

### Clique em Aceitar

- [ ] Home com tarefas visíveis
- [ ] Clique em botão "Aceitar" de uma tarefa
- [ ] **Esperado:** Spinner aparece no botão
- [ ] **Esperado:** PATCH /tarefas/:id é enviado
- [ ] **Não esperado:** Erro imediato

### Feedback Positivo

- [ ] Toast verde aparece: "Tarefa aceita com sucesso!"
- [ ] Toast desaparece após 3 segundos
- [ ] Lista recarrega automaticamente

### Loading Individual

- [ ] Clique "Aceitar" em tarefa A
- [ ] Veja spinner apenas em tarefa A
- [ ] Outras tarefas permanecem normais
- [ ] **Não esperado:** Toda tela fica loading

### Erro ao Aceitar

- [ ] Desative internet
- [ ] Clique "Aceitar"
- [ ] **Esperado:** Toast vermelho com erro
- [ ] **Não esperado:** App congela

---

## 🔄 Teste 4: Refresh ao Voltar

### Recarregar Dados

- [ ] Você está em Home (tarefas visíveis)
- [ ] Abra Perfil ou outra tela
- [ ] Volte para Home
- [ ] **Esperado:** Tarefas recarregam
- [ ] **Esperado:** "Carregando..." aparece brevemente
- [ ] **Não esperado:** Lista permanece antiga

### Verificar Mudanças

- [ ] Se tarefa foi aceita
- [ ] Dados devem estar atualizados ao voltar
- [ ] Status deve refletir a aceitação

### Performance

- [ ] Refresh não é instantâneo (leva 1-2s)
- [ ] App não congela durante refresh
- [ ] Textos permanecem no input (se houver)

---

## ⚠️ Teste 5: Tratamento de Erros

### Erro de Rede

- [ ] Desative WiFi/dados
- [ ] Tente fazer qualquer ação (login, aceitar, etc)
- [ ] **Esperado:** Toast: "Erro de conexão com o servidor"
- [ ] **Não esperado:** App quebra

### Token Expirado

- [ ] Edite manualmente token em AsyncStorage
- [ ] Deixe string inválida: "invalid"
- [ ] Tente fazer requisição (ex: voltar para Home)
- [ ] **Esperado:** Toast: "Sessão expirada"
- [ ] **Esperado:** Token é removido
- [ ] **Não esperado:** Requisição é enviada com token inválido

### Servidor Fora

- [ ] Desligue o backend
- [ ] Tente fazer requisição
- [ ] **Esperado:** Toast de erro após timeout
- [ ] **Não esperado:** App esperando eternamente

---

## 🎨 Teste 6: UI/UX

### Toast

- [ ] Toast aparece do topo
- [ ] Tem animação suave
- [ ] Desaparece automaticamente
- [ ] Cores: Vermelho (erro), Verde (sucesso), Laranja (aviso)

### Loading States

- [ ] ActivityIndicator mostra spinner
- [ ] Botões desabilitados durante loading
- [ ] Opacidade reduzida durante loading

### Responsividade

- [ ] Layout não quebra em telas diferentes
- [ ] Cards são legíveis
- [ ] Botões são clicáveis
- [ ] Textos não saem da tela

---

## 🔄 Teste 7: Fluxo Completo

### Cenário: Usuario faz todo o fluxo

1. [ ] Abre app → Tela de Login
2. [ ] Digita credenciais → Clica "Acessar"
3. [ ] Navega para Home → Tarefas carregam
4. [ ] Vê tarefas com prioridades e cores
5. [ ] Filtra por prioridade "Alta"
6. [ ] Busca por texto
7. [ ] Clica "Aceitar" em uma tarefa
8. [ ] Vê Toast de sucesso
9. [ ] Abre Perfil
10. [ ] Volta para Home
11. [ ] Tarefas recarregam
12. [ ] Tudo funciona

---

## 🧪 Teste 8: Console/Debug

- [ ] Console não tem erros vermelhos
- [ ] Console não tem warnings críticos
- [ ] Vê logs de requisições (GET, PATCH, etc)
- [ ] Vê logs de resposta (sucesso/erro)
- [ ] Network debugger mostra requests corretos

---

## 📱 Teste 9: Diferentes Dispositivos

### Emulador Android

- [ ] [ ] App abre sem problemas
- [ ] [ ] Tarefas carregam
- [ ] [ ] Aceitar funciona

### Celular Físico

- [ ] [ ] App abre via Expo Go
- [ ] [ ] Conecta à API (mesmo WiFi)
- [ ] [ ] Tudo funciona como emulador

### iPhone (Simulador ou Real)

- [ ] [ ] App abre sem problemas
- [ ] [ ] Tarefas carregam
- [ ] [ ] Aceitar funciona

---

## 🚀 Teste 10: Performance

### Carga Inicial

- [ ] Home carrega em < 3 segundos
- [ ] Lista renderiza suavemente
- [ ] Sem lag ao scrolar FlatList

### Aceitação de Tarefa

- [ ] Requisição PATCH é rápida (< 2s)
- [ ] Toast aparece imediatamente
- [ ] Refresh é suave

### Busca/Filtro

- [ ] Filtro por prioridade é instantâneo
- [ ] Busca não tem lag (usar debounce se muita data)
- [ ] Lista reordenar é suave

---

## 🔐 Teste 11: Segurança

- [ ] Token não está exposto em console logs sensatos
- [ ] Token não está em state (usar AsyncStorage)
- [ ] Senha não aparece em requests
- [ ] Não há XSS ou injeção SQL possível

---

## ✅ Checklist Final

- [ ] Todos os testes acima passaram
- [ ] Sem erros críticos
- [ ] Sem warnings importantes
- [ ] App é responsivo
- [ ] Fluxo completo funciona
- [ ] Pronto para demonstração/deploy

---

## 📝 Notas

Teste data: **_/_**/**\_\_**
Testado por: ********\_********
Status: ✅ PASSOU ou ❌ FALHOU

Problemas encontrados:

-
-
-

Soluções aplicadas:

-
-
-

---

## 🎉 Parabéns!

Se todos os testes passaram, seu app está **pronto para produção**!

**Próximos passos sugeridos:**

1. Implementar tela de Perfil com Logout
2. Adicionar edição de tarefas
3. Adicionar exclusão de tarefas
4. Persistir filtros com AsyncStorage
5. Adicionar modo offline

---

**Para dúvidas, veja:**

- 📖 INTEGRACAO_API.md
- 🚀 QUICK_START.md
- 📋 EXEMPLOS_COPY_PASTE.js
