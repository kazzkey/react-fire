import React, { useState } from 'react';
import Lightbutton from './LightButton';

const Article = (props) => {
  const [isPublished, togglePublished] = useState(false);

  return (
    <div>
      <h2>{props.title}</h2>
      <label htmlFor="check">公開状態：</label>
      <input type="checkbox" checked={isPublished} id="check"
        onClick={()=>{togglePublished(!isPublished)}}
      />
      <Lightbutton />
    </div>
  );
}

export default Article;