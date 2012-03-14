Ibe.Namespace('Ibe.Component.Form');

Ibe.Component.Form.Field = Ibe.Extends(Ibe.Component,{

    initObject:function(){

        this.value = '',
        this.name = 'component-'+this.id;
        this.label = 'Label '+this.id;
        this.validator = '';
        this.style = null;
        this.tooltip = '';

        Ibe.Component.Form.Field.superclass.initObject.call(this);
    },


    show:function(){
        throw {
            message:"No implemented method"
        };
    }


});



