import db from '../models/connect';


const RedFlags = {
  getAllRedFlags(req, res) {
    db.query('SELECT * FROM redflags',
      (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        if (result.rows.length === 0) {
          res.json({
            message: 'It is empty over here',
          });
        }
        return res.json({
          data: result.rows,
        });
      });
  },

  getSingleRedFlag(req, res) {
    const id = Number(req.params.id);

    db.query(`SELECT * FROM redflags WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'red-flag record not found',
          });
        }
        return res.json({
          status: 200,
          data: result.rows,
        });
      });
  },

  async createRedFlag(req, res) {
    const text = `INSERT INTO redflags(createdOn, createdBy,type, location, status,images, comment)
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`;

    const values = [
      req.body.createdOn,
      req.body.createdBy,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.comment,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        data: [{
          id: rows[0].id,
          redFlag: rows[0],
          message: 'Created red-flag record',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },

  async editLocation(req, res) {
    const id = Number(req.params.id);
    try {
      const { rows } = await db.query(`UPDATE redflags 
    SET location = $1 WHERE id = $2 returning *`, [req.body.location, id]);
      return res.status(200).send({
        data: [{
          id,
          redFlag: rows[0],
          message: 'Updated red-flag record\'s location',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  },

  async editComment(req, res) {
    const id = Number(req.params.id);
    try {
      const { rows } = await db.query(`UPDATE redflags 
    SET comment = $1 WHERE id = $2 returning *`, [req.body.comment, id]);
      return res.status(200).send({
        data: [{
          id,
          redFlag: rows[0],
          message: 'Updated red-flag record\'s comment',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },

  async deleteRedFlag(req, res) {
    const id = Number(req.params.id);
    try {
      const { rows } = await db.query(`DELETE FROM redflags 
    WHERE id = $1`, [id]);
      return res.json({
        data: [{
          id,
          redFlag: rows[0],
          message: 'red-flag record has been deleted',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },
};

export default RedFlags;
