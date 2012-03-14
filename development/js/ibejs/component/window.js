Ibe.Namespace('Ibe.Component');

Ibe.Component.Window  = Ibe.Extends(Ibe.Component, {
    title:'Janela',
    width:300,
    height:400,

    initObject: function(){
        this.buttons = [
        {
            text:"Fechar",
            click:function(){
                Ibe.jQ('#'+this.id).dialog("destroy");
                Ibe.jQ('#'+this.id).remove();
            }
        }
        ]
        this.addEvent('beforeshow');
        this.addEvent('aftershow');

        this.registerContext(this);
        Ibe.Component.Window.superclass.initObject.call(this);
    },

    show:function(){
        this.fireEvent('beforeshow', this, this);

        var defaultOpt = {
            title:null,
            autoOpen:false,
            modal:true,
            height:null,
            width:null,
            close:function(event,ui){
                Ibe.jQ(this).dialog('destroy').remove();
            },
            buttons: this
        };

        Ibe.CopyIf(defaultOpt, this);
        var component = this.getHtml();
        Ibe.jQ('body').prepend(component);
        Ibe.jQ('#'+this.id).dialog(defaultOpt);
        Ibe.jQ('#'+this.id).parent().children().children('.ui-dialog-titlebar-close').hide();
        Ibe.jQ('#'+this.id).dialog("open");

        this.fireEvent('aftershow', this, this);
    },

    close:function(){
        Ibe.jQ('#'+this.id).dialog("destroy");
        Ibe.jQ('#'+this.id).remove();
    },

    beforeshow: function(){
    },

    aftershow: function(){
    }

});

