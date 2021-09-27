const pool = require("./db_connection");

const getPastes = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM pastes ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
}

const createPaste = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, content } = body;
    pool.query('INSERT INTO pastes (title, content) VALUES ($1, $2) RETURNING *', [title, content], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`A new paste has been added with title: ${title}`);
    });
  });
}

const selectAPaste = (pasteId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(pasteId);
    pool.query('SELECT * FROM pastes WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows[0]);
    });
  });
}
  
const deletePaste = (pasteId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(pasteId);
    pool.query('DELETE FROM pastes WHERE id = $1', [id], (error, results) => {
    if (error) {
      reject(error);
    }
    resolve(`Paste deleted with ID: ${id}`);
    });
  });
}

module.exports = {
    getPastes,
    createPaste,
    selectAPaste,
    deletePaste,
};