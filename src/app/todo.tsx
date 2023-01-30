import React, { useState } from 'react'
import {  extendTheme, withDefaultSize, Heading,Stack, Box, Button, Input, List, ListItem, Checkbox, useToast, useColorMode, Switch } from '@chakra-ui/react'





interface Todo {
  text: string
  isCompleted: boolean
}

const TodoComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  const handleAddTodo = () => {
    if (!inputValue) {
      toast({
        title: "Task can't be empty.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    setTodos([...todos, { text: inputValue, isCompleted: false }])
    setInputValue('')
  }

  const handleTodoClick = (index: number) => {
    const newTodos = [...todos]
    const todo = newTodos[index]
    if (todo.isCompleted) {
      newTodos.splice(index, 1)
    } else {
      todo.isCompleted = !todo.isCompleted
    }
    setTodos(newTodos)
  }


  const customTheme = extendTheme(
    withDefaultSize({
      size: 'lg',
      components: ['Button', 'Badge'],
    }),
  )
  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '500px',
    '2xl': '1536px',
  }
  
  // 3. Extend the theme
  const theme = extendTheme({ breakpoints })
  
  // 4. Now you can use the custom breakpoints
  
  return (
  
    <Box
    m="auto"width={{ base: '100%', sm: '75%', md: '75%' ,lg:'100%'}} p={2}>
    
      <Switch 
          mt={2}
          position="relative"
          color="teal"
          onChange={toggleColorMode}
          isChecked={colorMode === 'dark'}
        />
      <Heading textAlign="center" bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  >Todo App By Anam</Heading>
      <Box mt="50px"justifyContent="space-between">
      
        <Stack direction='row' spacing={4} align='center'>
        <Input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add Your Task Here"
          
        />
        
        <Button onClick={handleAddTodo} size="md">
          Add Todo
        </Button>

 
</Stack>
        
      </Box>
      <List mt={5}>
        {todos.map((todo, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <Checkbox 
              isChecked={todo.isCompleted} 
              onChange={() => handleTodoClick(index)} 
            />
            <Box ml={2} 
              style={{ 
                textDecoration: todo.isCompleted ? 'line-through' : 'none', 
                cursor: 'pointer' 
              }}
              onClick={() => handleTodoClick(index)}
            >
              {todo.text}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TodoComponent
