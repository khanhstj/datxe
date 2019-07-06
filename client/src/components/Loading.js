import React, { Component } from 'react';

class Loading extends Component {
   render() {
      return (
         <div>
            <div className="bodydiv"><div className="loading"><span>Đang tải...</span></div></div>
         </div>
      );
   }
}

export default Loading;