<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_insert_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();
        
        $username=$post['username'];
        $pass=$post['pass'];
        $passagain=$post['passagain'];
        $name=$post['name'];
        $phone=$post['phone'];
        $birthday=$post['birthday'];
        
        if($pass===$passagain && $username != NULL && $pass != NULL && $passagain != NULL && $phone != NULL && $birthday != NULL )
        {
            
            $conn= PDO_mysql::getConnection();
            $sql="INSERT INTO `member` (username,pass,name,phone,birthday) VALUES (?,?,?,?,?)";
            $stmt=$conn->prepare($sql);
            $result=$stmt->execute(array($username,$pass,$name,$phone,$birthday));
        
            if($result)
            {
                $return_value['status_code']=0;
                $return_value['status_message']='註冊成功';
            }
            else
            {
                $return_value['status_code']=-1;
                $return_value['status_message']='帳號重複';
                $return_value['sql']=$sql;  
            }
            
            return json_encode($return_value);
        
            
        }
        else
        {
            $return_value['status_code']=-2;
            $return_value['status_message']="不可為空白 or 密碼錯誤";
            
            return json_encode($return_value);
        }

        

    }
}
?>