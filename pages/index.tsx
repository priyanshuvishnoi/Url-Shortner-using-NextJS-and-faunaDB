import Head from 'next/head';
import { useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex =
      '((http|https)://)(www.)?' +
      '[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]' +
      '{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';

    if (longUrl.match(regex) !== null) {
      try {
        const res = await axios.post('/api/shortenUrl', { url: longUrl });
        console.log(res);
        setShortUrl(res.data.url);
        setLongUrl('');
        setCopied(false);
      } catch (e) {
        console.error(e);
      }
    } else alert('Enter a valid Url');
  };

  const copyHandler = (e: MouseEvent<HTMLDivElement>) => {
    const text = document.getElementById('shortUrl')!.innerHTML;
    console.log(text);
    const elem = document.createElement('textarea');
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    setCopied(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Url Shortner</title>
        <meta name="description" content="Generate tiny urls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading}>Make LARGE Urls tiny</h1>

        <form className={styles.form} onSubmit={formHandler}>
          <input
            type="text"
            placeholder="Paste Long URL Here"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
          />
          <button type="submit">Shorten</button>
        </form>
        {shortUrl !== '' ? (
          <div className={styles.shortUrlBox} onClick={copyHandler}>
            <p>
              Short Url <br /> &darr;
            </p>
            <p className={styles.shortUrl} id="shortUrl">
              {shortUrl}
            </p>
            {copied ? <p>Copied &#10003;</p> : <p>Click here to Copy</p>}
          </div>
        ) : null}
      </main>
    </div>
  );
}
