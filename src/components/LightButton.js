import React, { useEffect, useState } from 'react';

const LightButton = (props) => {

  const [count, counter] = useState(0);
  const [limit, release] = useState(true);

  const countUp = () => {
    counter(count + 1)
  }

  useEffect(() => {
    document.getElementById("counter").addEventListener('click', countUp);
    if (count >= 10) {
      counter(0);
    }
    return() => {
      document.getElementById("counter").removeEventListener('click', countUp)
    }
  }, [limit]);

  // componentDidUpdate() {
  //   if (this.state.count >= 10) {
  //     this.setState({ count: 0 })
  //   }
  // }

  // componentWillUnmount() {
  // }

  // countUp = () => {
  //   this.setState( {
  //     count: this.state.count + 1
  //   })
  // }
  return (
    <>
      <button id={"counter"}>いいね数： {count}</button>
      <button onClick={()=>release(!limit)}>もっといいねする</button>
    </>
  )
}

export default LightButton;