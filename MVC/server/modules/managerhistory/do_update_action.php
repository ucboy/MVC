<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_update_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();
        $orderID=$post['orderID'];
        $status=$post['status'];
        if($status==1)
        {
            $status="製作中";
        }
        if($status==2)
        {
            $status="運送中";
        }
        if($status==3)
        {
            $status="已抵達";
        }
        $conn= PDO_mysql::getConnection();
        $sql="UPDATE `order` SET status=? WHERE orderID=?";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute(array($status,$orderID));

        if($result)
        {
            $return_value['status_code']=0;
            $return_value['status_message']='更改成功';
        }
        else
        {
            $return_value['status_code']=-1;
            $return_value['status_message']='請選擇一筆訂單';
            $return_value['sql']=$sql;
        }
        
        return json_encode($return_value);
    }
}

?>