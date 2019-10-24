
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
        $opinion=$post['username'];
   
        
        if($opinion != NULL)
        {
            
            $conn= PDO_mysql::getConnection();
            $sql="INSERT INTO `opinion` (`username`, `userOpinion`) VALUES (?,?);";
            $stmt=$conn->prepare($sql);
            $result=$stmt->execute(array($username,$opinion));
        
            if($result)
            {
                $return_value['status_code']=0;
                $return_value['status_message']='客訴成功';
            }
            else
            {
                $return_value['status_code']=-1;
                $return_value['status_message']='輸入錯誤';
                $return_value['sql']=$sql;  
            }
            
            return json_encode($return_value);
        
            
        }
        else
        {
            $return_value['status_code']=-2;
            $return_value['status_message']="不可為空白";
            
            return json_encode($return_value);
        }

        

    }
}
?>