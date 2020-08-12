const { resolve } = require("path");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const babelOptions = {
    presets: [
        [
            "@babel/preset-env",
            {
                modules: false,
                targets: {
                    node: 12,
                },
                useBuiltIns: "usage",
                corejs: "3.12",
                debug: true,
            },
        ],
        ["@babel/preset-typescript"],
    ],
};

/** @type {import("webpack").RuleSetRule} */
const tsRule = {
    test: /\.tsx?$/,
    use: [
        {
            loader: "babel-loader",
            options: babelOptions,
        },
    ],
    exclude: /mode_modules/,
};

/** @returns {import("webpack").Configuration} */
module.exports = (_env, args) => {
    const isProduction = args.mode === "production" || process.env.NODE_ENV === "production";
    return {
        mode: isProduction ? "production" : "development",
        entry: {
            lib: resolve(__dirname, "./src/index.ts"),
        },
        devtool: isProduction ? "hidden-source-map" : "source-map",
        output: {
            filename: "[name].js",
            path: resolve(__dirname, "./dist"),
        },
        module: {
            rules: [tsRule],
        },
        resolve: {
            plugins: [
                new TsconfigPathsPlugin(),
            ],
            extensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
        },
        target: "node",
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserPlugin(),
            ],
        },
    };
};
