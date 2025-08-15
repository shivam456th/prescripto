import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = async (params) => {
    const docInfo = doctors.find((d) => d._id === docId);
    setDocInfo(doc || null);
  };


  // Generate available slots for 7 days
  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();

    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.toDateString() === currentDate.toDateString()) {
        let nextHour = today.getHours();
        let nextMinute = today.getMinutes() > 30 ? 0 : 30;
        if (today.getMinutes() > 30) nextHour++;
        if (nextHour < 10) nextHour = 10;
        currentDate.setHours(nextHour, nextMinute, 0, 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  // Run on doctors list or docId change
  useEffect(() => {
    if (doctors.length) {
      fetchDocInfo();
      getAvailableSlots();
    }
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* Name, degree, experience */}
            <p className="flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div>
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button>{docInfo.experience}</button>
            </div>

            {/* About */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Slot times for selected day */}
          <div className="mt-4 flex gap-3 flex-wrap">
            {docSlots[slotIndex] &&
              docSlots[slotIndex].map((slot, i) => (
                <div
                  key={i}
                  onClick={() => setSlotTime(slot.time)}
                  className={`px-4 py-2 rounded-lg cursor-pointer ${
                    slotTime === slot.time
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  {slot.time}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
