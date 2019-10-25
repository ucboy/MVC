class promotion_show_promotion_page extends ActionHandler
{
    constructor(module,action,position_id)
    {
        super(module,action);
        this.position_id=position_id;
        this.php=false;
    }
    
    showResult()
    {
        var str=`滿500打5折喔`;
        $('#'+this.position_id).html(str);

    }
}