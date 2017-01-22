import React, {Component} from 'react'
import style from './Greeter.css'

class Greeter extends Component {
	render(){
		return(
			<div className={style.root}>
				Here is webpack config with css-modules and hot loader	
			</div>
		)
	}
}

export default Greeter