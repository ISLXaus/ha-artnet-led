# DMX Patch panel frontend

Lit-based custom panel served by the integration at `/artnet_led_panel/panel.js`.

The bundled `dist/panel.js` is **committed** so HACS installs need no build step.
After changing anything in `src/`, rebuild and commit the bundle:

```sh
npm install
npm run build
```

`npm run watch` rebuilds on save during development.

All colors use Home Assistant theme CSS custom properties so the panel follows
light/dark themes. No external resources are loaded (HA's CSP forbids CDNs);
Lit is vendored into the bundle.
