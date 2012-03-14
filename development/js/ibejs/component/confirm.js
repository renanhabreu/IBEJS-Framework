Ibe.Namespace('Ibe.Component');

Ibe.Component.Confirm = Ibe.Extends(Ibe.Component.Window, {
    title:'Confirme esta operação',
    width:250,
    height:190,

    initObject: function(){
        Ibe.Component.Confirm.superclass.initObject.call(this);
        var context = this;
        this.buttons = [
        {
            text:"Sim",
            click:function(){
                context.yesBtn(context)
                context.close();
            }
        },
        {
            text:"Não",
            click:function(){
                context.noBtn(context);
            }
        }
        ]
        this.registerContext(this);
    },

    yesBtn:function(){

    },

    noBtn: function(){
        Ibe.jQ('#'+this.id).dialog("destroy");
        Ibe.jQ('#'+this.id).remove();
    }

});


