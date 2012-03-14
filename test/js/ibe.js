

Ibe.Run = function(){
    Ibe.Handlers.Menu.criarAlerta = function(){
    
        var window = new Ibe.Component.Window({
            title:"Minha janela",
            height:300
        });
        window.show();
    
    }

    new Ibe.Component.Menu({
        renderTo:"#app-menu",
        autoShow:true,
        url:'menu.json'       
    });
    
    new Ibe.Component.Box({
        autoShow:true
    });
    
}


