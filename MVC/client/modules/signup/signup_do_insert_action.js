class signup_do_insert_action extends ActionHandler
{
    constructor(module,action,position_username)
    {
        super(module,action);
        this.position_username=position_username;
        this.php=true;
        this.data="username="+$('#username').val()+"&pass="+$('#pass').val()+"&passagain="+$('#passagain').val()+"&name="+$('#name').val()+"&phone="+$('#phone').val()+"&birthday="+$('#birthday').val();
    }

    ajaxSuccess(json_str)
    {
        
        
        try
        {   
            
            var obj=JSON.parse(json_str);
            if(obj['status_code']===0)
            {
                $("#"+this.position_username).html(obj['status_message']);
                
            }
            else
            {
                $("#"+this.position_username).html(obj['status_message']);
            }
        }
        catch(e)
        {
            var msg=e+"<br>";
            msg=msg+"JSON String : "+json_str;
            $("#"+this.position_username).html(msg);
        }
    }
}