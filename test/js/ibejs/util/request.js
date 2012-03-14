Ibe.Namespace('Ibe.Util');

Ibe.Util.Request = function(conf){
    conf = conf || {}

    var defaultOpt = Ibe.Copy({
        url:'#',
        method:'POST',
        dataType:'json',
        data:{},
        error:function(response){
            var msg = response.message || response.statusText;
            
            Ibe.Component.Alert({
                height:230,
                width:370,
                title:'ERRO !!!!!',
                content: msg
            });

        },

        success:function(){},
        complete:function(){}

    },conf);

    var winWait = new Ibe.Component.Window({
        height:230,
        width:370,
        title:'Aguarde !',
        content:'Estamos realizando a requisi��o... Aguarde !',
        buttons:[]
    });


    Ibe.jQ.ajax({
        url:defaultOpt.url,
        type:defaultOpt.method,
        data:defaultOpt.data,
        dataType:defaultOpt.dataType,
        beforeSend:function(){
            winWait.show();
        },
        success:function(response){
            if(response.success){
                defaultOpt.success(response);
            }else{
                defaultOpt.error(response);
            }
        },
//        error:function(response){
//            winWait.close();
//            defaultOpt.error(response);
//        },
        complete:function(){
            winWait.close();
            defaultOpt.complete();
        },
        statusCode:{
            404:function(){
                Ibe.Component.Alert({
                    title:'ERRO !!!',
                    content: 'Code 404: A funcionalidade/requisicao n&atilde;o foi encontrada no aplicativo'
                });
            },

            403:function(){
                Ibe.Component.Alert({
                    title:'ERRO !!!',
                    content: 'Code 403: Acesso negado a funcionalidade'
                });
            }
        }
    })
}


