var Ibe = {
    version:"1.0.0"
};


Ibe.Add = function(o,c,defaults){
    if(defaults){
        Ibe.Add(o,defaults);
    }

    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }

    return o;
};

(function(){

    Ibe.Add(Ibe,{

        jQ:jQuery.noConflict(),

        Start:function(fn){
            Ibe.jQ(document).ready(fn);
        },

        /**
         * Extende uma classe.
         * Ex:
         *   var User = Ibe.Extends(Person,{ login:'admin', pass:'admin' })
         */
        Extends : function(){
            // inline overrides
            var io = function(o){
                for(var m in o){
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;

            return function(sb, sp, overrides){
                if(typeof sp == 'object'){
                    overrides = sp;
                    sp = sb;
                    sb = (overrides.constructor != oc) ? overrides.constructor : function(){
                        sp.apply(this, arguments);
                    };
                }

                var F = function(){}, sbp, spp = sp.prototype;
                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor=sb;
                sb.superclass=spp;
                if(spp.constructor == oc){
                    spp.constructor=sp;
                }
                sb.override = function(o){
                    Ibe.Override(sb, o);
                };
                sbp.override = io;
                Ibe.Override(sb, overrides);
                sb.extend = function(o){
                    Ibe.Extends(sb, o);
                };
                return sb;
            };
        }(),

        /**
         * Sobrescreve uma classe
         */
        Override : function(origclass, overrides){
            if(overrides){
                var p = origclass.prototype;
                for(var method in overrides){
                    p[method] = overrides[method];
                }
            }
        },

        /**
         * Padr�o observer para disparar eventos em componentes
         * e demais implementa��es
         */
        Observer: function(conf){
            var fns = new Array();

            this.addEvent = function(fnName) {
                fns.push(fnName);
            };

            this.removeEvent = function(fn) {
                fns = fns.filter(
                    function(el) {
                        if ( el !== fn ) {
                            return el;
                        }
                    }
                    );
            };

            this.fireEvent = function(o, thisObj,params) {
                thisObj = thisObj || window;
                params  = params || {};

                for(var i=0; i<fns.length; i++) {
                    if (fns[i].toString() == o){
                        this[o].call(thisObj,o,params);
                        break;
                    }
                }

            };

            this.registerContext = function(configure){
                configure = configure || {};
                Ibe.Copy(configure,conf);
                Ibe.Copy(this,configure);
            }
            //Ibe.Observer.superclass.constructor.call(this)
            this.initObject();
        },

        /**
         * Aplica os elementos de C em O se estes forem definidos em O
         */
        CopyIf: function(o,c){

            if(o && c){
                for(var p in c){
                    if(typeof o[p] != 'undefined'){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        /**
         * Aplica os elementos de C em O se estes nao existirem
         * ou n�o forem definidos em O
         */
        CopyIfNot: function(o,c){

            if(o && c){
                for(var p in c){
                    if(typeof o[p] == 'undefined'){
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        /**
         * Aplica os elementos de C em O
         */
        Copy: function(o,c){

            if(o && c){
                for(var p in c){
                    o[p] = c[p];
                }
            }
            return o;
        },

        /**
         * Cria namespaces para o framework
         */
        Namespace: function() {
            var a=arguments, o=null, i, j, d;
            for (i=0; i<a.length; i=i+1) {
                d=a[i].split(".");
                o=window;
                for (j=0; j<d.length; j=j+1) {
                    o[d[j]]=o[d[j]] || {};
                    o=o[d[j]];
                }
            }
            return o;
        },

        Validators: {
            "ip":/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            ,
            "email":/^[\w\-\+\&\*]+(?:\.[\w\-\_\+\&\*]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
            ,
            "date":/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/
            ,
            "number":/^.*[0-9]$/
            ,
            "alfa":/^.*[a-zA-Z]$/
            ,
            "noempty":/^.+$/
        },

        
        /**
         * Checa se uma chave de um objeto existe
         */
        CheckKeyObject:function(key,obj){
            Ibe.jQ.each(obj,function(index,value){
                if(index == key){
                    return true;
                }
            });

            return false
        },
        /**
         * Checa se uma chave de um objeto existe
         */
        GetValueOfKey:function(key,obj){
            var value = null;

            Ibe.jQ.each(obj,function(index,val){
                if(index == key){
                    value = val;
                }
            });

            return value;
        },
        /**
         *Manipuladores de componentes ou utilidades
         */
        Handlers:{
            Menu:{},
            General:{}
        },
        
        GetHandler:function(fnName){
            return Ibe.GetValueOfKey(fnName,Ibe.Handlers.General)
        },
        
        GetMenuHandler:function(fnName){
            return Ibe.GetValueOfKey(fnName,Ibe.Handlers.Menu)
        }
    });
})();
Ibe.jQ(document).ready(function(){
    Ibe.Run();
});
