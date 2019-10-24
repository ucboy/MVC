class manageropinion_show_select_page extends ActionHandler
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
                            <tr><td>&nbsp;會員帳號名稱&nbsp;</td><td>&nbsp;意見回饋&nbsp;</td></tr>";
                var ds=obj['data_set'];
                
                for(var index in ds)
                {
                    content +="<tr><td>&nbsp;"+ds[index]['username']+"&nbsp;</td><td>&nbsp;"+ds[index]['userOpinion']+"&nbsp;</td></tr>";
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