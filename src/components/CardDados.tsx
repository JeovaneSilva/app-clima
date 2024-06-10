import { ReactElement } from "react"

interface CardProps{
    content:string|number,
    icon:ReactElement
}

export default function Card({icon,content}:CardProps){
    return (
        <div className="w-[120px] h-[50px] flex justify-center items-center gap-2">
            <p className="text-xl ">{icon}</p>
            <p className="text-xl">{content}</p>
        </div>
    )
}