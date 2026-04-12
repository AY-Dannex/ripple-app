import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { useUser } from "../context/UserContext"
function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useUser()

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            const response = await fetch ("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            
            if (response.ok){
                toast.success("Login successful")
                setUser(data.user)
                navigate("/home")
            }else{
                toast.error(data.message)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Something went wrong... Please try again later")
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
           <div className="w-full h-screen flex justify-center items-center px-5 bg-[#060612]">
                <Card className="w-full px-1 sm:w-100">
                    <CardHeader>
                        <CardTitle  className="text-xl">Login to your account</CardTitle>
                        <CardDescription>Enter all fields below to login into your account</CardDescription>
                    </CardHeader>
                     <CardContent className="flex flex-col gap-3">
                        <Label>Email:</Label>
                        <Input type="email" readOnly={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"></Input>
                        <Label>Password:</Label>
                        <Input type="password" readOnly={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"></Input>
                        <Button disabled={isLoading} onClick={handleLogin} className="py-5 cursor-pointer"> {isLoading? <Loader2 className="animate-spin" /> : "Login"} </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p>Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a></p>
                    </CardFooter>
                </Card>
           </div>
        </>
    )
}
export default Login