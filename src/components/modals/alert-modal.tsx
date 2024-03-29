"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading }) => {
    const [isMounted, setIsMoundet] = useState(false);

    useEffect(() => {
        setIsMoundet(true);
    }, []);

    if(!isMounted) return null;

    return (
        <>
            <Modal
                title="Esta seguro?"
                description="No podras revertir esta accion"
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                        Continuar
                    </Button>
                </div>
            </Modal>
        </>
    )
}