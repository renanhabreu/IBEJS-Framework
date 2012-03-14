Ibe.Namespace('Ibe.Component');

Ibe.Component.FormPanel = Ibe.Extends(Ibe.Component.Window,{
    title:'Teste',
    width:350,
    height:300,
    items:[],
    url:'',
    method:'POST',
    type:null,
    aftersubmit:function(){},

    initObject:function(){

        Ibe.Component.FormWindow.superclass.initObject.call(this);

        var context = this;
        var form =  new Ibe.Component.Form({
            url:context.url,
            method:context.method,
            type:context.type,
            items:context.fields
        });

        this.load = function(url,data){
            context.show();
            form.loadData(url,data,function(){  });
        }

        this.buttons = [
            {
                text:'Fechar',
                click:function(){
                    Ibe.jQ('#'+this.id).dialog("destroy");
                    Ibe.jQ('#'+this.id).remove();
                }
            },
            {
                text:'Salvar',
                click:function(){
                    var btn = Ibe.jQ(":button:contains('Salvar')");
                    btn.attr('disabled','disabled').addClass('ui-state-disabled');

                    if(form.isValid()){
                        form.submit(Ibe.jQ(this).children('form'),btn,context);
                    }else{
                        btn.removeAttr('disabled').removeClass('ui-state-disabled');
                    }
                }
            }
        ];

        this.content = form.getHtml();

    },


    aftershow:function(){
        Ibe.ActiveTooltip();
    },

    load:function(){}


});

