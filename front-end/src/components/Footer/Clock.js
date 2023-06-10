import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // Cập nhật thời gian mỗi giây

    return () => {
      clearInterval(timer); // Hủy bỏ interval khi component bị hủy
    };
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dayOW = date.getDay();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${daysOfWeek[dayOW]} ${day}/${month}/${year} - ${hours}:${minutes}:${seconds} `;
    
  };

  return (
    <div>
      <h5>{formatTime(time)}</h5>
    </div>
  );
}

export default Clock;
