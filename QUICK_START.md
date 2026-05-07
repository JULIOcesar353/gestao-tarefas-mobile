# 🚀 QUICK START - Integração API Completa

## 5 Passos para Começar

### 1️⃣ Instalar Dependência

```bash
cd d:\Paulo\gestao-tarefas-mobile
npm install @react-native-async-storage/async-storage
```

### 2️⃣ Atualizar URL da API

Editar `src/services/api.js`:

```javascript
const API_URL = "http://seu-ip:3333"; // ← Mude aqui!
```

### 3️⃣ Testar Login

```bash
npm start
# OU
expo start --android
```

Credenciais de teste: **admin/admin** (ou as que seu backend aceita)

### 4️⃣ Verificar se Funciona

- ✅ Login com credenciais corretas → vai para Home
- ✅ Home carrega tarefas da API
- ✅ Clicar em "Aceitar" → tarefa é aceita (PATCH)
- ✅ Voltar e entrar em Home → atualiza automaticamente

### 5️⃣ Se Houver Erros

- Verificar console: `console.error()`
- Verificar URL da API está correta
- Verificar backend está rodando
- Verificar se está em rede local (WiFi/LAN)

---

## 📂 Arquivos Novos Criados

```
src/
├── services/
│   ├── api.js                    ✏️ (ATUALIZADO - Com interceptor)
│   ├── authService.js            ✨ NOVO
│   └── tarefasService.js         ✏️ (ATUALIZADO - Com CRUD)
├── utils/
│   ├── toast.js                  ✨ NOVO
│   └── helpers.js                ✨ NOVO
└── telas/
    ├── home/
    │   └── index.js              ✏️ (ATUALIZADO)
    └── login/
        └── index.js              ✏️ (ATUALIZADO)

INTEGRACAO_API.md                 ✨ Documentação completa
EXEMPLOS_COPY_PASTE.js            ✨ 10 exemplos prontos
QUICK_START.md                    ✨ Este arquivo
```

---

## 🔐 Fluxo Resumido

```
[Login] → Token armazenado → [Home] → API chamadas com token
                                      → Voltar → Atualiza dados
                                      → Aceitar → PATCH + refresh
```

---

## 💡 Principais Mudanças

| O que       | Antes                 | Depois                                 |
| ----------- | --------------------- | -------------------------------------- |
| **Login**   | Mockado (admin/admin) | Integrado com API                      |
| **Tarefas** | Carregadas 1x         | Recarregam ao voltar                   |
| **Aceitar** | Sem ação              | Faz PATCH e atualiza                   |
| **Erros**   | Text.errorText        | Toast animado                          |
| **Token**   | ❌                    | ✅ AsyncStorage + Authorization Bearer |

---

## 🧪 Testes Rápidos

### Teste 1: Login

```javascript
// src/telas/login/index.js
// Insira credenciais válidas e clique
```

### Teste 2: Aceitar Tarefa

```javascript
// src/telas/home/index.js
// Clique em "Aceitar" em qualquer card
```

### Teste 3: Recarregar

```javascript
// Abra Home > Volte para outra tela > Volte para Home
// Deve recarregar automaticamente
```

### Teste 4: Erro de Conexão

```javascript
// Desative internet no emulador
// Tente fazer uma ação
// Deve aparecer Toast de erro
```

---

## 🔧 Ajustes Comuns

### Mudar URL da API

`src/services/api.js` linha 3:

```javascript
const API_URL = "http://seu-ip:3333";
```

### Mudar Tempo do Toast

`src/utils/toast.js` linha 20:

```javascript
duration = 3000, // Mude para 5000 (5 segundos)
```

### Adicionar Loading em Outra Tela

```javascript
import { Toast, useToast } from "../../utils/toast";

const { showToast } = useToast();

showToast("Carregando...", "warning");
```

### Fazer PATCH/DELETE em Outra Tela

```javascript
import { patch, deleteRequest } from "../../services/api";
import { aceitarTarefa, editarTarefa } from "../../services/tarefasService";

// Usar direto
await patch("/tarefas/123", { status: 1 });
await deleteRequest("/tarefas/123");

// Ou usar funções prontas
await aceitarTarefa(123);
await editarTarefa(123, { titulo: "Novo" });
```

---

## ⚠️ Checklist Antes de Deploy

- [ ] URL da API atualizada
- [ ] AsyncStorage instalado (`npm ls @react-native-async-storage/async-storage`)
- [ ] Login funciona com credenciais válidas
- [ ] Home carrega tarefas
- [ ] Aceitar tarefa funciona
- [ ] Voltar e entrar em Home recarrega
- [ ] Toast aparecem em erros
- [ ] Sem erros no console

---

## 📞 Solução de Problemas

### "Cannot find module '@react-native-async-storage/async-storage'"

```bash
npm install @react-native-async-storage/async-storage
expo start --clear
```

### "Network error"

- Verificar se backend está rodando
- Verificar URL em api.js
- Verificar se IP está correto
- Testar no celular físico (não emulador)

### "Erro ao fazer login"

- Verificar credenciais
- Verificar se a rota POST /login existe no backend
- Ver console para detalhes

### "Tarefa não atualiza após aceitar"

- Verificar se PATCH /tarefas/:id existe no backend
- Verificar se retorna sucesso: true
- Ver console para detalhes

### Toast não aparece

- Verificar se Toast foi importado
- Verificar se Toast está dentro do View
- Verificar se useToast foi chamado

---

## 📚 Documentação Completa

Veja **INTEGRACAO_API.md** para:

- Explicação detalhada de cada função
- Exemplos de uso completos
- Tratamento de erros avançado
- Estrutura de dados da API

Veja **EXEMPLOS_COPY_PASTE.js** para:

- 10 exemplos prontos
- Snippets para usar em outras telas
- Funções auxiliares

---

## 🎯 Próximos Passos

1. Implementar tela de Perfil com logout
2. Adicionar edição de tarefas
3. Adicionar exclusão de tarefas
4. Persistir filtros com AsyncStorage
5. Adicionar modo offline
6. Adicionar notificações push

---

**Dúvidas ou problemas? Veja a documentação completa em INTEGRACAO_API.md**
