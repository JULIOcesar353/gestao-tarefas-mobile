# 📱 Integração Completa com API - Gestão de Tarefas Mobile

## ✅ Mudanças Implementadas

### 1. **Dependências Adicionadas**

```bash
npm install @react-native-async-storage/async-storage
```

### 2. **Arquivos Criados**

#### `src/utils/toast.js`

- Hook customizado `useToast()` para gerenciar mensagens
- Componente `Toast` com animações
- Função `formatErrorMessage()` para tratamento de erros

#### `src/services/authService.js`

- `loginUser(login, senha)` - Realiza login e armazena token JWT
- `logoutUser()` - Remove token do AsyncStorage
- `isUserAuthenticated()` - Verifica se está autenticado
- `getStoredToken()` - Obtém token armazenado

### 3. **Arquivos Modificados**

#### `src/services/api.js` - **Interceptor de Token**

Adicionadas:

- `getToken()` - Obtém token do AsyncStorage
- `setToken(token)` - Armazena token
- `removeToken()` - Remove token
- `getHeaders(includeAuth)` - Constrói headers com Authorization Bearer
- Métodos HTTP: `get()`, `post()`, `patch()`, `deleteRequest()`
- Tratamento automático de erro 401 (TOKEN_EXPIRED)

#### `src/services/tarefasService.js` - **CRUD Completo**

Adicionadas:

- `aceitarTarefa(id)` - PATCH para aceitar tarefa
- `editarTarefa(id, dados)` - PATCH genérico
- `deletarTarefa(id)` - DELETE
- `formatarPrioridade(prioridade)` - Converte 1,2,3 → Baixa, Média, Alta
- `getCorPrioridade(prioridade)` - Retorna cor da prioridade
- `mapearTarefas(dados)` - Formata dados da API para o front

#### `src/telas/login/index.js` - **Integração com API**

- Integrado com `loginUser()` do authService
- Loading state durante requisição
- Toast para mensagens de erro
- Limpeza de inputs após login bem-sucedido
- Reset de navegação para evitar voltar ao login

#### `src/telas/home/index.js` - **Aceitar Tarefa + Refresh**

- `fetchTarefas()` - Função reutilizável para carregar tarefas
- `useFocusEffect()` - Recarrega tarefas ao voltar para a tela
- `handleAceitarTarefa()` - Integrado com `aceitarTarefa()`
- Loading individual por tarefa
- Toast para feedback ao usuário
- Uso de `mapearTarefas()` para formatação

## 🔐 Fluxo de Autenticação

```
Login (credenciais)
  ↓
loginUser() (POST /login)
  ↓
Token armazenado em AsyncStorage
  ↓
Interceptor api.js adiciona Authorization Bearer
  ↓
Acesso liberado para rotas autenticadas
  ↓
Se erro 401 → Limpar token + Toast "Sessão expirada"
```

## 🎯 Como Usar

### Login

```javascript
import { loginUser } from "../../services/authService";

const resultado = await loginUser("admin", "senha123");
if (resultado.sucesso) {
  navigation.navigate("Home");
} else {
  showToast(resultado.mensagem, "error");
}
```

### Carregar Tarefas com Refresh

```javascript
import { useFocusEffect } from "@react-navigation/native";
import { getTarefas, mapearTarefas } from "../../services/tarefasService";

useFocusEffect(
  useCallback(() => {
    fetchTarefas();
  }, []),
);
```

### Aceitar Tarefa

```javascript
import { aceitarTarefa } from "../../services/tarefasService";

const resultado = await aceitarTarefa(tarefaId);
if (resultado.sucesso) {
  showToast("Tarefa aceita!", "success");
}
```

### Exibir Toast

```javascript
import { useToast } from "../../utils/toast";

const { showToast } = useToast();

showToast("Erro ao carregar", "error", 3000);
showToast("Sucesso!", "success", 2000);
showToast("Atenção!", "warning", 2500);
```

## 🛠️ Configurações Importantes

### URL da API

Editar em `src/services/api.js`:

```javascript
const API_URL = "http://10.67.23.47:3333"; // Seu IP:porta
```

### Tratamento de Erro 401

Automático! Quando token expira:

- Token é removido do AsyncStorage
- Toast exibe "Sessão expirada"
- Você pode redirecionar para Login

## 📊 Estrutura de Dados

### Formato da API

```javascript
{
  tar_id: 1,
  tar_titulo: "Título",
  tar_descricao: "Descrição",
  tar_prioridade: 3, // 1=Baixa, 2=Média, 3=Alta
  tar_setor_id: 1,
  tar_data_criacao: "2024-05-07T...",
  tar_estimativa_minutos: 30,
  atr_status: 0,
  atr_funcionario_id: null
}
```

### Formato Mapeado (Front)

```javascript
{
  id: 1,
  titulo: "Título",
  descricao: "Descrição",
  prioridade: "Alta", // String
  prioridadeNumero: 3,
  criadoEm: Date,
  setor: "1",
  corredor: "Funcionário 1",
  tempo: "30 min",
  status: 0,
  funcionarioId: null,
  estimativaMinutos: 30,
  dataOriginal: {...} // Dados originais da API
}
```

## 🧪 Testando

### 1. Verificar Token armazenado

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = await AsyncStorage.getItem("authToken");
console.log(token);
```

### 2. Simular erro de conexão

Desativar internet no emulador/dispositivo

### 3. Simular token expirado

- Editar token no AsyncStorage manualmente
- Tentar acessar qualquer rota autenticada

## ⚠️ Checklist Antes de Deploy

- [ ] URL da API correta em `api.js`
- [ ] AsyncStorage instalado e funcionando
- [ ] Testar login com credenciais válidas
- [ ] Testar aceitar tarefa
- [ ] Testar voltar para Home e recarregar
- [ ] Testar erro de conexão
- [ ] Testar token expirado
- [ ] Testar filtros e busca ainda funcionam
- [ ] Testar loading states

## 🚀 Próximas Melhorias (Sugestões)

- [ ] Persistência de filtros com AsyncStorage
- [ ] Sincronização offline com redux/zustand
- [ ] Pull-to-refresh na FlatList
- [ ] Paginação de tarefas
- [ ] Notificações push
- [ ] Tela de perfil com logout
- [ ] Modo escuro
- [ ] Internacionalização (PT-BR, EN)
