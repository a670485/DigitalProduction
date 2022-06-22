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
      "link",{
        rel: "stylesheet",
        href: "/assets/fontawesome-free/css/fontawesome.min.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/assets/fontawesome-free/css/brands.css",
        
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/assets/fontawesome-free/css/solid.css",
      }
    ],
    [
      'link', { rel: 'shortcut icon', href: '/renault_black.png', type: 'image/png' }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/assets/font_2410206_mfj6e1vbwo.css",
      },
    ]
  ],
 
  plugins: [
   
    componentsPlugin({
      components:[
        "Badge","PDF","FontIcon"
      ],
      addThis:'ra-626fd01740b5088f',
      backToTop:100,
      iconPrefix: "fa fa-",
      iconAssets:'font-awesome',
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
