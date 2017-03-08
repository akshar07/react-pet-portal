import React from 'react'
import Credentials from './credentials'
import petfinder from './petfinder-client'
import Pet from './Pet'
import SearchControl from './SearchControl'
const pf= petfinder(Credentials)

class App extends React.Component{
  constructor(props){
    super(props)

    this.state={
      animal:'dog',
      breed:'havanese',
      location:'San Fransisco,CA',
      pets:[]
    }
    // we need to bind this to all event listener
    this.changeBreed=this.changeBreed.bind(this)
    this.changeAnimal=this.changeAnimal.bind(this)
  }
  //in component will mount window is not guaranteed available- anything that has to go in the DOM it has to go in
  //did mount
  //All AJAX calls in here
  componentDidMount(){
    this.search()
  }
  search(){
    const {animal,breed,location}=this.state
    const promise=pf.pet.find({animal,breed,location,output:'full'})
    //arrow function do not create new cntext
    promise.then((data)=>{
      const pets=data.petfinder.pets? data.petfinder.pets.pet:[]
      this.setState({pets})
    })
  }
  changeBreed(breed){
    this.setState({breed},()=>{this.search()})
  }
  changeAnimal(animal){
    // to clear  out breed
    this.setState({animal, breed:''},()=>{this.search() })
  }
  render(){
    return(
      <div className='app'>
         <img src='adopt-me.png' alt='adopt-me logo' />
         <SearchControl
              breed={this.state.breed}
              animal={this.state.animal}
              changeBreed={this.changeBreed}
              changeAnimal={this.changeAnimal}
         />
         <div>
           {this.state.pets.map((pet) => {
             return (
               <Pet key={pet.id} pet={pet} />
             )
           })}
         </div>
       </div>
    )
  }
}

export default App
