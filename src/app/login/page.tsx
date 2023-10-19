import Input from "@/components/Input";
import LogInForm from "@/components/form/LogInForm";
import loginAction from "../actions/LoginAction"


const Login = () => {
 
  return (
    <div className="flex flex-col justify-between gap-5 ">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h5 className="text-gray-600">Username: test</h5>
        <h5 className="text-gray-600">Password: test</h5>
      </div> 
      <div>
      <LogInForm action={loginAction}/> 
       {/* Не понимаю, как этот компонент сделать контролируемым и выполнить action, поэтому снизу работающая форма */}
    <form className="space-y-4 p-10 bg-white shadow-lg" action={loginAction}>
      <Input name="username" type="text" placeholder="username" required />
      <Input name="password" type="password" placeholder="password" required />
      <button type="submit">Login</button>
    </form>
    </div>
    </div>
  );
};

export default Login;
