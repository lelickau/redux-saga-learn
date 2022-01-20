import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Blog = () => {
    const dispatch = useDispatch()
    const blogData = useSelector(store => store.app.blog)

    console.log(blogData);

    return (
        <div>
            Blog
            <button onClick={() => dispatch({type:'LOAD_SOME_DATA'})}>load some data</button>
        </div>
    );
};

export default Blog;