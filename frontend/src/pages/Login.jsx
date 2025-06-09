import { useEffect, useState } from "react"
import { dummyUsers as data } from "../data/DummyData";
import { useNavigate } from "react-router-dom";
export default function Login() {
  
  const [islogin, setisLogin] = useState(false);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    setUser(data.user);
    console.log(data.user)
  }, [])
  
  const navig = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    console.log(form.password)
    if (islogin) 
    {
      const usr = user.find(ele => ele.email === form.email.value)
      console.log(usr)
      if (usr) 
      {

        if (usr && usr.password == form.password.value) {
          if (usr.role=='admin') {
            navig('/admin')
          }
          else if (usr.role==='driver') {
            navig('/driver')
          }
          else
          {
            navig('/user')
          }
        }
      }
      else 
      {
        console.log('Access Denied')
      }
    }
    else
    {
       data.user.push({
        fname:form.fname.value,
        lname:form.lname.value,
        email:form.email.value,
        password:form.password.value,
      });

      setTimeout(()=>{
        setisLogin(true);
      },1000)

    }

  }  {/*pls modify this functiion as the use of the data folder*/}
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
            <input type="text" placeholder="lname" className=" px-3 py-2 block  w-full border rounded bg-amber-50" name="lname" required />
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

          <button type="submit" className="mt-4 py-2 px-3 w-full border rounded hover:bg-blue-600 bg-indigo-400">{islogin ? 'Login' : 'Signup'}</button>
        </form>
      </div>
    </div>
  )
}

