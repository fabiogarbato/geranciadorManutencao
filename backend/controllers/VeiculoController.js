const Veiculo = require('../models/Veiculo');

const DEBUG = false; 

class VeiculoController {
  async create(req, res) {
    try {
      const veiculo = await Veiculo.create(req.body);
      if (DEBUG) console.log('Veículo criado:', veiculo);
      return res.status(201).send(veiculo);
    } catch (error) {
      if (DEBUG) console.error('Erro ao criar veículo:', error);
      return res.status(400).send(error);
    }
  }

  async getAll(req, res) {
    try {
      const veiculos = await Veiculo.findAll();
      if (DEBUG) console.log('Todos os veículos:', veiculos);
      return res.status(200).send(veiculos);
    } catch (error) {
      if (DEBUG) console.error('Erro ao buscar veículos:', error);
      return res.status(400).send(error);
    }
  }

  async getOne(req, res) {
    try {
      const veiculo = await Veiculo.findByPk(req.params.id);
      if (DEBUG) console.log(`Veículo com ID ${req.params.id}:`, veiculo);
      return res.status(200).send(veiculo);
    } catch (error) {
      if (DEBUG) console.error(`Erro ao buscar veículo com ID ${req.params.id}:`, error);
      return res.status(400).send(error);
    }
  }

  async update(req, res) {
    try {
      const veiculo = await Veiculo.findByPk(req.params.id);
      if (veiculo) {
        await veiculo.update(req.body);
        if (DEBUG) console.log(`Veículo com ID ${req.params.id} atualizado:`, veiculo);
        return res.status(200).send(veiculo);
      }
      return res.status(404).send({ message: 'Veículo não encontrado.' });
    } catch (error) {
      if (DEBUG) console.error(`Erro ao atualizar veículo com ID ${req.params.id}:`, error);
      return res.status(400).send(error);
    }
  }

  async delete(req, res) {
    try {
      const veiculo = await Veiculo.findByPk(req.params.id);
      if (veiculo) {
        await veiculo.destroy();
        if (DEBUG) console.log(`Veículo com ID ${req.params.id} excluído.`);
        return res.status(200).send({ message: 'Veículo excluído com sucesso.' });
      }
      return res.status(404).send({ message: 'Veículo não encontrado.' });
    } catch (error) {
      if (DEBUG) console.error(`Erro ao excluir veículo com ID ${req.params.id}:`, error);
      return res.status(400).send(error);
    }
  }
}

module.exports = VeiculoController;