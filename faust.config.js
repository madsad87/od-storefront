module.exports = {
  experimentalToolbar: false,
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WP_URL || "",
  templatesPath: "./src/wp-templates",
};
