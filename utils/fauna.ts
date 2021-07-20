import faunaDB from 'faunadb';
const faunaClient = new faunaDB.Client({ secret: process.env.FAUNADB_SECRET! });
const q = faunaDB.query;

export const saveUrl = async (id: string, longUrl: string) => {
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

export type SnippetType = {
  url: string;
  longUrl: string;
};

export const getUrl = async (id: string) => {
  try {
    const snippet = await faunaClient.query<SnippetType>(
      q.Select(['data'], q.Get(q.Match(q.Index('smallUrl'), id)))
    );
    return snippet;
  } catch (err) {
    console.log(err);
  }
};
