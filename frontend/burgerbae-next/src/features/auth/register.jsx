import React from "react";
import { Dialog, DialogContent, DialogTrigger ,DialogTitle} from "@/components/ui/dialog";
import { RegisterFormTextarea } from "./components/registerForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";


export function Register({ trigger }) {
  return (
    <>
      <Dialog className=" max-w-[25rem] md:!w-[80vw]"
      >
          <DialogTrigger asChild>{trigger}</DialogTrigger>

          <DialogContent
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 25%), #dc6f00",
            }}
            className="w-[90vw] rounded-lg
  max-w-[360px]
  md:w-full
  md:max-w-3xl
 
  [&>button]:top-[]1rem]
    [&>button]:right-[0.5rem]
   "
          >
              <VisuallyHidden>
    <DialogTitle>Register</DialogTitle>
  </VisuallyHidden>
            <div className="flex flex-col  md:flex-row ">
              {/* brand */}
              <div className="p-5 flex flex-col justify-center m-4 w-[80%]">
             <div className="flex gap-4 items-center">
  <div className="relative w-[50%] aspect-[4/2]">
    <Image
      src="https://assets.gokwik.co/uploads/1756184286845_All%20BURGER%20BAE%20LOGO%20%20%20(1).jpg"
      alt="burger_bae logo"
      fill
      className="object-contain"
    />
  </div>

  <div className="relative w-[30%] aspect-[4/1]">
    <Image
      src="https://assets.gokwik.co/images/powered_by_kp_4px.svg"
      alt="powered_by"
      fill
      className="object-contain"
    />
  </div>
</div>
                <div>
                  <h4 className="font-bold text-[20px] mt-2 text-start">
                    Register now to avail best offers!
                  </h4>
                </div>
              </div>

              {/* login form */}
              <div>
                <RegisterFormTextarea />
              </div>
            </div>
          </DialogContent>
      </Dialog>
    </>
  );
}

export default Register;
