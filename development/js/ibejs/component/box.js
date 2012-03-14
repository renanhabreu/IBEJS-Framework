Ibe.Namespace('Ibe.Component');

Ibe.Component.Box  = Ibe.Extends(Ibe.Component, {
    title:'Ibe Box',
    autoShow:false,
    span:24,
    renderTo:'.app-box',
    
    initObject: function(){
        this.addEvent('beforeshow');
        this.addEvent('aftershow');
        
        Ibe.Component.Window.superclass.initObject.call(this);
        
        if(this.autoShow){
            this.show();
        }
    },

    show:function(){
        this.fireEvent('beforeshow', this, this);
        var context = this;
        var element = Ibe.jQ(this.renderTo);
        
        var box = new Ibe.Util.Tag({
            name:'div',
            attributes:{
                "class":"span-"+context.span+" last ibe-box"
            }
        });
        
        var boxHeader = new Ibe.Util.Tag({
            name:'div',
            attributes:{
                "class":"ibe-box-head ibe-corner-top"
            },
            items:[
                new Ibe.Util.Tag({
                    name:'h3',
                    content:context.title
                })
            ]
        });
        
        var boxBody = new Ibe.Util.Tag({
            name:'div',
            attributes:{
                "class":"ibe-box-content ibe-corner-bottom"
            }
        });
        element.wrap(box.getHtml());
        element.parent().prepend(boxHeader.getHtml());
        element.wrap(boxBody.getHtml());
        this.fireEvent('aftershow', this, this);
    },
    
    beforeshow: function(){
    },

    aftershow: function(){
    }

});
