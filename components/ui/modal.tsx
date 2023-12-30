import { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
} from "./dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  step?: number;
  totalSteps?: number;
  loginTitle?: string;
}

const Modal = ({
  isOpen,
  body,
  footer,
  onClose,
  step,
  totalSteps,
  loginTitle,
}: ModalProps) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-black">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className=" w-fit h-fit flex items-center rounded-full bg-slate-500 duration-200 hover:bg-white hover:text-black p-2">
              <X size={20} />
            </button>
                {step && totalSteps && (
                  <h1 className="text-2xl font-bold text-white">Step {step} of {totalSteps}</h1>
                )}
                {loginTitle && (
                  <h1 className="text-2xl font-bold text-white">
                    {loginTitle}
                  </h1>
                )}

          </div>
          <div className="mt-4">{body}</div>
          {footer && <div className="mt-4">{footer}</div>}
        </DialogContent>
      </Dialog>
    </>
  );
};


export default Modal