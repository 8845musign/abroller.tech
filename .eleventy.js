const dayjs = require('dayjs')
require('dayjs/locale/ja')

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/assets');

  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.addNunjucksFilter("dateJp", (value) => {
    return dayjs(value).format('YYYY/MM/DD')
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
};