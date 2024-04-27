import User from "../models/User.js";
import Order from "../models/order.js";
import item from "../models/item.js";

export const createOrder = async (req, res) => {
    const userId = await req.userId;

    try {
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
        }

        const user = await User.findById(userId);

        if (!user) {
            res.status(401).json({ error: "Unauthorized" });
        }

        const billingDetails = await req.body;
        // handle direct checkout through "buy now"
        if (billingDetails.itemId) {
            const getItem = await item.findById(billingDetails.itemId);
            if (getItem) {
                const temp = getItem.amountOfOrders;
                getItem.amountOfOrders = temp + 1;
            }
            const newOrder = await new Order({
                userId: user._id,
                name: billingDetails.values.name,
                email: billingDetails.values.email,
                phone: billingDetails.values.phone,
                city: billingDetails.values.city,
                country: billingDetails.values.country,
                address: billingDetails.values.address,
                item: getItem,
                paymentMethod: "cash",
                orderStatus: "pending",
                paymentStatus: "pending",
                totalPrice: getItem?.price,
                shopId: getItem?.shopId,
                quantity: 1,
            });
            // @ts-ignore
            await getItem.save();
            await newOrder.save();
            return NextResponse.json(
                {
                    success: true,
                    message: "Item added to cart",
                },
                {
                    status: 200,
                }
            );
        }

        // checking if the cart is empty
        if (user.cart.length === 0) {
            return NextResponse.json(
                {
                    error: "Cart is empty",
                    success: "false",
                },
                {
                    status: 400,
                }
            );
        }

        // creating the order
        user.cart.map(async (item) => {
            const newOrder = await new Order({
                userId: user._id,
                name: billingDetails.values.name,
                email: billingDetails.values.email,
                phone: billingDetails.values.phone,
                city: billingDetails.values.city,
                country: billingDetails.values.country,
                address: billingDetails.values.address,
                item: item.item,
                paymentMethod: "cash",
                orderStatus: "pending",
                paymentStatus: "pending",
                totalPrice: item.totalPrice,
                quantity: item.quantity,
                shopId: item.item.shopId,

            });
            await newOrder.save();
        })

        // delete cart inside user
        user.cart = [];
        await user.save();

        res.status(200).json({ message: "Created order!" })

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: error.message });
        }
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Order deleted!" });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};