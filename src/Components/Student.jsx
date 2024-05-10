import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';


export default function Student() {
    const paperStyle = {padding:"50px 20px", width:600, margin:"20px auto"}
    const [name, setName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [students,setStudents] = React.useState([])
    
    const handleSumbit = (e) => {
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        const options = {  
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(student)
          }
        fetch("http://localhost:9820/student/add",options).then(()=>{
            console.log("new student added");
        })
    }
    React.useEffect(()=>{
        fetch("http://localhost:9820/student/fetchAll")
        .then(res=>res.json())
        .then(result=>{setStudents(result)})
    },[])
  return (
    <Container>
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color: "#faaa55", fontFamily: "monospace"}}>Add Student</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}/>
    </Box>
    <Button variant="contained" color="secondary" onClick={handleSumbit}>Sumbit</Button>    
    </Paper>
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color: "#52fc03", fontFamily: "monospace"}}>Students</h1>
        {students.map(student => (
            <Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={student.id}>
                Id:{student.id}<br/> Name:{student.name}<br/> Address:{student.address}
            </Paper>
                
        ))}
    </Paper>
    
    </Container> 
  );
}
