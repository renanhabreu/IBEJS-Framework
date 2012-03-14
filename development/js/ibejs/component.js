Ibe.Namespace('Ibe.Component');

Ibe._id = 0;

Ibe.Component = Ibe.Extends(Ibe.Observer,{
    id:null,
    items:[],
    content:'',

    getId : function(){
        Ibe._id++;
        return 'component-'+Ibe._id;
    },

    initObject: function(){
        this.id = this.getId();
        this.addEvent('init');

        this.fireEvent('init', this);
        this.registerContext(this);
    },

    init: function(){
    },

    getHtml:function(){
        var div  = '<div id="'+this.id+'">';
        div += this.content;
        div += this.getHtmlItems();
        div += '</div>';

        return div;
    },

    getHtmlItems: function(){

        var htmlItems = '';

        for(var i in this.items){
            var compt = this.items[i];
            htmlItems += compt.getHtml();
        }

        return htmlItems;
    }
});
