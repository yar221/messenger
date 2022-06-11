import './messageItem.scss'

const MessageItem = (props) => {
    const {message, position} = props
    // console.log(message)
    return(
        <div className="messageItem" style={position === 'left' ? {marginRight: 'auto', justifyContent: 'left'} : {marginLeft: 'auto', justifyContent: 'right'}}><span className='messageItem-text'>{ message }</span></div>
    )
}

export default MessageItem