import db from '../models/connect';


const Interventions = {
  getAllInterventions(req, res) {
    db.query('SELECT * FROM interventions',
      (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        if (result.rows.length === 0) {
          return res.json({
            message: 'It is empty over here!',
          });
        }
        return res.json({
          status: 200,
          data: result.rows,
        });
      });
  },

  getSingleIntervention(req, res) {
    const id = Number(req.params.id);

    db.query(`SELECT * FROM interventions WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          return console.error('error running query', err);
        }
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'intervention record not found',
          });
        }
        return res.json({
          status: 200,
          data: result.rows,
        });
      });
  },

  async createIntervention(req, res) {
    const text = `INSERT INTO interventions(createdOn, createdBy,type, location, status,images, videos, comment)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;

    const values = [
      req.body.createdOn,
      req.body.createdBy,
      req.body.type,
      req.body.location,
      req.body.status,
      req.body.images,
      req.body.videos,
      req.body.comment,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        data: [{
          id: rows[0].id,
          intervention: rows[0],
          message: 'Created intervention record',
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
      const { rows } = await db.query(`UPDATE interventions 
    SET location = $1 WHERE id = $2 returning *`, [req.body.location, id]);
      return res.status(200).send({
        status: 200,
        data: [{
          id,
          intervention: rows[0],
          message: 'Updated intervention record\'s location',
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
      const { rows } = await db.query(`UPDATE interventions 
    SET comment = $1 WHERE id = $2 returning *`, [req.body.comment, id]);
      return res.status(200).send({
        data: [{
          id,
          intervention: rows[0],
          message: 'Updated intervention record\'s comment',
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  },

  async deleteIntervention(req, res) {
    const id = Number(req.params.id);
    try {
      const { rows } = await db.query(`DELETE FROM interventions 
    WHERE id = $1`, [id]);
      return res.json({
        status: 200,
        data: [{
          id,
          intervention: rows[0],
          message: 'intervention record has been deleted',
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

export default Interventions;
