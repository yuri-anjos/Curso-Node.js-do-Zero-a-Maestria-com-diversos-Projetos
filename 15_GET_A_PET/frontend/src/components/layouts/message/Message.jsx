import { useEffect, useState } from 'react'
import messageStyle from './Message.module.css'
import bus from '../../../utils/bus'

const Message = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('Minha Mensagem')

    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {
            setMessage(message)
            setType(type)
            setIsVisible(true)

            setTimeout(() => {
                setIsVisible(false)
            }, 5000)
        })
    }, [])

    return (
        isVisible && (
            <div className={`${messageStyle.message} ${messageStyle[type]}`}>
                {message}
            </div>
        )
    )
}

export default Message