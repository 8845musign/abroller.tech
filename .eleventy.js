const dayjs = require('dayjs')
require('dayjs/locale/ja')

const cssProcess = require('./cssProcess.js')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/assets');

  cssProcess('./src/assets/style.css', './dist/assets/style.css')

  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.addNunjucksFilter("dateJp", (value) => {
    return dayjs(value).format('YYYY/MM/DD')
  });

  eleventyConfig.addNunjucksFilter("datetimeDate", (value) => {
    return dayjs(value).format('YYYY-MM-DD')
  });


  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
};