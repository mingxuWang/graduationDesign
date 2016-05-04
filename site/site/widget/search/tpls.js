define(function(){
    var tpls = {
        'skeleton': [
            '<div class="main">',
                '<header class="header">',
                '</header>',
            '</div>'
        ].join(''),
        'header': [
                '<h1>{{title}}</h1>'
        ].join('')
    };
    return tpls;
});