import { Card, CardContent, CardTitle, CardHeader, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { useUser } from "../context/UserContext"
import { Waves } from "lucide-react";
function Authentication(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useUser()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    // const [registerEmail, setRegisterEmail] = useState("")
    // const [registerPassword, setRegisterPassword] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const links = ["Sign Up", "Log In"]
    const [tab, setTab] = useState("Sign Up")

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

    const handleRegister = async () => {
        try {
            setIsLoading(true)
            const response = await fetch ("http://localhost:5000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, username, email, password })
            })
            const data = await response.json()
            
            if (response.ok){
                toast.success("Account created successfully")
                // navigate("/login")
                setTab("Log In")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Network Error")
        } finally {
            setIsLoading(false)
        }
    }

    const tabs = links.map((link) => (<Button onClick={() => setTab(link)} className={`px-10 py-[16px] cursor-pointer bg-transparent transition ${ tab === link ? "bg-purple-700" : "" }`}>{link}</Button>))

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center px-5 bg-[#060612]">
            <div className="w-fit mx-auto flex items-center gap-2 mb-5">
                <Waves size={40} className="text-purple-500"/>
                <h1 className="text-white text-[30px] font-medium">Ripple App</h1>
            </div>
            <div className="bg-gray-900/50 border border-white/20 py-5 rounded-2xl w-full sm:w-100">
                <div className="w-fit mx-auto flex gap-1 p-1 bg-white/10 mb-3 rounded-xl">
                    {tabs}
                </div>

                {
                    tab === "Sign Up" ? (
                                <div>
                                    <Card className="w-full px-1 bg-transparent border-none sm:w-100">
                                        <CardHeader>
                                            <CardDescription>Enter all fields below to register your account</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-3">
                                            <div className="flex gap-2 w-full">
                                                <div className="basis-1/2 flex flex-col gap-3">
                                                    <Label className="text-white">First Name:</Label>
                                                    <div>
                                                        <Input type="text" value={firstName} onChange={(e) => {
                                                            setFirstName(e.target.value)
                                                            if(!/^[a-zA-Z]+$/.test(e.target.value)){
                                                                setFirstNameError("Names can only contain letters")
                                                            }else{
                                                                setFirstNameError("")
                                                            }
                                                            }} placeholder="John" className="py-5 border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"></Input>
                                                            {firstNameError && <small className="text-red-500">{firstNameError}</small>}
                                                    </div>
                                                </div>
                                                <div className="basis-1/2 flex flex-col gap-3">
                                                    <Label className="text-white">Last Name:</Label>
                                                    <div>
                                                        <Input type="text" value={lastName} onChange={(e) => {
                                                            setLastName(e.target.value)
                                                            if(!/^[a-zA-Z]+$/.test(e.target.value)){
                                                                setLastNameError("Names can only contain letters")
                                                            }else{
                                                                setLastNameError("")
                                                            }
                                                            }} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Doe"></Input>
                                                            {lastNameError && <small className="text-red-500">{lastNameError}</small>}
                                                    </div>
                                                </div>
                                            </div>
                                            <Label className="text-white">Username:</Label>
                                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="johndoe"></Input>
                                            <Label className="text-white">Email:</Label>
                                            <Input type="registerEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="you@example.com"></Input>
                                            <Label className="text-white">Password:</Label>
                                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Min. 8 characters"></Input>

                                            {/* <Input type="checkbox" name="password" className="w-4"/>
                                            <label for="password">Check Password</label> */}
                                            <Button disable={isLoading} onClick={handleRegister} className="py-6 cursor-pointer bg-purple-500">{isLoading ? <Loader2 className="animate-spin" /> : "Create Account"} </Button>
                                        </CardContent>
                                    </Card>
                            </div>
                    ) : (

                            <div>
                                <Card className="w-full px-1 bg-transparent border-none sm:w-100">
                                    <CardHeader>
                                        <CardDescription>Enter all fields below to login into your account</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-3">
                                        <Label className="text-white">Email:</Label>
                                        <Input type="email" readOnly={isLoading} value={email} onChange={(e) => setEmail(e.target.value)} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="you@example.com"></Input>
                                        <Label className="text-white">Password:</Label>
                                        <Input type="password" readOnly={isLoading} value={password} onChange={(e) => setPassword(e.target.value)} className="py-5 text-white border-gray-100/30 focus-visible:border-1 focus-visible:border-purple-500 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Min. 8 characters"></Input>
                                        <Button disabled={isLoading} onClick={handleLogin} className="py-6 cursor-pointer bg-purple-500"> {isLoading? <Loader2 className="animate-spin" /> : "Log in"} </Button>
                                    </CardContent>
                                </Card>
                        </div>
                    )
                }
            </div>


        </div>
    );
}
export default Authentication