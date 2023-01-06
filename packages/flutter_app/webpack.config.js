const path = require("path");
const HTMLWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry:{
        main:"./main.dart.js"
    },
    output:{
        path:path.resolve(__dirname,'./web/'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                use:[
                    {
                        loader: "html-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    plugins:[
        new HTMLWebPackPlugin({
            template:"./index.html",
            source:"./index.html"
        }),
    ]
}