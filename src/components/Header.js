import Image from 'next/image';

export default function Header() {
  return (
    <header className="container mx-auto px-16 pt-2 pb-16 flex flex-col md:flex-row items-center justify-between bg-black text-white border-b-8 border-[#FF29D7] text-center md:text-left">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-[#FF29D7]">SHEBN</span>
          <br />
          <span className="font-extrabold">The Global Community of Women in Web3</span>
        </h1>
        <p className="text-base md:text-lg font-light font-montserrat">Empowering women through collaboration, innovation and ecosystem opportunities. Promoting innovation and the development of technological solutions that address challenges in the industry.</p>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
        {/* Placeholder for World Map Image */}
        <div className="w-full flex justify-center md:justify-end">
            <Image src="/ArtboardMap.png" alt="World Map" className="w-full h-auto" width={900} height={900} />
        </div>
      </div>
    </header>
  );
} 
