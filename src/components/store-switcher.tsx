"use client";

import { Store } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "../../hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem, CommandSeparator } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher ({
    className,
    items = []
}: StoreSwitcherProps) {
	const storeModal = useStoreModal();
    const params = useParams();
    const route = useRouter();
    
    const formatedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))
    
    const currentStore = formatedItems.find((item) => item.value === params.storeId);
    const [open, setOpen] = useState(false);
    
    const onStoreSelected = (store: {value: string, label: string}) => {
        setOpen(false);
        route.push(`/${store.value}`);
    }

    return (
		<Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"sm"}
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Selecciona tu tienda"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                        {currentStore?.label || "Selecciona tu tienda"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button> 
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Buscar tienda..."/>
                        <CommandEmpty>No se encontró una tienda</CommandEmpty>
                        <CommandGroup heading="Tiendas">
                            {formatedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    value={store.value}
                                    onSelect={() => onStoreSelected(store)}
                                >   
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check className={cn("ml-auto h-4 w-4", 
                                        currentStore?.value === store.value 
                                        ? "opacity-100" 
                                        : "opacity-0")}/>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandItem onSelect={() => storeModal.onOpen()}>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Crear Tienda
                        </CommandItem>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
	)
}   