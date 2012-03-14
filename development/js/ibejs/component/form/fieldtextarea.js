Ibe.Namespace('Ibe.Component.Form');

Ibe.Component.Form.FieldTextArea = Ibe.Extends(Ibe.Component.Form.Field,{
   
     getHtml:function(){
        var context =  this;

        var tag = new Ibe.Util.Tag({
            name:"label",
            styles:{
                "padding":"4px",
                "text-align":"left",
                "float":"left",
                "width":"97%"
            },
            content:context.label+'<br/>',
            items:[
            new Ibe.Util.Tag({
                name:'textarea',
                attributes:{
                    id:context.id,
                    name:context.name,
                    validator:context.validator,
                    tooltip:context.tooltip
                },
                style:context.style,
                content:context.value
            }),
            new Ibe.Util.Tag({
                name:'span',
                attributes:{
                    "class":"ui-icon ui-icon-help"
                },
                styles:{
                    "cursor":"pointer"
                }
            })
            ]
        });

        return tag.getHtml();
    }
});
