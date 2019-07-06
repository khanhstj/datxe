import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import CB300R_1 from '../../../media/CB300R (1).jpg'
import CB300R_2 from '../../../media/CB300R (2).jpg'
import CB300R_3 from '../../../media/CB300R (3).jpg'
const items = [
  {
    src: CB300R_1,
    altText: 'CB300R',
    caption: 'CB300R'
  },
  {
    src: CB300R_2,
    altText: 'CB300R',
    caption: 'CB300R'
  },
  {
    src: CB300R_3,
    altText: 'CB300R',
    caption: 'CB300R'
  }
];

class NoiDungTrangChu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
   const { activeIndex } = this.state;

   const slides = items.map((item) => {
      return (
        
         <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} className="carousel-item" >
            <img className="img-carousel"  src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
         </CarouselItem>
        
      );
    });

    return (
   
      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
				<CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
				{slides}
				<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
				<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
			</Carousel>
      
    );
  }
}


export default NoiDungTrangChu