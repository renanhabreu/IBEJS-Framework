Ibe.Namespace('Ibe');

Ibe.Tooltip = {
    
    active:function(param){
        param = Ibe.CopyIfNot(param || {},{renderTo:".app-main", timer:1000});
        
        var boxTooltip = new Ibe.Util.Tag({
            name:"div",
            attributes:{
                "id":"ibe-box-tooltip",
                "class":" span-24 ibe-tooltip ibe-corner-bottom"
            },
            items:[
                new Ibe.Util.Tag({
                    name:"span"
                })
            ]
        });
        
        var boxRenderTooltip = Ibe.jQ(param.renderTo);
        var abrir = true;
        
        boxRenderTooltip.prepend(boxTooltip.getHtml());
       
        Ibe.jQ(':[tooltip]').hover(function(e){
            
            if(abrir){
                var txDescricaoTooltip = Ibe.jQ(this).attr('tooltip');

                var tooltip = Ibe.jQ('#ibe-box-tooltip');
                tooltip.children('div span').text(txDescricaoTooltip);
                tooltip.slideDown('slow',function(){
                    abrir = false;
                });
            }
        },function(){
            if(!abrir){
                var tooltip = Ibe.jQ('#ibe-box-tooltip');  
                tooltip.slideUp(function(){   
                    abrir = true;
                });  
            }
        });
    }
    
}

