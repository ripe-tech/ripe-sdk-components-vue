module.exports = {
    webpackConfig: Object.assign({}, require("./webpack.config"), {
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
