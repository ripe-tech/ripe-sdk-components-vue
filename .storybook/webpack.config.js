const path = require("path");

module.exports = {
    webpackFinal: (config) => {
        config.module.rules.push({
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
            include: path.resolve(__dirname, "../")
        });
        config.module.rules.push({
            test: /\.stories\.jsx?$/,
            loaders: [require.resolve("@storybook/source-loader")],
            enforce: "pre"
        });
        return config;
    }
};
