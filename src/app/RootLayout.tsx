"use client"
import { useEffect } from 'react';
import './globals.css'; // Import any global styles you need

function Chatbot({ Component, pageProps }) {
  useEffect(() => {
    // Tawk.to script
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/673f272c2480f5b4f5a1c1ec/1id7b224d";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return <Component {...pageProps} />;
}

export default Chatbot;
