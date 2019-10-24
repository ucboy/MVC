class meal_do_select_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
    }
    
    ajaxSuccess(json_str)
    {
        try
        {
            var obj=JSON.parse(json_str);
            if(obj['status_code']===0)
            {
                var content="<table border=1>\n\
                            <tr><td>&nbsp;號碼&nbsp;</td><td>&nbsp;餐點名稱&nbsp;</td><td>&nbsp;餐點價錢&nbsp;</td></tr>";
                var ds=obj['data_set'];
                
                for(var index in ds)
                {
                    content +="<tr><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td>&nbsp;"+ds[index]['price']+"&nbsp;</td></tr>";
                }
                content +="</table>";
                $("#"+this.position_id).html(content);
            }
            else
            {
                $("#"+this.position_id).html(obj['status_message']);
            }
        }
        catch(e)
        {
            var msg=e+"<br>";
            msg=msg+"JSON String : "+json_str;
            $("#"+this.position_id).html(msg);
        }
    }
    
    ajaxError(msg)
    {
        document.getElementById(this.position_id).innerHTML=msg.status;
    }
    
}