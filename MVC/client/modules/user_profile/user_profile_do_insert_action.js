class user_profile_do_insert_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        if($('#prodName').val()==="" || $('#price').val()==="" )
        {
            this.data="prodName="+""+"&price="+"";
        }
        else
        {
            this.data="prodName="+$('#prodName').val()+"&price="+$('#price').val();
        }
    }

    ajaxSuccess(json_str)
    {
        try
        {
            var obj=JSON.parse(json_str);
            if(obj['status_code']===0)
            {
                $("#"+this.position_id).html(obj['status_message']);
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
}