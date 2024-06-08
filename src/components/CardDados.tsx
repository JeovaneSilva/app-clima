import { ReactElement } from "react"

interface CardProps{
    content:string|number,
    icon:ReactElement
}


export default function Card({icon,content}:CardProps){
    return (
        <div className="w-[120px] h-[50px] border-2 border-blue-500 rounded-[8px] flex justify-center items-center mb-6">
            <p>{icon}</p>
            <p>{content}</p>
        </div>
    )
}