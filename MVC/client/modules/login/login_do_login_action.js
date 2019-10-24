class login_do_login_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.data="username="+$('#username').val()+"&pass="+$('#pass').val();
    }

    ajaxSuccess(json_str)
    {
        try
        {
            var obj=JSON.parse(json_str);
            if(obj['status_code']===0)
            {
                window.location.replace('http://fs.mis.kuas.edu.tw/~s1106137117/MVC/client/userindex.html');
            }
            if(obj['status_code']===1)
            {
                window.location.replace('http://fs.mis.kuas.edu.tw/~s1106137117/MVC/client/managerindex.html');
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