import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.png" sizes='96x96' type="image/png" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}