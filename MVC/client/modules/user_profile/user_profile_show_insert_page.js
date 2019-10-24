class user_profile_show_insert_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=false;
    }

    showResult()
    {
        var str=`
                 餐點名稱：<input typw='text' id='prodName'><br>
                 價錢：<input type='text' id='price'><br>
                 <input type='button' id='submit' value='送出'>`;
        $('#'+this.position_id).html(str);
        
        this.loadModuleScript(this.module,"do_insert_action");

        $('#submit').on('click',function(){
            (new user_profile_do_insert_action('user_profile','do_insert_action','show_area')).run();
        });
    }
}