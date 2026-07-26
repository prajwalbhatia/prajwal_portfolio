Screenshots of real endorsements. Filenames must match the `image` paths in
content/kind-words.ts:

  linkedin-bikash-das.png
  linkedin-hardik-singh.png
  linkedin-saniya-shaikh.png
  linkedin-vishwanath-telsang.png
  linkedin-vinayak-singh.png
  slack-pr-review_1.png
  slack-qa-depth.png
  slack-ownership.png
  slack-ai.png

.jpg works too — change the extension in the content file to match.

An entry whose file is missing here is dropped at build time, so a partial set
renders fine. With none present the page 404s and its nav item disappears.

Nothing in here is generated. If a file appears that you did not put here,
something is wrong.
