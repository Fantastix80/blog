<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <xsl:variable name="footerText" select="/rss/channel/item[1]/rssFooter" />
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="icon" type="image/png" href="/projects/logo.png" />
        <style type="text/css">
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.7;
            margin: 0 auto;
            max-width: 720px;
            padding: 3em 1.5em;
            background-color: #fdfdfd;
            color: #333;
            font-size: 16px;
          }
          h1 {
            font-size: 1.75em;
            margin-bottom: 1em;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.4em;
            font-weight: 500;
            color: #111;
          }
          h1 a {
            color: inherit;
            text-decoration: none;
          }
          h1 a:hover {
             text-decoration: underline;
          }
          p {
            margin: 0.5em 0 2.5em 0;
            color: #555;
            font-size: 1em;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          li {
            background-color: transparent;
            border: none;
            border-radius: 0;
            margin-bottom: 2em;
            padding: 0;
            box-shadow: none;
            border-bottom: 1px dotted #ddd;
            padding-bottom: 1.5em;
          }
          li:last-child {
             border-bottom: none;
             padding-bottom: 0;
             margin-bottom: 0;
          }
          li h2 {
            margin: 0 0 0.3em 0;
            font-size: 1.15em;
            font-weight: 500;
          }
          li h2 a {
            color: #0056b3;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
          }
          li h2 a:hover {
            color: #003d80;
            text-decoration: underline;
          }
          .pubDate {
            color: #777;
            font-size: 0.875em;
            margin-bottom: 0.5em;
            display: block;
          }
          .description {
            color: #444;
            font-size: 0.95em;
          }
          footer {
            margin-top: 4em;
            padding-top: 1em;
            border-top: 1px solid #eee;
            font-size: 0.875em;
            color: #888;
            text-align: center;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <h1><a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/title"/></a></h1>
        <p><xsl:value-of select="/rss/channel/description"/></p>
        <ul>
          <xsl:for-each select="/rss/channel/item">
            <li>
              <h2><a href="{link}" target="_blank"><xsl:value-of select="title"/></a></h2>
              <div class="pubDate">
                <xsl:value-of select="pubDate"/>
              </div>
              <div class="description">
                <xsl:value-of select="description"/>
              </div>
            </li>
          </xsl:for-each>
        </ul>
        <footer>
          <xsl:value-of select="$footerText"/>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
