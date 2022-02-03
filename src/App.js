import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const App = ()=> {
  const [count, setCount] = React.useState(0)
  return(
    <div>
      <h1>Hello World</h1>

      <Button variant="contained" 
      onClick={()=>setCount(v=>v+1)}
      color="warning"
      size="medium"
      startIcon={<SendIcon/>}
      >
        Click me
      </Button>

      <h4>{count}</h4>
    </div>
  )
}

export default App;
