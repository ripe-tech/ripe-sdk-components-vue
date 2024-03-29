const path = require("path");
const webpack = require("webpack");
const vueLoader = require("vue-loader");

const VueLoaderPlugin = vueLoader.VueLoaderPlugin;

const info = require("./package.json");

const banner = [
    "ripe-sdk-components-vue v" + info.version,
    "(c) 2010-" + new Date().getFullYear() + " " + info.author,
    info.homepage
].join("\n");

module.exports = {
    entry: "./index.js",
    target: process.env.WP_TARGET || "web",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "ripe-sdk-components-vue.min.js?[fullhash]",
        library: "RipeSdkComponentsVue",
        libraryTarget: "umd",
        publicPath: "/"
    },
    plugins: [new VueLoaderPlugin({}), new webpack.BannerPlugin(banner)],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        js: "babel-loader",
                        scss: "vue-style-loader!css-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
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
                                              }
                                          }
                                      ]
                                    : "@babel/preset-env"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                type: "asset/resource",
                generator: {
                    filename: () => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name][ext]?[hash]";
                        }
                        return "[contenthash][ext]";
                    }
                }
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            },
            {
                test: /\.svga$/,
                type: "asset/inline",
                generator: {
                    dataUrl: {
                        mimetype: "image/svg+xml"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        alias: {
            base$: "../../../js",
            vue$: "vue/dist/vue.esm.js",
            process: "process/browser"
        },
        fallback: {
            fs: false,
            http: false,
            https: false,
            path: false
        }
    },
    externals: {
        vue: "vue"
    },
    performance: {
        hints: false
    },
    devtool: "inline-source-map"
};
