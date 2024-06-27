'use client';

import { type ElementRef, useEffect, useRef, forwardRef, useImperativeHandle, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ChildComponentHandles {
  dismiss: () => void;
}

// Define the props for the Modal component, including children
interface ModalProps {
  children: ReactNode;
}


const Modal = forwardRef<ChildComponentHandles, ModalProps>(({ children }, ref) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  useImperativeHandle(ref, () => ({
    dismiss: onDismiss,
  }));

  return createPortal(
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/70 flex justify-center items-center z-50">
      <dialog ref={dialogRef} className="p-5 gap-2 w-4/5 max-w-[350px] h-fit rounded-3xl flex flex-col justify-between" onClose={onDismiss}>
        <Button size="round" onClick={onDismiss}><X className="h-4 w-4" /></Button>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
});

export default Modal;