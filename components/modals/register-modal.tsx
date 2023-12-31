"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import {useForm} from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
import axios from 'axios'

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { signIn } from "next-auth/react";

const RegisterModal = () => {

  const [step, setStep] = useState(1)
  const [data, setData] = useState({name: '', email: ''})
  
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() =>{
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = step === 1 
    ? <RegisterStep1 setData={setData} setStep={setStep}/> 
    : <RegisterStep2 data={data}/>

  const footer = <div className="text-slate-300 text-center mb-4">Already have an Account? 
  <span
    onClick={onToggle}
     className="text-sky-500 duration-200 hover:underline cursor-pointer mx-2">Login</span></div>

  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  );
};

export default RegisterModal;

function RegisterStep1({
  setData,
  setStep
}: {
  setData: Dispatch<SetStateAction<{name: string, email: string}>>;
  setStep: Dispatch<SetStateAction<number>>;
}){

  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      name: "",
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    try {
      const {data} = await axios.post("/api/auth/register?step=1", values)
      if(data.success) {
        setData(values)
        setStep(2)
      }
    } catch (error: any) {
        if(error.response.data.error){
          setError(error.response.data.error);
        }
        else {
          setError('Something went wrong, Please try again');
        }
    }
  }

  const {isSubmitting} = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
        {error && (
          <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        ) }
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={"Next"} type="submit"  fullWidth large disabled={isSubmitting}/>
      </form>
    </Form>
  )
}

function RegisterStep2({data}:{data: {name: string, email: string}}){
  
  const [error, setError] = useState('');
  const registerModal = useRegisterModal();

  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    try {
      const {data: response} = await axios.post("/api/auth/register?step=2",{...data,  ...values})
      if(response.success){
        signIn('credentials', {
          email: data.email,
          password:values.password,
        })
        registerModal.onClose();
      }
    } catch (error: any) {
      if(error.response.data.error){
        setError(error.response.data.error);
      }
      else {
        setError('Something went wrong, Please try again');
      }
    }
  }

  const {isSubmitting} = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
        {error && (
          <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={"Sign Up for Free"} type="submit"  fullWidth large disabled={isSubmitting}/>
      </form>
    </Form>

  )
} 