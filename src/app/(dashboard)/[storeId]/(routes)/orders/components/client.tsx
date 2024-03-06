"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";


import { columns, OrderColumn } from "./columns";
import { Separator } from "@/components/ui/separator";

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
