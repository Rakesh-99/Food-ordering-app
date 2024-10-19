import mongoose from "mongoose";






// Schema types for TypeScript : 


export interface IUserSchemaTypes extends Document {
    fullname: string,
    email: string,
    contact: number,
    password: string,
    address: string,
    country: string,
    city: string,
    profilePicture?: string,
    admin: boolean,
    lastLogin?: Date,
    isVerified?: boolean,
    resetPasswordToken?: string,
    resetPasswordTokenExpiresAt?: Date,
    verificationToken?: string,
    verificationTokenExpiresAt?: Date,
}



// User Schema : 

const userSchema = new mongoose.Schema<IUserSchemaTypes>({
    fullname: {
        type: String,
        required: [true, 'User name can not be empty!']
    },
    email: {
        type: String,
        required: [true, 'Email field can not be empty!'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    contact: {
        type: Number,
        required: [true, 'Contact field can not be empty'],
        unique: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg'
    },
    admin: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpiresAt: {
        type: Date
    },
    verificationToken: {
        type: String
    },
    verificationTokenExpiresAt: {
        type: Date
    }
}, { timestamps: true });


const userModel = mongoose.model('User', userSchema);

export default userModel;