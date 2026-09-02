"use client";

const TimeCardMob = ({ image, content, isAbove }) => {
  return (
    <div
      className={`border-[2px] border-white ${
        isAbove ? "topcard" : "bcard"
      } w-[300px] overflow-hidden flex flex-col cursor-pointer`}
    >
      {/* Image */}
      <img
        src={image || "/time/t1.png"}
        alt="Time Card"
        className="w-full h-[182px] object-cover"
      />

      {/* Static Content Below Image */}
      <div className="p-4 text-[#474747] text-[14px] fsans-400 bg-white">
        {content ||
          "Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet"}
      </div>
    </div>
  );
};

export default TimeCardMob;
