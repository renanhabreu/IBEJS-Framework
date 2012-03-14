Ibe.Namespace('Ibe.Component');

Ibe.Component.Alert = function(conf){
    conf = Ibe.CopyIfNot(conf, { width: 370, height:200});
    var winAlert = new Ibe.Component.Window(conf);
    winAlert.show();
}


