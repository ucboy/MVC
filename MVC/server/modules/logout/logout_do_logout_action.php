
<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_login_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
    }
}
?>