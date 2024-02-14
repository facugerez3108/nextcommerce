"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash, Edit, Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: BillboardColumn
}


export const CellAction: React.FC<CellActionProps> = ({data}) => {
    
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const onConfirm = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            toast.success("Billboard eliminada");
            router.refresh();
        }catch(error){
            toast.error("Error al eliminar la billboard, asegurate de eliminar antes las categorias.");
        }finally{
            setOpen(false);
            setLoading(false);
        }
    }
    
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard ID copiado");
    }

    return (
        <>
        <AlertModal 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
        />
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => onCopy(data.id)}
                >
                    <Copy className="mr-2 h-4 w-4"/> Copiar ID
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => router.push(`/${params.storeId}/billboards/${data.id}`)}
                >
                    <Edit className="mr-2 h-4 w-4"/> Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpen(true)}
                >
                    <Trash className="mr-2 h-4 w-4"/> Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}