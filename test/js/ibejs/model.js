Ibe.Model = function(configure){

    this.url = "#";
    this.editUrl = "#";
    this.colsName = [];
    this.colsConf = [];
    this.order = 'desc';
    this.sort = 'id';
    this.proxy = {
      root:"rows",
      page: "currpage",
      total: "totalpages",
      records: "totalrecords",
      repeatitems: false,
      id: "0"
   }

    configure = configure || {};
    Ibe.Copy(this,configure);
};