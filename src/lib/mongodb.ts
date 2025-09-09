import mongoose from "mongoose";

declare global{
    var mongoose:{
        promise: Promise<typeof mongoose> | null;
        conn: typeof mongoose | null;
    }
}

const mongo_uri = process.env.MONGODB_URI