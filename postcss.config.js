module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: ["last 2 versions", "ie >= 10", "Android >= 4"]
        })
    ]
}