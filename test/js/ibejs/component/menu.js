Ibe.Namespace('Ibe.Component');

Ibe.Component.Menu  = Ibe.Extends(Ibe.Component, {
    renderTo:"#menu",
    autoShow:false,
    url:false,
    items:[
    //    {
    //        id:"id-menu",
    //        tooltip:'Item Menu',
    //        href:'http://www.google.com.br',
    //        icon:'Alarm',
    //        label:'Alarme',
    //        event:{
    //            type:'click',
    //            handler:"nome da funcao em Ibe.Handlers.Menu"
    //        }
    //    }
    ],
    
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
        
        if(!this.url){            
            this.buildAll(this.items);        
        }else{
            var context = this;
            Ibe.Util.Request({
                url:context.url,
                success:function(response){ 
                    context.buildAll(response.items);
                }
            });
        }
        
        
    },

    beforeshow: function(){
    },

    aftershow: function(){
    },
    
    buildAll:function(data){        
        var div = this.buildBoxMenu();
        div.append(this.buildItemList(data).getHtml());
        
        for(var i in data){
            var item = data[i];            
            if(item.event){
                Ibe.jQ('#'+item.id).bind(item.event.type || "click",Ibe.GetMenuHandler(item.event.handler));
               
            }
        }
        
        Ibe.Icon.active();
        Ibe.Tooltip.active();
        
        this.fireEvent('aftershow', this, this);

    },
    
    buildItemList:function(data){
        var liTags = new Array();
        
        for(var i in data){
            var item = data[i];
            
            var attr = {
                "id":item.id,
                "href":item.href || "#"
            };
            
            if(item.tooltip){
                attr = Ibe.Copy(attr,{ "tooltip":item.tooltip });
            }
            
            var liTag = new Ibe.Util.Tag({
                name:"li",
                attributes:{
                    "class":"ibe-corner-all"
                },
                items:[
                new Ibe.Util.Tag({
                    name:"a",
                    attributes:attr,
                    items:[
                    new Ibe.Util.Tag({
                        name:"span",
                        attributes:{
                            "class":"ibe-icon ibe-icon-black ibe-icon-black-"+item.icon
                        }
                    }),
                            
                    new Ibe.Util.Tag({
                        name:"p",
                        content:item.label || "Label"
                    })
                    ]
                })
                ]
            });
            
            liTags.push(liTag);
        }
        
        var ulTag = new Ibe.Util.Tag({
            name:"ul",
            items:liTags
        });
        
        return ulTag;
    },
    
    buildBoxMenu:function(){
        var div = Ibe.jQ(this.renderTo);
        div.addClass("span-24 last ibe-menu ibe-corner-all");
        return div;
    }

});
