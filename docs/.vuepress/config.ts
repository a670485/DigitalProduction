import { defineUserConfig } from "vuepress";
import theme from "./theme";
import { addThisPlugin } from "vuepress-plugin-add-this";

export default defineUserConfig({
  lang: "en-US",
  title: "Digital Production",
  description: "Guide d'integration des outils digitaux sur les lignes de Production",

  base: "/DigitalProduction/",

  head: [
    [
      "script",
      {
        src: "https://kit.fontawesome.com/ca37c296c5.js",
        crossorigin: "anonymous",
      },
    ],
    [
      'link', { rel: 'shortcut icon', href: '/renault_black.png', type: 'image/png' }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ]
  ],
 
  plugins: [addThisPlugin({ pubid: 'ra-626fd01740b5088f' })],
  theme,
});
