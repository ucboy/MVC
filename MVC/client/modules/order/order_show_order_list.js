class order_show_order_list extends ActionHandler
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
            var content="<table border=1>\n\
                        <tr><td>&nbsp;&nbsp;</td><td>&nbsp;號碼&nbsp;</td><td>&nbsp;餐點名稱&nbsp;</td><td>&nbsp;餐點價錢&nbsp;</td><td>&nbsp;份數&nbsp;</td></tr>";
            var ds=xhttp['data_set'];

            for(var index in ds)
            {
                if(index==0)
                {
                    content +="<tr><td><input type='radio' name='id' id='id' value="+ds[index]['id']+"></td><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td id='prodName'>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td id='price'>&nbsp;"+ds[index]['price']+"&nbsp;</td><td><select name='howmany' id='howmany' ><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option></select></td></tr>";
                }
                else
                {
                    content +="<tr><td><input type='radio' name='id' id='id' value="+ds[index]['id']+"></td><td>&nbsp;"+ds[index]['id']+"&nbsp;</td><td id='prodName'>&nbsp;"+ds[index]['prodName']+"&nbsp;</td><td id='price'>&nbsp;"+ds[index]['price']+"&nbsp;</td></tr>";

                }
            }
            content +="</table><br><input type='button' id='submit' value='送出'>";
            content +="<div id=show_area></div>";
            $("#"+this.position_id).html(content);
            
            this.loadModuleScript(this.module,"do_insert_action");
            
            $('#submit').on('click',function(){
                (new order_do_insert_action('order','do_insert_action','show_area')).run();
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
