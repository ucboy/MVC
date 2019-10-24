class user_profile_show_delete_list extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.php_action='do_select_action';
    }

    ajaxSuccess(xhttp)
    {
        xhttp=JSON.parse(xhttp);
        
        if(xhttp['status_code']===0)
        {
            var content="選擇欲刪除餐點:<br><table border=1>\n\
                        <tr><td>&nbsp;&nbsp;</td><td>&nbsp;號碼&nbsp;</td><td>&nbsp;餐點名稱&nbsp;</td><td>&nbsp;餐點價錢&nbsp;</td></tr>";
            var ds=xhttp['data_set'];

            for(var index in ds)
            {
                content +="<tr><td><input type='radio' name='id' id='id' value="+ds[index]['id']+"></td><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td id='prodName'>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td id='price'>&nbsp;"+ds[index]['price']+"&nbsp;</td></tr>";
            }
            content +="</table><br><input type='button' id='submit' value='送出'>";
            
            $("#"+this.position_id).html(content);
            
            this.loadModuleScript(this.module,"do_delete_action");
            
            $('#submit').on('click',function(){
                (new user_profile_do_delete_action('user_profile','do_delete_action','show_area')).run();
            });
        
        }
        else
        {
            $("#"+this.position_id).html(xhttp['status_message']);
        }
    }
    catch(e)
    {
        var msg=e+"<br>";
        msg=msg+"JSON String : "+json_str;
        $("#"+this.position_id).html(msg);
    }
    
}
