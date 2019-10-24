class login_show_login_page extends ActionHandler
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
                 使用者帳號：<input type='text' id='username'><br>
                 密碼：      <input type='password' id='pass'><br>
                 <input type='button' id='submit' value='送出'>
                 <div id="show_area"></div>`;
        $('#'+this.position_id).html(str);
        
        this.loadModuleScript(this.module,"do_login_action");

        $('#submit').on('click',function(){
            (new login_do_login_action('login','do_login_action','show_area')).run();
        });
    }
}