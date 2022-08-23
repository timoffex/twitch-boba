# Boba Milk Tea extension for Twitch

## Development

I'm using `npm` as the package manager and build system with `webpack`
to compile and package everything into the final HTML/CSS/JS files.

To test, use Twitch's "Developer Rig", or run the generated HTML file
directly (if not relying on any Twitch APIs).

* `npm run build` creates the `dist` directory; you can just run the HTML
  file from there directly
* `npm install <package> --save-dev` adds a "dev" dependency, which is
  necessary when updating the [webpack configuration](./webpack.config.js)

Currently I don't have any non-dev dependencies, meaning no additional
code is packaged with the extension.

## Structure

The entry point to the program is [index.ts](./src/index.ts), which is
also a great place to start reading to understand how everything fits
together.

Currently, the entire extension is rendered on an HTML canvas.
