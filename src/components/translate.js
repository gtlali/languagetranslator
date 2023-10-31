import React, { useEffect, useState } from "react";
import axios from "axios";

function Translate({ language, text }) {
  const [translated] = useTranslation(text, language);

  return (
    <div className='translate'>
      <label className='label'>Output</label>
      <h1 className='title'>{translated.replace("&#39;", "'")}</h1>
    </div>
  );
}

const useTranslation = (text, language) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    console.log(translated);
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken, setTranslated);
    console.log("Translated--Text", setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return [translated];
};

const debounce = (fn) => {
  let id = null;

  return (...args) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
      id = null;
    }, 300);
  };
};

const doTranslation = debounce(
  async (input, languageCode, cancelToken, callback) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/translate",
        {
          q: input,
          source: "en",
          target: languageCode,
          format: "text",
          api_key: "",
        }
        //  { cancelToken: cancelToken.token }
      );
      const res = data.translatedText;

      console.log(res);
      callback(res);
    } catch (err) {
      callback("");
    }
  }
);

export default Translate;

/* 
const res = await fetch("https://libretranslate.com/translate", {
  method: "POST",
  body: JSON.stringify({
    q: '<p class="green">Hello!</p>',
    source: "en",
    target: "es",
    format: "html"
  }),
  headers: { "Content-Type": "application/json" }
});

console.log(await res.json());
*/
