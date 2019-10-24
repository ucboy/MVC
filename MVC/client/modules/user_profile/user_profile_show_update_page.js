class user_profile_show_update_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.data="id="+$('input[name=id]:checked').val();
        this.php_action="get_user_by_id";
    }

    ajaxSuccess(json_str)
    {
        if(this.data==="id=undefined")
        {
            $("#"+this.position_id).html("請選擇一項做更改");
        }
        else
        {
            try
            {
                var obj=JSON.parse(json_str);

                if(obj['status_code']===0)
                {
                    var ds=obj['data_set'];
                    var content="號碼：<input type='text' id='id_2' value="+ds[0]['id']+"><br>\n\
                                 餐點名稱：<input type='text' id='prodName' value="+ds[0]['prodName']+"><br>\n\
                                 價錢：<input type='text' id='price' value="+ds[0]['price']+"><br>\n\
                                 <input type='button' id='submit' value='送出'>\n\
                                 <input type='hidden' id='id' value="+ds[0]['id']+">";
                    $("#"+this.position_id).html(content);

                    this.loadModuleScript(this.module,"do_update_action");

                    $('#submit').on('click',function(){
                        (new user_profile_do_update_action('user_profile','do_update_action','show_area')).run();
                    });
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
    
    ajaxError(msg)
    {
        document.getElementById(this.position_id).innerHTML=msg.status;
    }
}