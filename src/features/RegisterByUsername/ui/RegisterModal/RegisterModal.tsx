import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { RegisterForm } from 'features/RegisterByUsername/ui/RegisterForm/RegisterFormAsync.async';

interface RegisterModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegisterModal = ({ className, isOpen, onClose }: RegisterModalProps) => (
    <Modal
        className={classNames('', {}, [className])} // Упрощение использования classNames
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <RegisterForm onSuccess={onClose} />
        </Suspense>
    </Modal>
);
