module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/_redirects');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
};