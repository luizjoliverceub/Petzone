import { ReactNode } from "react"


export default function NoAuthSection({title,description,img,side,colorPrimary,children}:{title:string,description:string, img:string, side:"left" | "right" , colorPrimary:boolean ,children?:ReactNode}) {

    const verificationSide = side === "left" ? "flex" : "flex flex-row-reverse"
    const imgSide = side === "left" ? "justify-start" : "justify-end"

    const color = colorPrimary ? "text-white" : "text-brand-primary"
  return (
    
    <div className={`w-[90%] h-[80%] ${verificationSide}   items-center justify-center gap-10`}>
        
     <div className={`w-1/2 h-full  flex  items-center  ${imgSide}`}>

          <img src={img} alt="pet img" className="w-[75%] h-[75%]"/>

          </div>

          <div className="w-1/2 h-full  flex items-center justify-start">

              <div className="w-[90%] h-[60%]">

                  <h4 className={`text-2xl mb-4 ${color}`}>{title}</h4>

                  <p className={`${color} font-thin mb-4`}>{description}</p>
                  {children}
                  

              </div>

          </div>
          </div>
       
  )
}
