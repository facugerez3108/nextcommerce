import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Package } from "lucide-react";

import { getTotalRevenue } from "../../../../../actions/get-total-revenue";
import { getSalesCount } from "../../../../../actions/get-total-sales";
import { getStockCount } from "../../../../../actions/get-stock-count";
import { getGraphRevenue } from "../../../../../actions/get-graph-revenue";

import { Overview } from "@/components/overview";

interface DashboardPageProps {
    params: {storeId: string};
};

const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {
    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);
    return (
        <div className="flex-col">
            <div className="flex-1 space-y4 p-8 pt-6">
                <Heading 
                    title="Dashboard"
                    description="Aquí esta el managment de la tienda."
                />
                <Separator />
                <div className="grid gap-4 grid-cols-3 mt-4">
                    {/* Totales */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalRevenue}
                            </div>
                        </CardContent>
                    </Card>
                    {/* Ventas */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    {/* Ventas */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Productos en Stock</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Graph Overview */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphRevenue}/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;