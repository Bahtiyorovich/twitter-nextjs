"use client"
import * as z from 'zod'
import useLoginModal from "@/hooks/useLoginModal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Modal from "../ui/modal";
import { loginSchema } from "@/lib/validation";
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Button from '../ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import axios from 'axios';

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { signIn } from 'next-auth/react';


const LoginModal = () => {
  
  const [error, setError] = useState('');
  const loginTitle = 'Welcome Back!'

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onToggle = useCallback(() =>{
    loginModal.onClose();
    registerModal.onOpen();
  },[loginModal,registerModal]);


  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const {data} = await axios.post('/api/auth/login',values)
      if(data.success) {
        signIn('credentials', values)
        loginModal.onClose();
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

  const bodyContent = (
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
        <Button label={"Login"} type="submit"  fullWidth large disabled={isSubmitting}/>
      </form>
    </Form>
  )
  const footer = <div className="text-slate-300 text-center mb-4">Create an Account? 
      <span
        onClick={onToggle} 
        className="text-sky-500 duration-200 hover:underline cursor-pointer mx-2">
          Sign Up
      </span>
    </div>


  return (
    <Modal
      body={bodyContent}
      footer={footer}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      loginTitle={loginTitle}
    />
  )
}

export default LoginModal

