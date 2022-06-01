import { navbar } from "vuepress-theme-hope";

export default navbar([
  
  "/home",
  { text: "Guide", icon: "book", link: "/guide/" },
  
  {
    text: "Posts",
    icon: "edit",
    prefix: "/posts/",
    children: [
     "Industrie_Digital.md",
     "OPCUA.md",
      {
        text: "Articles 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "Article 1", icon: "edit", link: "article1" },
          { text: "Article 2", icon: "edit", link: "article2" },
          "article3",
          "article4",
        ],
      },
      {
        text: "Articles 5-12",
        icon: "edit",
        children: [
          {
            text: "Article 5",
            icon: "edit",
            link: "article/article5",
          },
          {
            text: "Article 6",
            icon: "edit",
            link: "article/article6",
          },
          "article/article7",
          "article/article8",
        ],
      },
      { text: "Article 9", icon: "edit", link: "article9" },
      { text: "Article 10", icon: "edit", link: "article10" },
      "article11",
      "article12",
    ],
  },
  {
    text: "Application",
    icon: "tablet-screen-button",
    link: "http://pti03.cle.renault.fr:1810/search",
  },
]);
