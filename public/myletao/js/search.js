$(function () {
   $('.ct_search a').on('tap',function () {
   //    跳转去搜索列表页
   //    并且带上关键字
       var key=$.trim($('.ct_search input').val());
       if(!key){
       //    使用mui的消息提示
           mui.toast('请输入关键字再搜索');
       }
       /*2.点击搜索的时候更新历史记录渲染列表*/
       historyListArr.push(key);
       /*保存*/
       localStorage.setItem('historyList',JSON.stringify(historyListArr));
       /*渲染一次*/
       render();
   //    如果关键字合法则跳转
       location.href="searchList.html?key="+key;
   });

    /*1.默认根据历史记录渲染历史列表*/
    var historyListJson = localStorage.getItem('historyList') || '[]';
    var historyListArr = JSON.parse(historyListJson);
    /*获取到了数组格式的数据*/
    var render = function () {
        /*$.each(function(i,item){}) for() for in */
        /* forEach 遍历函数  只能数组调用  回到函数（所有对应的值，索引）*/
        var html = '';
        historyListArr.forEach(function (item,i) {
            html += '<li><span>'+item+'</span><a data-index="'+i+'" href="javascript:;">删除</a></li>';
        });
        html = html || '<li>没有搜索记录</li>';
        $('.ct_history ul').html(html);
    };
    render();

    /*3.点击删除的时候删除对应的历史记录渲染列表*/
    $('.ct_history ul').on('tap','a',function () {
        var index = $(this).data('index');
        /*删除*/
        historyListArr.splice(index,1);
        /*保存*/
        localStorage.setItem('historyList',JSON.stringify(historyListArr));
        /*渲染一次*/
        render();
    });

    /*4.点击清空的时候清空历史记录渲染列表*/
    $('.ct_history .delete_all').on('tap',function () {
        /*清空*/
        historyListArr = [];
        /*慎用  清空网上的所有本地存储*/
        //localStorage.clear();
        //localStorage.removeItem('historyList');
        localStorage.setItem('historyList','');
        render();
    });
});