import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
 
  //backToTop:true,
  hostname: "http://pti03.cle.renault.fr/",
  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    //green: "#3eaf7c",
    orange: "#fb9b5f",
    violet:"#ce24f9"
  },
  darkmode:"switch",
  fullscreen: true,
  author: {
    name: "Dugauquier Julien",
    url: "http://pti03.cle.renault.fr:1810/search",
  },
  repo:"a670485/DigitalProduction/",
  docsRepo:"a670485/DigitalProduction/",
  docsBranch:'main',
  docsDir:'docs',
  //iconPrefix: "fa fa-",
  iconAssets:'font-awesome',
  logoDark: "/renault_white.png",
  logo: "/renault_black.png",
  breadcrumb:true,
  //repo: "vuepress-theme-hope/vuepress-theme-hope",

  //docsDir: "demo/src",

  // navbar
  navbar: navbar,
  navbarIcon: true,

  // sidebar
  sidebar: sidebar,

  // Footer
  copyright: false,
  footer:"Copyright © 2022 Dugauquier Julien",
  displayFooter: true,
  lastUpdated:true,
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
 
  blog: {
    description: "Développeur Digital",
    intro: "/intro.html",
    roundAvatar: true,
    avatar:"/avatar.jpg",
    medias: {
      Email: "mailto:julien.dugauquier@renault.com",
      GitHub: "https://github.com/a670485",
      Linkedin: "https://www.linkedin.com/in/julien-dugauquier-a708a2171",
    },
  },

  encrypt: {
    config: {
      "/guide/Configuration/master": ["1234"],
    },
  },
  
  plugins: {
    git: { createdTime:true , updatedTime:true, contributors:true },
    blog:  {
      autoExcerpt: true,
    },
    
    
    copyCode:{},

    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using giscus
       */
      provider: "Giscus",
      repo: "a670485/DigitalProduction",
      repoId: "R_kgDOHQDEig",
      category: "Announcements",
      categoryId: "DIC_kwDOHQDEis4CO1JV",

      /**
       * Using twikoo
       */
      // type: "twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // type: "waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      tasklist: true,
      chart: true,
      flowchart:true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});