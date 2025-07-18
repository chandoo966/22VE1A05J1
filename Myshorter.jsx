import React, { useState } from 'react';

const Shorts = () => {
  const [link, setLink] = useState('https://en.wikipedia.org/wiki/Main_page');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [links,setLinks]=useState("https://en.wikipedia.org/wiki/Main_page")
  const fetchTinyURL = async () => {
    try {
      const response = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`
      );

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const short = await response.text(); 
      return short;
    } catch (err) {
      console.error('TinyURL Error:', err);
      throw err;
    }
  };

  const handleChange = (e) => {
    setLink(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!link.trim()) {
      setError('Please enter a valid URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setShortUrl('');

    try {
      const short = await fetchTinyURL(link);
      setShortUrl(short);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor:"violet" }}>
      <h2>FAST AND SHORT URL SHORTENER 🔗</h2>

      <input
        type="text"
        value={link}
        onChange={handleChange}
        placeholder="Enter a URL to shorten"
        style={{ width: '60%', marginRight: '10px' }}
      />
      
      <button onClick={handleButtonClick}>Generate</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  );
};

export default Shorts;
