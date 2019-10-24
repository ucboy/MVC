class managerhistory_show_select_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=true;
        this.php_action='show_select_page';
    }

    ajaxSuccess(xhttp)
    {
        xhttp=JSON.parse(xhttp);
        
        if(xhttp['status_code']===0)
        {
            var content="<table border=1>\n\
                            <tr><td>&nbsp;&nbsp;</td><td>&nbsp;訂單編號&nbsp;</td><td>&nbsp;會員帳號名稱&nbsp;</td><td>&nbsp;餐點名稱&nbsp;</td><td>&nbsp;餐點價錢&nbsp;</td></td><td>&nbsp;份數&nbsp;</td></td><td>&nbsp;總金額&nbsp;</td><td>&nbsp;餐點狀態&nbsp;</td><td>&nbsp;更改狀態&nbsp;</td></tr>";
                var ds=xhttp['data_set'];
                
                for(var index in ds)
                {
                    if(index==0)
                    {
                        content +="<tr><td><input type='radio' name='orderID' id='orderID' value="+ds[index]['orderID']+"></td><td>&nbsp;"+ds[index]['orderID']+"&nbsp;</td><td>&nbsp;"+ds[index]['username']+"&nbsp;</td><td>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td>&nbsp;"+ds[index]['price']+"&nbsp;</td><td>&nbsp;"+ds[index]['howmany']+"&nbsp;</td><td>&nbsp;"+ds[index]['total']+"&nbsp;</td><td>&nbsp;"+ds[index]['status']+"&nbsp;</td><td><select name='status' id='status' ><option value='1'>製作中</option><option value='2'>運送中</option><option value='3'>已抵達</option></select></td></tr>";
                    }
                    else
                    {
                        content +="<tr><td><input type='radio' name='orderID' id='orderID' value="+ds[index]['orderID']+"></td><td>&nbsp;"+ds[index]['orderID']+"&nbsp;</td><td>&nbsp;"+ds[index]['username']+"&nbsp;</td><td>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td>&nbsp;"+ds[index]['price']+"&nbsp;</td><td>&nbsp;"+ds[index]['howmany']+"&nbsp;</td><td>&nbsp;"+ds[index]['total']+"&nbsp;</td><td>&nbsp;"+ds[index]['status']+"&nbsp;</td></tr>";

                    }
                }
                content +="</table><br><input type='button' id='submit' value='送出'>";
                content +="<div id=show_area></div>";
            $("#"+this.position_id).html(content);
            
            this.loadModuleScript(this.module,"do_update_action");
            
            $('#submit').on('click',function(){
                (new managerhistory_do_update_action('managerhistory','do_update_action','show_area')).run();
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
