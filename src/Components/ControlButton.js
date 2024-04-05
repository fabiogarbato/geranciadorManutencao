class StateManager {
    constructor(apiBaseUrl) {
      this.apiBaseUrl = apiBaseUrl;
      this.mudancasPendentes = {};
    }
  
    verificarMudancas(dados, dadosOriginais) {
      return dados.some((dado, index) => {
        const original = dadosOriginais[index];
        return dado.id === original.id && JSON.stringify(dado) !== JSON.stringify(original);
      });
    }
  
    setMudanca(id, novoValor) {
      this.mudancasPendentes[id] = novoValor;
    }
  
    async salvarMudancas() {
      const promises = Object.entries(this.mudancasPendentes).map(async ([id, valor]) => {
        const response = await fetch(`${this.apiBaseUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(valor),
        });
        if (!response.ok) {
          throw new Error(`Falha ao atualizar o registro com id ${id}`);
        }
        return response.json();
      });
  
      try {
        await Promise.all(promises);
        this.mudancasPendentes = {};
      } catch (error) {
        console.error('Erro ao salvar mudanças:', error);
      }
    }
  
    reverterMudancas(dados, setDados, dadosOriginais) {
      const novosDados = dados.map((dado) => {
        if (this.mudancasPendentes.hasOwnProperty(dado.id)) {
          return { ...dadosOriginais.find(d => d.id === dado.id) };
        }
        return dado;
      });
      setDados(novosDados);
      this.mudancasPendentes = {};
    }
  }
  
  module.exports = StateManager;
  