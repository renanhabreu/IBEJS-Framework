Ibe.Namespace('Ibe.Component.Form');

Ibe.Component.Form.FieldHidden = Ibe.Extends(Ibe.Component.Form.Field,{

     getHtml:function(){
        var context =  this;

        var tag = new Ibe.Util.Tag({
                name:'input',
                attributes:{
                    type:'hidden',
                    id:context.id,
                    value:context.value,
                    name:context.name,
                    validator:context.validator
                },
                style:context.style
            });

        return tag.getHtml();
    }
});
