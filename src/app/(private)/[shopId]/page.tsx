export default async function Home() {

    const topMenus = [
        {
            name: "Spicy Chicken Burger",
            sales: 120,
            revenue: "$600",
            image: "/assets/shop-thumbnail.png",
        },
        {
            name: "Cheese Pizza",
            sales: 95,
            revenue: "$475",
            image: "/assets/shop-thumbnail.png",
        },
        {
            name: "Iced Coffee",
            sales: 80,
            revenue: "$240",
            image: "/assets/shop-thumbnail.png",
        },
    ];

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 shadow rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-700">Daily Income</h2>
                    <p className="text-2xl font-bold text-green-600">$1,250</p>
                </div>
                <div className="bg-white p-6 shadow rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-700">Daily Customers</h2>
                    <p className="text-2xl font-bold text-blue-600">87</p>
                </div>
                <div className="bg-white p-6 shadow rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
                    <p className="text-2xl font-bold text-purple-600">320</p>
                </div>
                <div className="bg-white p-6 shadow rounded-md flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
                    <p className="text-2xl font-bold text-red-600">12</p>
                </div>
            </section>

            <section className="bg-white p-6 shadow rounded-md">
                <h2 className="text-xl font-bold text-gray-700 mb-4">Top 3 Hot Sale Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topMenus.map((menu, index) => (
                        <div key={index} className="bg-gray-100 p-4 shadow rounded-md flex flex-col items-center">
                            <img
                                src={menu.image}
                                alt={menu.name}
                                className="w-32 h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-700">{menu.name}</h3>
                            <p className="text-gray-600">Sales: {menu.sales}</p>
                            <p className="text-green-600 font-bold">Revenue: {menu.revenue}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-6 shadow rounded-md">
                <h2 className="text-xl font-bold text-gray-700">Sales Overview</h2>
                <div className="mt-4 flex justify-center">
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
                        <p className="text-gray-500">[Chart Placeholder]</p>
                    </div>
                </div>
            </section>
        </>
    );
}
