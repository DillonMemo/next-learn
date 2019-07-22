const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    [
        withSass, {}
    ]
]);

// module.exports = withPlugins([
//     [
//         withCss,
//         {
//             webpack: function (config) {
//                 config.module.rules.push({
//                     test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//                     use: {
//                         loader: "url-loader",
//                         options: {
//                             limit: 100000,
//                             name: "[name].[ext]",
//                         },
//                     },
//                 })
//                 config.node = {
//                     fs: 'empty'
//                 }

//                 // return config
//                 const newConfig = { ...config };
//                 newConfig.plugins = [
//                     ...config.plugins,
//                     new FilterWarningsPlugin({
//                         exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
//                     }),
//                     new Dotenv({  //.envfile..
//                         path: path.join(__dirname, '.env'),
//                         systemvars: true
//                     })
//                 ];
//                 return newConfig;
//             },
//         },
//     ],
//     [
//         withSass,
//         {
//             cssModules: true,
//             cssLoaderOptions: {
//                 importLoaders: 1,
//                 localIdentName: "[local]___[hash:base64:5]",
//             },
//         },
//     ],
//     [
//         withTypescript,
//         {}
//     ]
// ])