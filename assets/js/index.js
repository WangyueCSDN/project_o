$(function () {

    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        // 提示用户是否确认退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            // console.log('ok');
            // 登录的时候向本地存储存了一个token 退出的时候应该清除掉
            // 1.清除本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'

            layer.close(index); //可以关闭对应的弹出层
        });

    })
})



// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // if(success!==0){}
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // // 无论成功还是失败，最终都会调用complete回调函数
        // complete: function(res){
        //     // console.log('执行了complete回调');
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败!'){
        //         // 1.强制清空 token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录页面
        //         location.href='/login.html'
        //     }
        // 下面的是正确的
        // complete: function (res) {
        //     console.log('执行了complete回调;')
        //     console.log(res)
        //     //在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //    1.强制清空
        //         localStorage.removeItem('token')
        //         //    2.强制跳转到登录页面
        //         location.href = '/login.html'

        //     }

        // }

    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本  获取文本内容
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 把文本头像隐藏，把个人头像显示出来
        // 3.1渲染图片头像
        // 同时会获取到左侧图片头像和头部图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        // 获取第一个字符name[0] 字符串当做数组用 直接转为大写
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()

    }
}