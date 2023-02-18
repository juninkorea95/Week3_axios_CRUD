import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: ''
  })
  const [targetId, setTargetId] = useState('')
  const [content, setContent] = useState('')

  //조회
  const fetchTodos = async () => {
    // const response = await axios.get("http://localhost:4000/todos")
    const { data } = await axios.get("http://localhost:4000/todos")
    // console.log("response", response)
    console.log("data", data)
    setTodos(data)
  }

  //추가
  const onSubmitHandler = async () => {
    axios.post('http://localhost:4000/todos', inputValue)
    fetchTodos()
  }

  //삭제
  const onDeleteButtonClickHandler = async (id) => {
    axios.delete(`http://localhost:4000/todos/${id}`)
    setTodos(todos.filter((todo) => {return todo.id !== id}))
  }

  //수정
  const onUpdateButtonClickHandler = async () => {
    axios.patch(`http://localhost:4000/todos/${targetId}`, {
      title: content
    })
    setTodos(todos.map((todo) => {
      return (todo.id == targetId) ? {...todo, title: content} : todo 
    }));
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <>
    
    <div>
      <div>
        <input 
        type = "text" placeholder='수정할 아이디'
        value = {targetId}
        onChange = {(e) => {setTargetId(e.target.value)}}   
        />
        
        <input type = "text" placeholder='수정 내용'
         value = {content}
         onChange ={(e) => {setContent(e.target.value)}}
        />

        <button onClick={onUpdateButtonClickHandler}>수정</button>
        <br/>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          //버튼 클릭시 input에 들어있는 값(inputValue)을 POST요청 해야함 
          onSubmitHandler()
        }}
      >
        <input 
        type = "text"
        value = {inputValue.title}
        onChange = {(e) => {
          setInputValue({
            title : e.target.value
          })
        }}
        />
        <button>추가</button>
      </form>
    </div>
    
    <div>
    {todos?.map((todo)=>{
      return (
        <div key ={todo.id}>
          {todo.id} : {todo.title}
          &nbsp; <button onClick = {()=>onDeleteButtonClickHandler(todo.id)}>삭제</button>
        </div>
      )
      
    })}
    </div>
    
    </>

  
  )
  
}

export default App;
