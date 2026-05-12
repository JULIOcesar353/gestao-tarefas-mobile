# 🔧 Instruções para Integração Completa - Aceitar Tarefa

## ⚠️ O que foi alterado

### Backend

1. **Novo endpoint**: `POST /tarefas/:id/aceitar`
2. Veja o arquivo `NOVO_ENDPOINT_ACEITAR_TAREFA.js` para o código completo

### Frontend

1. `src/services/tarefasService.js`:
   - `aceitarTarefa()` agora usa o novo endpoint
   - Espera `funcionario_id` no body

2. `src/telas/home/index.js`:
   - `handleAceitarTarefa()` passa ID do funcionário

## ✅ Passos para completar a integração

### 1. Backend - Adicionar o novo endpoint

No seu arquivo de rotas (ex: `routes/tarefas.js`):

```javascript
router.post("/tarefas/:id/aceitar", TarefasController.aceitarTarefa);
```

No seu `TarefasController`, adicione o método do arquivo `NOVO_ENDPOINT_ACEITAR_TAREFA.js`

### 2. Backend - Verificar imports

Certifique-se que tem acesso a `db`:

```javascript
const db = require("../dataBase/connection");
```

### 3. Frontend - Usar ID do funcionário logado

**Atualmente**: o código usa ID fixo `1`

**Para melhorar**, você precisa:

#### Opção A: Armazenar ID do funcionário no login

Em `src/services/authService.js`, após login bem-sucedido:

```javascript
export async function setFuncionarioId(funcionarioId) {
  try {
    await AsyncStorage.setItem("funcionarioId", String(funcionarioId));
  } catch (error) {
    console.error("Erro ao armazenar funcionario_id:", error);
  }
}

export async function getFuncionarioId() {
  try {
    const id = await AsyncStorage.getItem("funcionarioId");
    return id ? parseInt(id) : 1;
  } catch (error) {
    console.error("Erro ao obter funcionario_id:", error);
    return 1;
  }
}
```

Depois, no seu endpoint `/login` do backend, retorne o `funcionario_id`:

```javascript
{
  sucesso: true,
  token: "...",
  funcionario_id: 5,  // ID do funcionário logado
  mensagem: "Login realizado com sucesso"
}
```

Em `src/services/authService.js`, no `loginUser()`:

```javascript
if (foiBemSucedido) {
  if (token) {
    await setToken(token);
  }

  // Armazenar ID do funcionário
  if (response.funcionario_id) {
    await setFuncionarioId(response.funcionario_id);
  }

  return {
    sucesso: true,
    token: token || "auth_token_backend",
    funcionario_id: response.funcionario_id || 1,
    mensagem: response.mensagem || "Login realizado com sucesso",
  };
}
```

Em `src/telas/home/index.js`:

```javascript
import { getFuncionarioId } from "../../services/authService";

// No componente:
useEffect(() => {
  const carregarFuncionarioId = async () => {
    const id = await getFuncionarioId();
    setFuncionarioId(id);
  };
  carregarFuncionarioId();
}, []);

const handleAceitarTarefa = async (tarefaId) => {
  try {
    // ... resto do código ...
    const resultado = await aceitarTarefa(tarefaId, funcionarioId);
    // ... resto do código ...
  }
};
```

#### Opção B: Usar Context/Redux (mais robusto)

Se tiver múltiplas telas que precisam do `funcionario_id`, crie um Context:

```javascript
// src/context/AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [funcionarioId, setFuncionarioId] = useState(1);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ funcionarioId, setFuncionarioId, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

Depois use em qualquer componente:

```javascript
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { funcionarioId } = useContext(AuthContext);

  // ... usar funcionarioId ...
}
```

## 🧪 Testando

1. No Postman, faça uma requisição:

```
POST http://10.67.23.47:3333/tarefas/1/aceitar
Body: {
  "funcionario_id": 5
}
```

2. Espere resposta de sucesso do novo endpoint

3. Teste no app clicando em "Aceitar" em uma tarefa

## 📋 Checklist

- [ ] Adicionou o novo método `aceitarTarefa()` no backend
- [ ] Adicionou a rota `POST /tarefas/:id/aceitar` no router
- [ ] Testou com Postman
- [ ] Frontend chama o novo endpoint
- [ ] ID do funcionário sendo passado corretamente
- [ ] Tarefa é aceita e lista recarrega
- [ ] Implementou armazenamento de `funcionario_id` após login

## ❓ Dúvidas?

Se o seu backend `/login` retorna o `funcionario_id`, siga a **Opção A**.
Se não retorna, adicione isso ao seu endpoint de login no backend.
