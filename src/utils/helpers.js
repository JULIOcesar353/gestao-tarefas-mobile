// Funções auxiliares reutilizáveis

/**
 * Formata data em português brasileiro
 * @param {Date|string} data - Data a formatar
 * @returns {string} Ex: "07/05/2024"
 */
export function formatarData(data) {
  if (!data) return "-";
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata hora em português brasileiro
 * @param {Date|string} data - Data a formatar
 * @returns {string} Ex: "14:30"
 */
export function formatarHora(data) {
  if (!data) return "-";
  const d = new Date(data);
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formata data e hora completa
 * @param {Date|string} data - Data a formatar
 * @returns {string} Ex: "07/05/2024 14:30"
 */
export function formatarDataHora(data) {
  if (!data) return "-";
  return `${formatarData(data)} ${formatarHora(data)}`;
}

/**
 * Calcula tempo decorrido de forma legível
 * @param {Date|string} data - Data no passado
 * @returns {string} Ex: "há 2 horas", "há 3 dias"
 */
export function tempoDecorrido(data) {
  if (!data) return "-";

  const agora = new Date();
  const d = new Date(data);
  const diferenca = agora - d;

  const minutos = Math.floor(diferenca / 60000);
  const horas = Math.floor(diferenca / 3600000);
  const dias = Math.floor(diferenca / 86400000);
  const semanas = Math.floor(diferenca / 604800000);
  const meses = Math.floor(diferenca / 2592000000);

  if (minutos < 1) return "agora mesmo";
  if (minutos < 60) return `há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  if (horas < 24) return `há ${horas} hora${horas > 1 ? "s" : ""}`;
  if (dias < 7) return `há ${dias} dia${dias > 1 ? "s" : ""}`;
  if (semanas < 4) return `há ${semanas} semana${semanas > 1 ? "s" : ""}`;
  if (meses < 12) return `há ${meses} mês${meses > 1 ? "es" : ""}`;

  return formatarData(data);
}

/**
 * Trunca texto e adiciona "..."
 * @param {string} texto - Texto a truncar
 * @param {number} limite - Limite de caracteres
 * @returns {string}
 */
export function truncarTexto(texto, limite = 100) {
  if (!texto || texto.length <= limite) return texto;
  return texto.substring(0, limite) + "...";
}

/**
 * Capitaliza primeira letra
 * @param {string} texto
 * @returns {string}
 */
export function capitalize(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Remove acentos de texto
 * @param {string} texto
 * @returns {string}
 */
export function removerAcentos(texto) {
  if (!texto) return "";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Valida email
 * @param {string} email
 * @returns {boolean}
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida CPF (formato básico)
 * @param {string} cpf
 * @returns {boolean}
 */
export function validarCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

/**
 * Formata CPF para a máscara 000.000.000-00
 * @param {string} cpf - CPF sem formatação
 * @returns {string}
 */
export function formatarCPF(cpf) {
  if (!cpf) return "";
  const apenas = cpf.replace(/\D/g, "");
  return apenas
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

/**
 * Formata telefone para a máscara (00) 0000-0000 ou (00) 99999-9999
 * @param {string} telefone - Telefone sem formatação
 * @returns {string}
 */
export function formatarTelefone(telefone) {
  if (!telefone) return "";
  const apenas = telefone.replace(/\D/g, "");

  if (apenas.length === 10) {
    return apenas
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else if (apenas.length === 11) {
    return apenas
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  return telefone;
}

/**
 * Formata moeda brasileira
 * @param {number} valor - Valor em reais
 * @returns {string} Ex: "R$ 1.234,56"
 */
export function formatarMoeda(valor) {
  if (!valor && valor !== 0) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

/**
 * Formata número com separador de milhar
 * @param {number} numero
 * @returns {string}
 */
export function formatarNumero(numero) {
  if (!numero && numero !== 0) return "0";
  return new Intl.NumberFormat("pt-BR").format(numero);
}

/**
 * Valida campos de um formulário
 * @param {Object} campos - Objeto com valores dos campos
 * @param {Object} regras - Regras de validação
 * @returns {Object} Objeto com erros (vazio se válido)
 */
export function validarCampos(campos, regras) {
  const erros = {};

  Object.keys(regras).forEach((campo) => {
    const valor = campos[campo];
    const regra = regras[campo];

    // Validar obrigatório
    if (regra.obrigatorio && (!valor || String(valor).trim() === "")) {
      erros[campo] = regra.mensagemObrigatorio || "Campo obrigatório";
      return;
    }

    // Se não obrigatório e vazio, pular outras validações
    if (!valor) return;

    // Validar tamanho mínimo
    if (regra.minLength && String(valor).length < regra.minLength) {
      erros[campo] = `Mínimo ${regra.minLength} caracteres`;
    }

    // Validar tamanho máximo
    if (regra.maxLength && String(valor).length > regra.maxLength) {
      erros[campo] = `Máximo ${regra.maxLength} caracteres`;
    }

    // Validar padrão (regex)
    if (regra.padrao && !regra.padrao.test(String(valor))) {
      erros[campo] = regra.mensagem || "Formato inválido";
    }

    // Validar função customizada
    if (regra.validador && !regra.validador(valor)) {
      erros[campo] = regra.mensagem || "Campo inválido";
    }
  });

  return erros;
}

/**
 * Debounce function
 * @param {Function} funcao - Função a executar
 * @param {number} delay - Delay em ms
 * @returns {Function}
 */
export function debounce(funcao, delay = 500) {
  let timeout;

  return function executar(...args) {
    const depois = () => {
      clearTimeout(timeout);
      funcao(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(depois, delay);
  };
}

/**
 * Throttle function
 * @param {Function} funcao - Função a executar
 * @param {number} limite - Limite em ms
 * @returns {Function}
 */
export function throttle(funcao, limite = 1000) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      funcao.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limite);
    }
  };
}

/**
 * Aguarda um tempo específico
 * @param {number} ms - Milissegundos
 * @returns {Promise}
 */
export function aguardar(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Executa com retry
 * @param {Function} funcao - Função a executar
 * @param {number} tentativas - Número de tentativas
 * @param {number} delay - Delay entre tentativas
 * @returns {Promise}
 */
export async function comRetry(funcao, tentativas = 3, delay = 1000) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await funcao();
    } catch (erro) {
      if (i === tentativas - 1) {
        throw erro;
      }
      await aguardar(delay);
    }
  }
}

/**
 * Clona objeto profundamente
 * @param {Object} obj
 * @returns {Object}
 */
export function clonarObjeto(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Mescla dois objetos
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object}
 */
export function mesclarObjetos(obj1, obj2) {
  return {
    ...obj1,
    ...obj2,
  };
}

/**
 * Remove duplicatas de array
 * @param {Array} array
 * @param {string} chave - Propriedade para comparação (opcional)
 * @returns {Array}
 */
export function removerDuplicatas(array, chave = null) {
  if (chave) {
    const vistas = new Set();
    return array.filter((item) => {
      const valor = item[chave];
      if (vistas.has(valor)) return false;
      vistas.add(valor);
      return true;
    });
  }

  return [...new Set(array)];
}

/**
 * Ordena array de objetos
 * @param {Array} array
 * @param {string} chave - Propriedade a ordenar
 * @param {string} ordem - "asc" ou "desc"
 * @returns {Array}
 */
export function ordenar(array, chave, ordem = "asc") {
  return [...array].sort((a, b) => {
    const aVal = a[chave];
    const bVal = b[chave];

    if (aVal < bVal) return ordem === "asc" ? -1 : 1;
    if (aVal > bVal) return ordem === "asc" ? 1 : -1;
    return 0;
  });
}
