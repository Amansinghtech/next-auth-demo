import mongoose, { Model, Models, Document, Schema } from 'mongoose'
import argon2 from 'argon2'

export interface UserDocument extends Document {
	email: string
	name: string
	image: string
	password: string
	role: 'admin' | 'user'
}

interface Methods {
	comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	image: { type: String },
	password: { type: String },
	role: {
		type: String,
		enum: ['user', 'admin'],
		required: true,
		default: 'user',
	},
})

// hash password before saving
userSchema.pre<UserDocument>('save', async function (next) {
	if (!this.isModified('password')) next()
	this.password = await argon2.hash(this.password)
	next()
})

userSchema.methods.comparePassword = async function (password) {
	return await argon2.verify(this.password, password)
}

const UserModal =
	mongoose.models.User || mongoose.model<UserDocument>('User', userSchema)

export default UserModal as Model<UserDocument, {}, Methods>
