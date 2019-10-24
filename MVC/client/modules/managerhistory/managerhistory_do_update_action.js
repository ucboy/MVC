class managerhistory_do_update_action extends ActionHandler
{
    constructor(module,action,position_orderID)
    {
        super(module,action);
        this.position_orderID=position_orderID;
        this.php=true;
        this.data="orderID="+$('input[name=orderID]:checked').val()+"&status="+$('#status').val();
    }
    
    ajaxSuccess(json_str)
    {

            try
            {
                var obj=JSON.parse(json_str);
                if(obj['status_code']===0)
                {
                    $("#"+this.position_orderID).html(obj['status_message']);
                }
                else
                {
                    $("#"+this.position_orderID).html(obj['status_message']);
                }
            }
            catch(e)
            {
                var msg=e+"<br>";
                msg=msg+"JSON String : "+json_str;
                $("#"+this.position_orderID).html(msg);
            }

    }
    
    ajaxError(msg)
    {
        document.getElementById(this.position_orderID).innerHTML=msg.status;
    }
}