"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";

interface SettingsProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsProps> = ({
    initialData
}) => {
    
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (values: SettingsFormValues) => {
        try{
            setLoading(true);

            const response = axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();
            toast.success("Cambios guardados");
        }catch(eror){
            toast.error("Error al guardar los cambios");
        }finally{
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try{
            setLoading(true)

            const res = await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Tienda eliminada");
 
        }catch(error){
            toast.error("Error al eliminar la tienda, asegurese de eliminar antes los productos con sus categorias correspondientes.");
        }finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading 
                    title="Settings"
                    description="Manage your store settings"
                />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input  disabled={loading} {...field} placeholder="Nombre"/> 
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Guardar Cambios
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert 
                title="NEXT_PUBLIC_API_URL" 
                description={`${origin}/api/${params.storeId}`} 
                variant="public"
            />
        </>
        
    )
}

export default SettingsForm;