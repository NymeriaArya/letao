$(function () {
//    1.一级分类的默认渲染
//    2.第一个一级分类对应的二级分类渲染
    getFirstCategoryData(function (data) {
        $(".cate_left ul").html(template("firstTemplate",data));
        // console.log(data);
        var categoryId=$('.cate_left ul li:first-child').find('a').data('id');
        // console.log(categoryId);
        render(categoryId);
        //    绑定事件
        //     initSecondTapHandle();
    });
//    二级分类
//    2.点击一级分类加载对应的二级分类
//     var initSecondTapHandle=function () {
//         $(".cate_left ul li").on("taps",function () {
//
//         })
//     }
//    事件委托
    $(".cate_left").on("tap","a",function (e) {
        // console.log($(this).attr("data-id"));
        //优化：当前选中时，点击不做响应
        if($(this).parents().hasClass("now")) return false;
        $(".cate_left li").removeClass('now');
        $(this).parent().addClass('now');
        render($(this).attr("data-id"));
    })
});
//获取一级分类的数据
var getFirstCategoryData=function (callback) {
    $.ajax({
        url: "/category/queryTopCategory",
        type:"get",
        data: "",
        dataType: "json",
        success: function (data) {
            callback && callback(data);
        },
    })
};
//获取二级分类的数据
//params = {id:1}
var getSecondCategoryData=function (params,callback) {
    $.ajax({
        url: "/category/querySecondCategory",
        type:"get",
        data: params,
        dataType: "json",
        success: function (data) {
            callback && callback(data);
        },
    })
};
//渲染二级分类
var render=function (id) {
    getSecondCategoryData({
        id:id
    },function (data) {
        $(".cate_right ul").html(template("secondTemplate",data));
    })
};