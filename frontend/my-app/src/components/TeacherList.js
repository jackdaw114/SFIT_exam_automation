import React from 'react'
import { HiCheck } from 'react-icons/hi';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlinePendingActions } from 'react-icons/md';
import TeacherDeptComponent from './TeacherDeptComponent';

const TeacherList = () => {
    const accepted_icon = <HiCheck size={72} className="pb-8 text-secondary" />;
    const rejected_icon = <ImCancelCircle size={72} className="pb-8 text-orange-950" />;
    const pending_icon = <MdOutlinePendingActions size={90} className="pb-8 opacity-60" />
    const icons_components = [accepted_icon, rejected_icon, pending_icon];

    return (
        <div>
            <div className='mt-5 w-full h-fit flex justify-center text-2xl font-mont font-medium'>
                <div className='w-11/12 flex justify-center '>
                    <div className=' aspect-square grid grid-rows-2 grid-cols-2 w-7/12  gap-8 transition-all'>
                        <TeacherDeptComponent status="Pending" idx={2} icons={icons_components} bgColor="bg-[#6699CC]" />
                        <TeacherDeptComponent status="Accepted" idx={0} icons={icons_components} bgColor="bg-[#A0dbbC]" />
                        <TeacherDeptComponent status="Accepted" idx={0} icons={icons_components} bgColor="bg-[#A0dbbC]" />
                        <TeacherDeptComponent status="Rejected" idx={1} icons={icons_components} bgColor="bg-[#DE6B48]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherList