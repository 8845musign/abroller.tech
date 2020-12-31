const dayjs = require('dayjs')
require('dayjs/locale/ja')
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true
}).use(markdownItAnchor, {
  permalink: true,
  permalinkSymbol: "#"
})

module.exports = (eleventyConfig) => {
  eleventyConfig.addCollection("tagList", require("./src/_11ty/getTagList"));

  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.addPassthroughCopy('src/admin');

  eleventyConfig.addNunjucksFilter("dateJp", (value) => {
    return dayjs(value).format('YYYY/MM/DD')
  });

  eleventyConfig.addNunjucksFilter("datetimeDate", (value) => {
    return dayjs(value).format('YYYY-MM-DD')
  });

  eleventyConfig.setLibrary("md", markdownLib)


  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
};