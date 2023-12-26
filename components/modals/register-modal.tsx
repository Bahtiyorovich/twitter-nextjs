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


const RegisterModal = () => {

  const [step, setStep] = useState(1)
  const [data, setData] = useState({name: '', email: ''})
  const [nextData, setNextData] = useState({username: '', password: ''})

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onToggle = useCallback(() =>{
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = step === 1 ? <RegisterStep1 setData={setData} setStep={setStep}/> : <RegisterStep2 setNextData={setNextData}/>

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
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      name: "",
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    setData(values)
    setStep(2)
  }

  const {isSubmitting} = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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

function RegisterStep2({
  setNextData,
}: {
  setNextData: Dispatch<SetStateAction<{username: string, password: string}>>;
}){

  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    setNextData(values)
  }

  const {isSubmitting} = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
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