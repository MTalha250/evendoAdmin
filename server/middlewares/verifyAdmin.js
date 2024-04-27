import User from "../models/User.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);
        if (!user.isAdmin) {
            res.status(401).json({ message: "Action not permitted!" });
            return;
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};

export default verifyAdmin;