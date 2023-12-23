import Image from "next/image"
import Button from "../ui/button"
import {FcGoogle} from 'react-icons/fc';
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:gap-12 content-center h-screen">
        <Image
          src={'/images/next.svg'}
          alt="X_logo"
          width={150}
          height={200}
          className="justify-self-center xl:w-[450px] xl:h-[250px] hidden md:block"
        />

        <div className="flex flex-col justify-around items-center h-[70vh]">
          <h1 className=" text-3xl md:text-5xl font-bold">Happening Now</h1>
          <div className="w-full md:w-[60%]">
            <h2 className="font-bold text-2xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                label={
                  <div className="flex items-center justify-center gap-4">
                    <FcGoogle/>
                    <p>Sign Up with Google</p>
                  </div>
                }
                fullWidth secondary
              />
              <Button
                label={
                  <div className="flex items-center justify-center gap-4">
                    <FaGithub/>
                    <p>Sign Up with Github</p>
                  </div>
                }
                fullWidth secondary
              />
              <div className="flex items-center gap-2 justify-center">
                <div className="w-1/2 h-px bg-gray-700"></div>
                <p>Or</p>
                <div className="w-1/2 h-px bg-gray-700"></div>
              </div>
              <Button
                label={'Create an Account'}
                fullWidth
              />
              <div className="text-[10px] text-gray-400">
                By signing up, you agre to the{""}
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500">Privacy Policy</span>, including
                <span className="text-sky-500">Cookie Use</span>.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[60%]">
            <h5 className="text-xl mb-4">Already have an account?</h5>
            <Button label={'Sign In'} fullWidth outline/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth