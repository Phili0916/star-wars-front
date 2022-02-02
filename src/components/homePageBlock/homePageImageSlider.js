import React from 'react'
import VacationsApiClient from "../../services/vacations.api.client";
import withRouter from "../../helper/withRouter";
import {withTranslation} from "react-i18next";
import {Navbar} from "../navbarBlock/navbar";
import PropTypes from "prop-types";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from "react-icons/fa";


class HomePageImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      vacation: props.vacation,
      currentImage: 0,
      isNext: true
    }
  }

  static propTypes() {
    return {
      vacation: PropTypes.object
    }
  }

  handlerPrev() {
    let index = this.state.currentImage
    let length = this.state.vacation.imageUrl.length;
    console.log(length, 'length')
    console.log('currentImage', this.state.currentImage)

    if(index < 1 ) {
      this.setState({index: length - 1});
    }
    this.setState({isNext: false});
  }


  handlerNext() {
    let index = this.state.currentImage
    let length = this.state.vacation.imageUrl.length - 1;
    console.log('currentImage', this.state.currentImage)



    if( index === length ) {
      index = -1;
    }

    index = index + 1;

    this.setState({
      current: index,
      isNext: true
    });
  }

  goToHistoryClick( currentImage, index ) {
    let next = (currentImage < index);
    this.setState({
      currentImage: index,
      isNext: next
    });
  }

  render() {
    let index = this.state.currentImage
    return(
        <div className={'home_slider_container_images'}>
            <FaArrowAltCircleLeft className={'home_slider-arrow-left'} onClick={() => this.handlerPrev(index)}/>
            <FaArrowAltCircleRight className={'home_slider-arrow-right'} onClick={() => this.handlerNext(index)}/>
            {this.state.vacation?.title}
            {this.state.currentImage}
            ?
            ({this.state.vacation.imageUrl.length > 1 &&
              <img src={"http://localhost:9090/images" + this.state.vacation.imageUrl[1]}
                   alt={'azerty'}
                   className={'home_slider-image'}/>
          }
          : {this.state.vacation.imageUrl.indexOf > 0})}

        </div>
    )
  }
}


export default withRouter(withTranslation()(HomePageImageSlider))
