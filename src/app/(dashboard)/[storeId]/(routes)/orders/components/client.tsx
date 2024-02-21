"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";

import { columns, OrderColumn } from "./columns";

interface OrdersClientProps {
    data: OrderColumn[]
}


export const OrderClient: React.FC<OrdersClientProps> = ({
    data
}) => {
    return (
        <>
            <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
               <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
}
