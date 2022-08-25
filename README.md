# Boba Milk Tea extension for Twitch

## Development

I recommend editing with VSCode.

I'm using `npm` as the package manager and build system with `webpack`
to compile and package everything into the final HTML/CSS/JS files.
Since this project involves several different components, I'm using NPM
"workspaces" to manage them: <https://docs.npmjs.com/cli/v8/using-npm/workspaces>.
Essentially this means most commands need a `-w <subfolder>` flag.

To test the [overlay](./overlay/), use Twitch's "Developer Rig", or run the
generated HTML file directly (if not relying on any Twitch APIs). The
[Boba Tea.json](./overlay/Boba%20Tea.json) file is the Developer Rig
configuration, managed by the tool.

* `npm run -w overlay build` creates the `dist` directory
  **in development mode**; you can just run the HTML file from there directly.
  This **cannot be uploaded to Twitch**, it will not work.
* `npm run -w overlay build -- --mode=production` creates the `dist` directory
  in **production** mode. You can combine the files in this directory into a
  single .zip file and upload that to Twitch.
* `npm install -w overlay <package> --save-dev` adds a "dev" dependency, which
  is necessary when updating the [webpack configuration](./overlay/webpack.config.js)

Currently I don't have any non-dev dependencies, meaning no additional
code is packaged with the extension. Supporting this may require updating
the [webpack configuration](./overlay/webpack.config.js).

## Structure

The entry point to the extension is [index.ts](./overlay/src/index.ts), which is
also a great place to start reading to understand how everything fits
together.

Currently, the entire extension is rendered on an HTML canvas.
