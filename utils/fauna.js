const faunaDB = require('faunadb');
const faunaClient = new faunaDB.Client({ secret: process.env.FAUNADB_SECRET });
const q = faunaDB.query;

const saveUrl = async (id, longUrl) => {
  return await faunaClient.query(
    q.Create(q.Collection('urls'), {
      data: { smallUrl: id, longUrl },
    })
  );
};

const getUrl = async id => {
  const snippet = await faunaClient.query(
    q.Select(['data'], q.Get(q.Match(q.Index('smallUrl'), id)))
  );
  return snippet;
};

module.exports = {
  saveUrl,
  getUrl,
};
