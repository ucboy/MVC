class signup_show_insert_page extends ActionHandler
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
                 確認密碼：  <input type='password' id='passagain'><br>
                 真實姓名：  <input type='text' id='name'><br>
                 行動電話：  <input typw='text' id='phone'><br>
                 生日：      <input type='date' id='birthday'><br>
                 <input type='button' id='submit' value='送出'>
                 <div id="show_area"></div>`;
        $('#'+this.position_id).html(str);
        
        this.loadModuleScript(this.module,"do_insert_action");

        $('#submit').on('click',function(){
            (new signup_do_insert_action('signup','do_insert_action','show_area')).run();
        });
    }
}