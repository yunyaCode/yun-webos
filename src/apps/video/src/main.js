import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    render(){
        return (
          <div>
            点播应用<br />
            webos-React
            </div>
        )
    }
}


const render = (root) => {

  return ReactDom.render(<App/>,document.querySelector(root))

}



if (window.defineModule) {
  window.defineModule('video', {
    render,
  })
} else {
  render('main')
}



