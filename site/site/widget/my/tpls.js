define(function(){
    var tpls = {
        skeleton: [
            '<div class="main">',
                '<header class="header">',
                '</header>',
                '<div class="personal-info">',
                '</div>',
            '</div>'
        ].join(''),
        header: [
                '<h1>{{title}}</h1>'
        ].join(''),
        top: [
            '<div class="top-part">',
            '</div>'
        ].join('')
    };
    return tpls;
});