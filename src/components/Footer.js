import React from "react"

class Header extends React.Component{
    render(){
        return(
            <header className="ui inverted menu">
                <div className="ui container">
                    <img src="Flag_of_Ukraine_(with_coat_of_arms).svg" alt="logo"/>
                    <h3>Выборы Украины <span>2019</span></h3>
                </div>
            </header>
        )
    }
}

export default Header;