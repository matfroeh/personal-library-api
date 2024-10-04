import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: [true, "Title is required"] },
    author: { type: String, required: [true, "Author is required"] },
    publisher: { type: String, required: [true, "Publisher is required"] },
    publicationYear: { type: Number, required: [true, "Publication year is required"] },
    isbn: { type: String, unique: true, required: [true, "ISBN is required"] },
})

export default model("Book", bookSchema);