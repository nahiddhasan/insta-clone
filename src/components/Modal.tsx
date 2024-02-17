"use client";
import useOutsideClick from "@/hooks/outsideClick";
type modalProp = {
  width?: string;
  onClose: () => void;
  children: React.ReactNode;
};
const Modal = ({ width, onClose, children }: modalProp) => {
  const modalRef = useOutsideClick(() => {
    onClose();
  });

  return (
    <div className="dark:bg-zinc-900/10 backdrop-blur-sm fixed inset-0 z-[200]">
      <div
        ref={modalRef}
        className={`fixed drop-shadow-lg top-[50%] left-[50%] max-h-[90%] h-auto sm:max-h-[85vh] w-[90%] sm:w-[90vw] ${
          width === "lg" ? "sm:max-w-[750px]" : "sm:max-w-[450px]"
        } translate-x-[-50%] translate-y-[-50%] rounded-md bg-white dark:bg-zinc-700`}
      >
        <div className="flex items-center flex-col justify-center h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
