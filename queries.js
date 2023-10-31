const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.ffufxipltnzxplzfshsn.supabase.co',
  database: 'postgres',
  password: 'ev-s18Cdn5NIFSU6ck0yN86IE4ZbD6eX',
  port: 5432,
})

const getCurriculo = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurriculoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCurriculo = (request, response) => {
  const { Nome, Email, Contato, Experiências } = request.body

  pool.query('INSERT INTO curriculo (Nome,  Email, Contato, Experiências) VALUES ($1, $2, $3, $4, )', [Nome,  Email, Contato, Experiências], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id)
  const { Nome,  Email, Contato, Experiências } = request.body

  pool.query(
    'UPDATE curriculo SET Nome = $1, Email = $2, Contato = $3 Experiências = $4',
    [Nome,  Email, Contato, Experiências, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCurriculo,
  getCurriculoById,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
}