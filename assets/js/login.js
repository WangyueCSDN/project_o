$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  /* 验证规则，以及自定义验证规则 */
  // 从layui 中获取form获取
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify()函数自定义校验或者
  form.verify({
    pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 效验两次密码是否一致的规则
    repwd:function(value){
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一侧等于的判断
      // 如果判断失败，则return一个提示消息即可
      /* 通过name拿到里面的值 */
      // name选择器
     var pwd = $('.reg-box [name=password]').val()
      if(pwd !==value){
        return '两次密码不一致!'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
    var data =  {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
    e.preventDefault()
    $.post('/api/reguser',data,function(res){
    if(res.status!=0){
      // 服务器打印的错误消息打印下
    // return console.log(res.message);
  return layer.msg(res.message);  
   
 }
//  console.log('注册成功');
layer.msg('注册成功请登录');  
// 模拟人的点击行为
$('#link_login').click()
    })

  })
  // 监听登录表单的提交事件
  $('#form_login').submit(function(e){
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      // url:'http://big-event-api-t.itheima.net/api/login',
      url:'/api/login',
      method:'POST',
      // 快速获取表单的数据
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功!')
        // 将登录成功的token字符串，保存到local中
        localStorage.setItem('token',res.token)
        console.log(res.token);
        // 跳转到后台主页
        location.href='/index.html'
      }
    })
  })
})


