$(function(){
// 调用这个函数getUserInfo获取用户的基本信息
getUserInfo()
var layer = layui.layer
// 点击按钮，实现退出功能
$('#btnLogout').on('click',function(){
    // console.log('ok')
    // 提示用户是否确认退出
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
        //do something
        // console.log('ok')
        // 1.清空本地存储中token
        localStorage.removeItem('token')
        // 2.重新跳转到登录页面
        location.href='/login.html'
        // 关闭confirm询问框
        layer.close(index);
      });
})

})
// 获取用户的基本信息
function getUserInfo(){
$.ajax({
    method:'GET',
    // 在自己js前导入baseAPI
    url:'/my/userinfo',
    // headers 就是请求头配置对象
    // token作用:相当于当前登录人身份的唯一标识，两个人之间的token是不一样的
    // headers:{
    //     // 值：请求成功之后，获取本地存的值
    //     Authorization:localStorage.getItem('token') || ''
    // },
    // 成功的回调
    success:function(res){
        console.log(res)
        if(res.status!==0){
            return layui.layer.msg('获取用户消息失败!')
        }
        // 调用renderAvatar渲染的头像
        renderAvater(res.data)
    },
  //  无论成功还是失败，最终都会调用complete 回调函数
    // complete:function(res){
    //      console.log('执行了complete回调;')
    //       console.log(res)
    //     //   在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    // //    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
    // //     //    1.强制清空
    // //     localStorage.removeItem('token')
    // //     //    2.强制跳转到登录页面
    // //     location.href ='/login.html'

    // //    }
    
    // }

})
}
// 渲染用户的头像
 function renderAvater(user){
    // 1.获取用户名称 昵称和用户的登录名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 3.按需渲染用户的头像
    // console.log(user.user_pic);
    // 如果有图片头像先渲染图片头像，没有就渲染文字头像
    if(user.user_pic !==null){
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else{
        // 3.2渲染文本头像
        $('.layui-nav-img').hide()
        // 获取字符串里面的第一个字符name[0]  toUpperCase()大写的
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
} 