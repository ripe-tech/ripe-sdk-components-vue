const config = require("./webpack.config");

// remove babel-loader rule and replace it with one that includes
// the regeneratorRuntime
config.module.rules = config.module.rules.filter(rule => String(rule.test) !== String(/\.js$/));
config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules\/(?!ripe-sdk)/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: [
                    process.env.NODE_ENV === "development"
                        ? [
                              "@babel/preset-env",
                              {
                                  targets: {
                                      browsers: ["last 2 years"]
                                  },
                                  useBuiltIns: "entry",
                                  corejs: "3"
                              }
                          ]
                        : "@babel/preset-env"
                ],
                plugins: [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            regenerator: true
                        }
                    ]
                ]
            }
        },
        {
            loader: "eslint-loader"
        }
    ]
});

module.exports = {
    styleguideDir: "dist/styleguide",
    webpackConfig: Object.assign({}, config, {
        externals: {}
    }),
    sections: [
        {
            name: "Introduction",
            content: "./README.md"
        },
        {
            name: "Components",
            components: "vue/components/**/*.vue"
        },
        {
            name: "Storybook",
            href: "/storybook"
        }
    ]
};
