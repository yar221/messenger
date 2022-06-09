import './messageItem.scss'

const MessageItem = (props) => {
    const {message, position} = props
    return(
        <div className="messageItem" style={position === 'left' ? {marginRight: 'auto'} : {marginLeft: 'auto'}}><span className='messageItem-text'>{ message }</span></div>
    )
}

export default MessageItem