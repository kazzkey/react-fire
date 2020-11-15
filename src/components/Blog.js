import React from 'react';
import Article from './Article';

const Blog = () => {

  return(
    <div>
      <Article
        title={"reactの使い方"}
        // count={this.state.count}
      />
    </div>
  );
}

export default Blog;