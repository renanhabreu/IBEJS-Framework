Ibe.Namespace('Ibe.Component.Form');


Ibe.Component.Form.FieldSelect = Ibe.Extends(Ibe.Component.Form.Field,{
    url:false,
    data:{},
    options:[
    {
        label:'selecione',
        value:'',
        selected:true
    }
    ],

    initObject:function(){
        Ibe.Component.Form.FieldSelect.superclass.initObject.call(this);
    },

    getHtml:function(){
        var context =  this;
        var optionsList = new Array();

        if(!this.url){
            optionsList = this.setOptions(this.options);
        }

        var select = new Ibe.Util.Tag({
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
                name:'select',
                attributes:{
                    id:context.id,
                    value:context.value,
                    name:context.name,
                    validator:context.validator,
                    tooltip:context.tooltip
                },
                style:context.style,
                items:optionsList
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

        if(this.url){
            this.loadData();
        }
        return select.getHtml();
    },

    /**
     *options:[
     *{
     *    label:'selecione',
     *    value:'',
     *    selected:true
     *}
     *]
     */
    loadData:function(){
        var context = this;

        Ibe.jQ.getJSON(this.url,this.data ,function(response){
            var select = Ibe.jQ('#'+context.id);
            var options = context.setOptions(response.options);

            select.children('option').remove();
            for(var i=0 in options){
                select.append(options[i].getHtml());
            }
        })
        .error(function(error){
            Ibe.Component.Alert({
                title:"Erro!",
                content:"Erro ao buscar op��es! <b>"+error.statusText+" n."+error.status+"</b>"
            });
        });

    },

    setOptions:function(options){
        var optionsList = new Array();
        /**
         * [
         *      {
         *          label:"balbalabla",
         *          value:"",
         *          selected:true|false
         *      }
         * ]
         */
        for(var i=0 in options){
            var label = options[i].label;
            var value = options[i].value;
            var selected = options[i].selected || false;
            optionsList.push(new Ibe.Util.Tag({
                name:'option',
                content:label,
                attributes:{
                    value:value,
                    selected:(selected)? '"selected"':null
                }
            }));
        }

        return optionsList;
    }
});
