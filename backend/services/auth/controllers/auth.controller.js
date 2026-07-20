import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
import User  from "../models/user.model.js"
import redis from "../../../shared/redis/redis.js"

export const login = async (req, res) => {
    try {

        //verify generate tokens for GoogleAccount

        const { token } = req.body
        const decoded = await getAuth(app).verifyIdToken(token)

        // If user is exist already in out mongoDB we won't do anything,
        // but if not exist we have to make user model.

        let user = await User.findOne({
            firebaseUid:decoded.uid
        })

        if(!user) {
            user = await User.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture

            })
        }

        const sessionId = crypto.randomUUID( )

        // when we are fetching login data we will directly take it from Redis.

        await redis.set(`session-${sessionId}`,JSON.stringify({
            userId:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }),"EX",7*24*60*60)

        res.cookie("session",sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({message:`login error: ${error}`})
    }
}

// Logout API

export const logOut = async (req,res) => {
    try {

        // delete session from Redis
        const sessionId=req.cookies?.session
        await redis.del(`session-${sessionId}`)

        // delete session from cookies
        res.clearCookie("session")
        return res.status(200).json({message:"Logout Sucessfully!!"})

    } catch (error) {
        return res.status(500).json({message:"Error while logging out!!"})
    }
}