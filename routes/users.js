import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";

import {verifyToken} from "../middleware/auth.js"

const router = express.router();
/* Read Routes */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/*Update Routes */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;