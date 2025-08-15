import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const orders = [
  {
    id: "ORD-001",
    date: "2023-10-26",
    total: 199.98,
    status: "Delivered",
    items: [
      { name: "Astro-Gamer Headset", quantity: 1, price: 129.99 },
      { name: "Ergo-Flow Mouse", quantity: 1, price: 69.99 },
    ],
  },
  {
    id: "ORD-002",
    date: "2023-10-20",
    total: 34.99,
    status: "Delivered",
    items: [{ name: "Cyberpunk Desk Mat", quantity: 1, price: 34.99 }],
  },
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <CardDescription>Order ID</CardDescription>
                <CardTitle className="text-sm">{order.id}</CardTitle>
              </div>
              <div>
                <CardDescription>Date</CardDescription>
                <CardTitle className="text-sm">{order.date}</CardTitle>
              </div>
              <div>
                <CardDescription>Total</CardDescription>
                <CardTitle className="text-sm">${order.total.toFixed(2)}</CardTitle>
              </div>
               <div>
                <CardDescription>Status</CardDescription>
                <CardTitle className="text-sm">{order.status}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
