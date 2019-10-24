<?php
require_once (__ROOT__.'/include/PDO_mysql.php');
require_once (__ROOT__.'/include/ActionListener.php');
require_once (__ROOT__.'/include/event_message.php');

class do_login_action implements ActionListener
{
    public function actionPerformed($event_message)
    {
        $post=$event_message->getPost();
        $username=$post['username'];
        $pass=$post['pass'];
        if($username != NULL && $pass != NULL)
        {
            $conn= PDO_mysql::getConnection();
            $sql="SELECT username,pass,Permission FROM `member` WHERE username='$username'";
            $stmt=$conn->prepare($sql);
            $result=$stmt->execute();
            $rows=$stmt->fetchAll();
            if($rows==NULL)
            {
                 $return_value['status_code']=-1;
                 $return_value['status_message']='登入失敗';
            }
            if($result)
            {
                foreach($rows as $row)
                {
                    if($row['username']==$username && $row['pass']==$pass )
                    {
                       if($row['Permission']==0)
                       {
                            setcookie("username", $username, time()+3600);
                            $return_value['status_code']=0;
                            $return_value['status_message']='登入成功';
                       }
                       if($row['Permission']==1)
                       {
                            setcookie("username", $username, time()+3600);
                            $return_value['status_code']=1;
                            $return_value['status_message']='登入成功';
                       }
                        
                    }
                    else
                    {
                        $return_value['status_code']=-1;
                        $return_value['status_message']='登入失敗';
                        $return_value['sql']=$sql;  
                    }
                }
            }
        }
        else
        {
            $return_value['status_code']=-2;
            $return_value['status_message']='不可為空白';
        }
        
        
        return json_encode($return_value);
    }
}
?>