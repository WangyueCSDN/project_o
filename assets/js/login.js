$(function(){
  // 去点击注册账号的链接
  $('#link_reg').on('click',function(){
    // 点击注册链接，把注册链接隐藏，把登录链接显示出来
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击去登录的链接
  $('#link_login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 从layui 中获取form对象
  var form = layui.form
  var layer = layui.layer
 
  // 通过form.veritfy()自定义校验规则
   // 自定义一个叫做pwd的校验规则  \s不是空格的字符
  form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 验证密码是否一致的规则
    repwd:function(value){
      /* 拿到密码框的值和密码框的值进行判断 */
      // 通过形参拿到的是确认密码框中的内容 还需要拿到密码框的内容然后进行一次等于比较判断，
      // 如果判断失败return一个提示消息即可
      /* 属性选择器 */
      // 1.拿到密码框里的值 注意：一定要加空格 否则还会 导致两次密码不一致
     var pwd = $('.reg-box [name=password]').val()
     if(pwd!==value){
       return '两次密码不一致!'
     }

    }


  })



  // 监听注册表单的提交事件 表单注册后，显示表单注册成功
  $('#form_reg').on('submit',function(e){
   
    // 阻止默认行为
    e.preventDefault()
    var data =  {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val() }
    $.post('/api/reguser',data,
    function(res){
      if(res.status !==0){
        // return console.log(res.message);
        return layer.msg(res.message);
      
      }
      // console.log('注册成功!');
      layer.msg('注册成功，请登录!')
      // 模拟人的点击行为 就可以自动调到登录页面了
      $('#link_login').click()

    })
   
  })

  // 监听登录表单的提交事件 
  $('#form_login').submit(function(e){
    //  阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url:'/api/login',
      method:'POST',
      // 快速拿表单的数据
      data:$(this).serialize(),
      success:function(res){
       if(res.status!==0){
         return layer.msg('登录失败!')
       }
       layer.msg('登录成功!')
      //  将登录成功得到的token 字符串，保存到localStorage中
      //  console.log(res.token);
      localStorage.setItem('token',res.token)
      //  跳转到后台主页
       location.href='/index.html'
     }
    })
  })   

})