console.log(123)

// 先配置我们要引入的模块路径
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "parabola": "parabola",
        "banner": "banner"
    },
    shim: {
        "jquery-cookie": ["jquery"],
        "parabola": {
            exports: "_",
        }
    }
})

// 使用轮播图模块，实现轮播图效果
require(["banner"], function (banner) {
    banner.handleClick();
})