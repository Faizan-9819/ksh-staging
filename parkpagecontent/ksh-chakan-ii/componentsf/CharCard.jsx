const CharCard = ({ charnum, charcont, charTitle }) => {
  return (
    <div className="md:w-[350px] w-full max-w-full select-none gap-[25px] flex flex-col items-start justify-around h-[380px] md:h-[450px] bg-white border-[1px] border-[#6C8DAB] border-opacity-[0.5] p-[20px] md:p-[40px]">
      <div className="fsans-600 w-full flex items-start md:text-[72px] text-[56px] leading-[111%] text-[#253B57]">
        {charnum}
      </div>
      {/* Flex-grow container for title and content to align across all cards */}
      <div className="flex flex-col gap-[5px] flex-grow justify-start">
        <h4 className="text-[#092241] text-[24px]">{charTitle}</h4>
        <p className="md:text-[18px] text-[16px] text-[#6C8DAB] leading-[26px]">
          {charcont}
        </p>
      </div>
    </div>
  );
};

export default CharCard;
