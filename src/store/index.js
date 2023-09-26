import { configureStore } from "@reduxjs/toolkit"

// @import all reducer from slices
import authReducer from "./slices/auth"
import blogsReducer from "./slices/blogs"
import categoryReducer from "./slices/blogs/Category"
import FavBlogsReducer from "./slices/blogs/FavBlogs"
import likedReducer from "./slices/blogs/LikedArticles"

// @create store
const store = configureStore({
    reducer : {
        auth : authReducer,
        blogs : blogsReducer,
        category : categoryReducer,
        favorites : FavBlogsReducer,
        liked : likedReducer
    },
})

// @export store
export default store