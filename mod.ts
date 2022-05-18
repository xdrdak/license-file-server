import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

const licenses: string[] = [];
for await (const license of Deno.readDir(`./licenses`)) {
  licenses.push(license.name);
}

serve(async function handler(req) {
  // List the posts in the `blog` directory located at the root
  // of the repository.
  const url = new URL(req.url);
  const path = url.pathname;

  if (path === "/" || path === "") {
    return new Response(
      `
    <html>
      <head>
        <style type="text/css" media="all">
          body#manpage {margin:0}
          .mp {max-width:100ex;padding:0 9ex 1ex 4ex}
          .mp p,.mp pre,.mp ul,.mp ol,.mp dl {margin:0 0 20px 0}
          .mp h2 {margin:10px 0 0 0}
          .mp > p,.mp > pre,.mp > ul,.mp > ol,.mp > dl {margin-left:8ex}
          .mp h3 {margin:0 0 0 4ex}
          .mp dt {margin:0;clear:left}
          .mp dt.flush {float:left;width:8ex}
          .mp dd {margin:0 0 0 9ex}
          .mp h1,.mp h2,.mp h3,.mp h4 {clear:left}
          .mp pre {margin-bottom:20px}
          .mp pre+h2,.mp pre+h3 {margin-top:22px}
          .mp h2+pre,.mp h3+pre {margin-top:5px}
          .mp img {display:block;margin:auto}
          .mp h1.man-title {display:none}
          .mp,.mp code,.mp pre,.mp tt,.mp kbd,.mp samp,.mp h3,.mp h4 {font-family:monospace;font-size:14px;line-height:1.42857142857143}
          .mp h2 {font-size:16px;line-height:1.25}
          .mp h1 {font-size:20px;line-height:2}
          .mp {text-align:justify;background:#fff}
          .mp,.mp code,.mp pre,.mp pre code,.mp tt,.mp kbd,.mp samp {color:#131211}
          .mp h1,.mp h2,.mp h3,.mp h4 {color:#030201}
          .mp u {text-decoration:underline}
          .mp code,.mp strong,.mp b {font-weight:bold;color:#131211}
          .mp em,.mp var {font-style:italic;color:#232221;text-decoration:none}
          .mp a,.mp a:link,.mp a:hover,.mp a code,.mp a pre,.mp a tt,.mp a kbd,.mp a samp {color:#0000ff}
          .mp b.man-ref {font-weight:normal;color:#434241}
          .mp pre {padding:0 4ex}
          .mp pre code {font-weight:normal;color:#434241}
          .mp h2+pre,h3+pre {padding-left:0}
          .mp li { margin-bottom: 6px; }
          .mp ol { margin: 0px; }
          ol.man-decor,ol.man-decor li {margin:3px 0 10px 0;padding:0;float:left;width:33%;list-style-type:none;text-transform:uppercase;color:#999;letter-spacing:1px}
          ol.man-decor {width:100%}
          ol.man-decor li.tl {text-align:left}
          ol.man-decor li.tc {text-align:center;letter-spacing:4px}
          ol.man-decor li.tr {text-align:right;float:right}
        </style>
      </head>
      <body>
        <div class="mp">
          <ol class="man-decor man-head man head">
              <li class="tl">licenses.txt</li>
          </ol>
          <h2 id="how-to">HOW TO USE</h2>
          <p>Pick a license and copy and paste it into your project under <code>LICENSE.txt</code>. Don't forget to replace some of the values that are within square braces.</p>
          <p>Alternatively, feel free to just <code>curl</code> the text files.</p>
          <p>If you don't know which to pick and want to go with something permissive, just use <strong>MIT.txt</strong>, <strong>wtfpl.txt</strong> or <strong>unlicense.txt</strong>.</p>
          <p>If you REALLY need help, visit <a href="https://choosealicense.com/" target="_blank">choosealicense.com</a>.</p>
          <h2 id="available-licenses">AVAILABLE LICENSES</h2>
          <p>
            <ul style="margin: 0;">
              ${licenses
                .sort()
                .map(
                  (license) =>
                    `<li><a href="/licenses/${license}">${license}</a></li>`
                )
                .join("")}
            </ul>
          </p>
          <h2 id="other-info">OTHER INFO</h2>
          <p>All licenses were pulled from <a href="https://choosealicense.com/" target="_blank">choosealicense.com</a>.</p>
          <h2 id="see-also">SEE ALSO</h2>
          <p>All licenses were pulled from <a href="https://choosealicense.com/" target="_blank">choosealicense.com</a>.</p>
        </div>
      </body>
    </html>
    `,
      {
        headers: {
          "content-type": "text/html",
        },
      }
    );
  }

  if (path.startsWith("/licenses")) {
    const [, _license, name] = path.split("/");
    try {
      const file = await Deno.readFile(`./licenses/${name}`);
      const licenseTxt = new TextDecoder().decode(file);
      const [, _frontmatter, content] = licenseTxt.split("---");

      return new Response(content.trim(), {
        headers: {
          "content-type": "text/plain",
        },
      });
    } catch (_e) {
      return new Response(null, {
        status: 404,
      });
    }
  }

  return new Response(null, {
    status: 404,
  });
});
