<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_insert_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();
        $username=$_COOKIE["username"];
        $id=$post['id'];
        $howmany=$post['howmany'];
        $conn= PDO_mysql::getConnection();
        $sql="SELECT prodName,price From products WHERE id=$id";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute();
        $rows=$stmt->fetchAll();
        foreach ($rows as $row)
        {
            $prodName=$row['prodName'];
            $price=$row['price'];
        }
        $total=$price*$howmany;
        if($total>=500)
        {
            $total=$total*0.9;
        }
        $sql="INSERT INTO `order` (`username`,`id`,`prodName`,`price`,`howmany`,`total`) VALUES (?,?,?,?,?,?);";
        $stmt=$conn->prepare($sql);
        $result=$stmt->execute(array($username,$id,$prodName,$price,$howmany,$total));
        if($result)
        {
            $return_value['status_code']=0;
            $return_value['status_message']='點餐成功';
        }
        else
        {
            $return_value['status_code']=-1;
            $return_value['status_message']='請選擇一項餐點';
            $return_value['sql']=$sql;
        }
        
        return json_encode($return_value);
    }
}

?>