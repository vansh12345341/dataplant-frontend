import React, { useState } from 'react';
import axios from 'axios';
import { Schedule } from '../../interface/Schedule';

interface EditScheduleFormProps {
    schedule: Schedule; 
    onClose: () => void;
    onUpdate: (schedule: Schedule) => void;
}

function EditScheduleForm({ schedule, onClose, onUpdate }: EditScheduleFormProps){
    const [title, setTitle] = useState(schedule.title);
    const [description, setDescription] = useState(schedule.description);
    const [subject, setSubject] = useState(schedule.subject);
    const [frequency, setFrequency] = useState(schedule.frequency);
    const [time, setTime] = useState(schedule.time);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
  };

  const handleDoneClick = async () => {
    const updatedScheduleData = {
      _id: schedule._id,
      title,
      description,
      subject,
      frequency,
      time,
      repeat: frequency === 'Weekly' ? selectedDay : null,
    };

    onUpdate(updatedScheduleData); 
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Schedule</h3>
          <div className="mt-2 px-7 py-3">
            <input
              className="w-full rounded border px-3 py-2 mb-3 text-sm"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded border px-3 py-2 mb-3 text-sm"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <input
              className="w-full rounded border px-3 py-2 mb-3 text-sm"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <select
              className="w-full rounded border px-3 py-2 mb-3 text-sm"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            {frequency === 'Weekly' && (
              <div className="flex justify-between mb-3">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                      selectedDay === day ? 'bg-violet-950 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {day.substring(0, 1)}
                  </button>
                ))}
              </div>
            )}

            {frequency === 'Monthly' && (
              <select
                className="w-full rounded border px-3 py-2 mb-3 text-sm"
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option value="first monday">First Monday</option>
                <option value="last friday">Last Friday</option>
              </select>
            )}

            <select
              className="w-full rounded border px-3 py-2 mb-3 text-sm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="10:00AM">10:00AM</option>
            </select>

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded hover:bg-gray-600 focus:outline-none mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-violet-950 text-white text-sm font-medium rounded hover:bg-violet-700 focus:outline-none"
                onClick={handleDoneClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditScheduleForm;