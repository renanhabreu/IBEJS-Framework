Ibe.Icon = {
    
    active:function(param){
        param = param || {
            color1:'ibe-icon-black', 
            color2:'ibe-icon-red'
        };
    
        Ibe.jQ('.ibe-menu ul li a').hover(function(){
            var spanIcon = Ibe.jQ('span',this);
            var cls  = spanIcon.attr('class').split(' ');
            var size = cls.length-1;
            var names = cls[size].split('-');
            var name = names[names.length -1];

            spanIcon.removeClass(cls[size]).removeClass(param.color1);
            spanIcon.addClass(param.color2).addClass(param.color2+'-'+name);
        }, function(){
            var spanIcon = Ibe.jQ('span',this);
            var cls  = spanIcon .attr('class').split(' ');
            var size = cls.length-1;
            var names = cls[size].split('-');
            var name = names[names.length - 1];

            spanIcon.removeClass(cls[size]).removeClass(param.color2);
            spanIcon.addClass(param.color1).addClass(param.color1+'-'+name);
        });
    
    }
}
