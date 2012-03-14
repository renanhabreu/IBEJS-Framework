Ibe.Namespace('Ibe.Util');

Ibe.Util.Tag = function(conf){
    conf = conf || {};

    var defaultOpt = Ibe.CopyIfNot(conf,{
        name:'html',
        attributes:{},
        styles:{},
        content:'',
        items:[]
    });

    this.addItem = function(tag){
      defaultOpt.items.push(tag);
    };

    this.getHtml = function(){
        var attr = '';
        var style = '';
        var tag = null;

        Ibe.jQ.each(defaultOpt.attributes,function(index,element){
            attr += ' '+index+'="'+element+'"';
        });

        Ibe.jQ.each(defaultOpt.styles,function(index,element){
            style += index+':'+element+';';
        });

        if(style != ''){
            style = ' style="'+style+'"';
        }

        tag  = '<'+defaultOpt.name+''+attr+style+'>';
        tag  += defaultOpt.content;
        for(var i in defaultOpt.items){
            tag += defaultOpt.items[i].getHtml();
        }
        tag += '</'+defaultOpt.name+'>'

        return tag;
    }

}

