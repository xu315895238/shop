define(["mui"], function(mui) {
mui.ajax('/api/shoplist',{
	data:{
		
	},
	dataType:'json',//服务器返回json格式数据
	type:'get',//HTTP请求类型
	timeout:10000,//超时时间设置为10秒；
	success:function(data){
		console.log(data)
	},
	
});
	
})
