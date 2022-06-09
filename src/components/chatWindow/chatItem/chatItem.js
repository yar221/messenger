import './chatItem.scss'

const ChatItem = (props) => {
    const {friendLogin} = props
    return (
        <div className="chatItem">
            <div className="chatItem_body">
                <span className="chatItem-friendLogin">{friendLogin}</span>
            </div>
        </div>
    )
}

export default ChatItem