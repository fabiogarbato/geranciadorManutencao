const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express(); 
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'gbt101',
  database: 'manutencaoCarro',
  port: 5432,
  ssl: false 
});

/*---------------------------------------*/
/*              Login                    */
/*---------------------------------------*/

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario && !senha) {
      return res.status(400).json({ message: "Preencha usuário e senha!" });
    }
  
    try {
      const usuarioResult = await pool.query(
          "SELECT * FROM Usuarios WHERE usuario = $1",
          [usuario]
      );

      if (usuarioResult.rows.length === 0) {
          return res.status(401).json({ message: "Usuário inválido!" });
      }

      const loginResult = await pool.query(
          "SELECT * FROM Usuarios WHERE usuario = $1 AND senha = crypt($2, senha)",
          [usuario, senha]
      );

      if (loginResult.rows.length > 0) {
          res.json({ message: "Usuário autenticado com sucesso!", usuario: loginResult.rows[0] });
      } else {
          res.status(401).json({ message: "Senha inválida!" });
      }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Erro ao autenticar o usuário" });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
