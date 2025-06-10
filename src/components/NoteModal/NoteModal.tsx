import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './NoteModal.module.css'

interface NoteModalProps {
   onClose: () => void;
   children: React.ReactNode;
}

export default function NoteModal({onClose, children}: NoteModalProps) {
  // Закриття по натисканню Escape
  useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
        if(event.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Закриття по кліку на фон
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
  <div
    className={css.backdrop}
    role="dialog"
    aria-modal="true"
    onClick={handleBackdropClick}
>
    <div className={css.modal}>
      {children}
    </div>
  </div>,
document.body
);}