// 每次调用$.get()或者$.post()或者$.ajax()的时候会先调用这个函数
$.ajaxPrefilter(function(options){
// options是调用ajax时传递的那个配置对象

// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// console.log(options.url);
/* 再发起真正的Ajax之前,统一拼接请求的跟路径 */
options.url='http://big-event-api-t.itheima.net'+options.url

})