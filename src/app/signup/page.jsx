'use client';


import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Card,
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Separator,
} from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";




const SignUpPage = () => {

  const router =  useRouter();

  const onSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log(formData);
    const user = Object.fromEntries(formData.entries());
    // console.log(user);
    const {data, error} = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
    })
    console.log(data,error);
    if(data){
      toast.success('Account created successfully');
      setTimeout(() => {
        router.push("/");
      }, 1000);
      
    }
    if(error){
      toast.error(
        error.message || "Already have account or registration failed!",
      );
    }

    
  }
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
    
    return (
      <div className="max-w-7xl mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className=" text-center my-2">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-lg font-semibold">
            Start your adventure with Wanderlust
          </p>
        </div>
        <Card className=" mt-2 mb-10">
          <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
            <TextField
              isRequired
              name="name"
              type="text"
              validate={(value) => {
                if (value.length < 3) {
                  return "Name must be at least 3 characters";
                }
                return null;
              }}
            >
              <Label>Name</Label>
              <Input placeholder="Enter your Name" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="Enter your Email" />
              <FieldError />
            </TextField>
            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError />
            </TextField>
            <div className="flex justify-center gap-2">
              <Button type="submit" className="w-full bg-cyan-600">
               Create Account
              </Button>
            </div>
          </Form>
          <div className="flex justify-center items-center gap-3">
            <Separator className="flex-1"/>
            <div className="whitespace-nowrap">Or Sign Up With </div>
            <Separator className="flex-1"/>
          </div>
          <div>
            <Button onClick={handleGoogleSignIn} variant="outline" className={'w-full'}><FcGoogle />Sign Up With Google</Button>
          </div>
        </Card>
      </div>
    );
};

export default SignUpPage;