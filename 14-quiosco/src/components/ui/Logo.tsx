import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center items-center">  
        <div className="relative w-20 h-20">
            <Image
                fill
                priority
                alt="Logotipo Fresh Coffee"
                src='/logo.svg'
                className="drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            />
        </div>
    </div>
  )
}
