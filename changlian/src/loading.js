export default{
		html:'<img src="./static/img/loading.gif" />',
		show:function(){
			let loader = document.createElement('div');
			loader.className = 'loader';
			loader.id = 'loader';
			loader.innerHTML = this.html;
			document.body.appendChild(loader);
			setTimeout(function(){
				loader.style.opacity = '1';
			},55);
		},
		hide:function(){
			let loader = document.getElementById('loader');
			loader.style.opacity = '0';
			setTimeout(function(){
				document.body.removeChild(loader);
			},500);
		}
};