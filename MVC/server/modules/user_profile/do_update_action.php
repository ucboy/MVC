<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_update_action implements ActionListener
{
    public function actionPerformed($event_message) 
    {
        $post=$event_message->getPost();
        
        $id=$post['id'];
        $id_2=$post['id_2'];
        $prodName=$post['prodName'];
        $price=$post['price'];


        if($prodName==="" || $price==="")
        {
            $return_value['status_code']=-1;
            $return_value['status_message']="不可為空白";
            
            return json_encode($return_value);
        }
        else
        {
            $conn= PDO_mysql::getConnection();
            $sql="UPDATE `products` SET id=?, prodName=?, price=? WHERE id=?";
            $stmt=$conn->prepare($sql);
            $result=$stmt->execute(array($id_2,$prodName,$price,$id));

            if($result)
            {
                $return_value['status_code']=0;
                $return_value['status_message']='更新成功';
            }
            else
            {
                $return_value['status_code']=-1;
                $return_value['status_message']='資料重複';
                $return_value['sql']=$sql;
            }

            return json_encode($return_value);

        }        
    }
}

?>