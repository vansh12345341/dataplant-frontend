import React, { useEffect, useState } from 'react';
import axios from "../axiosConfig";
import EditScheduleForm from './forms/EditScheduler';
import "./ScheduleTable.css"
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import SearchBar from './Search';

interface Schedule {
  _id: any;
  title: any;
  description: any;
  subject: any;
  frequency: any;
  time:any;
  repeat: any,
}

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);
  const [showEditSchedule, setShowEditSchedule] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const filteredSchedules = schedules.filter(schedule => 
    schedule.title.toLowerCase().includes(searchTerm) ||
    schedule.description.toLowerCase().includes(searchTerm) ||
    schedule.subject.toLowerCase().includes(searchTerm)
  );



  const handleEditClick = async (scheduleId: string) => {
    try {
      const response = await axios.get(`/schedules/${scheduleId}`);
      setCurrentSchedule(response.data);
      setShowEditSchedule(true);
    } catch (error) {
      console.error('Error fetching schedule details:', error);
    }
  };
  const handleUpdateSchedule = async (updatedScheduleData: Schedule) => {
    try {
      const response = await axios.patch(`/schedules/${updatedScheduleData._id}`, updatedScheduleData);
      setSchedules(schedules.map(sch => sch._id === response.data._id ? response.data : sch));
      setShowEditSchedule(false); 
    } catch (error) {
      console.error('Error updating schedule', error);
    }
  };

  const handleDeleteClick = async (scheduleId: string) => {
    try {
      await axios.delete(`/schedules/${scheduleId}`);
      setSchedules(schedules.filter(schedule => schedule._id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  }
  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/schedules');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);


  return (<>
   <SearchBar onNewScheduleAdded={fetchSchedules}  onSearchChange={handleSearchChange} />
  {showEditSchedule&& currentSchedule && <EditScheduleForm   schedule={currentSchedule}
          onClose={() => setShowEditSchedule(false)}
          onUpdate={handleUpdateSchedule} />}
   <div className="min-w-full mt-7">
      <div className="flex text-left bg-gray-300 justify-between px-6 py-4 border-b border-solid border-gray-300">
        <div className="font-semibold text-gray-800 text-sm title-styling" style={{ width: '20%' }}>Title</div>
        <div className="font-semibold text-gray-800 text-sm title-styling" style={{ width: '40%' }}>Description</div>
        <div className="font-semibold text-gray-800 text-sm title-styling" style={{ width: '15%' }}>Subject</div>
        <div className="font-semibold text-gray-800 text-sm title-styling" style={{ width: '15%' }}>Schedule</div>
        <div className="font-semibold text-gray-800 text-sm title-styling" style={{ width: '10%' }}>Actions</div>
      </div>

      {filteredSchedules.map((schedule) => (
        <div key={schedule._id} className="flex justify-between bg-white text-xs items-center text-left px-6 py-4 border-b border-solid border-zinc-300">
          <div style={{ width: '20%' }} className="style">{schedule.title}</div>
          <div style={{ width: '40%' }}  className="style">{schedule.description}</div>
          <div style={{ width: '15%' }}  className="style">{schedule.subject}</div>
          <div style={{ width: '15%' }}  className="style">{`${schedule.frequency} at ${schedule.time}`}</div>
          <div className="flex " style={{ width: '10%' }}>
               <img src={Edit} alt="Edit" className="img-button " onClick={() => handleEditClick(schedule._id)} />
              <img src={Delete} alt="Delete" className="img-button pr-5"  onClick={() => handleDeleteClick(schedule._id)}/>
          </div>
        </div>
      ))}
    </div>
  </>

  );
};

export default ScheduleTable;
