import mongoose from 'mongoose';





// menuSchema types for TypeScript : 

export interface IMenuSchemaTypes extends Document {
    name: string,
    description: string,
    price: number,
    image: string
}



// Menu Schema : 


const menuSchema = new mongoose.Schema<IMenuSchemaTypes>({
    name: {
        type: String,
        required: [true, 'Menu name can not be empty!']
    },
    description: {
        type: String,
        required: [true, 'Description can not be empty!']
    },
    price: {
        type: Number,
        required: [true, 'Menu price can not be empty!']
    },
    image: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQex8Yru1B7JT0tgCqSsj81AZmN-HxsNddmhg&s'
    }
}, { timestamps: true });


const menuModel = mongoose.model('Menu', menuSchema);
export default menuModel;