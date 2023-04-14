const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === "production" ? `/` : "/",
  devServer: {
    proxy: "",
  },
  transpileDependencies: ["vuetify"],
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "pruebita",
    },
  },
})
