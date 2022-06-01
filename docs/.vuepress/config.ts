import { defineUserConfig } from "vuepress";
import theme from "./theme";
import {componentsPlugin} from "vuepress-plugin-components";
//import { addThisPlugin } from "vuepress-plugin-add-this";
import { defaultTheme } from 'vuepress';
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineUserConfig({
  lang: "fr-FR",
  title: "Digital Production",
  description: "Guide d'integration des outils digitaux sur les lignes de Production",

  base: "/",
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
 
  plugins: [
   
    componentsPlugin({
      components:[
        "Badge","PDF"
      ],
      addThis:'ra-626fd01740b5088f',
    })
    ],
  theme,
  /*: defaultTheme({
    navbar: navbar,
  navbarIcon: true,

  // sidebar
  //sidebar: sidebar,


  }),*/
});
