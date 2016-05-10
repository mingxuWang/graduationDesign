define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="publish-form">',
                '</div>',
            '</div>'
        ].join(''),
        'header': [
            '<span class="act-back">⬅︎</span>',
            '<h1>{{title}}</h1>',
            '<div class="btn-publish">发布</div>'
        ].join(''),
        form:[
            '<div class="form-group">',
                '<label for="title" class="label">题目：</label>',
                '<input id="title" type="text" />',
            '</div>',
            '<div class="form-group">',
                '<label for="author" class="label">发布人：</label>',
                '<input id="author" disabled value={{name}} type="name" />',
            '</div>',
            '<div class="form-group">',
                '<label for="date" class="label">时间：</label>',
                '<input id="date" type="text" placeholder="例:5月9日晚8点" />',
            '</div>',
            '<div class="form-group">',
                '<label for="site" class="label">地点：</label>',
                '<input id="site" type="text" placeholder="例:滏阳桥南小广场" />',
            '</div>',
            '<div class="form-group form-type">',
                '<label for="site" class="label">类型：</label>',
                '<div class="item-container">',
                    '{{each list as item index}}',
                        '<div class="check-list">',
                            '<label for={{item.role}} class="tip-label">{{item.show}}</label>',
                            '<input id={{item.role}} class="activity-items" name="activity" value={{item.show}} type="radio" />',
                        '</div>',
                    '{{/each}}',
                '</div>',
            '</div>',
            '<div class="form-group">',
                '<label for="summary" class="label">内容：</label>',
                  '<textarea name="summary" id="summary" class="form-control" rows="5">',
                  '</textarea>',
            '</div>',
        ].join('')
    };
    return tpls;
});