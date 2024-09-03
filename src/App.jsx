
import './App.css'

function App() {

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
      body:JSON.stringify(user)
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
    </div>
  )
}

export default App
