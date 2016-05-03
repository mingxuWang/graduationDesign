define(function(){
    var tpl = {
        main: [
            '<div class="header">',
                '<a class="act-back">返回</a>',
                '<p>爆料好价</p>',
                '<a class="act-submit">提交</a>',
            '</div>',
        ].join(''),
        body: [
            '<div class="from-main">',
                '<ul>',
                    '<li>',
                        '<p class="title">商品标题</p>',
                        '<input type="text" id="commoidity-title" placeholder="请输入商品标题">',
                    '</li>',
                    '<li>',
                        '<p class="title">商品名称</p>',
                        '<input type="text" id="commoidity-name" placeholder="请输入商品名称">',
                    '</li>',
                    '<li class="commoidity-url">',
                        '<p class="title">商品链接</p>',
                        '<textarea type="text" id="commoidity-url" placeholder="商品链接"></textarea>',
                    '</li>',
                    '<li>',
                        '<p class="title">实付价格</p>',
                        '<input type="text" id="commoidity-price" placeholder="请输入实付价格">',
                    '</li>',

                    '<li>',
                        '<p class="title">推荐理由</p>',
                        '<textarea id="commoidity-reason" placeholder="详尽的推荐理由更容易获得通过"></textarea>',
                    '</li>',
                '</ul>',
            '</div>',
        ].join(''),
    };
    return tpl;
});