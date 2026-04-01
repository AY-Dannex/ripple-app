import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
function Register () {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            setIsLoading(true)
            const response = await fetch ("https://ripple-app-backend-jkkz.onrender.com/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ username, email, password })
            })
            const data = await response.json()
            
            if (response.ok){
                toast.success("Account created successfully")
                navigate("/login")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    return(
        <>
           <div className="w-full h-screen flex justify-center items-center px-5 bg-[#060612]">
                <Card className="w-full px-1 sm:w-100">
                    <CardHeader>
                        <CardTitle className="text-xl">Register an account</CardTitle>
                        <CardDescription>Enter all fields below to register your account</CardDescription>
                    </CardHeader>
                     <CardContent className="flex flex-col gap-3">
                        <Label>Username:</Label>
                        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username"></Input>
                        <Label>Email:</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></Input>
                        <Label>Password:</Label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"></Input>
                        <Button disable={isLoading} onClick={handleRegister} className="py-5 cursor-pointer">{isLoading ? <Loader2 className="animate-spin" /> : "Register"} </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p>You already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
                    </CardFooter>
                </Card>
           </div>
        </>
    )
}
export default Register