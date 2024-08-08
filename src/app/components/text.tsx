interface TextProps {
  text: string;
  children?: React.ReactNode;
}

function Text({ text, children }: TextProps) {
  return (
    <div className="w-full bg-green-200 p-4 text-white lg:w-[550px] sm:p-3 ">
      <div className=" w-full mb-2 flex justify-center items-center text-black">
        {text}
      </div>
      {children && (
        <div className="text-black text-left md:w-full">{children}</div>
      )}
    </div>
  );
}

export default Text;
