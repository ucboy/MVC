class logout_do_logout_action extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=false;
    }
    
    showResult()
    {
        window.location.replace('http://fs.mis.kuas.edu.tw/~s1106137117/MVC/client');
    }
}