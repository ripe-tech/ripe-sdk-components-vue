const path = require("path");

module.exports = async ({ config, mode }) => {
    config.module.rules.push({
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "../")
    });
    config.module.rules.push({
        test: /\.stories\.jsx?$/,
        use: [require.resolve("@storybook/source-loader")],
        enforce: "pre"
    });
    return config;
};
