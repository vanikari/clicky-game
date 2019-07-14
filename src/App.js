import React, { Component } from "react";
import CarCard from "./components/CarCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Score from "./components/Score";
import TopScore from "./components/TopScore";
import cars from "./cars.json";

class App extends Component {
  // Setting this.state.cars to the cars json array and initializing score to 0
  
  constructor(props){
    super(props);
    this.state = {
      score : 0,
      cars : cars,
      selectedCars : [],
      topScore : 0
    }
  }
  
  shuffleCars(cars) {
    for (let i = cars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cars[i], cars[j]] = [cars[j], cars[i]];
    }
    return cars
  };

  //when you click on a card ... the click is validated and cards are reshuffled
  imageClick = event => {
    const selectedCar = event.target.alt;
    if (this.state.selectedCars.indexOf(selectedCar) === -1) {
      this.setState({
        selectedCars: this.state.selectedCars.concat([selectedCar]),
        cars : this.shuffleCars(cars),
        score : this.state.score + 1,
        topScore : (this.state.score >= this.state.topScore) ? this.state.score : this.state.topScore
      });
    } else {
      // cars = this.shuffleCars(cars);
      this.setState({
        selectedCars: [],
        cars : this.shuffleCars(cars),
        score : 0
    });

    }
  }
  // Map over this.state.cars and render a CarCard component for each car object
  render() {
    return (
      <Wrapper>
        <Title>Remember your rides? </Title>
        <TopScore>{this.state.topScore}</TopScore>
        <Score> {this.state.score} </Score>

        {this.state.cars.map(car => (
          <CarCard
            imageClick = {this.imageClick}
            key = {car.id}
            name={car.name}
            image={car.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
