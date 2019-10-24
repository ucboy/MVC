class opinion_show_insert_page extends ActionHandler
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
                 我有話要說!：<input type='text' id='username'><br>
                 <input type='button' id='submit' value='客訴'>
                 <div id="show_area"></div>`;
        $('#'+this.position_id).html(str);
        
        this.loadModuleScript(this.module,"do_insert_action");

        $('#submit').on('click',function(){
            (new opinion_do_insert_action('opinion','do_insert_action','show_area')).run();
        });
    }
}