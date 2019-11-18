import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head >
            <link
                rel="stylesheet"
                key="bootstrap-css"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
                crossOrigin="anonymous"
            />
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                key="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
            <link
                rel="stylesheet"
                key="font"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous" />

            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                    integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                    crossOrigin="anonymous" />
            <script key="font-awesome" src="https://kit.fontawesome.com/fcd180d5f8.js" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style>
            {`
                .primary{
                    color: #2560A4
                }

                p{
                  font-size: 12px;
                  font-weight: 500
                }

                @media screen and (max-width: 767px) and (min-width: 320px){
                  .container{
                    width: 100vw;
                    min-width: 100vw;
                    max-width: 100vw;
                  }
                }

                .form-control{
                  border-radius: 0
                }
            `}
        </style>
      </Html>
    )
  }
}

export default MyDocument