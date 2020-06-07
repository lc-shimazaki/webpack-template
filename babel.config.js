module.exports = api => {
    api.cache(true);
    return {
        "presets": [
            [
                "@babel/preset-env", {
                  targets: {
                      ie: "10"
                  },
                  useBuiltIns: "usage",
                  corejs: 3
                }
            ]
        ]
    }
}