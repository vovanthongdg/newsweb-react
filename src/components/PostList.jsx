import React from "react";

import styled from "styled-components";
import Posts from "./Posts";

const PostList = ({ data }) => {
    return (
        <>
            {data.map((item, index) => {
                return (
                    <Posts
                        key={index}
                        idArticle={item.idArticle}
                        urlImage={item.urlIamge}
                        category={item.category}
                        title={item.title}
                        summary={item.summary}
                        create_time={item.create_time}
                        name_page={item.name_page}
                    />
                );
            })}
        </>
    );
};

const Container = styled.div``

export default PostList;
