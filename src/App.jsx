
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  console.log(users, 'all users');


  const handleDeleteUser = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/${id}`, {
      method:'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          alert('deleted succesfully')
          const remaining = users.filter(user => user._id !== id)
          setUsers(remaining)
        }
      })
  }


  const handleAddUser = (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {
      name,
      email
    }
    // console.log(name,email);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }

  return (

    <div>
      <form onSubmit={handleAddUser} className='space-y-3'>
        <input
          type="text"
          name='name'
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs" />
        <br />
        <input
          type="text"
          name='email'
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs" />
        <br />
        <input type='submit' value="Add User" className="btn btn-active btn-ghost"></input>
      </form>

      <div>
        {
          users.map(user => <div key={user._id}>{user.name} <button onClick={() => handleDeleteUser(user._id)} className='btn btn-secondary'>x</button></div>)
        }
      </div>
    </div>
  )
}

export default App
