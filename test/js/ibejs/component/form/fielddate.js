Ibe.Namespace('Ibe.Component.Form');

Ibe.Component.Form.FieldDate = Ibe.Extends(Ibe.Component.Form.Field,{

    getHtml:function(){
        var context =  this;

        var items = ['date',this.validator];
        this.validator = items.join('|');
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
                name:'input',
                attributes:{
                    id:context.id,
                    type:'text',
                    value:context.value,
                    name:context.name,
                    validator:context.validator,
                    tooltip:context.tooltip
                },
                style:context.style
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

        return tag.getHtml()+'<script type="text/javascript">Ibe.jQ("#'+this.id+'").datepicker({ dateFormat:"dd/mm/yy" })</script>';
    }
});
