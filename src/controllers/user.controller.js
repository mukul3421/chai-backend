import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler ( async (req,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images , check for avatar 
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove the password and refresh token from the response 
    // check the user creation 
    // return response
    
    // get user details from frontend
    const {username, email, fullname, password} = req.body;
    console.log("emaii: ",email);
    
    // validation - not empty
    if (
        [username, email , fullname, pasword].some((Field) => 
            Field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    
    // check if user already exists: username, email
    const existedUser = User.findOne(
        {$or: [{username},{email}]
    })
    
    if(existedUser){
        throw new ApiError(409,"User with email and username already exists")
    }
    
    // check for images , check for avatar 
    const avatarLocalPath = res.files?.avatar[0]?.path;
    const coverImageLocalPath = res.files?.coverImage[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar files is required")
    }
    
    // upload them to cloudinary , avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError(400,"Avatar files is required")
    }
    
    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",  
        username: username.toLowerCase(),
        email,
        password,
    })
    
    // remove the password and refresh token from the response 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    // check the user creation 
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user");
    }

    // return response 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
} ) 

export {registerUser,}