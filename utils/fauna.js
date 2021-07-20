const faunaDB = require('faunadb');
const faunaClient = new faunaDB.Client({ secret: process.env.FAUNADB_SECRET });
const q = faunaDB.query;

const saveUrl = async (id, longUrl) => {
  try {
    return await faunaClient.query(
      q.Create(q.Collection('urls'), {
        data: { smallUrl: id, longUrl },
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const getUrl = async id => {
  try {
    const snippet = await faunaClient.query(
      q.Select(['data'], q.Get(q.Match(q.Index('smallUrl'), id)))
    );
    return snippet;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  saveUrl,
  getUrl,
};
