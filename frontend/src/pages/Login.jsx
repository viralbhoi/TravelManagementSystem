import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {

  const { setLoggedInUser, admins, users, drivers, setAdmins, setDrivers, setUsers } = useAppContext();

  const [islogin, setisLogin] = useState(true);
  const [role, setRole] = useState('');//to set the vehicle in the sign up form ie show if role==rider  and islogin==false

  function handlerole(e) {
    setRole(e.target.value);
  }

  const navig = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    console.log(form)
    if (islogin) {

      const email = form.email.value;
      let user = null;
      // console.log(form.role.value)
      if (form.role.value === 'user') user = users.find(u => u.email === email)
      else if (form.role.value === 'rider') user = drivers.find(u => u.email === email)
      else user = admins.find(u => u.email == email)
      // console.log(user)
      if (!user || user.password != form.password.value) {
        return alert("Invaid Creds")
      }

      setLoggedInUser({ ...user, role })
      navig(`/${role}`)
    }
    else {

      if (form.role.value === 'user') {
        setUsers(...users, { name: `${form.fname.value} ${form.lname.value}`, email: form.email.value, password: form.password.value });
      }
      else if (form.role.value === 'rider') {
        setDrivers(...ride, { name: `${form.fname.value} ${form.lname.value}`, email: form.email.value, password: form.password.value, vehicleType: form.vehice.value });
      }
      else {
        setAdmins(...admins, { name: `${form.fname.value} ${form.lname.value}`, email: form.email.value, password: form.password.value });
      }
      
      setTimeout(() => {
        setisLogin(true);
      }, 1000)

    }

  } {/*pls modify this functiion as the use of the data folder*/ }
  return (
    <div className="flex items-center min-h-screen justify-center  bg-indigo-900 shadow-xl shadow-amber-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* bg-cyan-500 flex-col min-h-100 rounded-md border-1 */}
        <div>
          <h1 className="flex items-center justify-center text-2xl">{islogin ? 'Login' : 'Signup'}</h1>
          <div className="flex justify-center pt-6 gap-10 mb-5">
            <button className={`flex-1 rounded-2xl h-10 ${islogin ? 'bg-indigo-400' : 'bg-indigo-100'}`} onClick={() => { setisLogin(true) }}>Login</button>
            <button className={`flex-1 rounded-2xl h-10 ${islogin ? 'bg-indigo-100' : 'bg-indigo-400'}`} onClick={() => { setisLogin(false) }}>Signup</button>
          </div>
        </div>
        <form className="flex-col space-y-7 items-center justify-center" onSubmit={handleSubmit}>

          {!islogin && <> <div className=''>
            <label htmlFor="fname" className="block pb-2">fname</label>

            <input type="text" placeholder="fname" className=" px-3 py-2  w-full border rounded bg-amber-50" name="fname" required />
          </div></>}

          {!islogin && <> <div className=''>
            <label htmlFor="lname" className="block pb-2">lname</label>
            <input type="text" placeholder="lname" className=" px-3 py-2 block  w-full border rounded bg-amber-50" name="lname" />
          </div></>
          }
          <div className=''>
            <label htmlFor="email" className="block pb-2">email</label>
            <input type="text" placeholder="email" className=" px-3 py-2 block  w-full border rounded bg-amber-50 " name="email" required />
          </div>

          <div className=''>
            <label htmlFor="password" className="block pb-2">password</label>
            <input type="text" placeholder="password" className=" px-3 py-2 block  w-full border rounded bg-amber-50" name='password' required />
          </div>

          <div className=''>
            <label htmlFor="role" className="block pb-2">role</label>
            <select type="" placeholder="option" onChange={handlerole} className=" px-3 py-2 block  w-full border rounded bg-amber-50" name='role' required >
              <option value="admin">admin</option>
              <option value="user">user</option>
              <option value="rider">rider</option>
            </select>
          </div>

          {!islogin && role === 'rider' && <><div className=''>
            <label htmlFor="vehicle" className="block pb-2">vehicle</label>
            <select type="" placeholder="option" className=" px-3 py-2 block  w-full border rounded bg-amber-50" name='vehicle' required >
              <option value="car">car</option>
              <option value="bus">bus</option>
              <option value="auto">auto</option>
            </select>
          </div></>}

          <button type="submit" className="mt-4 py-2 px-3 w-full border rounded hover:bg-blue-600 bg-indigo-400">{islogin ? 'Login' : 'Signup'}</button>
        </form>
      </div>
    </div>
  )
}

