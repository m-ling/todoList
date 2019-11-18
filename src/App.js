import React,{Component}from 'react'
import {List,Avatar,Input, Modal, message} from 'antd'

import './App.css';

const { Search } = Input;
const key = 'updatable';
export default class App extends Component {
  constructor(){
    super()
    this.state={
      todoList:[//事项列表
        {id:'0',listevent:'吃饭'},
        {id:'1',listevent:'学习'},
        {id:'2',listevent:'睡觉'},
        {id:'3',listevent:'遛狗'},
    ],
      delPro: false,//删除-对话框状态
      EditPro:false,//编辑-对话框状态
      eventId:'',//事项的id
      addVal:'',//添加事项 input的value
      newval:''//编辑后新的value
    }

  }
  // 添加事项
  doInputChange=(e)=>{
     this.setState({
      addVal:e.target.value
     })
  }

  //删除--对话框
  /**----start-------- */
  showModalDel (i){
    this.setState({
      delPro: true,
      eventId:i
    });//弹出对话框
  };
  
  handleOkDel=()=>{
    this.state.todoList.forEach((val,i)=>{
      if(val.id===this.state.eventId){
       this.state.todoList.splice(i,1);
      }
     })
     let todoList2=this.state.todoList;
    this.setState({
      delPro: false,
      todoList:todoList2,
     
    });
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: '删除成功', key, duration: 2 });
    });
  };

  handleCancelDel = e => {
    this.setState({
      delPro: false,
    });
  };/**-----end------ */

  // 编辑--对话框
   /**----start-------- */
  showModalEdit(i){
    this.setState({
      EditPro: true,
      eventId:i
    });//弹出对话框
  };
  handleOkEdit=()=>{ //点击确认后的事件
    console.log(this.state.newval);
    let Edyted=this.state.todoList.map((val,i)=>{
      if(i==this.state.eventId){
       val.listevent=this.state.newval;
       return val
      }
      return val;
    })
    //修改成功提示框
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: '修改成功', key, duration: 2 });
    });
    this.setState({
      EditPro: false,
      todoList:Edyted
    })
  }
  handleCancelEdit=()=>{
    this.setState({
      EditPro: false
    });
  }
  EditChange=(e)=>{//编辑处的表单变化后触发
   this.setState({
    newval:e.target.value
   })
  }
  /**-----end------ */


  render(){
    return (
      <div>
        <h2 style={{color:'#72879a',margin:'20px',textAlign:'center'
            }}>李静的今日待办事项列表</h2>
      <div>
        {/* 添加事项输入框 */}
        <Search
          placeholder="input search text"
          enterButton="添加事项"
          size="large"
          value={this.state.addVal}
          onChange={this.doInputChange}//input内容改变
          onSearch={val =>{//点击按钮后
              if(val){
                let listId=this.state.todoList.length;
                this.state.todoList.push({id:listId++,listevent:val});
                 let todoList=this.state.todoList;
                this.setState({
                  todoList,
                  addVal:''//点击添加事项按钮后，清空input value
                });
              }
            }
          }
         />
      </div>
        <div>
    <List
 
      dataSource={this.state.todoList}//渲染列表
      renderItem={item => {
      return( 
        //****事件列表
        <List.Item key={item.id}
        actions={[
         <div>
          {/* 编辑--对话框****/}
          <a onClick={()=>this.showModalEdit(item.id)}>Edit</a>
          <Modal
          title='Edit'
          okText='ok'
          cancelText='Dot alter'
          centered='true'//对话框居中
          destroyOnClose='true'//关闭时删除书写内容
          visible={this.state.EditPro}//对话框状态属性
          onOk={this.handleOkEdit}//点ok后触发事件
          onCancel={this.handleCancelEdit}//点击Dot alter后触发的事件
        >
          {/*对话框中间的内容 */}
          <p>please enter the event you want to modify.</p>
          <Input placeholder="what do you want to do?"  onChange={this.EditChange}/>
        </Modal>
         </div>
          ,
          <div>
            {/* 删除--对话框****/}
          <a onClick={()=>this.showModalDel(item.id)}>Delete</a>
          <Modal
            title='Delete events'
            okText='yes'
            cancelText='no'
            centered='true'
            visible={this.state.delPro}
            onOk={this.handleOkDel}//点击yes后触发的事件
            onCancel={this.handleCancelDel}
          >
            <p>Do you Want to delete these items?</p>
          </Modal>
        </div>
        ]}        
      >
          <List.Item.Meta 
            avatar={//官网例子图片
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={<a href="https://ant.design">{item.listevent}</a>}//事项名
          />         
      </List.Item>      
      )  
    }}
    />
  </div>
      </div>
    )
  }
}