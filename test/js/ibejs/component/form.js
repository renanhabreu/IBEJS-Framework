Ibe.Namespace('Ibe.Component');

Ibe.Component.Form  = Ibe.Extends(Ibe.Component.Window, {
    url:'#',
    method:'POST',
    type:null,

    initObject:function(){
        this.addEvent('beforesubmit');
        this.addEvent('aftersubmit');
        this.addEvent('beforeload');
        this.addEvent('afterload');
        Ibe.Component.Form.superclass.initObject.call(this);
    },

    getHtml:function(){
        return '<form id="'+this.id+'" action="'+this.url+'" method="'+this.method+'" >'
        + this.getHtmlItems()
        + '</form>';
    },

    isValid:function(){
        var form        = Ibe.jQ('#'+this.id);
        var context     = this;
        var validou     = true;

        if(form.length == 1){

            var field = form[0].elements; //,function(index,field){
            var fd = Ibe.jQ(field);

            Ibe.jQ.each(form[0].elements,function(index,field){
                var fd = Ibe.jQ(field);

                /**
                 * Captura o atributo validator dos campos, quebra a string com |
                 * e realiza a validacao atraves do metodo fwtValidar
                 */
                var validator = Ibe.jQ(field).attr('validator');
                // se houver validadores
                if(validator && validator != ""){
                    var validadores = validator.split('|');
                    for(var v in validadores){
                        if(!context.checkValue(validadores[v], fd.val())){
                            fd.addClass('ui-state-error');
                            validou = false;
                        }else{
                            fd.removeClass('ui-state-error');
                        }
                    }
                }
            });
        }

        if(!validou){
            Ibe.Component.Alert({
                height:190,
                title:'Campos inválidos',
                content:'Verifique se os valores digitados são válidos para os campos em vermelho.'
            });
        }
        return validou;
    },

    checkValue: function(type,value){
        var validadores = Ibe.Validators;

        for(var key in validadores){
            if(key == type){
                var exp = validadores[key];
                return exp.test(value);
            }
        }

        return false;
    },

    submit: function(form,btn,winForm){
        this.fireEvent('beforesubmit', this, this);
        form = Ibe.jQ(form[0]);

        Ibe.Util.Request({
            url:form.attr('action'),
            type:form.attr('method'),
            data:form.serialize(),
            success:function(){
                winForm.aftersubmit();
                winForm.close();
            },
            complete:function(){
                btn.removeAttr('disabled').removeClass('ui-state-disabled');
            }
        });


        this.fireEvent('aftersubmit', this, this);
    },

    loadData:function(url,data,callback){
        callback = callback || function(){};

        this.fireEvent('beforeload', this, this);

        /**
         * Tipo de retorno
         * {
         *    fieldName:value
         * }
         */
        Ibe.Util.Request({
            url:url,
            type:'POST',
            data:data,
            success:function(response){
                Ibe.jQ.each(response.form,function(name,value){
                    Ibe.jQ('[name="'+name+'"]').val(value);
                });
                callback();
            }
        });

        this.fireEvent('afterload', this, this);
    },

    beforesubmit:function(){},
    aftersubmit:function(){},
    beforeload:function(){},
    afterload:function(){}
});

